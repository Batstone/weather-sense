import React, { useContext } from 'react';
import SearchForm from './Search/SearchForm';
import Weather from './Forecast/Weather';
import SearchContext from '../store/search-context';

const Main = () => {
    const searchCtx = useContext(SearchContext);

    return (
        <div className="wrapper main">
            <SearchForm />
            {Object.keys(searchCtx.weather).length !== 0 && <Weather />}
        </div>
    );
};

export default Main;