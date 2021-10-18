const LocationOption = (props) => {

    // This is used in the locationOptionsModal
    return (
        <li className={props.className} onClick={props.onClick}>
            {props.location}
        </li>
    )
}

export default LocationOption;