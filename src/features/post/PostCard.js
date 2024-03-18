import React, { useState } from "react";
import {
  Box,
  Link,
  Card,
  Stack,
  Avatar,
  Typography,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { fDate } from "../../utils/formatTime";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import PostReaction from "./PostReaction";
import CommentList from "../comment/CommentList";
import CommentForm from "../comment/CommentForm";
import ConfirmationModal from "../../components/ConfirmationModal";

import { useDispatch } from "react-redux";
import { deletePost } from "./postSlice";
import EditPostForm from "./EditPostForm";

function PostCard({ post }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const dispatch = useDispatch();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleModalOpen = () => {
    setShowModal(true);
    handleClose();
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleDeletePost = () => {
    dispatch(deletePost(post._id));
    handleModalClose();
  };

  const handleEditPost = () => {
    setEditMode(true);
    handleClose();
  };

  const handleCloseModal = () => {
    setEditMode(false);
  };

  return (
    <Card>
      <CardHeader
        disableTypography
        avatar={
          <Avatar src={post?.author?.avatarUrl} alt={post?.author?.name} />
        }
        title={
          <Link
            variant="subtitle2"
            color="text.primary"
            component={RouterLink}
            sx={{ fontWeight: 600 }}
            to={`/user/${post.author._id}`}
          >
            {post?.author?.name}
          </Link>
        }
        subheader={
          <Typography
            variant="caption"
            sx={{ display: "block", color: "text.secondary" }}
          >
            {fDate(post.createdAt)}
          </Typography>
        }
        action={
          <div>
            <IconButton onClick={handleClick}>
              <MoreVertIcon sx={{ fontSize: 30 }} />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleClose}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
            >
              <MenuItem sx={{ color: "red" }} onClick={handleModalOpen}>
                Delete Post
              </MenuItem>
              <MenuItem onClick={handleEditPost}>Edit Post</MenuItem>
            </Menu>
          </div>
        }
      />

      {editMode ? (
        <EditPostForm post={post} handleCloseModal={handleCloseModal} />
      ) : (
        <Stack spacing={2} sx={{ p: 3 }}>
          <Typography>{post.content}</Typography>

          {post.image && (
            <Box
              sx={{
                borderRadius: 2,
                overflow: "hidden",
                height: 300,
                "& img": { objectFit: "cover", width: 1, height: 1 },
              }}
            >
              <img src={post.image} alt="post" />
            </Box>
          )}

          <PostReaction post={post} />
          <CommentList postId={post._id} />
          <CommentForm postId={post._id} />
        </Stack>
      )}

      <ConfirmationModal
        open={showModal}
        onClose={handleModalClose}
        onConfirm={handleDeletePost}
      />
    </Card>
  );
}

export default PostCard;
