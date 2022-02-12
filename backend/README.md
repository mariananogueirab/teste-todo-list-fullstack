# Back-end Developer Challenge - Trybe
# To Do List

## Funcionalidades:

## Collections:

### Users

O banco terá uma coleção chamada `Users`.
As requisições serão feitas através da rota `/user`.

A requisição para a criação de usuário seguirá o formato:

```json
{
  "username": "mariananogueira_",
  "email": "mariananbp@gmail.com",
  "password": "mari123"
}
```

A requisição para login seguirá o formato:

```json
{
  "email": "mariananbp@gmail.com",
  "password": "mari123"
}
```

### Tasks

O banco terá uma coleção chamada `Tasks`.
As requisições serão feitas através da rota `/tasks`.

A requisição para a criação de uma tarefa seguirá o formato:

```json
{
  "username": "mariananogueira_",
  "email": "mariananbp@gmail.com",
  "password": "mari123"
}
```

- A requisição para o retorno de todas as tarefas de um usuário retornará um array de objetos, através da rota `/tasks`;

- A requisição para o retorno de todas as tarefas de um usuário em ordem alfabética retornará um array de objetos, através da rota `/tasks/alphabetical`;

- A requisição para o retorno de todas as tarefas de um usuário em ordem de data limite para a realização de uma tarefa, retornará um array de objetos, através da rota `/tasks/limit-date`;