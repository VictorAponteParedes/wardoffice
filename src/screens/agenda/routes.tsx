import Lazy from "../../helpers/lazy";
import { RoutesView } from "../../navigation/routes";

const Agenda = Lazy(() => import("./index"));


export const AGENDA_ROUTES = [
    {
        path: RoutesView.agenda,
        element: <Agenda />,
        name: 'Agenda',
    }
]