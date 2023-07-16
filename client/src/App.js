import "./App.css";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import RegisterPage from "./Pages/RegisterPage";
import LoginPage from "./Pages/LoginPage";
import CreatePost from "./Pages/CreatePost";
import Post from "./Pages/Post";
import EditPost from "./Pages/EditPost";
import HomePage from "./Pages/HomePage";
import Profile from "./Pages/Profile";
import Logout from "./Pages/Logout";
import ErrorPage from "./Pages/ErrorPage";

function App() {
  return (
    <>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/profile" element={<Profile />} />

            <Route path="*" element={<ErrorPage />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
        </BrowserRouter>
    </>
  );
}

export default App;
