import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./root-layout";

// Pages
import { MainPage } from "../../../pages/MainPage";
import { SkillPage } from "../../../pages/skill/SkillPage";
import { NotFound404 } from "../../../pages/errors/NotFound404";

// Profile pages
import { Profile } from "../../../pages/profile/Profile";
import { Personal } from "../../../pages/profile/sections/personal";
import { Requests } from "../../../pages/profile/sections/requests";
import { Exchanges } from "../../../pages/profile/sections/exchanges";
import { Favorites } from "../../../pages/profile/sections/favorites";
import { Skills } from "../../../pages/profile/sections/skillsPage";

// Auth pages
import { LoginPage } from "../../../pages/auth/LoginPage";
import { PrivateRoute } from "../../../pages/auth/PrivateRoute";

// Registration pages
import { RegistrationStepOnePage } from "../../../pages/registration/RegistrationStepOnePage";
import { RegistrationStepTwoPage } from "../../../pages/registration/RegistrationStepTwoPage";
import { RegistrationStepThreePage } from "../../../pages/registration/RegistrationStepThreePage";

// Modal components
import { Offer } from "../../../pages/modals/Offer";
import { SuccessOffer } from "../../../pages/modals/SuccessOffer";
import { SuccessExchange } from "../../../pages/modals/SuccessExchange";

const withPrivate = (
  element: React.ReactNode,
  options: { anonymous?: boolean } = {}
) => <PrivateRoute {...options}>{element}</PrivateRoute>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: <MainPage /> },
      { path: "skill/:id", element: <SkillPage /> },
      { path: "*", element: <NotFound404 /> },

      {
        path: "profile",
        element: withPrivate(<Profile />),
        children: [
          { index: true, element: <Personal /> },
          { path: "personal", element: <Personal /> },
          { path: "requests", element: <Requests /> },
          { path: "exchanges", element: <Exchanges /> },
          { path: "favorites", element: <Favorites /> },
          { path: "skills", element: <Skills /> },
        ],
      },

      {
        path: "login",
        element: withPrivate(<LoginPage />, { anonymous: true }),
      },
      {
        path: "registration/step1",
        element: withPrivate(<RegistrationStepOnePage />, { anonymous: true }),
      },
      {
        path: "registration/step2",
        element: withPrivate(<RegistrationStepTwoPage />, { anonymous: true }),
      },
      {
        path: "registration/step3",
        element: withPrivate(<RegistrationStepThreePage />, {
          anonymous: true,
        }),
      },

      {
        path: "register/offer",
        element: withPrivate(<Offer />, { anonymous: true }),
      },
      {
        path: "register/success",
        element: withPrivate(<SuccessOffer />, { anonymous: true }),
      },
      {
        path: "offer/success",
        element: withPrivate(<SuccessExchange />),
      },
    ],
  },
]);

export default router;
