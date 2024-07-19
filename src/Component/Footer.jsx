import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import HomeIcon from "@mui/icons-material/Home";
import HistoryIcon from "@mui/icons-material/History";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import AppsIcon from "@mui/icons-material/Apps";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { styled } from "@mui/material/styles";

const blue = {
  50: "#F0F7FF",
  100: "#C2E0FF",
  200: "#80BFFF",
  300: "#66B2FF",
  400: "#3399FF",
  500: "#007FFF",
  600: "#0072E5",
  700: "#0059B2",
  800: "#004C99",
  900: "#003A75",
};

const grey = {
  50: "#F3F6F9",
  100: "#E5EAF2",
  200: "#DAE2ED",
  300: "#C7D0DD",
  400: "#B0B8C4",
  500: "#9DA8B7",
  600: "#6B7A90",
  700: "#434D5B",
  800: "#303740",
  900: "#1C2025",
};

const FooterContainer = styled("div")({
  display: "flex",
  width: "100%",
  justifyContent: "space-between", // Space between icons
  alignItems: "center",
  padding: "10px 0",
  backgroundColor: "#ffffff",
  borderTop: "1px solid #ccc",
  position: "initial", // Fix to the bottom
  bottom: 0,
  left: 0,
  right: 0,
});

const IconContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flex: 1,
});

const MainIconContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  position: "absolute",
  bottom: "20px",
  left: "50%",
  transform: "translateX(-50%)",
  backgroundColor: `${blue[500]}`,
  borderRadius: "50%",
  width: "60px",
  height: "60px",
  border: "5px solid #dedede", // To create a gap
  zIndex: 1,
});

const StyledIcon = styled("div")(({ theme }) => ({
  color: `${grey[600]}`,
  fontSize: "16px",
}));

function Footer() {
  return (
    <FooterContainer>
      <IconContainer>
        <StyledIcon>
          <LocalPhoneIcon />
        </StyledIcon>
      </IconContainer>
      <IconContainer>
        <StyledIcon>
          <SearchIcon />
        </StyledIcon>
      </IconContainer>
      <MainIconContainer>
        <StyledIcon>
          <AppsIcon fontSize="large" style={{ color: "white" }} />
        </StyledIcon>
      </MainIconContainer>
      <IconContainer>
        <StyledIcon>
          <HistoryIcon />
        </StyledIcon>
      </IconContainer>
      <IconContainer>
        <StyledIcon>
          <PersonOutlineIcon />
        </StyledIcon>
      </IconContainer>
    </FooterContainer>
  );
}

export default Footer;
