import React from 'react';
import { connect } from 'react-redux';
import combine from '../../lib/style-composer';
import { receiveError } from '../../redux/actions/error';
import styles from '../../styles/pages/Login.module.scss';
import { LoginForm } from '../components';
import { values } from '../../lib/object'
import FirebaseAuthAPI from '../../api/firebase-auth'

const mapStateToProps = ({ error }) => ({
    error,
});

const mapDispatchToProps = (dispatch) => ({
    updateError: (e) => dispatch(receiveError(e)),
});

function Login({ error, updateError }) {
    const handleSubmit = async e => {
        e.preventDefault()
        const user = {
            email: e.target[0].value,
            password: e.target[1].value
        }
        try {
            await FirebaseAuthAPI.login(...values(user))
            console.log('Logged in')
        } catch (err) {
            updateError(err)
        }
    }
    return (
        <div className={combine(styles, 'component')}>
            <LoginForm title='Login' error={error} handleSubmit={handleSubmit} />
        </div>
    );
    // return (
    //     <>
    //         <h1>Login</h1>
    //         <p>{error }</p>
    //         <form onSubmit={handleSubmit}>
    //             <label>
    //                 Email:
    //                 <input type='email' name='email' />
    //             </label>
    //             <label>
    //                 Password:
    //                 <input type='password' name='password' />
    //             </label>
    //             <input type='submit' value='Login' />
    //         </form>
    //         <Link to='/signup'>Signup</Link>
    //     </>
    // );
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
