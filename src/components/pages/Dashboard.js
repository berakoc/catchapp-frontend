import { Frame, User } from '../components';

export default function Dashboard({ recovery, sessionUser }) {
    return <Frame component={<User isDashboard sessionUser={sessionUser} recovery={recovery} />} />;
}
