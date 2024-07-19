import React, { useState } from "react";
import { styled } from "@mui/system";
import PhoneIcon from "@mui/icons-material/Phone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const CallItemContainer = styled("div")`
  display: flex;
  align-items: center;
  padding: 10px;
  border: 1px solid #e5eaf2;
  border-radius: 10px;
  margin-bottom: 10px;
  background-color: #fff;
  justify-content: space-between;
`;

const CallInfo = styled("div")`
  display: flex;
  flex-direction: column;
`;

const CallDate = styled("div")`
  font-size: 12px;
  color: #bfbfbf;
  text-align: center;
  margin: 10px 0;
`;

const CallFrom = styled("div")`
  font-size: 14px;
  color: #000;
`;

const CallFromMuted = styled("div")`
  font-size: 12px;
  color: #999999;
  margin-top: 10px;
`;

const CallTime = styled("div")`
  font-size: 12px;
  color: grey;
`;

const CallItem = ({ activityCall, messageParser, updateCallInState }) => {
  const Base_URL = "https://aircall-backend.onrender.com";
  const callDate = new Date(activityCall.created_at);
  const dateString = callDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const timeString = callDate.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });

  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleCall = async (id, is_archived) => {
    try {
      const newIsArchived = !is_archived;
      const response = await axios.patch(`${Base_URL}/activities/${id}`, {
        is_archived: newIsArchived,
      });
      if (response.status === 200) {
        updateCallInState({ ...activityCall, is_archived: newIsArchived });
        messageParser(
          `Call ${newIsArchived ? "archived" : "unarchived"} successfully`
        );
        handleMenuClose();
      }
    } catch (error) {
      messageParser("Error while updating call status");
      console.error("Error while updating call status", error);
    }
  };

  return (
    <>
      <CallDate>
        .................................. {dateString}{" "}
        ..................................
      </CallDate>
      <CallItemContainer>
        <div style={{ display: "flex", alignItems: "center" }}>
          <PhoneIcon
            style={{
              marginRight: "10px",
              color: activityCall.call_type === "answered" ? "green" : "red",
            }}
          />
          <CallInfo>
            <CallFrom>{activityCall.from}</CallFrom>
            <CallFromMuted>Tried to call from test</CallFromMuted>
          </CallInfo>
        </div>
        <div style={{ display: "flex", alignItems: "center" }}>
          <MoreVertIcon
            style={{ cursor: "pointer", marginLeft: "10px" }}
            onClick={handleMenuOpen}
          />
          <CallTime>{timeString}</CallTime>
        </div>
      </CallItemContainer>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem
          onClick={() => handleCall(activityCall.id, activityCall.is_archived)}
        >
          {activityCall.is_archived ? "Unarchive" : "Archive"}
        </MenuItem>
      </Menu>
    </>
  );
};

export default CallItem;
