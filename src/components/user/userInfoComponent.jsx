import React from "react";
import PropTypes from 'prop-types';
const UserInfo = ({firstName, lastName, bio, age, onDelete, onEdit}) => {
    return (
        <div className="user-item">
            <h1>{firstName} - {lastName}</h1>
            <p>{bio}</p>
            <p>{age}</p>
            <div>
                <button onClick={onEdit}>Edit</button>
                <button onClick={onDelete}>Delete</button>
            </div>
        </div>
    )
}
UserInfo.defaultProps = {
    firstName: "Iran", 
    lastName: "Iranian", 
    bio: "Describe Iran",
    age: 999,
    onDelete: ()=> {},
    onEdit: () => {}
}
UserInfo.propTypes = {
    firstName: PropTypes.string, 
    lastName: PropTypes.string, 
    bio: PropTypes.string,
    age: PropTypes.number,
    onDelete: PropTypes.func,
    onEdit: PropTypes.func
}
export default UserInfo;