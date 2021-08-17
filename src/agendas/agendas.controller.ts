import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { Crud } from '@nestjsx/crud';
import { Agenda } from './agenda.entity';
import { AgendasService } from './agendas.service';

// @Crud({
//   model: {
//     type: Agenda
//   },
//   query: {
//     join: {
//       unidade: {
//         eager: true,
//         allow: ['id_unidade']
//       },
//       medico: {
//         eager: true,
//         allow: ['id_medico']
//       }
//     }
//   }
// })
@Controller('agendas')
export class AgendasController {
  constructor(public service: AgendasService) {}

}
