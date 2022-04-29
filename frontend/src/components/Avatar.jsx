import "./avatar.css"

function Avatar( { source } ) {
    // probably change source to user, and then use user.avatar or something like that for the source
    // and user.name + "avatar" for alt text ?
    return (
        <img src={source} alt="user avatar" class="avatar"></img>
    )
}

export default Avatar;
