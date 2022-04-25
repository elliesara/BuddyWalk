import "./front.css"
import ActiveWalkRequest from "../components/ActiveWalkRequest"
import Top from "../components/Top"
import Sidebar from "../components/Sidebar"

function Front() {
    return (
        <div className="base">
            <div className="topBar"><Sidebar /><Top /></div>
            <div className="main">
                <ActiveWalkRequest requester="Alice" from="Evans" to="Unit 1"/>
            </div>
        </div>
    )
}

export default Front
