import React from "react";
import { Container, Logo, LogoutBtn } from "../index";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import authSlice from "../../store/authSlice";

function Header({ toggleTheme, darkMode }) {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navItems = [
    {
      name: "Home",
      slug: "/",
      active: authStatus,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "Signup",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  return (
    <header className="py-3 px-4 shadow bg-[#3ca3f8]">
      <Container>
        <nav className="flex justify-between">
          <div className="">
            <Link to={"/"}>
              <Logo width="50px" />
            </Link>
          </div>
          <ul className="flex gap-1 mr-0">
            <li>
              <button
                onClick={toggleTheme}
                className="flex items-center px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none hover:shadow-md transition"
              >
                {darkMode ? "🌙 Dark" : "☀️ Light"}
              </button>
            </li>
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="flex items-center px-3 py-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none hover:shadow-md transition"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
            {authStatus && (
              <li>
                <LogoutBtn />
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
