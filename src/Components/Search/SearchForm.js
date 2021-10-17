import React, { useState, useContext, useEffect } from 'react';
import SearchContext from '../../store/search-context';

import Button from '../UI/Button.js';
import LocationOptionsModal from '../UI/LocationOptionsModal.js';

import classes from './SearchForm.module.css';

// Search form that takes user input as query to API call
const Search = () => {
    const [searchText, setSearchText] = useState('');
    const [error, setError] = useState('');
    const [searching, setSearching] = useState(false);
    const [icon, setIcon] = useState(true);

    const iconClickHandler = () => {
        setIcon(prevState => !prevState);
    };

    const searchCtx = useContext(SearchContext);

    // Run only during component did mount. Check local storage for previous search option
    useEffect(() => {
        if (localStorage.getItem('location')) {
            const location = JSON.parse(localStorage.getItem('location'))
            searchCtx.setLocation(location)

            setIcon(false);
        }
    }, []);

    const onSearchTextChangeHandler = (e) => {
        setSearchText(e.target.value)
    };

    const onFormSubmitHandler = (e) => {
        e.preventDefault();

        if (searchText.trim().length <= 1) {
            setError('Please enter a location');
            return;
        };

        setError(false);

        setSearching((true));

        searchCtx.setSearchText(searchText);

        setSearchText('');
    };

    const onModalCloseHandler = () => {
        setSearching(false);

        if (searchCtx.selectedLocation) {
            setIcon(false);
        };
    };

    const activeSearch = icon ? `${classes['button-active']}` : '';

    const searchForm = icon || !searchCtx.selectedLocation ? <div className="search-container">
        <div>
            <form className={classes.form} onSubmit={onFormSubmitHandler}>
                <label htmlFor="searchText">Search for your location.</label>
                <input type='text' name='searchText' placeholder="Enter a location" value={searchText} onChange={onSearchTextChangeHandler}></input>
                {error && <p className={classes['search-error']}>{error}</p>}
                {searchCtx.errorText && <p className={classes['search-error']}>No locations found. Please try searching again!</p>}
                <Button>Search</Button>
            </form>
        </div>
    </div> : '';

    return (
        <>
            <section className={classes.search}>
                <div className={classes['search-header-container']}>
                    <Button className={activeSearch} onClick={iconClickHandler} icon={icon}>Location Search</Button>
                </div>
                {icon && searchForm}
            </section>
            {searching && searchCtx.locationOptions.length !== 0 && <LocationOptionsModal onClose={onModalCloseHandler} />}
        </>
    );
};

export default Search;