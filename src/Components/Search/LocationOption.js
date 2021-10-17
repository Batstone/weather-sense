const LocationOption = (props) => {

    return (
        <li className={props.className} onClick={props.onClick}>
            {props.location}
        </li>

    )
}

export default LocationOption;