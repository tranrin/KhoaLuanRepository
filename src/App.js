import Category from "./components/Category";
import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import styled from "styled-components";
import { GiKnifeFork } from "react-icons/gi";
import ReactGA from "react-ga4";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./components/Navbar";
import { Grid } from "@mui/material";

function App() {
  // useEffect(() => {
  //   ReactGA.initialize(process.env.REACT_APP_TRACKING_ID);
  //   ReactGA.send({ hitType: "pageview", page: "/home" });
  // }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Grid
          sx={{
            position: "fixed",
            overflow: "hidden",
            zIndex: 10000,
            top: 0,
            left: 0,
            right: 0,
          }}
          container
          xs={12}
          lg={12}
          md={12}>
          <Navbar />
        </Grid>
        <Nav></Nav>
        <Search></Search>
        <Category></Category>
        <Pages></Pages>
      </BrowserRouter>
    </div>
  );
}
const Logo = styled(Link)`
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: 400;
  font-family: "Lobster Two", cursive;
  justify-content: center;
`;
const Nav = styled.div`
  padding: 4rem 0rem;
  margin-top: 1rem;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  svg {
    font-size: 2rem;
  }
`;
export default App;
