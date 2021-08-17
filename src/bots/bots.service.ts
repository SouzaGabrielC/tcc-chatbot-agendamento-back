import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Bot } from './bot.entity';
import { Repository } from 'typeorm';
import { Clinica } from '../clinicas/clinica.entity';
import { DialogosService } from '../dialogos/dialogos.service';
import { Dialogo } from '../dialogos/dialogo.entity';

@Injectable()
export class BotsService {

  private botsAtivos: Bot[] = [];

  constructor(
    @InjectRepository(Bot) private readonly repository: Repository<Bot>,
    private readonly dialogosService: DialogosService
    ){ }

  async criarBotClinica(clinica: Clinica){

    const bot: Bot = await this.repository.findOne({
      where: {
        clinica: clinica,
        ic_habilitado: true
      },
      loadRelationIds: true
    });

    if(bot.dialogo){
      
      const dialogoCarregado: Dialogo = await this.dialogosService.carregarDialogoBot(bot.dialogo);
  
      bot.dialogo = dialogoCarregado;
  
    }

    this.botsAtivos.push(bot);
    // console.log("Bot criado:", bot);

    return bot;

  }

  buscarTodosBotsClinica(id_clinica){

    return this.repository.find({
      clinica: {
        id_clinica
      }
    });

  }

  async deletarBotClinica(id_clinica: number, id_bot: number){

    return this.repository.remove(await this.repository.findOne({
      where: {
        id: id_bot,
        clinica: {
          id_clinica
        }
      }
    }));

  }

  novoBotClinica(){

  }


}
