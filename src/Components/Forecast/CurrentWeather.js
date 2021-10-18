import React from 'react';
import Card from '../UI/Card';

import classes from './CurrentWeather.module.css';

const CurrentForecast = (props) => {

    const { img, temp, tempFeelsLike, description, windDirection, windSpeed } = props;


    return (
        <Card className={classes['current-weather']}>
            <ul className={classes['current-weather__container']}>
                <li className={classes['current-weather__container-img']}>
                    <img src={img} alt="Image of the current weather conditions"></img>
                </li>
                <div>
                    <li className={classes['current-weather__container-temp']}>{temp}</li>
                    <li>Feels Like: {tempFeelsLike}</li>
                    <li className={classes['current-weather__container-decription']}>{description}</li>
                    <li>{windDirection}</li>
                    <li>{windSpeed} MPH</li>
                </div>
            </ul>
        </Card>
    )
};

export default CurrentForecast;