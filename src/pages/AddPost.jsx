import React from "react";
// import { PostForm } from '../components';
import { PostForm, Container } from "../components";
import Homelayout from "../Layout/Homelayout";

function AddPost() {
  return (
    <Homelayout>
      <Container>
        <PostForm />
      </Container>
    </Homelayout>
  );
}
export default AddPost;
