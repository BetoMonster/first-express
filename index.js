
//const fs = require('fs')
const express = require('express') //<-- inportar express
const kodersRouter= require('./routers/koders') //<- importar routersKoder no es necesario poner la extension
const mentorsRouter= require('./routers/mentores')
const { json } = require('express')
const server = express()  //app <- crear y asiganar a una contante un servidor de express
//middelware
server.use(express.json()) //<-para que pueda recibir  json en el cuerpo del request
server.use('/koders',kodersRouter) //<- para montar el router en la ruta /koders
server.use('/mentors',mentorsRouter)
const port = 8080
/*
function getKodersFile (){
    const content = fs.readFileSync('./koders.json','utf8')
    return JSON.parse(content)
}*/

server.get('/', (request, response) => {
    //response.send('Hello World!')
    response.json({
        success: true,
        message: '11g APIv1'
    })
    response.end()
  })

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
/*
server.put('/koders', (request, response) => {
    response.write('Aqui puedes sustituir un koder')
    response.end()
})
*/



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
//fruits.slice(1,3);
/*
server.get('/koders', async (request, response) => {
    const genderFilter = request.query.gender
    const nameFilter = request.query.name
    const countFilter = parseInt(request.query.count) || 0
    const jsonParsed = getKodersFile()
    let kodersData =null
    if(genderFilter){
        const kodersFilterByGender=jsonParsed.koders.filter(koder=>koder.gender===genderFilter)
        kodersData =kodersFilterByGender
    }

    if(nameFilter){
        const dataToFilter =kodersData || jsonParsed.koders
        koderData = dataToFilter.filter(koder=>koder.name===nameFilter)
    }
   
    if(countFilter){
        const dataToFilter = kodersData || jsonParsed.koders
        kodersData = dataToFilter.splice(0, countFilter)
    }
    jsonParsed.koders = kodersData || jsonParsed.koders
    
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
*/
//Practica 
/*
Crear un endPoint para borrar
DELETE /koders/:id
GET /koders/:id
*/
/*
server.get('/koders/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    const content = fs.readFileSync('./koders.json','utf8')
    const json = JSON.parse(content)
    const findkoder = json.koders.find((koderActual) => id===koderActual.id )
    if(!findkoder){
        response.status(404)
        response.json({
            success: false, 
            message: 'koder not found :('
        })
        return
    }
    console.log(findkoder)
    //const jsonParsed = JSON.parse(findkoder)
    response.json({
        success: true, 
        message: 'koder found  :)',
        data:{
            koder : findkoder
        }
    })  
})

server.delete('/koders/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    const content = fs.readFileSync('./koders.json','utf8')
    const json = JSON.parse(content)
    
    const newKoders = json.koders.filter((koderActual) => id!==koderActual.id)

    json.koders = newKoders
    fs.writeFileSync('koders.json', JSON.stringify(json,null,2),'utf8')

    response.json({
        delete: true
    })
})
*/

server.listen(port, () => {
    console.log(`Servidor escuchando en puerto :${port}`)
  })