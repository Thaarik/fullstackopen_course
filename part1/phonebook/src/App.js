import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import RESTapi from "./RESTapi";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");
  const handleName = (event) => {
    setNewName(event.target.value);
  };
  const handleNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleSearch = (event) => {
    setSearchText(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent form submission

    let names = persons.map((person) => person.name);
    if (newName !== "") {
      if (!names.includes(newName)) {
        let newContact = { name: newName, number: newNumber };
        RESTapi.create(newContact).then((returnedPersons) => {
          setPersons(persons.concat(returnedPersons));
          setNewName("");
          setNewNumber("");
        });
      } else {
        alert(`Person ${newName} already included!!!!`);
      }
    }
  };
  const handleDelete = (deleteid,deletename) => {
    if (window.confirm(`Do you confirm to delete the contact ${deletename}?`)) {
      RESTapi.deleteContact(deleteid);
      setPersons(persons.filter((person) => person.id!== deleteid));
    }
  };

  useEffect(() => {
    RESTapi.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter handleSearch={handleSearch} />
      <h2>Add new contact:</h2>
      <PersonForm
        name={handleName}
        number={handleNumber}
        submit={handleSubmit}
        valueName={newName}
        valueNumber={newNumber}
      />
      <h2>Numbers</h2>
      {searchText === "" ? (
        <Persons persons={persons} deletePerson={handleDelete} />
      ) : (
        <Persons
          persons={persons.filter((person) =>
            person.name.toLowerCase().includes(searchText)
          )}
          deletePerson={handleDelete}
        />
      )}
    </div>
  );
};

export default App;
