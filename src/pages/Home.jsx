import React, { useState, useEffect } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Homelayout from "../Layout/Homelayout";
import Loading from "../components/Loading/Loading";
import FullscreenLoader from "../components/Loading/FullscreenLoader";
import Spinner from "../components/Loading/Spinner";
import BarLoader from "../components/Loading/BarLoader";
import DotsLoader from "../components/Loading/DotsLoader";
import CircularLoader from "../components/Loading/CircularProgress";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    try {
      appwriteService.getPosts().then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      });
      if (!authStatus) {
        setPosts([]);
      }
    } catch (error) {
      console.log("Error while getting posts: ", error);
    } finally {
      setLoading(false);
    }
  }, [authStatus]);

  // if (posts.length === 0) {
  //   return <Homelayout></Homelayout>;
  // }

  // if (loading === true) {
  //   return <FullscreenLoader />;
  // }

  return (
    <Homelayout>
      {posts ? (
        <div className="w-full py-16 bg-gray-50">
          <Container>
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
              Latest Posts
            </h2>
            {loading ? (
              <CircularLoader />
            ) : (
              <div className="flex justify-center items-center">
                <div className="grid md:grid-cols-1 gap-4">
                  {posts.map((post) => (
                    <div
                      key={post.$id}
                      className="flex justify-center items-center"
                    >
                      <div className="p-4 bg-white w-4/5 shadow-lg rounded-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                        <PostCard {...post} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Container>
        </div>
      ) : (
        <div className="w-full py-16 mt-8 text-center bg-gray-50">
          <Container>
            <div className="max-w-xl mx-auto">
              <h1 className="text-3xl font-extrabold text-gray-700 mb-4">
                Login to read posts
              </h1>
              <p className="text-lg text-gray-500 mb-8">
                It looks like you're not logged in. Please login to explore our
                content.
              </p>
              <Link
                to="/login"
                className="inline-block px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition duration-300"
              >
                Login
              </Link>
            </div>
          </Container>
        </div>
      )}
    </Homelayout>
  );
}
export default Home;
