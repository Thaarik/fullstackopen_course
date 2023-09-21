require('dotenv').config()
const express = require("express");
const morgan = require('morgan');
const app = express();
const cors = require('cors')
const Phonebook=require('./models/phonebook')
app.use(cors())
app.use(express.static('build'))
morgan.token('object', function getId (req) {
    return JSON.stringify(req.body)
  })
app.use(express.json());

app.use(morgan(':method :url :status :object'))

const errorHandler = (error,request,response,next)=>{
  console.log(error.message);
  if(error.name==='CastError'){
    return res.status(400).send({error:'malformed id'})
  }else if(error.name==='ValidationError'){
    return response.status(400).json({error:error.message})
  }else{
    return response.status(400).json({error:error.message})
  }
  next(error)
}

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  Phonebook.find({}).then(contacts=>{
    console.log(contacts)
    response.json(contacts)
  })
});

app.get("/info", (request, response) => {
  Phonebook.find({}).then(contacts=>{
    console.log(contacts)
    response.json({'Number of contacts in the phonebook':contacts.length})
  })
});

app.get("/api/persons/:id", (request, response) => {
  const personId = request.params.id;
  Phonebook.findById(personId).then(person=>response.json(person)).catch(error=>console.log(error))
});

app.post("/api/persons", (request, response,next) => {
  // const personId = Math.floor(Math.random() * 100);
  // const phonebookNames = personData.map((data) => data.name);
  // if (
  //   request.body.name &&
  //   request.body.number &&
  //   !phonebookNames.includes(request.body.name)
  // ) {
  //   personData = personData.concat({
  //     id: personId,
  //     name: request.body.name,
  //     number: request.body.number,
  //   });

  //   response.json(personData);
  // } else if (phonebookNames.includes(request.body.name)) {
  //   response.status(403).json({ error: "name must be unique" });
  // } else {
  //   response.status(400).json({ error: "please enter name and number" });
  // }
  const body=request.body
  if(body.name===undefined || body.number===undefined){
    return response.status(400).json({error:'content missing'})
  }
  const contact = new Phonebook({
    name:body.name,
    number:body.number
  })
  contact.save().then(savedContact=>{
    response.json(savedContact)
  }).catch(error=>next(error))
});

app.put('/api/persons/:id',(request,response,next)=>{
  const body=request.body
  const contact={
    name:body.name,
    number:body.number,
  }
  Phonebook.findByIdAndUpdate(request.params.id,contact,{new:true, runValidators: true, context: 'query'}).then(updatedContact=>{response.json(updatedContact)}).catch(error=>next(error))
})

app.delete("/api/persons/:id", (request, response, next) => {
  Phonebook.findByIdAndRemove(request.params.id).then(result=>response.status(204).end()).catch(error=>next(error))
});

app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
