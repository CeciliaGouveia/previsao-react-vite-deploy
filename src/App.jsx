import React from "react";
import axios from "axios";
import WeatherInfo from "./components/WeatherInfo/WeatherInfo";
import WeatherInfo5Days from "./components/WeatherInfo5Days/WeatherInfo5Days";
import "./App.css";

function App() {
  // hook que cria uma referência. nós colocamos uma referência no input e toda vez que quiser pegar o dado desse input eu vou conseguir
  const inputRef = React.useRef();

  const [weather, setWeather] = React.useState();
  const [weather5Days, setWeather5Days] = React.useState();

  async function searchCity() {
    const city = inputRef.current.value;
    const keyApi = "f91adf0d47451a84e48efc47458c4226";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${keyApi}&lang=pt_br&units=metric`;
    const url5Days = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${keyApi}&lang=pt_br&units=metric`;
    const apiInfo = await axios.get(url);
    const apiInfo5Days = await axios.get(url5Days);
    setWeather(apiInfo.data);
    setWeather5Days(apiInfo5Days.data);
  }

  return (
    <div className="container">
      <h1>Previsão do Tempo</h1>
      <input ref={inputRef} type="text" placeholder="Digite o nome da cidade" />
      {/* quando clicar no botão quero chamar a função searchCity */}
      <button onClick={() => searchCity()}>Buscar</button>
      {/* Se a variável weather tiver valores dentro dela, então deverá ser exibido o componente react  */}
      {weather && <WeatherInfo weather={weather} />}
      {weather5Days && <WeatherInfo5Days weather5Days={weather5Days} />}
    </div>
  );
}

export default App;
