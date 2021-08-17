insert into tb_paciente(id_paciente, nm_paciente, dt_nascimento, cd_cpf, 
cd_celular, cd_telefone, nm_rua, nm_bairro, cd_cep, cd_numero, ds_complemento, nm_cidade, id_estado) values
(1, 'Gustavo Dias Lobianco de Souza', STR_TO_DATE( "16/04/1997", "%d/%m/%Y" ), 
'44020025835', '13997200305', '1334688788', 'Caminho dos Barreiros', 'Esplanada dos Barreiros', '11340020', '51', 'Casa', 'São Vicente', 1),
(2, 'Eunice de Jesus Dias Lobianco', STR_TO_DATE( "03/10/1955", "%d/%m/%Y" ), 
'17366706892', '13997648807', '1334688788', 'Caminho dos Barreiros', 'Esplanada dos Barreiros', '11340020', '51', 'Casa', 'São Vicente', 1),
(3, 'Ivan Lobianco Jr', STR_TO_DATE( "08/08/1952", "%d/%m/%Y" ), 
'54521596785', '13996737054', '1334688788','Caminho dos Barreiros', 'Esplanada dos Barreiros', '11340020', '51', 'Casa', 'São Vicente', 1),
(4, 'Jomario Ferreira de Souza', STR_TO_DATE( "15/09/1970", "%d/%m/%Y" ), 
'13056399874', '13997377452', null, null, 'Orquidario', null, null, null, 'Santos', 1),
(5, 'Gabriel de Carvalho Souza', STR_TO_DATE( "11/01/1996", "%d/%m/%Y" ), 
'44420025835', '13981648875', null, 'Rio grande do norte', 'Pompeia', null, '109', 'Apt 11', 'Santos', 1),
(6, 'Leticia de Jesus Dias Lobianco', STR_TO_DATE( "28/07/1980", "%d/%m/%Y" ), 
'14785236965', '13996415193', null, 'Rua Coronel Silva Telles', 'Pq São vicente', '11355420','1035', "Apto 11", 'Santos', 1);