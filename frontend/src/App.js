import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from "react-router-dom";

// Page
import EditEventPage from "./pages/EditEvent";
import ErrorPage from "./pages/Error";
import EventDetailPage, {
  loader as eventLoaderDetail,
  action as deleteEventAction,
} from "./pages/EventDetail";
import EventsPage, { loader as eventsLoader } from "./pages/Events";
import EventsRootLayout from "./pages/EventsRoot";
import HomePage from "./pages/Home";
import NewEventPage from "./pages/NewEvent";
import RootLayout from "./pages/Root";
import NewsletterPage, { action as newsletterAction } from "./pages/Newsletter";
import AuthPage, { action as authAction } from "./pages/Authentication";
import { action as logoutAction } from "./pages/Logout";
import { tokenLoader, checkAuthLoader } from "./util/auth";

// Component action
import { action as manipulateEventAction } from "./components/EventForm";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path="/"
      element={<RootLayout />}
      errorElement={<ErrorPage />}
      id="root"
      loader={tokenLoader}
    >
      <Route index element={<HomePage />} />
      <Route path="events" element={<EventsRootLayout />}>
        <Route index element={<EventsPage />} loader={eventsLoader} />
        <Route path=":id" id="event-detail" loader={eventLoaderDetail}>
          <Route
            index
            element={<EventDetailPage />}
            action={deleteEventAction}
          />
          <Route
            path="edit"
            element={<EditEventPage />}
            action={manipulateEventAction}
            loader={checkAuthLoader}
          />
        </Route>
        <Route
          path="new"
          element={<NewEventPage />}
          action={manipulateEventAction}
          loader={checkAuthLoader}
        />
      </Route>
      <Route path="auth" element={<AuthPage />} action={authAction} />
      <Route
        path="newsletter"
        element={<NewsletterPage />}
        action={newsletterAction}
      />
      <Route path="/logout" action={logoutAction} loader={checkAuthLoader} />
      {/* <Route path="*" element={<ErrorPage />} /> */}
    </Route>
  )
);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <RootLayout />,
//     errorElement: <ErrorPage />,
//     children: [
//       {
//         index: true,
//         element: <HomePage />,
//       },
//       {
//         path: "events",
//         element: <EventsRootLayout />,
//         children: [
//           {
//             index: true,
//             element: <EventsPage />,
//             // Hàm load API
//             loader: eventsLoader,
//           },
//           {
//             path: ":id",
//             // Nếu muốn cho hàm loader của cha chạy cho các children thì phải thêm id vào
//             id: "event-detail",
//             // Hàm load API
//             loader: eventLoaderDetail,
//             children: [
//               {
//                 index: true,
//                 element: <EventDetailPage />,
//                 action: deleteEventAction,
//               },
//               {
//                 path: "edit",
//                 element: <EditEventPage />,
//                 action: manipulateEventAction,
//               },
//             ],
//           },
//           {
//             path: "new",
//             element: <NewEventPage />,
//             // Hàm pust data
//             action: manipulateEventAction,
//           },
//         ],
//       },
//       {
//         path: "newsletter",
//         element: <NewsletterPage />,
//         action: newsletterAction,
//       },
//     ],
//   },
// ]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
