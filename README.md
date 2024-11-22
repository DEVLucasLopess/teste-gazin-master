## COMO RODAR O PROJETO COM O DOCKER:

1 - gerar a imagem docker do backend e frontend:
- na pasta raiz no backend rodar: docker build -t back-end-gazin .
- na pasta raiz no frontend rodar: docker build -t front-end-gazin .

2 - para subir os containers
na pasta raiz principal onde fica os dois projetos: docker compose up -d


## COMO RODAR O PROJETO LOCAL:

1 - Entre na pasta e rode:
npm install

2 - para subir as aplicações:
no bakcend: npm run prod
no frontend: npm run dev

OBS: caso dê o error (sh: 1: nodemon: Permission denied) quando você tentar rodar o backend localmente executa o comando:
npm install -g nodemon

rodar os comandos com sudo, caso nescessário!