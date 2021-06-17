import { Frame, User } from '../components';

export default function Dashboard({ recovery }) {
    return <Frame component={<User isDashboard isSessionUser recovery={recovery} />} />;
}
