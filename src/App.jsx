import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [data, setData] = useState(null);
  const [input, setInput] = useState('');
  const KEY = '2eab2e128fa712ffc3bbf4f9c53e275d';

  const getWeather = (city) => {
    axios(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${KEY}`)
      .then(({ data }) => {
        setData(data);
        console.log(data);
      })
      .catch(() => {
        setData(null);
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input) {
      getWeather(input);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="City"
        />
        <button type="submit">Search</button>
      </form>

      {data && (
        <table>
          <tbody>
            <tr>
              <td>City:</td>
              <td>{data.name}</td>
            </tr>
            <tr>
              <td>Country:</td>
              <td>{data.sys.country}</td>
            </tr>
            
            <tr>
              <td>Temperature:</td>
              <td>{Math.round(data.main.temp - 273.15)}°C</td> 
            </tr>
            <tr>
              <img src={`https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="" />
            </tr>
          </tbody>
        </table>
      )}
    </>
  );
}

export default App;
