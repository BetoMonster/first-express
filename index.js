
const fs = require('fs')
const express = require('express') //<-- inportar express
const { json } = require('express')
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
/*
server.post('/koders', (request, response) => {
    const cuerpo = request.body
    console.log('body:', cuerpo)
    response.json({message:'OK'})
})*/

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
/*
server.get('/koders', (request, response) => {
    
    fs.promises.readFile('./koders.json',{encoding:'utf-8'})
    .then((data)=>{
        console.log('data: ',data)
        response.json(JSON.parse(data))
    })
    .catch((error)=>console.error('error: ',error))
    
   
})
*/
/*server.get('/koders', (request, response) => {
    
    const json = fs.readFileSync('./koders.json','utf8') //<--
    console.log('json: ',json)
    const jsonParsed = JSON.parse(json)
    response.json(jsonParse.koders)  
})*/

server.get('/koders', async (request, response) => {
    
    const json = await fs.promises.readFile('./koders.json','utf8') //<--
    console.log('json: ',json)
    const jsonParsed = JSON.parse(json)
    response.json(jsonParsed.koders)  
})

server.post('/koders', (request, response) => {
    const name = request.body.name
    const gender = request.body.gender
    const newKoder = { name, gender }
    const content = fs.readFileSync('./koders.json','utf8')
    const json = JSON.parse(content)
    json.koders.push(newKoder)
    fs.writeFileSync('./koders.json',JSON.stringify(json, null, 2) , 'utf8')
    response.json({success:'OK'})
})

//koders/:id
server.patch('/koders/:id', (request, response)=>{
    console.log(request.params)
    const id = parseInt(request.params.id)
    const name = request.body.name
    const content = fs.readFileSync('./koders.json','utf8')
    const json = JSON.parse(content)
    const newKoders = json.koders.reduce((koders,koderActual) => { 
        if(id===koderActual.id){
            koderActual.name =name
        }
        return [...koders,
        koderActual]
    },[])

    json.koders = newKoders
    fs.writeFileSync('koders.json', JSON.stringify(json,null,2),'utf8')

    response.json({success: true})
})

//Practica 
/*
Crear un endPoint para borrar
DELETE /koders/:id
GET /koders/:id
*/

server.get('/koders/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    const content = fs.readFileSync('./koders.json','utf8')
    const json = JSON.parse(content)
    const findkoder = json.koders.filter((koderActual) => id===koderActual.id )
    console.log(findkoder)
    //const jsonParsed = JSON.parse(findkoder)
    response.json(findkoder)  
})

server.delete('/koders/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    const content = fs.readFileSync('./koders.json','utf8')
    const json = JSON.parse(content)
    const newKoders = json.koders.reduce((koders,koderActual) => { 
        
        if(id!==koderActual.id){
            
            koders = [...koders,koderActual]
        }
        return koders 
        
    },[])

    json.koders = newKoders
    fs.writeFileSync('koders.json', JSON.stringify(json,null,2),'utf8')

    response.json({delete: true})
})