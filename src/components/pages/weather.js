import React, { Component } from "react";
import "../pages/weather.css";
const api = {
  base: "https://api.openweathermap.org/data/2.5/",
};

export default class Weather extends Component {
  state = {
    cityName: undefined,
    inputVal: undefined,
    weather: undefined,
    tempSelect: undefined,
    main: undefined,
    name: undefined,
    kelvin: undefined,
    celsius: undefined,
    fahrenheit: undefined,
    temperature: null,
    selectTemperatureUnit: "kelvin",
  };

  calCelsius(temp) {
    let cell = Math.floor(temp - 237.15);
    return cell;
  }
  calFahrenheit(temp) {
    let fah = Math.floor(temp - 237.1) * 1.8 + 32;
    console.log("fah", fah);
    return fah;
  }

  setTemperature = (selectTemperatureUnit) => {
    this.setState({ selectTemperatureUnit: selectTemperatureUnit });
    if (this.state.temperature) {
      if (selectTemperatureUnit === "kelvin") {
        this.setState({ temperature: `${this.state.kelvin}` });
      }
      if (selectTemperatureUnit === "celsius") {
        this.setState({ temperature: `${this.state.celsius}°C` });
      }
      if (selectTemperatureUnit === "fahrenheit") {
        this.setState({ temperature: `${this.state.fahrenheit}°F` });
      }
    }
  };

  getCurrentWeatherForCity = async (cityName, apiKey) => {
    const api_call = await fetch(
      `${api.base}weather?q=${cityName}&appid=${apiKey}`
    );
    let response = await api_call.json();
    console.log("response", response);

    if (
      response &&
      response.weather &&
      response.weather instanceof Array &&
      response.weather.length > 0
    ) {
      this.setState({
        weather: response.weather[0].main,
        name: response.name,
        country: response.sys.country,
        kelvin: response.main.temp,
        temperature: response.main.temp,
        celsius: this.calCelsius(response.main.temp),
        fahrenheit: this.calFahrenheit(response.main.temp),
      });
    }

    this.setTemperature(this.state.selectTemperatureUnit);
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.cityName !== prevState.cityName) {
      this.getCurrentWeatherForCity(this.state.cityName, this.props.apiKey);
    }
  }

  render() {
    const dateBuilder = (d) => {
      let months = [
        "January",
        "Feburary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      let days = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];

      let day = days[d.getDay()];
      let date = d.getDate();
      let month = months[d.getMonth()];
      let year = d.getFullYear();

      return `${day} ${date} ${month} ${year}`;
    };
    return (
      <>
        <header>
          <h2>Weather</h2>
        </header>
        <div className="appContainer">
          <input
            placeholder="City name"
            onChange={(e) => this.setState({ inputVal: e.target.value })}
            className="searchcityName"
          />
          <select
            onChange={(event) => {
              this.setTemperature(event.target.value);
            }}
          >
            <option
              value="kelvin"
              defaultValue={this.state.selectTemperatureUnit === "kelvin"}
            >
              Kelvin
            </option>
            <option value="celsius">Celsius</option>
            <option value="fahrenheit">Fahrenheit</option>
          </select>
          <button
            onClick={() => this.setState({ cityName: this.state.inputVal })}
            className="checkWeather"
          >
            Check Weather
          </button>
          <div className="lacation-box">
            <div className="location">
              {this.state.name} {this.state.country}
            </div>
            <div className="date">{dateBuilder(new Date())}</div>
            <div className="weather-box">
              {this.state.temperature &&
              this.state.temperature !== "undefined" ? (
                <div className="temp">{this.state.temperature}</div>
              ) : (
                ""
              )}

              <div className="weather">
                <div>{this.state.weather}</div>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }
}
