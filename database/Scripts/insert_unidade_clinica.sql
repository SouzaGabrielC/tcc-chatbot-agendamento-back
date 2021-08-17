insert into tb_clinica(id_clinica, nm_clinica) values
(1, 'Vila Belmiro Medicina Diagnóstica');
insert into tb_unidade(id_unidade, nm_unidade, nm_rua, nm_bairro, cd_cep, cd_numero, ds_complemento, nm_cidade, nm_estado, id_clinica, ic_matriz) values
(1, 'Canal 2', 'Av. Bernadino de Campos', 'Vila Belmiro', '11065001', '16', null, 'Santos', 'São Paulo', 1, true),
(2, 'Conselheiro', 'Av. Conselheiro Nébias', 'Boqueirão', '11015001', '730', 'Conj11', 'Santos', 'São Paulo', 1, false);