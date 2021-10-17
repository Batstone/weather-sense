import React from 'react';
import Card from '../UI/Card';

import classes from './CurrentWeather.module.css';

const CurrentForecast = (props) => {
    return (
        <Card className={classes['current-weather']}>
            <ul className={classes['current-weather__container']}>
                <li className={classes['current-weather__container-img']}>
                    <img src={props.icon}></img>
                </li>
                <div>
                    <li className={classes['current-weather__container-temp']}>{props.temp}</li>
                    <li>Feels Like: {props.tempFeelsLike}</li>
                    <li className={classes['current-weather__container-decription']}>{props.description}</li>
                    <li>{props.windDirection}</li>
                    <li>{props.windSpeed} MPH</li>
                </div>
            </ul>
        </Card>
    )
};

export default CurrentForecast;