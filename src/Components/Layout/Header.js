import React from 'react';
import Time from '../Helper/Time';

import classes from './Header.module.css';

const Header = () => {
    return (
        <header>
            <div className="wrapper">
                <div className={classes['header-container']} >
                    <h1><span>W</span>eather<span>S</span>ense<span>.</span></h1>
                    <Time />
                </div>
            </div>
            <div className={"background-animation-1"}></div>
        </header>
    )
}


export default Header;