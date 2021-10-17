import React from 'react';

import classes from './Footer.module.css';

const Footer = () => {

    return (
        <footer>
            <div className="wrapper">
                <div className={classes['footer-container']}>
                    <p className={classes.footerp}><span>W</span>eather<span>S</span>ense &copy; 2020</p>
                    <p>Created by <a href="www.adambatstone.dev" target="_blank">Adam Batstone</a></p>
                </div>
            </div>
        </footer>
    )
}

export default Footer