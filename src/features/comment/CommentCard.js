import React, { useState } from "react";
import {
  Avatar,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { fDate } from "../../utils/formatTime";
import CommentReaction from "./CommentReaction";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useDispatch } from "react-redux";
import ConfirmationModal from "../../components/ConfirmationModal";
import { deleteComment } from "./commentSlice";

function CommentCard({ comment }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showModal, setShowModal] = useState(false);
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

  const handleDeleteComment = () => {
    dispatch(deleteComment(comment._id));
    handleModalClose();
  };

  return (
    <>
      <Stack direction="row" spacing={2}>
        <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
        <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
          <Stack
            direction="row"
            alignItems={{ sm: "center" }}
            justifyContent="space-between"
            sx={{ mb: 0.5 }}
          >
            <div>
              <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                {comment.author?.name}
              </Typography>
              <Typography variant="caption" sx={{ color: "text.disabled" }}>
                {fDate(comment.createdAt)}
              </Typography>
            </div>
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
                  Delete Comment
                </MenuItem>
                <MenuItem>Edit Comment</MenuItem>
              </Menu>
            </div>
          </Stack>

          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            {comment.content}
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
            <CommentReaction comment={comment} />
          </Box>
        </Paper>
      </Stack>
      <ConfirmationModal
        open={showModal}
        onClose={handleModalClose}
        onConfirm={handleDeleteComment}
      />
    </>
  );
}

export default CommentCard;
