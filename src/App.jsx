import "./App.css";
import { useRoutes } from "react-router-dom";
import LoginPage from "./pages/login";

const routes = [{ path: "/login", element: <LoginPage /> }];

function App() {
  const element = useRoutes(routes);
  return element;
}

export default App;
