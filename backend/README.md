<h1 align="center">Todos + SSL</h1>

[Source of the code](https://github.com/Jakkins/NodeJS_for_newbie/tree/master/NodeJS3%20-%20Proj/RESTfulTodoSSLAuth)

## Check Mongo's dbs

```bash
$ show dbs
    # Example results
    # admin   0.000GB
    # config  0.000GB
    # db      0.000GB
    # local   0.000GB

$ use db
$ show collections
    # Example results
    # todos
    # users

$ db.todos.find()
```

## Other

```bash
db.todos.deleteMany({"usernameCreator":"Jakkins"})
```