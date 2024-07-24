import { Route, Routes } from "react-router";
import "./App.css";
import { HOME_ROUTE } from "./routes";
import Layout from "./layout/Layout";
import Home from "./pages/Home/Home";

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
        
      </Routes>

  );
}

export default App;
