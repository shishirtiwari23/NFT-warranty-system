import { CurrentContextProvider } from "./utils";
import { Home, Collections, Dashboard, Services, API } from "./pages/";
import styles from "./App.module.scss";
import { MainLayout } from "./Layouts";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

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
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              }
            />
            <Route
              path="/collections"
              element={
                <MainLayout>
                  <Collections />
                </MainLayout>
              }
            />
            <Route
              path="/services"
              element={
                <MainLayout>
                  <Services />
                </MainLayout>
              }
            />
            <Route
              path="/services/api"
              element={
                <MainLayout>
                  <API />
                </MainLayout>
              }
            />
          </Routes>
        </div>
      </Router>
    </CurrentContextProvider>
  );
}

export default App;
