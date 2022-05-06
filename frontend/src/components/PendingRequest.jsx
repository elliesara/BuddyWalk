import "./pendingrequest.css";
import Button from "./Button";
import Avatar from "./Avatar";
import React, { useEffect, useState } from 'react';

function PendingRequest( { requester, rid } ) {

    const [visible, setVisible] = useState(true);

    // statuses are accept, waiting, decline

    const acceptRequest = (e) => {
        e.preventDefault();
        fetch("http://localhost:8000/acceptPendingRequest", {
            method: "POST",
            body: JSON.stringify({
                "requester": requester,
                "rid": rid
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data["message"] === "success") {
                // delete all other pending offers, move this request to past requests with accepted persons name
            } else {
                alert("Request creation failed, please try again.");
            }
        })
        .catch(console.error);
    }

    const rejectRequest = (e) => {
        e.preventDefault();
        setVisible(false);
    }

    return ( visible ?
        <div className="pendingRequest">
            <Avatar source="./a.png" />
            <div className="stackedContainer">
                <p className="stacked requester">{requester}</p>
            </div>
            <div className="choices">
                <Button text="Accept" color="#34c258" callback={acceptRequest} />
                <Button text="Decline" color="#c23445" callback={rejectRequest} />
            </div>
        </div>
        : <div></div>
    )
}

export default PendingRequest;
