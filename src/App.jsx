import { CurrentContextProvider } from "./utils";
import { Home, Collections, Dashboard, Services, API } from "./pages/";
import styles from "./App.module.scss";
import { MainLayout } from "./Layouts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { NFTCollection } from "./pages/Collections/pages";
import PrivateRoute from "./utils/auth/PrivateRoute";

function App() {
  return (
    <CurrentContextProvider>
      <Router basename="/">
        <div className={styles.container}>
          <Routes>
            <Route
              path="/"
              element={
                <MainLayout>
                  <Home />
                </MainLayout>
              }
            />
            <Route
              path="/dashboard"
              element={
                <PrivateRoute
                  component={
                    <MainLayout>
                      <Dashboard />
                    </MainLayout>
                  }
                />
              }
            />
            <Route
              path="/collections/:parentWalletAddress"
              element={
                <PrivateRoute
                  component={
                    <MainLayout>
                      <NFTCollection />
                    </MainLayout>
                  }
                />
              }
            />
            <Route
              path="/collections"
              element={
                <PrivateRoute
                  component={
                    <MainLayout>
                      <Collections />
                    </MainLayout>
                  }
                />
              }
            />
            <Route
              path="/services"
              element={
                <PrivateRoute
                  component={
                    <MainLayout>
                      <Services />
                    </MainLayout>
                  }
                />
              }
            />
            <Route
              path="/services/api/*"
              element={
                <PrivateRoute
                  component={
                    <MainLayout>
                      <API />
                    </MainLayout>
                  }
                />
              }
            />
          </Routes>
        </div>
      </Router>
    </CurrentContextProvider>
  );
}

export default App;
