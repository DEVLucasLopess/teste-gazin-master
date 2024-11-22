## Descrição
Olá, pessoal!
Este projeto implementa um CRUD (Create, Read, Update, Delete) para gerenciar desenvolvedores e seus respectivos níveis. Com ele, é possível:
- Vincular níveis aos desenvolvedores.
- Realizar operações de criação, leitura, atualização e exclusão tanto para desenvolvedores quanto para níveis.

Funcionalidades
Criar: Adicionar novos desenvolvedores e níveis.
Ler: Consultar informações sobre desenvolvedores e níveis.
Atualizar: Modificar os dados de desenvolvedores e níveis, incluindo a vinculação entre eles.
Excluir: Remover desenvolvedores ou níveis do sistema.

## Tecnologias frontend
- Typescript;
- vite | React;
- Meterial-ui;
- useForm
- yup

## Tecnologias backend
- Node.js
- express
- sqlite

## COMO RODAR O PROJETO COM O DOCKER:

1 - Para gerar as imagens docker do backend e frontend na pasta raiz do projeto, execute os seguintes comandos:
- docker build -t back-end-gazin ./backend-gazin-js-master/
- docker build -t front-end-gazin ./react-standard-gazin-master/

2 - na pasta raiz principal onde fica os dois projetos:
- docker compose up -d

Ele estará executando na porta: http://localhost:3000/


## COMO RODAR O PROJETO LOCAL:

1 - Entre na pasta do backend e rode:
npm install
npm install sqlite3 (Banco de dados)
npm install sqlite (Banco de dados)

2 - Entre na pasta do frontend e rode:
npm install

2 - para subir as aplicações:
no bakcend: npm run prod
no frontend: npm run dev

OBS: caso dê o error (sh: 1: nodemon: Permission denied) quando você tentar rodar o backend localmente executa o comando:
npm install -g nodemon

rodar os comandos com sudo, caso nescessário!