import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';
import { useNavigate } from "react-router-dom";
import { MDBIcon } from 'mdb-react-ui-kit';
import { Dropdown } from "react-bootstrap";
import axios from 'axios';

const Notifications = ({ userId }) => {
    const [showA, setShowA] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"));
    console.log(user)
    const toggleShowA = () => setShowA(!showA);

    const markAllAsSeen = async () => {
        try {
            const response = await axios.ge(
                "http://localhost:5000/user/notification",
                { userId: user._id },
            );
        } catch (error) {
            return ("Something went wrong");
        }
    };

    return (
        <div className="position-relative">
            <MDBIcon icon="bell" onClick={toggleShowA} className="position-fixed top-0 end-0 m-3 fs-3" />
            <Toast show={showA} onClose={toggleShowA} className="position-fixed top-0 end-0 m-3">
                <Toast.Header>
                    <img
                        src="holder.js/20x20?text=%20"
                        className="rounded me-2"
                        alt=""
                    />
                    <strong className="me-auto">Notifications</strong>
                    <small onClick={()=>markAllAsSeen()}>Mark All as read</small>
                </Toast.Header>
                <>
                    {user?.unseenNotifications?.map((notification) => (
                        <li key={notification.id}>
                            <p
                                className="h4all"
                                onClick={() => navigate(notification.onClickPath)}
                            >
                                {notification.message}
                            </p>
                            <hr />
                        </li>
                    ))}
                </>
            </Toast>
        </div>
    );
}

export default Notifications;
