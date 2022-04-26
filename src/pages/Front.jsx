import "./front.css"
import Top from "../components/Top"
import Sidebar from "../components/Sidebar"
import Button from "../components/Button"
import ActiveRequest from "../components/ActiveRequest"
import PendingRequest from "../components/PendingRequest"
import PastRequest from "../components/PastRequest"

// the entries r there just as placeholders so i can see what im doing
// probably end up with just the three headers and a function to populate each of the sections as requests come in (backend?)

function Front() {
    return (
        <div className="base">
            <div className="topBar"><Sidebar /><Top /></div>
            <div className="main">
                <form id="requestForm">
                    <input type="text" id="requestInput" placeholder="From" /><input type="text" id="requestInput" placeholder="To" /><Button text="Request a Walk" color="#575757" />
                </form>
                <header className="sectionHeader">Current Requests</header>
                <ActiveRequest requester="Alice" from="Evans" to="Unit 1" />
                <ActiveRequest requester="Alice" from="Evans" to="Unit 1" />
                <header className="sectionHeader">Pending Requests</header>
                <PendingRequest requester="Alice" />
                <header className="sectionHeader">Past Requests</header>
                <PastRequest from="Moffitt Library" to="Unit 2" />
            </div>
        </div>
    )
}

export default Front
