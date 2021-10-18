import React, { useState, useContext } from 'react';
import SearchContext from '../../store/search-context';
import CurrentWeather from './CurrentWeather';
import Forecast from './Forecast';

import Button from '../UI/Button';

import classes from './Weather.module.css';

const Weather = () => {

    const [tempFormat, updateTempFormat] = useState('F');
    const [weatherFormat, setWeatherFormat] = useState('Hourly');

    const searchCtx = useContext(SearchContext);
    const { current, daily, hourly } = searchCtx.weather
    const location = searchCtx.selectedLocation;

    const weatherImg = `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`;

    const buttonClickHandler = () => {
        if (weatherFormat === 'Hourly') {
            setWeatherFormat('Daily');
        } else {
            setWeatherFormat('Hourly');
        }
    };

    // Function for converting temperature from F <-> C
    const tempConverter = (temp) => {
        if (tempFormat !== 'F') {
            const celciusConversion = (temp - 273.15).toFixed(0);
            const celcius = celciusConversion.toString() + ' ' + '℃';
            return celcius
        } else {
            const farenheitConversion = (((temp - 273.15) * 1.8) + 32).toFixed(0);
            const farenheit = farenheitConversion.toString() + ' ' + '℉';
            return farenheit
        }
    }

    // Updating the selected Temp format selection
    const update = (e, value) => {
        e.preventDefault();
        updateTempFormat(value);
    }

    // Function for setting percentage of percipitation, passed as a prop to the Hourly and Daily weather components
    const percipitation = (pop) => {
        return parseInt(pop * 100)
    }

    // Function for calculating wind direction and speed, passed as a prop to the Hourly and Daily weather components
    const windDirection = (wind) => {
        var val = Math.floor((wind / 22.5) + 0.5);
        var arr = ["N", "NNE", "NE", "ENE", "E", "ESE", "SE", "SSE", "S", "SSW", "SW", "WSW", "W", "WNW", "NW", "NNW"];
        return arr[(val % 16)];
    }

    // Setting active classes
    const activeF = tempFormat === 'F' ? `${classes['button-active']}` : '';
    const activeC = tempFormat === 'C' ? `${classes['button-active']}` : '';
    const activeHourly = weatherFormat === 'Hourly' ? `${classes['button']} ${classes['button-active']}` : `${classes['button']}`;
    const activeDaily = weatherFormat === 'Daily' ? `${classes['button']} ${classes['button-active']}` : `${classes['button']}`;

    return (
        <>
            <div className={classes['search-location']}>
                <h2>{location}</h2>
            </div>

            {<CurrentWeather temp={tempConverter(current.temp)} tempFeelsLike={tempConverter(current.feels_like)} windSpeed={current.wind_speed} windDirection={windDirection(current.wind_deg)} description={current.weather[0].description} img={weatherImg} />}
            <div className={classes['temp-buttons']}>
                <Button className={activeF} onClick={(e) => update(e, 'F')}>℉</Button>
                <Button className={activeC} onClick={(e) => update(e, 'C')}>°C</Button>
            </div>

            <div className={classes['section-header-container']}>
                <Button className={activeHourly} onClick={buttonClickHandler}>Hourly Forecast</Button>
                <Button className={activeDaily} onClick={buttonClickHandler}>Daily Forecast</Button>
            </div>
            {weatherFormat === 'Hourly' && <Forecast format={'Hourly Forecast'} forecast={hourly} temp={tempConverter} wind={windDirection} percipitation={percipitation} />}
            {weatherFormat === 'Daily' && <Forecast format={'Daily Forecast'} forecast={daily} temp={tempConverter} wind={windDirection} percipitation={percipitation} />}
        </>
    )
}

export default Weather