import { useState, useEffect } from "react";
import axios from "axios";
import CountryList from "./CountryList";
function App() {
  const [country, setCountry] = useState('');
  const [countryList, setCountryList] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((response) => {
        let countries = response.data.map((r) => r);
        setCountryList(countries.filter(
          (cl) =>
            cl.name.common.toLowerCase().includes(country) ||
            cl.name.official.toLowerCase().includes(country)
        ));
      });
      console.log(countryList)
  }, [country]);

  const handleCountry = (event) => {
    setCountry(event.target.value);
  };
  console.log(country)
  if (!countryList) {
    return null;
  }
  return (
    <div>
      <form>
        <span>Country Name: </span>
        <input onChange={handleCountry} value={country} />
      </form>
      <CountryList country={country} countryList={countryList} />
    </div>
  );
}

export default App;
