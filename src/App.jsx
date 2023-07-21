import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import AuthRoute from "./components/AuthRoute";
import Auth from "./pages/Auth/Auth";
import Register from "./pages/Auth/Register";
import PasswordReset from "./pages/Auth/PasswordReset";
import UpdatePassword from "./pages/Auth/UpdatePassword";
import "./App.scss";

const Home = lazy(() => import("./pages/Home/Home"));
const Dashboard = lazy(() => import("./pages/Dashboard/Dashboard"));
const UpdateCreator = lazy(() => import("./pages/Dashboard/UpdateCreator"));

function App() {
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route element={<AuthRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/dashboard">
              <Route index element={<Dashboard />} />
              <Route path="edit/:id" element={<UpdateCreator />} />
            </Route>
          </Route>
          <Route path="/login" element={<Auth />} />
          <Route path="/register" element={<Register />} />
          <Route path="/reset-password" element={<PasswordReset />} />
          <Route path="/update-password" element={<UpdatePassword />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
