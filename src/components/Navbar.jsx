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
import GoogleLogin from "react-google-login";
import { useEffect } from "react";
import { gapi } from "gapi-script";
import LanguagePopover from "../Language/LanguagePopover";
import { useState } from "react";
const pages = [];

const settings = ["Profile", "Recipe", "Logout", ""];
const clientId = process.env.REACT_APP_GOOGLE_CLIENTID;
function Navbar() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [token, setToken] = React.useState("");
  const [imageUser, setImageUser] = React.useState("");
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };
  const handleClose = () => {
    //  navigate("/dashboard/profile");
    console.log("check");
    setOpen(null);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleSetting = (setting) => {
    setOpen(null);
    if (setting === "Logout") {
      localStorage.removeItem("token");
      const token = localStorage.getItem("token");
      // console.log(token);
      setToken(token);
      navigate("/home");
    }
    if (setting === "Profile") {
      navigate("/profile");
    }

    if (setting === "Recipe") {
      navigate("/recipe-management");
    }
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    function start() {
      gapi.client.init({
        clientId: clientId,
        scope: "",
      });
    }
    gapi.load("client:auth2", start);
  });
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, [token]);
  const onSuccess = async (res) => {
   window.location.reload();
   

    if (res.tokenId) {
      console.log(res.TokenId)
      const testAutho = async () => {
        let api = await fetch(
          process.env.REACT_APP_URI_Local + "api/User/userLogin",
          {
            method: "POST",
            body: JSON.stringify({
              IdToken: res.tokenId,
            }),
            headers: {
              "Content-type": "application/json; charset=UTF-8",
            },
          },
        );

        let token = "";
        token = await api.json();
        console.log("Login successtoken!", token);
        //console.log("token", token);
        localStorage.setItem("token", token.token);
        setToken(token.token);
        localStorage.setItem("imageUser", token.imageUser);
        setImageUser(token.imageUser);
      };
      testAutho();
    }
  };
  const onFalure = (res) => {
    console.log("Login Fail!", res);
  };
  return (
    <AppBar
      sx={{
        zIndex: 12,
        overflow: "hidden",
        background:
          "linear-gradient(to right bottom, rgb(73, 73, 73), rgb(49, 49, 49))",
      }}
      position="static">
      <Container
        sx={{
          background:
            "linear-gradient(to right bottom, rgb(73, 73, 73), rgb(49, 49, 49))",
        }}
        maxWidth="xl">
        <Toolbar disableGutters>
          {/* <RiceBowlIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} /> */}
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            {/* <img src="https://localhost:44337/images\original-62b8a65b3a744b16072a125d9b7774f3.webporiginal-62b8a65b3a744b16072a125d9b7774f3.webp" alt="aloalo" /> */}
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
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}>
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <RiceBowlIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}>
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "white", display: "block" }}>
                {page}
              </Button>
            ))}
          </Box>
          <Box
            sx={{
              height: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Category />
            <Search />
            <LanguagePopover onClose={handleClose} />
          </Box>
          {token != null ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src={imageUser ? process.env.REACT_APP_URI_Local + imageUser : "/static/images/avatar/2.jpg"} />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}>
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography
                      onClick={() => handleSetting(setting)}
                      textAlign="center">
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box
              sx={{
                width: 100,
                height: 1,
                flexGrow: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}>
              <GoogleLogin
                render={(renderProps) => (
                  <>
                    <AccountCircleIcon />
                    <Button color="inherit" onClick={renderProps.onClick}>
                      Login
                    </Button>
                  </>

                  //   <Button id={props.id} fullWidth size="large" color="inherit" variant="outlined" onClick={renderProps.onClick}>
                  //   <Iconify icon="eva:google-fill" color="#DF3E30" width={22} height={22} />

                  // </Button>
                )}
                // <GoogleButton id={props.id} onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign in with Google</GoogleButton>

                //  className='GGButton'
                clientId={clientId}
                onSuccess={onSuccess}
                onFailure={onFalure}
                cookiePolicy={"single_host_origin"}
                //isSignedIn={true}
              />
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;

const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
  justify-content: center;
  color: "white";
`;
