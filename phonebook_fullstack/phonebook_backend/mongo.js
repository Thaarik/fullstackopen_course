const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

//url connection to mongoDB
const url =
  `mongodb+srv://root:${password}@cluster0.ppq6f1o.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.set('strictQuery',false)
mongoose.connect(url)
 
//create schema
const phonebookSchema = new mongoose.Schema({
  name: String,
  number: String,
})

//add that schema to the mongoDB
const Phonebook = mongoose.model('phonebook', phonebookSchema)

const name = process.argv[3]
const number = process.argv[4]

//create new contact
const contact = new Phonebook({
  name: name,
  number: number,
})

contact.save().then(result => {
  console.log('contact saved!')
  mongoose.connection.close()
})

//show all lists in cmd
if (process.argv.length<4) {
Phonebook.find({}).then(result => {
    result.forEach(contact => {
      console.log(contact)
    })
    mongoose.connection.close()
  })
}