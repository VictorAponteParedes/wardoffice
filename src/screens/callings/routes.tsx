import Lazy from "../../helpers/lazy";
import { RoutesView } from "../../navigation/routes";

const Callings = Lazy(() => import("./index"));

export const CALLINGS_ROUTES = [
    {
        path: RoutesView.callings,
        element: <Callings />,
        name: 'Callings',
        icon: 'Briefcase',
    },
];
