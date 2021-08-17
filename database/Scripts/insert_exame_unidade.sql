insert into tb_exame_unidade(id_exame_unidade, ds_exame, ds_preparo, ds_observacao, tm_retirada, 
ic_retirada_pos_exame, id_exame, id_unidade) values
(1, 'Trata-se de exame de ultrassom do abdome total, que inclui o fígado, vesícula biliar, pâncreas, rins, bexiga, baço, aorta e veia cava.',
'JEJUM 12 HORAS (Período da manhã)
JEJUM 06 HORAS (Período da tarde ou paciente diabético)
JEJUM 04 HORAS (Crianças de 03 - 06 anos)
JEJUM 01 HORA (Crianças até 02 anos)
Beber 4 copos de água ao chegar na clínica.',
'Na VÉSPERA de JEJUM, EVITAR O CONSUMO de: leite e derivados, verduras cruas, bagaço de frutas, salada de folhas, frituras, feijões, grão-de-bico, milho, lentilha, ervilha, sementes e similares.
Em qualquer um dos casos, o paciente pode tomar todos os outros medicamentos que usa.
No dia do exame, levar todos os exames anteriores de ultrassom.',
0, true, 1, 1);

insert into tb_exame_unidade(id_exame_unidade, ds_exame, ds_preparo, ds_observacao, tm_retirada, 
ic_retirada_pos_exame, id_exame, id_unidade) values
(2, 'Trata-se de exame de ultrassom do abdome total, que inclui o fígado, vesícula biliar, pâncreas, rins, bexiga, baço, aorta e veia cava.',
'JEJUM 12 HORAS (Período da manhã)
JEJUM 06 HORAS (Período da tarde ou paciente diabético)
JEJUM 04 HORAS (Crianças de 03 - 06 anos)
JEJUM 01 HORA (Crianças até 02 anos)
Beber 4 copos de água ao chegar na clínica.',
'Na VÉSPERA de JEJUM, EVITAR O CONSUMO de: leite e derivados, verduras cruas, bagaço de frutas, salada de folhas, frituras, feijões, grão-de-bico, milho, lentilha, ervilha, sementes e similares.
Em qualquer um dos casos, o paciente pode tomar todos os outros medicamentos que usa.
No dia do exame, levar todos os exames anteriores de ultrassom.',
0, true, 1, 2);

insert into tb_exame_unidade(id_exame_unidade, ds_exame, ds_preparo, ds_observacao, tm_retirada, 
ic_retirada_pos_exame, id_exame, id_unidade) values
(3, 'Trata-se de ultrassom de venoso do membro inferior esquerdo.', 
'Não é necessário preparo para este exame.', 'No dia do exame, levar todos os exames anteriores de ultrassom.',
0, true, 2,1),
(4, 'Trata-se de ultrassom de venoso do membro inferior esquerdo.', 
'Não é necessário preparo para este exame.', 'No dia do exame, levar todos os exames anteriores de ultrassom.',
0, true, 2,2);

insert into tb_exame_unidade(id_exame_unidade, ds_exame, ds_preparo, ds_observacao, tm_retirada, 
ic_retirada_pos_exame, id_exame, id_unidade) values
(5, 'Trata-se de ultrassom da mama.', 'Não passar cremes ou talcos na região das mamas.
Não passar desodorante nas axilas.', 'Levar no dia do exame, todas as ultrassom anteriores.', 3, false, 3, 1 ),
(6, 'Trata-se de exame de ultrassom da pélvica via transvaginal.', 
'Não é necessário preparo para realizar este exame.', 'No dia do exame, levar todos os exames anteriores de ultrassom.',
 3, false, 4, 1),
 (7, 'Trata-se de ultrassom gestacional de primeiro trimestre. Serve para medir o acúmulo de líquido na nuca do feto. É possível analisar o risco de síndrome de Down e outras anomalias cromossômicas.',
'Pode levar no dia do exame:
- 1 Pen Drive vazio de no mínimo 4gb (Gravação é cortesia da clinica) 
- 2 acompanhantes (crianças menores de 5 anos não entra)',
'Realizado entre 12 a 14 semanas.
No dia do exame, levar todos os exames anteriores de ultrassom.

* Por ser um aparelho médico, não podemos garantir a qualidade do vídeo gravado durante o exame. Por isto, a gravação no pen drive é uma cortesia e não há possibilidade de ressarcimento ou repetição do exame, com exceção do US Gestacional 4D. *',
 0, true, 5, 1),
(8, 'Trata-se de ultrassom gestacional de primeiro trimestre. Serve para medir o acúmulo de líquido na nuca do feto. É possível analisar o risco de síndrome de Down e outras anomalias cromossômicas.',
'Pode levar no dia do exame:
- 1 Pen Drive vazio de no mínimo 4gb (Gravação é cortesia da clinica) 
- 2 acompanhantes (crianças menores de 5 anos não entra)',
'Realizado entre 12 a 14 semanas.
No dia do exame, levar todos os exames anteriores de ultrassom.

* Por ser um aparelho médico, não podemos garantir a qualidade do vídeo gravado durante o exame. Por isto, a gravação no pen drive é uma cortesia e não há possibilidade de ressarcimento ou repetição do exame, com exceção do US Gestacional 4D. *',
 0, true, 5, 2);

 insert into tb_exame_unidade(id_exame_unidade, ds_exame, ds_preparo, ds_observacao, tm_retirada, 
ic_retirada_pos_exame, id_exame, id_unidade) values
(9, 'Trata-se de ultrassom gestacional 5D.', 'Não é necessário preparo para este exame.', '* 2 Acompanhantes (crianças menores de 5 anos não entra na sala).
* No dia do exame, levar todos os exames anteriores de ultrassom.
* Acompanha um pen drive com a gravação do exame.', 0, true, 6, 1),
(10, 'Trata-se de ultrassom gestacional 5D.', 'Não é necessário preparo para este exame.', '* 2 Acompanhantes (crianças menores de 5 anos não entra na sala).
* No dia do exame, levar todos os exames anteriores de ultrassom.
* Acompanha um pen drive com a gravação do exame.', 0, true, 6, 2);

insert into tb_exame_unidade(id_exame_unidade, ds_exame, ds_preparo, ds_observacao, tm_retirada, 
ic_retirada_pos_exame, id_exame, id_unidade) values
(11,'Trata-se de ultrassom de ecocardiograma com doppler colorido.', 
'Não é necessário preparo para este exame.', 'No dia do exame, levar todos os exames anteriores de ultrassom.',
0, true, 7, 1),
(12,'O teste ergométrico serve para a avaliação ampla do funcionamento cardiovascular, quando submetido a esforço físico gradualmente crescente, em esteira rolante. São observados os sintomas, os comportamentos da frequência cardíaca, da pressão arterial e do eletrocardiograma antes, durante e após o esforço.',
'Trazer toalha de rosto; Comparecer no local do exame, pelo menos 15 (quinze) minutos antes do horário marcado; Estar calçado de tênis confortável e vestido com roupa leve (moletom, short, camiseta), para realizar o exame; Não utilizar creme hidratante nem óleo corporal na região do tórax; Informar o nome das medicações em uso; Fazer refeição leve, pelo menos 02 (duas) horas antes do exame; Evitar fumar e/ou consumir bebida alcoólica, café e chá, no dia do exame; Evitar atividades físicas (corrida), no dia do exame. Usar sabonete de Glicerina 2 dias antes do Exame.',
'Mulheres - É obrigatório uso do TOP, é proibido o uso de sutiã no dia do exame.', 3, false, 8, 1);

insert into tb_exame_unidade(id_exame_unidade, ds_exame, ds_preparo, ds_observacao, tm_retirada, 
ic_retirada_pos_exame, id_exame, id_unidade) values
(13, 'A mamografia é um exame radiológico para avaliação das mamas, feita com um aparelho de
 raio-X chamado mamógrafo. Pode identificar lesões benignas e cânceres, 
 que geralmente se apresentam como nódulos, ou calcificações.',
'- Não usar talco, desodorantes e cremes nas mamas e axilas no dia do exame;

-Trazer exames anteriores de Mamografia, Ultrassonografia de Mamas, biopsias ou punções.', 
"- Mulheres com atraso menstrual OU incerteza em relação a gravidez: NÃO realizar o exame. Confirmar a ausência de gravidez (esperar a menstruação ou procurar o seu médico);

- Mulheres com gravidez conhecida: NÃO realizar o exame se não tiver autorização do médico solicitante 'por escrito';

- Mulheres com gravidez conhecida e documento do médico reconhecendo a gestação e autorizando a realização da radiografia solicitada: REALIZAR a radiografia com o uso do avental de Chumbo, cedido na unidade;

- Se estiver amamentando, é necessário esvaziar as mamas 1 hora antes do exame, devido à compressão local.",
 5, false, 9, 1);

 insert into tb_exame_unidade(id_exame_unidade, ds_exame, ds_preparo, ds_observacao, tm_retirada, 
ic_retirada_pos_exame, id_exame, id_unidade) values
(14, 'A mamografia é um exame radiológico para avaliação das mamas, feita com um aparelho de raio-X chamado mamógrafo. Pode identificar lesões benignas e cânceres, que geralmente se apresentam como nódulos, ou calcificações.',
'- Não usar talco, desodorantes e cremes nas mamas e axilas no dia do exame;

-Trazer exames anteriores de Mamografia, Ultrassonografia de Mamas, biopsias ou punções.', 
"- Mulheres com atraso menstrual OU incerteza em relação a gravidez: NÃO realizar o exame. Confirmar a ausência de gravidez (esperar a menstruação ou procurar o seu médico);

- Mulheres com gravidez conhecida: NÃO realizar o exame se não tiver autorização do médico solicitante 'por escrito';

- Mulheres com gravidez conhecida e documento do médico reconhecendo a gestação e autorizando a realização da radiografia solicitada: REALIZAR a radiografia com o uso do avental de Chumbo, cedido na unidade;

- Se estiver amamentando, é necessário esvaziar as mamas 1 hora antes do exame, devido à compressão local.", 
5, false, 9, 2);

insert into tb_exame_unidade(id_exame_unidade, ds_exame, ds_preparo, ds_observacao, tm_retirada, 
ic_retirada_pos_exame, id_exame, id_unidade) values
(15, 'A mamografia é um exame radiológico para avaliação das mamas, feita com um aparelho de raio-X chamado mamógrafo. Pode identificar lesões benignas e cânceres, que geralmente se apresentam como nódulos, ou calcificações.',
'- Não usar talco, desodorantes e cremes nas mamas e axilas no dia do exame;

-Trazer exames anteriores de Mamografia, Ultrassonografia de Mamas, biopsias ou punções.',
"- Mulheres com atraso menstrual OU incerteza em relação a gravidez: NÃO realizar o exame. Confirmar a ausência de gravidez (esperar a menstruação ou procurar o seu médico);

- Mulheres com gravidez conhecida: NÃO realizar o exame se não tiver autorização do médico solicitante 'por escrito';

- Mulheres com gravidez conhecida e documento do médico reconhecendo a gestação e autorizando a realização da radiografia solicitada: REALIZAR a radiografia com o uso do avental de Chumbo, cedido na unidade;

- Se estiver amamentando, é necessário esvaziar as mamas 1 hora antes do exame, devido à compressão local.", 5, false, 10,1);

insert into tb_exame_unidade(id_exame_unidade, ds_exame, ds_preparo, ds_observacao, tm_retirada, 
ic_retirada_pos_exame, id_exame, id_unidade) values
(16, 'A punção é um procedimento invasivo que utiliza a ultrassonografia para localizar o nódulo a ser avaliado. Depois de localizado o médico introduz uma agulha fina através da pele e posiciona a ponta da agulha no interior do nódulo. Em seguida é feita a aspiração do conteúdo do nódulo. O objetivo e extrair uma amostra que contenha fragmentos do tecido.',
'Caso paciente faça uso de anticoagulante é necessária a suspensão por 14 dias antes do procedimento e Aspirina suspender 07 antes da realização do exame. A suspensão deverá ser feita somente após a autorização do médico assistente. No dia do exame é indicada alimentação normal. Paciente não deverá vir com roupa de gola alta.',
'Obrigatório: Levar todos exames anteriores no dia da realização do exame.', 10, false, 11, 1),
(17, 'A punção é um procedimento invasivo que utiliza a ultrassonografia para localizar o nódulo a ser avaliado. Depois de localizado o médico introduz uma agulha fina através da pele e posiciona a ponta da agulha no interior do nódulo. Em seguida é feita a aspiração do conteúdo do nódulo. O objetivo e extrair uma amostra que contenha fragmentos do tecido.',
'Caso paciente faça uso de anticoagulante é necessária a suspensão por 14 dias antes do procedimento e Aspirina suspender 07 antes da realização do exame. A suspensão deverá ser feita somente após a autorização do médico assistente. No dia do exame é indicada alimentação normal. Paciente não deverá vir com roupa de gola alta.',
'Obrigatório: Levar todos exames anteriores no dia da realização do exame.', 10, false, 11, 2);

insert into tb_exame_unidade(id_exame_unidade, ds_exame, ds_preparo, ds_observacao, tm_retirada, 
ic_retirada_pos_exame, id_exame, id_unidade) values
(18, 'A Densitometria Óssea é um exame capaz de identificar a osteoporose já em estágios iniciais antes mesmo de aparecer no raio x.',
'Paciente que fez uso de contraste, só poderá realizar o exame 07 (sete) dias após a data de utilização.  
Paciente do sexo feminino em IDADE FÉRTIL e com SUSPEITA DE GRAVIDEZ ou ATRASO MENSTRUAL deve informar o técnico de exame;
GESTANTE não pode realizar esse exame.', 'Paciente que fez uso de contraste, só poderá realizar o exame 07 (sete) dias após a data de utilização.  
Paciente do sexo feminino em IDADE FÉRTIL e com SUSPEITA DE GRAVIDEZ ou ATRASO MENSTRUAL deve informar o técnico de exame;
GESTANTE não pode realizar esse exame.', 5, false, 12,1),
(19, 'A Densitometria Óssea é um exame capaz de identificar a osteoporose já em estágios iniciais antes mesmo de aparecer no raio x.',
'Paciente que fez uso de contraste, só poderá realizar o exame 07 (sete) dias após a data de utilização.  
Paciente do sexo feminino em IDADE FÉRTIL e com SUSPEITA DE GRAVIDEZ ou ATRASO MENSTRUAL deve informar o técnico de exame;
GESTANTE não pode realizar esse exame.', 'Paciente que fez uso de contraste, só poderá realizar o exame 07 (sete) dias após a data de utilização.  
Paciente do sexo feminino em IDADE FÉRTIL e com SUSPEITA DE GRAVIDEZ ou ATRASO MENSTRUAL deve informar o técnico de exame;
GESTANTE não pode realizar esse exame.', 5, false, 12,2);

insert into tb_exame_unidade(id_exame_unidade, ds_exame, ds_preparo, ds_observacao, tm_retirada, 
ic_retirada_pos_exame, id_exame, id_unidade) values
(20, 'Trata-se de radiografias frontais da articulação do quadril bilateral.  Geralmente realizado nas posições neutra e rotação externa na coxa (rã).',
'Não é necessário preparo para este exame.', 'Paciente do sexo feminino em IDADE FÉRTIL e com SUSPEITA DE GRAVIDEZ ou ATRASO MENSTRUAL deve informar o técnico de exame; GESTANTE não pode realizar nenhum exame de RAIO-X.',
5, false, 13,1),
(21, 'Trata-se de radiografias frontais da articulação do quadril bilateral.  Geralmente realizado nas posições neutra e rotação externa na coxa (rã).',
'Não é necessário preparo para este exame.', 'Paciente do sexo feminino em IDADE FÉRTIL e com SUSPEITA DE GRAVIDEZ ou ATRASO MENSTRUAL deve informar o técnico de exame; GESTANTE não pode realizar nenhum exame de RAIO-X.',
5, false, 13,2),
(22, 'A exame de Raio-X  é um método não invasivo de diagnóstico que envolve a exposição de parte do corpo a uma pequena dose de radiação ionizante para produzir imagens do interior do corpo humano.O Raio-X de tórax e o exame radiológico mais comumente realizado.  Fornece imagens do coração, pulmão, vias aéreas, vasos e ossos da coluna vertebral e do tórax.',
'Não é necessário preparo para este exame.', 'Paciente do sexo feminino em IDADE FÉRTIL e com SUSPEITA DE GRAVIDEZ ou ATRASO MENSTRUAL deve informar o técnico de exame; GESTANTE não pode realizar nenhum exame de RAIO-X.',
5, false, 14,1),
(23, 'A exame de Raio-X  é um método não invasivo de diagnóstico que envolve a exposição de parte do corpo a uma pequena dose de radiação ionizante para produzir imagens do interior do corpo humano.O Raio-X de tórax e o exame radiológico mais comumente realizado.  Fornece imagens do coração, pulmão, vias aéreas, vasos e ossos da coluna vertebral e do tórax.',
'Não é necessário preparo para este exame.', 'Paciente do sexo feminino em IDADE FÉRTIL e com SUSPEITA DE GRAVIDEZ ou ATRASO MENSTRUAL deve informar o técnico de exame; GESTANTE não pode realizar nenhum exame de RAIO-X.',
5, false, 14,2);

insert into tb_exame_unidade(id_exame_unidade, ds_exame, ds_preparo, ds_observacao, tm_retirada, 
ic_retirada_pos_exame, id_exame, id_unidade) values
(24, 'Trata-se de exame de ressonância das coxas.', 'Não é necessário preparo para este exame.', 'FAZEMOS EXAMES DE RESSONÂNCIA COM SEDAÇÃO EXCETO RM MAMAS, ABDOME E PELVE.

* Paciente não pode ter marca-passo, stent no vaso arterial, clips de aneurisma ou implantes em olhos ou ouvidos  (com lente intra-ocular para catarata pode realizar o exame; com prótese de ouro na pálpebra, apenas se não for o local a ser avaliado, pois pode comprometer a qualidade da imagem e o técnico suspender o procedimento; com prótese de ouvido realiza ressonância apenas mediante carta do seu médico, no dia do exame, nos certificando que a prótese é de teflon), tatuagens e/ ou maquiagem definitiva recentes (menos de 90 dias), piercings entre outros tipos de materiais metálicos; Na área do exame não usar gel, laquê, creme hidratante, sabonete hidratante (tipo DOVE®), condicionador, maquiagem, entre outros. Aparelhos ortodônticos devem ser retirados para a realização do exame.

* Paciente com gesso na região a ser avaliada deve solicitar ao seu médico a possibilidade de retirar o gesso, apenas no dia do exame, e a sua posterior colocação. Caso contrário, não é possível realizar o procedimento. 

* No dia do exame, levar todos os exames anteriores (RX, RM , TC E US).', 5, false, 15, 1),
(25, 'Trata-se de exame de colângio ressonância.', '24 horas antes do exame:
- Iniciar dieta (não consumir: alimentos como leite e derivados, verduras cruas, bagaço de frutas, salada de folhas, frituras, feijões, grão-de-bico, milho, lentilha, ervilha, sementes e similares);
- Tomar luftal de 8 em 8 horas;

04 horas antes do exame:
- Tomar 1 comprimido de Buscopan (Escopolamina) 4 horas antes do exame (Jejum absoluto de 12 horas em caso de paciente alérgico a Buscopan (Escopolamina) ou em tratamento de Glaucoma); 
- Jejum principalmente de água.', 

'FAZEMOS EXAMES DE RESSONÂNCIA COM SEDAÇÃO EXCETO RESSONÂNCIA MAMAS, ABDOMEN E PELVE.

* Paciente diabético e em uso de CLORIDRATO DE METFORMINA ou qualquer medicação que contenha METFORMINA: necessário suspender a medicação 48 horas antes e 48 horas após o exame e somente sob a supervisão do médico assistente do cliente; Pacientes diabéticos e em uso de qualquer medicação hipoglicemiante (para controle de diabetes) injetável ou via oral: verificar junto ao médico assistente do paciente, a necessidade de suspensão ou ajuste da medicação para o período em jejum.

* Poderá tomar todos os outros medicamentos que usa, com pouca água (1/2 copo de água).

* Caso o paciente apresente alergia a qualquer tipo de medicamento, já deve ser informar no agendamento.

* Em alguns casos, será necessária a introdução de contraste via retal e/ ou vaginal (qualquer restrição deve ser informada ao técnico).

* Paciente portador de insuficiência renal deve trazer exames de sangue recentes; se realizar diálise, não pode fazer uso do contraste.

* Paciente não pode ter marca-passo, stent no vaso arterial, clips de aneurisma ou implantes em olhos ou ouvidos  (com lente intra-ocular para catarata pode realizar o exame; com prótese de ouro na pálpebra, apenas se não for o local a ser avaliado, pois pode comprometer a qualidade da imagem e o técnico suspender o procedimento; com prótese de ouvido realiza ressonância apenas mediante carta do seu médico, no dia do exame, nos certificando que a prótese é de teflon), tatuagens e/ ou maquiagem definitiva recentes (menos de 90 dias), piercings entre outros tipos de materiais metálicos; Na área do exame não usar gel, laquê, creme hidratante, sabonete hidratante (tipo DOVE®), condicionador, maquiagem, entre outros. Aparelhos ortodônticos devem ser retirados para a realização do exame.

* Pélvica: deve ser realizada preferencialmente fora do período menstrual, a menos que haja solicitação médica para avaliar a paciente nessa fase do ciclo, ou seja, um caso de urgência; Mulheres com sangramento não menstrual pode fazer este exame se o médico solicitante assim desejar; Necessário apresentar resultados anteriores, se houver.',
5, false, 16, 1),
(26, 'Trata-se de exame de tomografia computadorizada do crânio.', '- Jejum de 4 horas.', 
'* Paciente diabético e em uso de CLORIDRATO DE METFORMINA ou qualquer medicação que contenha METFORMINA: necessário suspender a medicação 48 horas antes e 48 horas após o exame e somente sob a supervisão do médico assistente do cliente; Pacientes diabéticos e em uso de qualquer medicação hipoglicemiante (para controle de diabetes) injetável ou via oral: verificar junto ao médico assistente do paciente, a necessidade de suspensão ou ajuste da medicação para o período em jejum.

* Poderá tomar todos os outros medicamentos que usa, com pouca água (1/2 copo de água).

* Caso o paciente apresente alergia a qualquer tipo de medicamento, já deve ser informado no agendamento.

* Em alguns casos, será necessária a introdução de contraste via retal e/ ou vaginal (qualquer restrição deve ser informada ao técnico).

* Paciente portador de insuficiência renal deve trazer exames de sangue recentes; se realizar diálise, não pode fazer uso do contraste.',
5, false, 17, 1),
(27, 'Trata-se de exame de tomografia computadorizada do pescoço.', '04 horas antes do exame:
- Jejum absoluto.', '* Chegar 30 minutos antes do horário marcado, para efetuar cadastro e preparo;

* Paciente diabético e em uso de CLORIDRATO DE METFORMINA ou qualquer medicação que contenha METFORMINA em sua fórmula: necessário suspender a medicação 48 horas antes e 48 horas após o exame e somente sob a supervisão do médico assistente do cliente; Poderá tomar todos os outros medicamentos que usa, com pouca água (1/2 copo).

* Caso o paciente apresente alergia a qualquer tipo de medicamento, já deve ser informado no agendamento e registrado em sistema, para que o técnico efetue as devidas providências, antes de iniciar o procedimento.

* Paciente portador de insuficiência renal deve trazer exames de sangue recentes; se realizar diálise, não pode fazer uso do contraste. 

* Paciente lactante não deve amamentar durante 24 horas, após o exame.', 5, false, 18, 1);