import { useState } from "react";

const CountryList = ({ country, countryList }) => {
  const [selectedCountry, setSelectedCountry] = useState();
    
  const handleShow = (countryname) => {
    let apiname = countryList.find(
      (country) => country.name.common === countryname
    );
    console.log(apiname);
    console.log(apiname.name.common === countryname);
    if (apiname.name.common === countryname) {
      setSelectedCountry(
        <div>
          <h2>{apiname.name.common}</h2>
          <p>Capital: {apiname.capital}</p>
          <p>Area: {apiname.area}</p>
          <h3>Language</h3>
          <ol>
            {Object.values(apiname.languages).map((lang) => (
              <li>{lang}</li>
            ))}
          </ol>
          <h3>Flag:</h3>
          <img src={apiname.flags.png} alt={apiname.flags.alt} />
        </div>
      );
    }
    console.log(selectedCountry);
  };
  return (
    <ol>
    {()=>{if (selectedCountry){
      return selectedCountry
    }else{
      country &&
          (countryList.map((cl) => <li key={cl.name.common}>{cl.name.common}</li>)
            .length >= 10 ? (
            <p>Too many countries to match</p>
          ) : countryList.map((cl) => (
              <li key={cl.name.common}>{cl.name.common}</li>
            )).length === 1 ? (
            setSelectedCountry(
              countryList.map((cl) => (
                <div>
                  <h2>{cl.name.common}</h2>
                  <p>Capital: {cl.capital}</p>
                  <p>Area: {cl.area}</p>
                  <h3>Language</h3>
                  <ol>
                    {Object.values(cl.languages).map((lang) => (
                      <li>{lang}</li>
                    ))}
                  </ol>
                  <h3>Flag:</h3>
                  <img src={cl.flags.png} alt={cl.flags.alt} />
                </div>
              ))
            )
          ) : (
            countryList.map((cl) => (
              <>
                <li key={cl.name.common}>{cl.name.common}</li>
                <button onClick={() => handleShow(cl.name.common)}>show</button>
              </>
            ))
          ))
    }}}
    </ol>
  );
};

export default CountryList;
