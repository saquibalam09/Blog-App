import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import "./App.css";
import { Footer, Header } from "./components/index";
import Login from "./pages/Login";
import {
  Outlet,
  Route,
  Routes,
  BrowserRouter as Router,
} from "react-router-dom";
import Home from "./pages/Home";
import SignUp from "./pages/SignUp";
import AllPosts from "./pages/AllPosts";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Post from "./pages/Post";
import { RequireAuth } from "./components/Auth/RequireAuth";

function App() {
  // const [loading, setLoading] = useState(true);
  // const dispatch = useDispatch();

  // useEffect(() => {
  //   authService
  //     .getCurrentUser()
  //     .then((userData) => {
  //       if (userData) {
  //         dispatch(login({ userData }));
  //       } else {
  //         dispatch(logout());
  //       }
  //     })
  //     .finally(() => setLoading(false));
  // }, []);

  // return !loading ? (
  //   <div className="min-h-screen flex flex-wrap content-between bg-gray-700">
  //     <div className="w-full block mt-auto">
  //       <Header />
  //       <main>
  //         <Outlet />
  //       </main>
  //       <Footer />
  //     </div>
  //   </div>
  // ) : null;

  return (
    <>
      <Router>
        <Routes>
          <Route element={<RequireAuth />}>
            <Route path="/" element={<Home />}></Route>
            <Route path="/all-posts" element={<AllPosts />}></Route>
            <Route path="/add-post" element={<AddPost />}></Route>
            <Route path="/post/:slug" element={<Post />}></Route>
            <Route path="/edit-post/:slug" element={<EditPost />}></Route>
          </Route>

          <Route path="/login" element={<Login />}></Route>
          <Route path="/signup" element={<SignUp />}></Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
