import Lazy from "../../helpers/lazy";
import { RoutesView } from "../../navigation/routes";

const Topics = Lazy(() => import("./index"));
const TopicDetail = Lazy(() => import("./Detail"));
const TopicForm = Lazy(() => import("./Form"));

export const TOPICS_ROUTES = [
    {
        path: RoutesView.topics,
        element: <Topics />,
        name: 'Topics',
    },
    {
        path: RoutesView.topicsCreate,
        element: <TopicForm />,
        name: 'Create Topic',
    },
    {
        path: RoutesView.topicsEdit,
        element: <TopicForm />,
        name: 'Edit Topic',
    },
    {
        path: RoutesView.topicsDetail,
        element: <TopicDetail />,
        name: 'Topic Detail',
    }
]
