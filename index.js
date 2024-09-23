// Imports

require('dotenv').config()
require('jsonwebtoken');

// Credenciais
const dbUser = process.env.DB_USER
const dbPass = process.env.DB_PASS
const port = process.env.PORT;

// Import mongoose.
const mongoose = require('mongoose')

mongoose
    .connect(
        `mongodb+srv://${dbUser}:${dbPass}@marketdatabase.gtds4qm.mongodb.net/`
    ).then(() => {
        app.listen(port)
        console.log('Conectou com o banco!')
    }).catch((err) => console.log(err))


// Import express
const express = require('express')

// Atribuindo express a nossa variável app.
const app = express()


// Passando o roteador do usuario.
const productRouter = require('./src/routers/productRouter');
const clienteRouter = require('./src/routers/clienteRouter');
const funcionarioRouter = require('./src/routers/funcionarioRouter');
const compraRouter = require('./src/routers/compraRouter')
const userRouter = require('./src/routers/userRouter')

// middleware de autenticacao
const middlewareAuth = require('./src/middlewares/middlewareAuth');



// Definindo o método de comunicação do expressen como JSON.
app.use(express.json());

//Routers
app.use(middlewareAuth);
app.use(userRouter);
app.use(clienteRouter);
app.use(productRouter);
app.use(funcionarioRouter);
app.use(compraRouter);






