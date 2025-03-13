import React, { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import { LOGIN_USER, LOGIN_ADMIN, REGISTER_USER, REGISTER_ADMIN } from "../graphql/queries";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [restaurantName, setRestaurantName] = useState("");
  const [error, setError] = useState("");
  const [view, setView] = useState<"login" | "adminLogin" | "register" | "adminRegister" | "guest">("login");
  const [isAdminLogin, setIsAdminLogin] = useState(false); // New state for checkbox
  const navigate = useNavigate();

  const [loginUser] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      if (!data?.users?.length) {
        setError("Invalid email or password!");
        return;
      }
      localStorage.setItem("user", JSON.stringify(data.users[0]));
      alert(`Welcome, ${data.users[0].name}!`);
      navigate("/Home");
      window.location.reload();
    },
    onError: (error) => setError("Login failed: " + error.message),
  });

  const [loginAdmin] = useLazyQuery(LOGIN_ADMIN, {
    onCompleted: (data) => {
      if (!data?.users?.length) {
        setError("Invalid email, password, or admin not approved!");
        return;
      }
      localStorage.setItem("admin", JSON.stringify(data.users[0]));
      alert(`Welcome, Admin ${data.users[0].name}!`);
      navigate("/admin/dashboard");
    },
    onError: (error) => setError("Admin login failed: " + error.message),
  });

  const [registerUser] = useMutation(REGISTER_USER, {
    onCompleted: () => {
      alert("User registered successfully! Please login.");
      setView("login");
    },
    onError: (error) => {
      setError(error.message.includes("duplicate key") ? "This email is already registered." : error.message);
    },
  });

  const [registerAdmin] = useMutation(REGISTER_ADMIN, {
    onCompleted: (data) => {
      alert(`Admin registered successfully, ${data.insert_users.returning[0].name}! Awaiting approval.`);
      setView("adminLogin");
    },
    onError: (error) => {
      setError(error.message.includes("Uniqueness violation") ? "Email already exists." : "Registration failed: " + error.message);
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return setError("Email and password are required!");
    isAdminLogin ? loginAdmin({ variables: { email, password } }) : loginUser({ variables: { email, password } });
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) return setError("All fields are required!");
    registerUser({ variables: { name, email, password } });
  };

  const handleAdminRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !restaurantName || !email || !password) return setError("All fields are required!");
    registerAdmin({ variables: { name, restaurantName, email, password } });
  };

  const handleGuestLogin = () => {
    const guestUser = { name: "Guest User", email: "guest@example.com", role: "guest" };
    localStorage.setItem("user", JSON.stringify(guestUser));
    alert("You are now logged in as a guest. You cannot place orders or add items.");
    navigate("/home");
  };

  return (
    <div className="form-container">
      <div className="form-box">
        {view === "guest" ? (
          <>
            <h1>Guest Login</h1>
            <p>You are logging in as a guest. Limited access available.</p>
            <input className="input" type="email" value="dummy@gmail.com" disabled />
            <input className="input" type="password" value="guest1234" disabled />
            <button className="button" onClick={handleGuestLogin}>Continue as Guest</button>
            <p><span className="link" onClick={() => setView("login")}>Back to Login</span></p>
          </>
        ) : view === "adminRegister" ? (
          <>
            <h1>Admin Registration</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleAdminRegister}>
              <input className="input" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input className="input" type="text" placeholder="Restaurant Name" value={restaurantName} onChange={(e) => setRestaurantName(e.target.value)} />
              <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="button" type="submit">Register as Admin</button>
            </form>
            <p>Already have an account? <span className="link" onClick={() => setView("adminLogin")}>Login</span></p>
          </>
        ) : view === "register" ? (
          <>
            <h1>Register</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleRegister}>
              <input className="input" type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
              <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <button className="button" type="submit">Register</button>
            </form>
            <p>Already have an account? <span className="link" onClick={() => setView("login")}>Login</span></p>
          </>
        ) : (
          <>
            <h1>{isAdminLogin ? "Admin Login" : "User Login"}</h1>
            {error && <div className="error-message">{error}</div>}
            <form onSubmit={handleLogin}>
              <input className="input" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
              <input className="input" type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
              <label>
                <input
                  type="checkbox"
                  checked={isAdminLogin}
                  onChange={(e) => setIsAdminLogin(e.target.checked)}
                />
                Login as Admin
              </label>
              <button className="button" type="submit">Login</button>
            </form>
            <p>
              Don't have an account? <span className="link" onClick={() => setView("register")}>Register</span>
            </p>
            <p>
              Admin? <span className="link" onClick={() => setView("adminRegister")}>Register as Admin</span>
            </p>
            <p>
              Guest Login <span className="link" onClick={() => setView("guest")}> Guest</span>
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;