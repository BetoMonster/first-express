
const fs = require('fs')
//Router Express
const express = require ('express')
const router = express.Router()

function getMentorsFile (){
    const content = fs.readFileSync('koders.json','utf8') //<-la ruta es relativa al script principal index.js
    return JSON.parse(content)
}


router.get('/', async (request, response) => {
    const genderFilter = request.query.gender
    const nameFilter = request.query.name
    const countFilter = parseInt(request.query.count) || 0
    const jsonParsed = getMentorsFile()
    let mentorsData =null
    if(genderFilter){
        const mentorsFilterByGender=jsonParsed.mentors.filter(mentor=>mentor.gender===genderFilter)
        mentorsData =mentorsFilterByGender
    }

    if(nameFilter){
        const dataToFilter =mentorsData || jsonParsed.mentors
        mentorData = dataToFilter.filter(mentor=>mentor.name===nameFilter)
    }
   
    if(countFilter){
        const dataToFilter = mentorsData || jsonParsed.mentors
        mentorsData = dataToFilter.splice(0, countFilter)
    }
    jsonParsed.mentors = mentorsData || jsonParsed.mentors
    
    response.json(jsonParsed.mentors)  
})

router.post('/', (request, response) => {
    const id = Date.now()
    const name = request.body.name
    const module = request.body.module
    const newMentor = { id, name, module }
    const jsonParsed = getMentorsFile()
    jsonParsed.mentors.push(newMentor)
    fs.writeFileSync('koders.json',JSON.stringify(jsonParsed, null, 2) , 'utf8')
    response.json({success:'OK'})
})

router.patch('/:id', (request, response)=>{
    console.log(request.params)
    const id = parseInt(request.params.id)
    const name = request.body.name
    
    const json = getMentorsFile()
    const newMentors = json.mentors.reduce((mentors,mentorActual) => { 
        if(id===mentorActual.id){
            mentorActual.name =name
        }
        return [...mentors,
        mentorActual]
    },[])

    json.mentors = newMentors
    fs.writeFileSync('koders.json', JSON.stringify(json,null,2),'utf8')

    response.json({success: true})
})

router.get('/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    
    const json = getMentorsFile()
    const findmentor = json.mentors.find((mentorActual) => id===mentorActual.id )
    if(!findmentor){
        response.status(404)
        response.json({
            success: false, 
            message: 'mentor not found :('
        })
        return
    }
    console.log(findmentor)
    response.json({
        success: true, 
        message: 'mentor found  :)',
        data:{
            mentor : findmentor
        }
    })  
})

router.delete('/:id', async (request, response) => {
    const id = parseInt(request.params.id)
    
    const json = getMentorsFile()
    
    const newMentors = json.mentors.filter((mentorActual) => id!==mentorActual.id)

    json.mentors = newMentorss
    fs.writeFileSync('koders.json', JSON.stringify(json,null,2),'utf8')

    response.json({
        delete: true
    })
})
//export Router
module.exports = router