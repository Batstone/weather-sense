import React, { useReducer, useEffect } from 'react';

import SearchContext from './search-context';

const defaultSearchState = {
    userSearchText: '',
    error: '',
    locationOptions: [],
    selectedLocation: '',
    selectedLocationCoordinates: {},
    weather: {},
};

const searchReducer = (state, action) => {
    switch (action.type) {
        case 'USER_SEARCH_TEXT':
            return { ...state, userSearchText: action.payload }
            break;
        case 'ERROR_TEXT':
            return { ...state, error: action.payload }
            break;
        case 'LOCATION_OPTIONS':
            return { ...state, locationOptions: action.payload }
        case 'LOCATION_SELECTION':
            return { ...state, locationOptions: [], selectedLocation: action.payload }
            break;
        case 'LOCATION_SELECTION_COORDINATES':
            return { ...state, selectedLocationCoordinates: action.payload }
            break;
        case 'WEATHER_CONDITIONS':
            return { ...state, weather: action.payload }
            break;
    }
    return state;
};

const key1 = '04d384a1bafb46ecaeb07b4ab49c647c';
const key2 = 'b259026e161c31f0587ed82e488b63f5'

const SearchProvider = (props) => {

    const [searchState, dispatchAction] = useReducer(searchReducer, defaultSearchState);

    useEffect(() => {
        const searchText = searchState.userSearchText
        if (searchText.trim() === '') {
            return;
        }
        // API for getting users coordinates
        const locationOptions = async () => {
            const call = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${searchText}&key=${key1}`);
            if (call.status === 200) {

                const response = await call.json();

                if (response.results.length === 0) {
                    dispatchAction({ type: 'ERROR_TEXT', payload: 'No Locations found! Please search for another location.' });
                    return;
                }

                dispatchAction({ type: 'LOCATION_OPTIONS', payload: response.results });

            } else {
                throw new Error('Unable to get location data');
            }
        }
        locationOptions().catch(error => {
            console.log('error!', error);
        });
    }, [searchState.userSearchText]);

    useEffect(() => {
        const coordinates = searchState.selectedLocationCoordinates;
        if (Object.keys(coordinates).length === 0) {
            return;
        }

        // Using the coordinates data to search for a specific city/location
        const getLocationData = async () => {
            const call = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lng}&exclude={part}&appid=${key2}`)
            if (call.status === 200) {
                const res = await call.json()
                dispatchAction({ type: 'WEATHER_CONDITIONS', payload: res });
            } else {
                throw new Error('Unable to fetch location data')
            }
        }

        getLocationData().catch(error => {
            console.log('error!', error)
        })
    }, [searchState.selectedLocation, searchState.locationCoordinates]);

    const setSearchTextHandler = (text) => {
        dispatchAction({ type: 'USER_SEARCH_TEXT', payload: text });
    };

    const setLocationSelectionHandler = (selection) => {
        dispatchAction({ type: 'LOCATION_SELECTION', payload: selection.formatted })
        dispatchAction({ type: 'LOCATION_SELECTION_COORDINATES', payload: selection.geometry })
    };

    const searchContext = {
        userSearchText: searchState.userSearchText,
        errorText: searchState.error,
        setSearchText: setSearchTextHandler,
        locationOptions: searchState.locationOptions,
        selectedLocation: searchState.selectedLocation,
        selectedlocationCoordinates: searchState.selectedlocationCoordinates,
        setLocation: setLocationSelectionHandler,
        weather: searchState.weather
    }

    return (
        <SearchContext.Provider value={searchContext}>
            {props.children}
        </SearchContext.Provider>
    );

};

export default SearchProvider;