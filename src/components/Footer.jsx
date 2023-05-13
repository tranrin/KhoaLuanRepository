import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { MenuItem } from "@mui/material";
import RiceBowlIcon from "@mui/icons-material/RiceBowl";
import { Link, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { GiKnifeFork } from "react-icons/gi";
import Search from "./Search";
import Category from "./Category";
const pages = [];
const settings = ["Profile", "Recipe", "Logout", ""];

function Footer() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [token, setToken] = React.useState("");
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleSetting = (setting) => {
    if (setting === "Logout") {
      localStorage.removeItem("token");
      const token = localStorage.getItem("token");
      console.log(token);
      setToken(token);
    }
    if (setting === "Profile") {
      navigate("/profile");
    }

    if (setting === "Recipe") {
      navigate("/recipe-management");
    }
  };

  const handleLogin = () => {
    localStorage.setItem("token", "token");
    const token = localStorage.getItem("token");
    setToken(token);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, [token]);

  return (
    <Box
      sx={{
        overflow: "hidden",
        height: 100,
        background:
          "linear-gradient(to right bottom, rgb(73, 73, 73), rgb(49, 49, 49))",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
      position="static">
      <Logo Logo to={"/home"}>
        <GiKnifeFork
          style={{
            color: "#fff",
          }}
        />
        <Typography
          sx={{
            color: "#fff",
          }}
          variant="4">
          {" "}
          delicious
        </Typography>
      </Logo>
      <Typography
        sx={{
          fontWeight: 600,
          color: "white",
          fontSize: 16,
          textAlign: "center",
        }}
        variant="h4">
        @Direct By Ngoc Xet
      </Typography>
    </Box>
  );
}
export default Footer;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
  justify-content: center;
  color: "white";
`;
