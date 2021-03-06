import React, { useEffect, useState } from 'react';
import "./front.css"
import Top from "../components/Top"
import Button from "../components/Button"
import ActiveRequest from "../components/ActiveRequest"
import YourRequest from "../components/YourRequest"
import PastRequest from "../components/PastRequest"
import ActiveOffer from "../components/ActiveOffer"
import PendingRequest from '../components/PendingRequest';
import { useParams } from 'react-router-dom';

function Front() {
    const [currentRequests, setCurrentRequests] = useState([]);
    const [yourRequests, setYourRequests] = useState([]);
    const [pendingOffers, setPendingOffers] = useState([]);
    const [pendingRequest, setPendingRequest] = useState([]);
    const [pastRequests, setPastRequests] = useState([]);
    let { user } = useParams();

    useEffect(() => {
        // fetching initial current requests section
        fetch("http://localhost:8000/requests", {
            method: "GET",
        })
        .then(response => response.json())
        .then(data => {
            if (data["message"] === "success") {
                setCurrentRequests(data["requests"]);
            } else {
                console.log(data);
            }
        })
        .catch(console.error);

        // fetching initial requests youve made section
        fetch("http://localhost:8000/requests", {
            method: "POST",
            body: JSON.stringify({
                "username": user,
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data["message"] === "success") {
                setYourRequests(data["requests"]);
            } else {
                console.log(data);
            }
        })
        .catch(console.error);

        // fetching initial offers uve made section
        fetch("http://localhost:8000/pendingOffer", {
            method: "POST",
            body: JSON.stringify({
                "username": user,
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data["message"] === "success") {
                setPendingOffers(data["requests"]);
                console.log(pendingOffers);
            } else {
                console.log(data);
            }
        })
        .catch(console.error);

        fetch("http://localhost:8000/acceptedOffer", {
            method: "POST",
            body: JSON.stringify({
                "username": user,
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data["message"] === "success") {
                setPastRequests(data["requests"]);
                console.log(pastRequests);
            } else {
                alert("update | pastreqs");
                console.log(data);
            }
        })
        .catch(console.error);

    }, [])

    function createRequest(e) {
        e.preventDefault();
        fetch("http://localhost:8000/createRequest", {
            method: "POST",
            body: JSON.stringify({
                "username": user,
                "from": document.getElementById("requestFrom").value,
                "to": document.getElementById("requestTo").value,
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data["message"] === "success") {
                // add the newest request
                document.getElementById("requestForm").reset();
                yourRequests.push({ "rid": data["rid"], "from": data["from"], "to": data["to"]});
                setYourRequests(yourRequests);
                console.log(yourRequests);
            } else {
                alert("Failed to create request, please try again.");
                console.log(data);
            }
        })
        .catch(console.error);
    }

    function update(e) {
        e.preventDefault();
        fetch("http://localhost:8000/requests", {
            method: "GET"
        })
        .then(response => response.json())
        .then(data => {
            if (data["message"] === "success") {
                setCurrentRequests(data["requests"]);
            } else {
                alert("Failed to fetch new requests, please try again.");
                console.log(data);
            }
        })
        .catch(console.error);

        fetch("http://localhost:8000/pendingRequest", {
            method: "POST",
            body: JSON.stringify({
                "username": user,
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data["message"] === "success") {
                // group by request id and display (but how)
                setPendingRequest(data["requests"]);
            } else {
                alert("refresh bad");
            }
        })
        .catch(console.error);

        fetch("http://localhost:8000/pendingOffer", {
            method: "POST",
            body: JSON.stringify({
                "username": user,
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data["message"] === "success") {
                setPendingOffers(data["requests"]);
                console.log(pendingOffers)
            } else {
                alert("update | offers uve made");
                console.log(data);
            }
        })
        .catch(console.error);

        // fetch past reqs
        fetch("http://localhost:8000/acceptedOffer", {
            method: "POST",
            body: JSON.stringify({
                "username": user,
            }),
            headers: {
                'Content-type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            if (data["message"] === "success") {
                setPastRequests(data["requests"]);
                console.log(pastRequests);
            } else {
                alert("update | pastreqs");
                console.log(data);
            }
        })
        .catch(console.error);
    }

    return (
        <div className="base">
            <div className="topBar"><Top user={user} /></div>
            <div className="main">
                <form id="requestForm">
                    <input type="text" id="requestFrom" placeholder="From" />
                    <input type="text" id="requestTo" placeholder="To" />
                    <Button text="Request a Walk" color="#575757" callback={createRequest} />
                </form>
                <Button text="Refresh Requests and Offers" color="#575757" callback={update} />
                <header className="sectionHeader">Current Requests</header>
                {currentRequests.map(({rid, username, from, to}) => {
                    if (user !== username) {
                        return <ActiveRequest username={username} rid={rid} requester={user} from={from} to={to} />
                    }
                })}
                <header className="sectionHeader">Requests You've Made</header>
                {yourRequests.map(({rid, _, from, to}) => (
                    <YourRequest rid={rid} from={from} to={to} />
                ))}
                {pendingRequest.map(({rid, owner, requester, status}) => {
                    if (true) { // change to correct user === owner or user === requester
                        return <PendingRequest rid={rid} requester={requester} />
                    }
                })}
                <header className="sectionHeader">Offers You've Made</header>
                {pendingOffers.map(({rid, owner, requester, status}) => (
                    <ActiveOffer offeredTo={owner} status={status} />
                ))}
                <header className="sectionHeader">Past Requests</header>
                {pastRequests.map(({ owner, requester, from, to }) => {
                    if (user === owner) { // same thing here, change
                        return <PastRequest acceptedOfferer={requester} from={from} to={to} />
                    }
                })}
            </div>
        </div>
    )
}

export default Front
