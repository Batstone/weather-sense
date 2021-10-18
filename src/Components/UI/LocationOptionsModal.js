import React, { useContext } from 'react';
import ReactDOM from 'react-dom';
import LocationOption from '../Search/LocationOption';
import SearchContext from '../../store/search-context';
import Button from './Button';

import classes from './LocationOptionsModal.module.css';

// Saving the selected location to local storage
const saveToLocalStorage = (location) => {
    localStorage.setItem('location', JSON.stringify(location));
};

// The backdrop for the modal
const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onClose} />;
};

// The modal overlay with location selection options
const ModalOverlay = (props) => {
    const searchCtx = useContext(SearchContext);

    const locationChoiceHandler = (location) => {
        searchCtx.setLocation(location);
        saveToLocalStorage(location);
        props.onClose();
    }

    const closeButtonHandler = () => {
        props.onClose();
    }

    return (
        <div className={classes.modal}>
            <div className={classes['modal-button']}>
                <Button onClick={closeButtonHandler}>Close</Button>
            </div>
            <ul className={classes['location-options']}>
                {searchCtx.locationOptions.map(location => <LocationOption className={classes['location-option']} onClick={() => locationChoiceHandler(location)} location={location.formatted} key={Math.random()} />)}
            </ul>
        </div>
    );
};

// Component with both the backdrop and the overlay
const LocationOptionsModal = (props) => {
    return (
        <>
            {ReactDOM.createPortal(
                <Backdrop onClose={props.onClose} />,
                document.getElementById('backdrop-root')
            )};
            {ReactDOM.createPortal(
                <ModalOverlay onClose={props.onClose} />,
                document.getElementById('modal-root')
            )};
        </>
    );
};

export default LocationOptionsModal;