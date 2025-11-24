import Lazy from "../../helpers/lazy";
import { RoutesView } from "../../navigation/routes";

const Callings = Lazy(() => import("./index"));
const CallingDetail = Lazy(() => import("./Detail"));

export const CALLINGS_ROUTES = [
    {
        path: RoutesView.callings,
        element: <Callings />,
        name: 'Callings',
        icon: 'Briefcase',
    },
    {
        path: RoutesView.callingsDetail,
        element: <CallingDetail />,
        name: 'Calling Detail',
        icon: 'Briefcase',
        hideInMenu: true,
    },
];
