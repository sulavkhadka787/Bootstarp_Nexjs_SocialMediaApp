import React, { useState } from "react";
import axios from "axios";
import { Row, Col, Image, Container } from "react-bootstrap";
import Example from "../../components/Layout/Example";
import CommentInputField from "../../components/Posts/CommentInputField";
import PostComments from "../../components/Posts/PostComments";
import baseUrl from "../../utils/baseUrl";
import { parseCookies } from "nookies";
import Link from "next/link";
import calculateTime from "../../utils/calculateTime";
import { likePost } from "../../utils/postActions";
import LikeList from "../../components/Posts/LikeList";

function PostPage({ post, errorLoading, user }) {
  const [likes, setLikes] = useState(post.likes);
  const [comments, setComments] = useState(post.comments);

  const isLiked = likes.length > 0;

  if (errorLoading) {
    return <div>No Post Found</div>;
  }
  return (
    <>
      {" "}
      <Container className="my-5" style={{ border: "1px solid" }}>
        {post.picUrl && (
          <Row className="my-2">
            <img src={post.picUrl} />
          </Row>
        )}

        <Row className="mt-3 mb-3 justify-content-between">
          <Col className="d-flex flex-grow-1 col-md-10">
            <div>
              <Image
                style={{ height: "40px", width: "40px" }}
                roundedCircle
                src={user.profilePicUrl}
              />
            </div>

            <div className="px-3">
              {" "}
              <Link href={`/${post.user.username}`}>
                <a>{post.user.username}</a>
              </Link>
              <br />
              <span>{calculateTime(post.createdAt)}</span> |{" "}
              {post.location && <span>{post.location}</span>}
            </div>
          </Col>
        </Row>
        <Row>
          <Col>{post.text}</Col>
        </Row>
        <hr />
        <Row>
          <div className="d-inline">
            {isLiked ? (
              <i
                className="fa fa-heart"
                style={{ color: "red" }}
                onClick={() => likePost(post._id, user._id, setLikes, false)}
              ></i>
            ) : (
              <i
                className="fa fa-heart-o"
                onClick={() => likePost(post._id, user._id, setLikes, true)}
              ></i>
            )}
            {"   "}
            {likes.length > 0 && <LikeList postId={post._id} />}
            {"  "}
            <i className="fa fa-comment-o"></i>
          </div>
        </Row>
        <Row>
          {comments.map((comment, i) => (
            <PostComments
              key={comment._id}
              post={post}
              comment={comment}
              user={user}
              setComments={setComments}
            />
          ))}
        </Row>
      </Container>
    </>
  );
}

PostPage.getInitialProps = async (ctx) => {
  try {
    const { postId } = ctx.query;
    const { token } = parseCookies(ctx);

    const res = await axios.get(`${baseUrl}/api/posts/${postId}`, {
      headers: { Authorization: token },
    });
    return { post: res.data };
  } catch (error) {
    return { errorLoading: true };
  }
};

export default PostPage;
