# API REST com Node.js

Este projeto é uma API RESTful desenvolvida com Node.js. A aplicação permite a criação, leitura, atualização e exclusão de dados (CRUD) através de endpoints HTTP.

## Tecnologias Utilizadas

- **Knex**: SQL query builder para Node.js, utilizado para interagir com bancos de dados relacionais.
- **Node.js**: Ambiente de execução para JavaScript no lado do servidor.
- **Fastify**: Framework web para Node.js, utilizado para gerenciar rotas e middlewares.
- **MongoDB**: Banco de dados NoSQL utilizado para armazenar os dados da aplicação.
- **Mongoose**: Biblioteca de modelagem de dados para MongoDB e Node.js.
- **Nodemon**: Ferramenta que reinicia automaticamente o servidor quando mudanças são detectadas nos arquivos do projeto.
- **Body-parser**: Middleware para analisar o corpo das requisições HTTP.
- **Zod**: Biblioteca de validação de esquemas para TypeScript e JavaScript.
- **Vitest**: Framework de testes unitários para JavaScript e TypeScript.
- **Krypto**: Biblioteca para criptografia e segurança de dados.

## Instalação

1. Clone o repositório:
    ```bash
    git clone https://github.com/seu-usuario/seu-repositorio.git
    ```
2. Navegue até o diretório do projeto:

3. Instale as dependências:
    ```bash
    npm install
    ```

## Uso

1. Inicie o servidor:
    ```bash
    npm start
    ```
2. Acesse a API através do endereço:
    ```
    http://localhost:3000
    ```

## Endpoints

- **GET /items**: Retorna todos os itens.
- **GET /items/:id**: Retorna um item específico pelo ID.
- **POST /items**: Cria um novo item.
- **PUT /items/:id**: Atualiza um item existente pelo ID.
- **DELETE /items/:id**: Remove um item pelo ID.

## Contribuição

1. Faça um fork do projeto.
2. Crie uma branch para sua feature:
    ```bash
    git checkout -b minha-feature
    ```
3. Commit suas mudanças:
    ```bash
    git commit -m 'Adiciona minha feature'
    ```
4. Envie para o repositório remoto:
    ```bash
    git push origin minha-feature
    ```
5. Abra um Pull Request.

# RF - Regras Funcionais

- [x] O usuario deve poder criar uma nova transação
- [x] O usuario deve poder obter um resumo da sua conta 
- [x] O usuario deve poder listar todas transações que ja ocorreram
- [x] O usuario deve poder visualizar uma transação unica

# RN - Regras de negocios

- [x] A transação pode ser do tipo credito que somara ao valor total, ou debito (subtrair)
- [x] Deve ser possivel identificarmos o usuario entre as requisições
- [x] O usuario so pode visualizar transacoes o qual ele criou


## Licença

Este projeto está licenciado sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.