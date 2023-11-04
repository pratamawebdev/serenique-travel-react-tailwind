import "./App.css";
import { useRoutes } from "react-router-dom";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import DashboardPage from "./pages/dashboard";
import UserPage from "./pages/user";
import BannerPage from "./pages/banner";
import PromoPage from "./pages/promo";
import NotFoundPage from "./pages/NotFound";
import ProtectedRoute from "./routes/ProtectedRoute";
import CategoryPage from "./pages/category";
import ProfilePage from "./pages/profile";
import HomePage from "./pages/home";
import ActivityPage from "./pages/activity";
import ProtectedProfile from "./routes/ProtectedProfile";
import DetailActivityPage from "./pages/detailActivity";
import EditActivityPage from "./pages/editActivity";
import EditPromoPage from "./pages/editPromo";
import AddActivityPage from "./pages/addActivity";
import AddPromoPage from "./pages/addPromo";

const routes = [
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/banner",
    element: (
      <ProtectedRoute>
        <BannerPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/promo",
    element: (
      <ProtectedRoute>
        <PromoPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addPromo",
    element: (
      <ProtectedRoute>
        <AddPromoPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editPromo/:id",
    element: (
      <ProtectedRoute>
        <EditPromoPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/category",
    element: (
      <ProtectedRoute>
        <CategoryPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/user",
    element: (
      <ProtectedRoute>
        <UserPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/activity",
    element: (
      <ProtectedRoute>
        <ActivityPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/detailActivity/:id",
    element: (
      <ProtectedRoute>
        <DetailActivityPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/editActivity/:id",
    element: (
      <ProtectedRoute>
        <EditActivityPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/addActivity",
    element: (
      <ProtectedRoute>
        <AddActivityPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/profile",
    element: (
      <ProtectedProfile>
        <ProfilePage />
      </ProtectedProfile>
    ),
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
];

function App() {
  const element = useRoutes(routes);
  return element;
}

export default App;
