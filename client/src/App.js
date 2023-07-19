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
import NavbarComp from "./Components/NavbarComp";
import Footer from "./Components/Footer";
import Stock from "./Pages/Stock";

function App() {
  return (
    <>
      <BrowserRouter>
        <NavbarComp/>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/create" element={<CreatePost />} />
            <Route path="/post/:id" element={<Post />} />
            <Route path="/edit/:id" element={<EditPost />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/stock" element={<Stock />} />


            <Route path="*" element={<ErrorPage />} />
            <Route path="/logout" element={<Logout />} />
          </Routes>
          <Footer/>
      </BrowserRouter>
    </>
  );
}

export default App;
