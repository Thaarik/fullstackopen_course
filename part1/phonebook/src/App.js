import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import axios from "axios";
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
        setPersons(persons.concat({ name: newName, number: newNumber }));
        setNewName("");
        setNewNumber("");
      } else {
        alert(`Person ${newName} already included!!!!`);
      }
    }
  };
  
  useEffect(() => {
    axios.get("http://localhost:3001/persons").then((response) => {
      setPersons(response.data);
    });
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
        <Persons persons={persons} />
      ) : (
        <Persons
          persons={persons.filter((person) =>
            person.name.toLowerCase().includes(searchText)
          )}
        />
      )}
    </div>
  );
};

export default App;
