import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import RegisterForm from "./Components/registrationForm/RegisterForm";
import Forgot from "./Components/Forgot/Forgot";
import LoginForm from "./Components/LoginForm/LoginForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/register" />} />
        <Route path="/register" element={<RegisterForm />} />
        <Route path="/forgot-password" element={<Forgot />} />
        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </Router>
  );
}

export default App;
