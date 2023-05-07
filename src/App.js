import Category from "./components/Category";
import { BrowserRouter } from "react-router-dom";
import Pages from "./pages/Pages";
import Search from "./components/Search";
import styled from "styled-components";
import { GiKnifeFork } from "react-icons/gi";
import ReactGA from "react-ga4";
import { Link } from "react-router-dom";
import { useEffect } from "react";



function App() {
  useEffect(()=>{
    ReactGA.initialize(process.env.REACT_APP_TRACKING_ID)
    ReactGA.send({ hitType: "pageview", page: "/home"});
  },[])
  return (
    <div className="App" >

      <BrowserRouter>
        <Nav>
          <GiKnifeFork></GiKnifeFork>
          <Logo Logo to={"/home"}>delicious</Logo>
        </Nav>
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
font-family: 'Lobster Two', cursive;
justify-content: center;

`
const Nav = styled.div`
padding: 4rem 0rem;
display: flex;
justify-content: flex-start;
align-items: center;
svg{
  font-size: 2rem;
}
`
export default App;
