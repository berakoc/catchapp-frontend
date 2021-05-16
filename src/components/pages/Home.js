import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
    return (
        <>
            <h1>Welcome!</h1>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign up</Link>
            <Link to='/dashboard'>Dashboard</Link>
        </>
    );
}
