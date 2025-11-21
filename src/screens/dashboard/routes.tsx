// src/screens/dashboard/routes.tsx
import Lazy from "../../helpers/lazy";
import { RoutesView } from "../../navigation/routes";

const Dashboard = Lazy(() => import("./index"));

export const DASHBOARD_ROUTES = [
    {
        path: RoutesView.dashboard,
        element: <Dashboard />,
    },
];