# Back-end Developer Challenge - Trybe
# To Do List

## Funcionalidades:

Gerar a lista de tarefas;
Esta lista pode ser ordenável por ordem alfabética, data de criação ou por status;
Inserir uma nova tarefa na lista;
Remover uma tarefa da lista;
Atualizar uma tarefa da lista;
A tarefa deve possuir um status editável: pendente, em andamento ou pronto;

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

- A requisição para a criação de uma tarefa seguirá o formato:

```json
{
    "task": "Entregar projeto Blogs Api",
    "limitDate": "19/02/2022",
},
```
- A requisição para a atualização de uma tarefa, através da rota `/tasks/:id`, seguirá o formato:

```json
{
    "task": "Entregar projeto Blogs Api",
    "limitDate": "19/02/2022",
},
```

- A requisição para o retorno de todas as tarefas de um usuário retornará um array de objetos, através da rota `/tasks`;

- A requisição para o retorno de todas as tarefas de um usuário em ordem alfabética retornará um array de objetos, através da rota `/tasks/alphabetical`;

- A requisição para o retorno de todas as tarefas de um usuário ordenadas pela data de criação de uma tarefa, sendo a mais recente no topo, retornará um array de objetos, através da rota `/tasks/date`;

- A requisição para o retorno de todas as tarefas de um usuário ordenadas pelo status de uma tarefa, retornará um array de objetos, através da rota `/tasks/status`. Onde as não realizadas ficarão em cima.

- A requisição para mudar o status de uma tarefa para completa, será através da rota `/tasks/completed/:id`

- A requisição para deletar uma tarefa, será através da rota `/tasks/:id`

## Para testar o projeto

Para testar os arquivos separadamente:

`NAME=<nome_do_arquivo> npm test`

Para testar todos os arquivos juntos:

`npm test`