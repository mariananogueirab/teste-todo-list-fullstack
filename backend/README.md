# Back-end Developer Challenge - Ebytr

# To Do List

## Funcionalidades:

---

Gerar a lista de tarefas;
Esta lista pode ser ordenável por ordem alfabética, data de criação ou por status;
Inserir uma nova tarefa na lista;
Remover uma tarefa da lista;
Atualizar uma tarefa da lista;
A tarefa deve possuir um status editável: pendente, em andamento ou pronto;

---

## Como instalar

* Abra um terminal no seu computador e utilize os comandos a baixo na ordem que são apresentados:

  * `cd backend`
  * `npm install`
  * `npm start`

  A aplicação está configurada para rodar na porta local 3000.

---

## Modo de utilização

A API consta com 5 rotas: 
* `/user`
  * `/` [`POST`]  Cria um novo usuário
* `/login`
  * `/` [`POST`]  Faz login
* `/tasks`
  * `/` [`POST`]  Cria uma nova tarefa
  * `/` [`GET`] Exibe todas as tarefas
  * `/alphabetical` [`GET`] Exibe as tarefas em ordem alfabética
  * `/date` [`GET`] Exibe as tarefas em ordem de data de criação, sendo a mais recente no topo
  * `/status` [`GET`]  Exibe as tarefas em ordem de status
  * `/:id` [`PUT`] Edita uma tarefa
  * `/status/:id` [`PUT`] Edita o status de uma tarefa para completa
  * `/:id` [`DELETE`] Deleta uma tarefa
* `/commitments`
  * `/` [`POST`]  Cria um evento
  * `/` [`GET`] Exibe todos os eventos
  * `/date` [`GET`] Exibe as tarefas em ordem de data do evento
  * `/:id` [`PUT`] Edita um evento
  * `/:id` [`DELETE`] Deleta um evento
* `/every-day`
  * `/` [`POST`]  Cria uma tarefa diária
  * `/` [`GET`] Exibe todas as tarefas diárias
  * `/alphabetical` [`GET`] Exibe as tarefas em ordem alfabética
  * `/:id` [`PUT`] Edita uma tarefa
   * `/checked/:id` [`PUT`] Marca a tarefa como concluída
  * `/:id` [`DELETE`] Deleta uma tarefa

---

## Modo de desenvolvimento

---

### Tecnologias

---

Foi utilizado para o desenvolvimento desse projeto o NodeJS com Express para a criação básica da api, Mocha/Chai para a criação dos testes de integração.

---

### Banco de dados

O banco escolhido para a aplicação foi `Mongodb`, pela agilidade no desenvolvimento, facilidade de adição de novas informações sem necessitar re-estruturar toda a estrutura e pela robustes para lidar com grande volume de requisições.

---

#### Collections:

* Users

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

Estrutura da tabela:

|   username   |  email   |  password   |
| :----------: | :------: | :---------: |
|   `string`   | `string` |   `string`  |

---

* Tasks

O banco terá uma coleção chamada `Tasks`.
As requisições serão feitas através da rota `/tasks`.

- A requisição para a criação de uma tarefa seguirá o formato:

```json
{
    "task": "Entregar projeto Blogs Api",
    "limitDate": "19/02/2022",
    "status": ""
},
```
- A requisição para a atualização de uma tarefa, através da rota `/tasks/:id`, seguirá o formato:

```json
{
    "task": "Entregar projeto Blogs Api",
    "limitDate": "19/02/2022",
},
```

A chave status pode ser alterada para `concluded`quando a tarefa é concluida, ou `in-progress`quando a tarefa está sendo realizada, através da rota `/status/:id`.

Estrutura da tabela:

|   task   |  limitDate   |  createdDate   |  completed  |   user    |  status   |
| :------: | :----------: | :------------: | :---------: | :-------: | :-------: |
| `string` |   `string`   |    `object`    |   `string`  |  `string` |  `string` |

---

* Commitments

O banco terá uma coleção chamada `Commitments`.
As requisições serão feitas através da rota `/commitments`.

- A requisição para a criação de um evento seguirá o formato:

```json
{
    "commitment": "Entrevista empresa X",
    "date": "19/02/2022",
},
```
- A requisição para a atualização de uma tarefa, através da rota `/commitments/:id`, seguirá o formato:

```json
{
    "commitment": "Entrevista empresa X",
    "date": "19/02/2022",
},
```

Estrutura da tabela:

| commitment |  date   |   user    |
| :--------: | :-----: | :-------: |
|  `string`  | `object`|  `string` |

---

* Every Day List

O banco terá uma coleção chamada `EveryDayList`.
As requisições serão feitas através da rota `/every-day`.

- A requisição para a criação de um evento seguirá o formato:

```json
{
    "task": "Academia",
    "checked": "",
},
```
- A requisição para a atualização de uma tarefa, através da rota `/every-day/:id`, seguirá o formato:

```json
{
    "task": "Entregar projeto Blogs Api",
    "checked": false,
},
```
A chave checked pode ser marcada como true quando o checkbox for selecionado.

Estrutura da tabela:

|    task    |  checked   |   user    |
| :--------: | :--------: | :-------: |
|  `string`  |  `boolean` |  `string` |


---

## Para testar o projeto

- Para testar os arquivos separadamente, digite no seu terminal:

`NAME=<nome_do_arquivo> npm test`

- Para testar todos os arquivos juntos, digite no seu terminal:

`npm test`

---