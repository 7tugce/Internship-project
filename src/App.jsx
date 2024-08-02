import { Route, Routes } from "react-router";
import "./App.css";
import { HOME_ROUTE, REQUEST_ROUTE } from "./routes";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";
import Requests from "./pages/Requests/Requests";

function App() {
  return (
    
      <Routes>
        <Route
          path={HOME_ROUTE}
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        

        <Route
          path={REQUEST_ROUTE}
          element={
            <Layout>
              <Requests />
            </Layout>
          }
        />
      </Routes>

  );
}

export default App;
