import React, { useEffect, useState } from "react";
import { Container, PostCard } from "../components";
import appwriteService from "../appwrite/config";
import Homelayout from "../Layout/Homelayout";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    appwriteService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
      console.log("saquib");
    });
  }, []);

  return (
    <Homelayout>
      <div className="w-full py-8 bg-gray-50">
        <Container>
          <div className="flex flex-wrap justify-center item-center">
            {posts.map((post) => (
              <div className="p-2 w-4/5" key={post.$id}>
                <PostCard {...post} />
              </div>
            ))}
          </div>
        </Container>
      </div>
    </Homelayout>
  );
}

export default AllPosts;
