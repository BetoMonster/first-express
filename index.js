
const fs = require('fs')
const express = require('express') //<-- inportar express
const server = express()  //app <- crear y asiganar a una contante un servidor de express
//middelware
server.use(express.json()) //<-para que pueda recibir  json en el cuerpo del request

const port = 8080

server.get('/hola', (request, response) => {
  //response.send('Hello World!')
  response.write('GET /hola')
  response.end()
})

server.post('/hola', (request, response) => {
  response.write('POST /hola')
  response.end()
})

// GET /koders -> Aqui estan todos los koders
// POST /koders -> Aqui pudes crear koders
// PUT /koders -> Aui puedes sustituir un koder
/*
server.get('/koders', (request, response) => {
    
    response.status(401) //default 200
    response.json({message:'Aqui estan todos los koders'}) //.json ya incluye el .end
})
 */ 
server.post('/koders', (request, response) => {
    const cuerpo = request.body
    console.log('body:', cuerpo)
    response.json({message:'OK'})
})

server.put('/koders', (request, response) => {
    response.write('Aqui puedes sustituir un koder')
    response.end()
})


server.listen(port, () => {
  console.log(`Servidor escuchando en puerto :${port}`)
})

// Practica fs + express
/*
  // GET /Koders -> reegresa un json con una lista de koders
  La lista de koders viene de un archivo
*/

server.get('/koders', (request, response) => {
    let result= {}
    fs.promises.readFile('./koders.json',{encoding:'utf-8'})
    .then((data)=>{
        console.log('data: ',data)
        response.json(JSON.parse(data))
    })
    .catch((error)=>console.error('error: ',error))
    
   
})