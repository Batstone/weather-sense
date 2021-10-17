import React from 'react';
import moment from 'moment'


const Header = () => {

    const date = moment().format('ddd MMM Do, YYYY h:mm A');

    return (
        <header>
            <div className="wrapper">
                <div className="header-container">
                    <h1><span>W</span>eather<span>S</span>ense<span>.</span></h1>
                    <h3>{date}</h3>
                </div>
            </div>
        </header>
    )
}


export default Header