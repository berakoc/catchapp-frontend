import React from 'react';
import { Link } from 'react-router-dom';
import { ProtectedRoute } from '../../lib/route';

function Home() {
    return (
        <>
            <h1>Welcome!</h1>
            <Link to='/login'>Login</Link>
            <Link to='/signup'>Sign up</Link>
            <Link to='/dashboard'>Dashboard</Link>
        </>
    );
}

export default Home;
