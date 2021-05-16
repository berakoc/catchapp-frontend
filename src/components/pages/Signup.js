import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import FirebaseAuthAPI from '../../api/firebase-auth';
import { values } from '../../lib/object';
import { receiveError } from '../../redux/actions/error';

const mapStateToProps = ({ error }) => ({
    error
})

const mapDispatchToProps = dispatch => ({
    updateError: e => dispatch(receiveError(e))
})

function Signup({ error, updateError }) {
    const handleSubmit = async (e) => {
        e.preventDefault();
        const user = {
            email: e.target[0].value,
            password: e.target[1].value,
        };
        try {
            await FirebaseAuthAPI.signUp(
                ...values(user)
            );
            console.log('Signed up')
        } catch (err) {
            updateError(err)
        }
    };
    return (
        <>
            <h1>Signup</h1>
            <p>{error}</p>
            <form onSubmit={handleSubmit}>
                <label>
                    Email:
                    <input type='email' name='email' />
                </label>
                <label>
                    Password:
                    <input type='password' name='password' />
                </label>
                <input type='submit' value='Submit' />
            </form>
            <Link to='/login'>Login</Link>
        </>
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Signup)
