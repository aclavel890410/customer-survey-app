import { createBrowserRouter } from "react-router-dom";
import { QuestionsPage } from "../pages/QuestionsPage";
import { AddQuestionPage } from "../pages/AddQuestionPage";
import { EditQuestionPage } from "../pages/EditQuestionPage";


export const router = createBrowserRouter([
    {
      path: "/",
      element: <QuestionsPage />,
      
    },
    {
      path: "/questions",
      element: <QuestionsPage />,
    },
    {
      path: "/questions/add",
      element: <AddQuestionPage />,
    },
    {
      path: "/questions/:questionId",
      element: <EditQuestionPage />,
    },
  ]);
  