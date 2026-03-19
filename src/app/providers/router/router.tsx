import { Suspense, lazy, type ComponentType, type ReactNode } from "react";
import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./root-layout";
import { PrivateRoute } from "../../../shared/lib/routing/PrivateRoute";
import { Loader } from "../../../shared/ui/loader/loader";

const MainPage = lazy(() =>
  import("../../../pages/MainPage").then((module) => ({
    default: module.MainPage,
  }))
);
const SkillPage = lazy(() =>
  import("../../../pages/skill/SkillPage").then((module) => ({
    default: module.SkillPage,
  }))
);
const NotFound404 = lazy(() =>
  import("../../../pages/errors/NotFound404").then((module) => ({
    default: module.NotFound404,
  }))
);
const Server500 = lazy(() =>
  import("../../../pages/errors/Server500").then((module) => ({
    default: module.Server500,
  }))
);
const StaticPage = lazy(() =>
  import("../../../pages/info/StaticPage").then((module) => ({
    default: module.StaticPage,
  }))
);
const Profile = lazy(() =>
  import("../../../pages/profile/Profile").then((module) => ({
    default: module.Profile,
  }))
);
const Personal = lazy(() =>
  import("../../../pages/profile/sections/personal").then((module) => ({
    default: module.Personal,
  }))
);
const Requests = lazy(() =>
  import("../../../pages/profile/sections/requests").then((module) => ({
    default: module.Requests,
  }))
);
const Exchanges = lazy(() =>
  import("../../../pages/profile/sections/exchanges").then((module) => ({
    default: module.Exchanges,
  }))
);
const Favorites = lazy(() =>
  import("../../../pages/profile/sections/favorites").then((module) => ({
    default: module.Favorites,
  }))
);
const Skills = lazy(() =>
  import("../../../pages/profile/sections/skillsPage").then((module) => ({
    default: module.Skills,
  }))
);
const LoginPage = lazy(() =>
  import("../../../pages/auth/LoginPage").then((module) => ({
    default: module.LoginPage,
  }))
);
const FavoritesPage = lazy(() =>
  import("../../../pages/favorites/FavoritesPage").then((module) => ({
    default: module.FavoritesPage,
  }))
);
const CreateSkillPage = lazy(() =>
  import("../../../pages/createSkill/CreateSkillPage").then((module) => ({
    default: module.CreateSkillPage,
  }))
);
const RegistrationStepOnePage = lazy(() =>
  import("../../../pages/registration/RegistrationStepOnePage").then(
    (module) => ({
      default: module.RegistrationStepOnePage,
    })
  )
);
const RegistrationStepTwoPage = lazy(() =>
  import("../../../pages/registration/RegistrationStepTwoPage").then(
    (module) => ({
      default: module.RegistrationStepTwoPage,
    })
  )
);
const RegistrationStepThreePage = lazy(() =>
  import("../../../pages/registration/RegistrationStepThreePage").then(
    (module) => ({
      default: module.RegistrationStepThreePage,
    })
  )
);
const Offer = lazy(() =>
  import("../../../pages/modals/Offer").then((module) => ({
    default: module.Offer,
  }))
);
const SuccessOffer = lazy(() =>
  import("../../../pages/modals/SuccessOffer").then((module) => ({
    default: module.SuccessOffer,
  }))
);
const SuccessExchange = lazy(() =>
  import("../../../pages/modals/SuccessExchange").then((module) => ({
    default: module.SuccessExchange,
  }))
);

const renderLazy = (Component: ComponentType) => (
  <Suspense fallback={<Loader />}>
    <Component />
  </Suspense>
);

const withPrivate = (
  element: ReactNode,
  options: { anonymous?: boolean } = {}
) => <PrivateRoute {...options}>{element}</PrivateRoute>;

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { index: true, element: renderLazy(MainPage) },
      { path: "skills", element: renderLazy(MainPage) },
      { path: "skill/:id", element: renderLazy(SkillPage) },
      { path: "about", element: renderLazy(StaticPage) },
      { path: "contacts", element: renderLazy(StaticPage) },
      { path: "blog", element: renderLazy(StaticPage) },
      { path: "privacy", element: renderLazy(StaticPage) },
      { path: "terms", element: renderLazy(StaticPage) },
      { path: "500", element: renderLazy(Server500) },
      { path: "*", element: renderLazy(NotFound404) },

      {
        path: "profile",
        element: withPrivate(renderLazy(Profile)),
        children: [
          { index: true, element: renderLazy(Personal) },
          { path: "personal", element: renderLazy(Personal) },
          { path: "requests", element: renderLazy(Requests) },
          { path: "exchanges", element: renderLazy(Exchanges) },
          { path: "favorites", element: renderLazy(Favorites) },
          { path: "skills", element: renderLazy(Skills) },
        ],
      },
      {
        path: "favorites",
        element: withPrivate(renderLazy(FavoritesPage)),
      },
      {
        path: "create",
        element: withPrivate(renderLazy(CreateSkillPage)),
      },

      {
        path: "login",
        element: withPrivate(renderLazy(LoginPage), { anonymous: true }),
      },
      {
        path: "registration/step1",
        element: withPrivate(renderLazy(RegistrationStepOnePage), {
          anonymous: true,
        }),
      },
      {
        path: "registration/step2",
        element: withPrivate(renderLazy(RegistrationStepTwoPage), {
          anonymous: true,
        }),
      },
      {
        path: "registration/step3",
        element: withPrivate(renderLazy(RegistrationStepThreePage), {
          anonymous: true,
        }),
      },

      {
        path: "register/offer",
        element: withPrivate(renderLazy(Offer), { anonymous: true }),
      },
      {
        path: "register/success",
        element: withPrivate(renderLazy(SuccessOffer), { anonymous: true }),
      },
      {
        path: "offer/success",
        element: withPrivate(renderLazy(SuccessExchange)),
      },
    ],
  },
]);

export default router;
