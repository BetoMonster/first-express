const fs = require('fs')
//Router Express
const express = require ('express')
const router = express.Router()

function getKodersFile (){
    const content = fs.readFileSync('koders.json','utf8') //<-la ruta es relativa al script principal index.js
    return JSON.parse(content)
}

router.get('/', async (request, response) => {
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

router.post('/', (request, response) => {
    const name = request.body.name
    const gender = request.body.gender
    const newKoder = { name, gender }
    const jsonParsed = getKodersFile()
    jsonParsed.koders.push(newKoder)
    fs.writeFileSync('./koders.json',JSON.stringify(json, null, 2) , 'utf8')
    response.json({success:'OK'})
})

router.patch('/:id', (request, response)=>{
    console.log(request.params)
    const id = parseInt(request.params.id)
    const name = request.body.name
    
    const json = getKodersFile()
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

router.get('/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    
    const json = getKodersFile()
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
    response.json({
        success: true, 
        message: 'koder found  :)',
        data:{
            koder : findkoder
        }
    })  
})

router.delete('/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    
    const json = getKodersFile()
    
    const newKoders = json.koders.filter((koderActual) => id!==koderActual.id)

    json.koders = newKoders
    fs.writeFileSync('koders.json', JSON.stringify(json,null,2),'utf8')

    response.json({
        delete: true
    })
})
//export Router
module.exports = router