import Card from '../UI/Card';
import moment from 'moment';

import classes from './Forecast.module.css';

const Forecast = (props) => {

    const { forecast, temp, wind, percipitation } = props;

    // Only take the first 10 hours of the hourly forecast
    const forecastData = forecast.length > 10 ? forecast.slice(0, 10) : forecast;

    return (
        <div>
            <ul className={classes.weather}>
                {forecastData.map((weatherInfo) => {
                    // Checking the props to see if the weather info is hourly or daily
                    const time = props.format === 'Hourly Forecast' ? moment.unix(weatherInfo.dt).format('h A') : moment.unix(weatherInfo.dt).format('MMM DD');
                    const tempDetails = props.format === 'Hourly Forecast' ? <><p className={classes.temp}>{temp(weatherInfo.temp)}</p>
                        <p>FL: {temp(weatherInfo.feels_like)}</p></> : <><p>Max: {temp(weatherInfo.temp.max)}</p>
                        <p>Min: {temp(weatherInfo.temp.min)}</p></>;
                    return (
                        <Card key={weatherInfo.dt} className={classes['li-container']}>
                            <li className={classes['weather-details']}>
                                <div>
                                    <h3>{time}</h3>
                                    <div>
                                        {tempDetails}
                                    </div>
                                </div>
                                <div>
                                    <div className={classes['weather-details-img']}><img src={`http://openweathermap.org/img/wn/${weatherInfo.weather[0].icon}@2x.png`} alt="Image of the weather conditions"></img></div>
                                    <p className={classes.description}>{weatherInfo.weather[0].description}</p>
                                </div>
                                <div>
                                    <i className="fas fa-tint"></i>
                                    <p>{percipitation(weatherInfo.pop)}%</p>
                                    <div>
                                        <p>{wind(weatherInfo.wind_deg)}</p>
                                        <p>{weatherInfo.wind_speed}</p>
                                        <p>MPH</p>
                                    </div>
                                </div>
                            </li>
                        </Card >
                    )
                })}
            </ul >
        </div >
    )
}

export default Forecast