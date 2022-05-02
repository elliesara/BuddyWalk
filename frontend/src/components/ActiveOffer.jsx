import "./activeoffer.css";

function ActiveOffer( {offeredTo, destination} ) {
    return (
        <div className="activeOffer">
            <div className="horizContainer">
                <p className="emphasized">Offered to: </p>
                <p>{offeredTo}</p>
            </div>
            <div className="horizContainer">
                <p className="emphasized">Destination:</p>
                <p>{destination}</p>
            </div>
        </div>
    )
}

export default ActiveOffer;
