import { useState, useEffect } from "react";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Persons from "./Persons";
import RESTapi from "./RESTapi";
import Notification from "./Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [searchText, setSearchText] = useState("");
  const [message, setmessage] = useState();
  const [messageType, setMessageType] = useState();
  const handleName = (event) => {
    console.log(event.target.value);
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
          setmessage(`Added ${returnedPersons.name} !`);
          setMessageType("success");
          setTimeout(() => {
            setmessage(null);
            setMessageType(null);
          }, 3000);
          setNewName("");
          setNewNumber("");
        });
      } else {
        if (
          window.confirm(
            `${newName} is already added to the phonebook. Replace the old one with new phoneNumber?`
          )
        ) {
          let selectedPerson = persons.find(
            (person) => person.name === newName
          );
          let selectedPersonId = selectedPerson.id;
          let updatedPerson = { ...selectedPerson, number: newNumber };
          console.log(selectedPersonId);
          RESTapi.update(updatedPerson, selectedPersonId)
            .then((updatedResponse) => {
              console.log(updatedResponse);
              setPersons(
                persons.map((person) =>
                  person.id !== selectedPersonId ? person : updatedResponse
                )
              );
              setmessage(`Updated ${updatedResponse.name} number!`);
              setMessageType("success");
              setTimeout(() => {
                setmessage(null);
                setMessageType(null);
              }, 3000);
              setNewName("");
              setNewNumber("");
            })
            .catch((error) => {
              setmessage(`Person was already removed`);
              setMessageType("error");
              setTimeout(() => {
                setmessage(null);
              }, 5000);
              setPersons(
                persons.filter((person) => person.id !== selectedPersonId)
              );
            });
        }
      }
    }
  };

  const handleDelete = (deleteid, deletename) => {
    if (window.confirm(`Do you confirm to delete the contact ${deletename}?`)) {
      RESTapi.deleteContact(deleteid);
      setPersons(persons.filter((person) => person.id !== deleteid));
      setmessage(`Deleted!`);
      setMessageType("success");
      setTimeout(() => {
        setmessage(null);
        setMessageType(null);
      }, 3000);
    }
  };

  useEffect(() => {
    RESTapi.getAll().then((initialPersons) => setPersons(initialPersons));
  }, []);

  return (
    <div>
      <h2>Phonebook</h2>
      {messageType === "success" || messageType === "error" ? (
        <Notification message={message} />
      ) : (
        <></>
      )}
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
