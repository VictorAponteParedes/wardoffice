import Lazy from '../../helpers/lazy';
import { RoutesView } from '../../navigation/routes';


const MembersList = Lazy(() => import('./MembersList'));
const MembersCreate = Lazy(() => import('./CreateMember'));

export const MEMBER_ROUTES = [
    {
        path: RoutesView.memberCreate,
        element: <MembersCreate />,
        name: 'Members',
        icon: 'User',
    },
    {
        path: RoutesView.memberList,
        element: <MembersList />,
        name: 'Members',
        icon: 'User',
    },
    {
        path: RoutesView.memberEdit,
        element: <MembersCreate />,
        name: 'Members',
        icon: 'User',
    },
];