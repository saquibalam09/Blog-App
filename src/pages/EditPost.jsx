import React, { useState, useEffect } from "react";
import { Container, PostCard, PostForm } from "../components";
import appwriteService from "../appwrite/config";
import { useNavigate, useParams } from "react-router-dom";
import Homelayout from "../Layout/Homelayout";

function EditPost() {
  const [post, setPost] = useState([]);
  const { slug } = useParams();

  const navigate = useNavigate();
  useEffect(() => {
    if (slug) {
      appwriteService.getPost(slug).then((post) => {
        if (post) {
          setPost(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);

  return post ? (
    <Homelayout>
      <div className="py-8">
        <Container>
          <PostForm {...post} />
        </Container>
      </div>
    </Homelayout>
  ) : null;
}

export default EditPost;
