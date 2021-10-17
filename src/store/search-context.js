import React from 'react';

// This component helps with auto complete
const SearchContext = React.createContext({
    userSearchText: '',
    error: '',
    locationOptions: [],
    selectedLocation: {},
    locationCoordinates: '',
    weather: {},
    setSearchText: (text) => { },
    setLocation: (selection) => { }
});

export default SearchContext;