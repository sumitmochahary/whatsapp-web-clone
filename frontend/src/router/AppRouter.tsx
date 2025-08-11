import { BrowserRouter, Routes, Route, Navigate } from "react-router";
import { useSnapshot } from "valtio";
import { state } from "../store/store";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";

export default function AppRouter() {
  const { user } = useSnapshot(state);
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <LoginPage />}
        />
        <Route
          path="/"
          element={user ? <HomePage /> : <Navigate to="/login" />}
        />
      </Routes>
    </BrowserRouter>
  );
}
