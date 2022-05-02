import "./front.css"
import Top from "../components/Top"
import Button from "../components/Button"
import ActiveRequest from "../components/ActiveRequest"
import YourRequest from "../components/YourRequest"
import PastRequest from "../components/PastRequest"
import ActiveOffer from "../components/ActiveOffer"

// the entries r there just as placeholders so i can see what im doing
// probably end up with just the three headers and a function to populate each of the sections as requests come in (backend?)

function Front() {
    return (
        <div className="base">
            <div className="topBar"><Top /></div>
            <div className="main">
                <form id="requestForm">
                    <input type="text" id="requestInput" placeholder="From" /><input type="text" id="requestInput" placeholder="To" /><Button text="Request a Walk" color="#575757" />
                </form>
                <header className="sectionHeader">Current Requests</header>
                <ActiveRequest requester="Alice" from="Evans" to="Unit 1" />
                <ActiveRequest requester="Bob" from="Evans" to="Unit 1" />
                <header className="sectionHeader">Requests You've Made</header>
                <YourRequest />
                <header className="sectionHeader">Offers You've Made</header>
                <ActiveOffer offeredTo="Bob" destination="kms" />
                <header className="sectionHeader">Past Requests</header>
                <PastRequest from="Moffitt Library" to="Unit 2" />
            </div>
        </div>
    )
}

export default Front
