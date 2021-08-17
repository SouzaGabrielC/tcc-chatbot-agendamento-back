--Select que retorna nome das agendas e o nome do medico da agenda
select ag.nm_agenda as Agenda,
 med.nm_medico as Medico
from tb_agenda as ag
inner join tb_medico as med
on med.id_medico = ag.id_medico;

--Select que retorna nome da Agenda e o nome do medico da Agenda e a unidade
select ag.nm_agenda as Agenda,
 med.nm_medico as Medico,
 uni.nm_unidade as Unidade
from tb_agenda as ag
inner join tb_medico as med
on med.id_medico = ag.id_medico
inner join tb_unidade as uni
on uni.id_unidade = ag.id_unidade;

--retorna tudo
select agenda.nm_agenda Agenda, 
convenio.nm_convenio Convenio,
exame.nm_exame  Exame, 
categoria.nm_categoria  Categoria,
medico.nm_medico  Medico
from tb_convenio_agenda_exame as  cae
inner join tb_agenda agenda
on cae.id_agenda = agenda.id_agenda
inner join tb_convenio convenio
on cae.id_convenio = convenio.id_convenio
inner join tb_exame exame
on cae.id_exame = exame.id_exame
inner join tb_categoria categoria
on exame.id_categoria = categoria.id_categoria
inner join tb_medico medico
on medico.id_medico = agenda.id_medico;