CREATE DATABASE achados_perdidos;

USE achados_perdidos;

CREATE TABLE objetos (
  id INT PRIMARY KEY AUTO_INCREMENT,
  nome VARCHAR(45) NOT NULL,
  descricao VARCHAR(255) NOT NULL,
  categoria VARCHAR(45) NOT NULL,
  local VARCHAR(45) NOT NULL,
  data_ocorrencia DATE NOT NULL,
  status VARCHAR(45) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
