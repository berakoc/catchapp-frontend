import { useEffect, useState } from 'react';
import { shallowEqual, useSelector } from 'react-redux';
import UserAPI from '../api/user';

export default function useUserId() {
    const session = useSelector((state) => state.session, shallowEqual);
    const [userId, setUserId] = useState(null);
    useEffect(() => {
        if (session) {
            const updateuserId = async () => {
                const userId = (await UserAPI.getUser(session['email'])).id;
                setUserId(userId);
            };
            updateuserId();
        }
    });
    return userId;
}
