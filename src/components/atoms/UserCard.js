import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import User from '../../api/models/User'
import UserAPI from '../../api/user'
import styles from '../../styles/atoms/UserCard.module.scss'
import combine from '../../lib/style-composer'

const mapStateToProps = ({ session }) => ({
    session
})

function UserCard({ session }) {
    const [user, setUser] = useState(new User())
    useEffect(() => {
        const email = session.email
        const fetchUser = async (email) => {
            setUser(await UserAPI.getUser(email))
        }
        fetchUser(email)
    }, [session.email])
    return (
        <div className={combine(styles, 'component')}>
            {user.name}
        </div>
    )
}

export default connect(mapStateToProps)(UserCard)