import React from "react";


const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <table key={person.id}>
          <tbody>
            <tr>
              <td>
                <p >{`${person.name} ${person.number}`}</p>
              </td>
              <td>
                <button id = {person.id} onClick={() => deletePerson(person.id,person.name)}>delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      ))}
    </div>
  );
};

export default Persons;
