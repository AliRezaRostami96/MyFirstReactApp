import { useState, useEffect } from 'react';
import React from 'react';
import UserInfo from './userInfoComponent'
import UseDropDown from './myHooks/useDropDown';
const sortOptions = [
    {
        optionName: "A-Z",
        value: 0
    }, {
        optionName: "Z-A",
        value: 1
    }

]
const ShowUsers = () => {
    useEffect(() => {
        getUsersData();
    }, []);

    const getUsersData = async () => {
        try {
            const apiResponse = await fetch("https://run.mocky.io/v3/6c174c47-6fd0-4e8d-99fa-da314f4a4bcc?mocky-delay=1000ms");
            const responseJson = await apiResponse.json();
            setUsersList(responseJson.users);
            setShowLoading(false);
        } catch (e) {
            console.log(e);
        }
    };
    const [usersList, setUsersList] = useState([]);
    const [showDeleteModal, setShowDeleteModalStatus] = useState(false);
    const [selectedUserInfo, setSelectedUserInfo] = useState({
        data: null,
        index: null
    });
    const [showEditModal, setShowEditModalStatus] = useState(false);
    const [showLodaing, setShowLoading] = useState(true);
    const deleteUserConfirmation = (userIndex) => {
        setShowDeleteModalStatus(true);
        setSelectedUserInfo({ data: usersList[userIndex], index: userIndex });
    };
    const deleteUser = () => {
        const newArrayOfUsers = usersList.filter((item) => item.firstName !== selectedUserInfo.data.firstName);
        setUsersList([...newArrayOfUsers]);
        setShowDeleteModalStatus(false);
    };
    const editUserInfo = (index) => {
        setShowEditModalStatus(true);
        setSelectedUserInfo({
            data: usersList[index],
            index: index
        });
    };
    const updateSelectedUserInfo = (value, key) => {
        const userInfo = { ...selectedUserInfo.data };
        userInfo[key] = value;
        setSelectedUserInfo({ ...{ data: userInfo, index: selectedUserInfo.index } })
    };
    const updateUserList = () => {
        const newUserList = [...usersList];
        newUserList[selectedUserInfo.index] = { ...selectedUserInfo.data };
        setUsersList([...newUserList]);
        setShowEditModalStatus(false);
    };
    
    const [sort, SortDropDown] = UseDropDown("select-sort-users", "sortUsers", sortOptions, 0);
    useEffect(() => {
        console.log(sort);
    }, [sort]);
    return showLodaing ? <div className="loading">Loading...</div> : (
        <div>
            <div>
                <SortDropDown />
            </div>
            <div className="users">
                {
                    usersList.map((item, index) => {
                        return (
                            <UserInfo
                                key={`userInfo-${index}`}
                                lastName={item.firstName}
                                firstName={item.lastName}
                                bio={item.bio}
                                age={item.age}
                                onDelete={() => deleteUserConfirmation(index)}
                                onEdit={() => editUserInfo(index)}
                            />
                        )
                    })
                }
            </div>
            {
                showDeleteModal && <div className="modal">
                    <div className="modal-content">
                        <p>Are you sure?</p>
                        <br />
                        <br />
                        <button onClick={deleteUser}>Yes</button>
                        <button onClick={() => setShowDeleteModalStatus(false)}>No</button>
                    </div>
                </div>
            }
            {
                showEditModal && <div className="modal">
                    <div className="modal-content">
                        <input
                            type="text"
                            placeholder="firstName"
                            value={selectedUserInfo.data.firstName}
                            onChange={(e) => { updateSelectedUserInfo(e.target.value, "firstName") }}
                        />
                        <br />
                        <input
                            type="text"
                            placeholder="lastName"
                            value={selectedUserInfo.data.lastName}
                            onChange={(e) => { updateSelectedUserInfo(e.target.value, "lastName") }}
                        />
                        <br />
                        <button onClick={updateUserList}>Edit</button>
                        <button onClick={() => setShowEditModalStatus(false)}>Cancle</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default ShowUsers;