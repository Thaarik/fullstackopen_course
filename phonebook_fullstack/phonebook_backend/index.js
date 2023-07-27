const express = require("express");
const morgan = require('morgan');
const app = express();
const cors = require('cors')

app.use(cors())

morgan.token('object', function getId (req) {
    // console.log(req);
    return JSON.stringify(req.body)
  })
app.use(express.json());

app.use(morgan(':method :url :status :object'))


let personData = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

app.get("/", (request, response) => {
  response.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  response.json(personData);
});

app.get("/info", (request, response) => {
  const date = new Date();
  const dataLength = personData.length;
  response.send(
    `<p>Phonebook has info for ${dataLength}</p><br/><p>${date}</p>`
  );
});

app.get("/api/person/:id", (request, response) => {
  const personId = Number(request.params.id);
  const person = personData.find((data) => data.id === personId);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.post("/api/persons", (request, response) => {
  const personId = Math.floor(Math.random() * 100);
  const phonebookNames = personData.map((data) => data.name);
  if (
    request.body.name &&
    request.body.number &&
    !phonebookNames.includes(request.body.name)
  ) {
    personData = personData.concat({
      id: personId,
      name: request.body.name,
      number: request.body.number,
    });

    response.json(personData);
  } else if (phonebookNames.includes(request.body.name)) {
    response.status(403).json({ error: "name must be unique" });
  } else {
    response.status(400).json({ error: "please enter name and number" });
  }
});

app.delete("/api/person/:id", (request, response) => {
  const personId = Number(request.params.id);
  personData = personData.filter((data) => data.id !== personId);
  response.status(204).end();
});

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log("Server is running at ", PORT);
});
