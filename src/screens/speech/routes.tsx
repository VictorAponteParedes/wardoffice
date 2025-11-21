import Lazy from "../../helpers/lazy";
import { RoutesView } from "../../navigation/routes";

const Speech = Lazy(() => import("./index"));
export const SPEECH_ROUTES = [
    {
        path: RoutesView.speech,
        element: <Speech />,
        name: 'Speech',
        icon: 'User',
    },
];