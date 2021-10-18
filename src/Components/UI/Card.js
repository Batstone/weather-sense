const Card = (props) => {
    // Reusable card component
    return (
        <div className={props.className}>
            {props.children}
        </div >
    )
};


export default Card;