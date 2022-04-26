import "./front.css"
import ActiveWalkRequest from "../components/ActiveWalkRequest"
import Top from "../components/Top"
import Sidebar from "../components/Sidebar"
import Button from "../components/Button"

function Front() {
    return (
        <div className="base">
            <div className="topBar"><Sidebar /><Top /></div>
            <div className="main">
                <form id="requestForm">
                <div class="formItem"><input type="text" id="requestInput" placeholder="Request a walk" /></div><div class="formItem"><Button text="Submit" color="#575757" /></div>
                </form>
                <ActiveWalkRequest requester="Alice" from="Evans" to="Unit 1"/>
                <ActiveWalkRequest requester="Alice" from="Evans" to="Unit 1"/>
            </div>
        </div>
    )
}

export default Front
