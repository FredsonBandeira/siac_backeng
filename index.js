const express = require('express');

const app = express();
const Pool = require('pg').Pool;
const port = process.env.PORT || 3000
const  pool = new Pool({
    user: 'wvfimfdvmnxedr',
    host: 'ec2-34-242-8-97.eu-west-1.compute.amazonaws.com',
    database:'dedge0jpqoaqpk',
    password:'c7c40253b1069eeadbf4105b94cf023da1dc5f32f6412dcc80243f69c3553f34',
    dialect: 'postgres',
    port: 5432

});

const bodyParser = require('body-parser');
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false }));

pool.connect((err, client, release)=>{
    
    if(err){
        return console.error('Error acquiring  client', err.stack)
    }
    client.query('SELECT NOW()',(err, result)=>{
        release()
        if(err){
            return console.error('Error executing query ', err.stack)
        }
        console.log("Connect to Database ")
    })
   
})
app.get('/alunos', (req, res, next)=>{
    pool.query('Select * from aluno')
    .then(dados => {res.send(dados.rows);
    })
})

app.get('/funcionarios', (req, res, next)=>{
    pool.query('Select * from funcionario')
    .then(dados => {res.send(dados.rows);
    })
})

app.get('/alunosmesespago', (req, res, next)=>{
    pool.query(`SELECT aluno.id_aluno, aluno.first_name_alun,  
    mespropina.id_meses, mespropina.janeiro, mespropina.fevereiro,
    mespropina.marco,mespropina.abril,mespropina.maio,
    mespropina.junho,mespropina.julho,mespropina.agosto,
    mespropina.setembro,mespropina.outubro,mespropina.novembro,
    mespropina.dezembro
    FROM aluno
    INNER JOIN mespropina
    ON mespropina.id_meses = aluno.id_aluno`)
    .then(dados => {res.send(dados.rows);
    })
})
const server = app.listen(port, function(){
    let host = server.address().address
    let port = server.address().port
})