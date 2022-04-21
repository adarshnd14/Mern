import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userAction } from '../redux/userReducer';

function Logout() {

    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(userAction.navRoute('logout'))
        localStorage.clear()
        navigate('/')
    }, []);

    return (
        <div>
            Logging out ...
        </div>
    )
}

export default Logout