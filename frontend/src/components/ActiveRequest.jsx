import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightLong } from '@fortawesome/free-solid-svg-icons';
import Button from "./Button";
import Avatar from "./Avatar";
import "./activerequest.css";

function ActiveRequest({ offerFunc, username, rid, requester, from, to }) {

    // function offer(e) {
    //     e.preventDefault();
    //     fetch("http://localhost:8000/offer", {
    //         method: "POST",
    //         body: JSON.stringify({
    //             "username": requester,
    //             "rid": rid
    //         }),
    //         headers: {
    //             'Content-type': 'application/json',
    //         }
    //     })
    //     .then(response => response.json())
    //     .then(data => {
    //         if (data["message"] === "success") {
    //             // add to pending offers w status

    //         } else {
    //             alert("Request creation failed, please try again.");
    //         }
    //     })
    //     .catch(console.error);
    // }

    return (
        <div className="container">
            <Avatar source="./a.png" />
            <p className="requester">{username}</p>
            <div className="stackedContainer">
                <p className="stacked">{from} <FontAwesomeIcon icon={faArrowRightLong} /></p>
                <p className="stacked destination">{to}</p>
            </div>
            <Button text="Offer a walk" color="orange" onclick={()=> offerFunc(requester, rid)} />
        </div>
    )
}

export default ActiveRequest;
