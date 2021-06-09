import { Frame, User } from '../components';

export default function Dashboard({ recovery }) {
    return <Frame component={<User isSessionUser recovery={recovery} />} />;
}
