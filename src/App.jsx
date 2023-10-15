import "./App.css";
import { useRoutes } from "react-router-dom";

const routes = [{ path: "/login", element: <LoginPage /> }];

function App() {
  const element = useRoutes(routes);
  return element;
}

export default App;
