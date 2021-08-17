import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Glossario } from './glossario.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class GlossarioService {
  constructor(@InjectRepository(Glossario) private readonly glossario: Repository<Glossario>){}

  getAllPalavras(): Promise<Glossario[]>{
    return this.glossario.find();
  }

  async novaPalavra(nm_palavra: string, ds_palavra: string): Promise<number>{

    const count = await this.glossario.count();
    const novaPalavra: Glossario = new Glossario();

    novaPalavra.id_palavra = count + 1;
    novaPalavra.nm_palavra = nm_palavra;
    novaPalavra.ds_palavra = ds_palavra;

    return (await this.glossario.save(novaPalavra)).id_palavra;

  }

  async removerPalavra(id_palavra: number): Promise<boolean>{

    const palavra = await this.glossario.findOne(id_palavra);

    const palavraRemovida = await this.glossario.remove(palavra);

    if(palavraRemovida)
      return true;
    else
      return false;

  }

  async atualizarPalavra(id_palavra: number, nm_palavra: string, ds_palavra: string): Promise<Glossario>{

    const palavra = await this.glossario.findOne(id_palavra);

    if(nm_palavra)
      palavra.nm_palavra = nm_palavra;

    if(ds_palavra)
      palavra.ds_palavra = ds_palavra;

    return this.glossario.save(palavra);

  }


}
