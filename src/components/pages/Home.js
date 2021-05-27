import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import useUserId from '../../hooks/useUserId';

export default function Home() {
    const userId = useUserId();
    return (
        <>
            <h1>Welcome!</h1>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign up</Link>
            {userId && <NavLink to={`/user/${userId}`}>Dashboard</NavLink>}
        </>
    );
}
