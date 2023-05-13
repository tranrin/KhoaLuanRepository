import { FaPizzaSlice, FaHamburger } from "react-icons/fa";
import { GiNoodles, GiChopsticks } from "react-icons/gi";
import styled from "styled-components";
import React from "react";
import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
const lnkStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  borderRadius: "10%",
  marginRight: "2rem",
  textDecoration: "none",
  background: "linear-gradient(35deg, #494949, #313131)",
  width: " 8rem",
  height: " 4rem",
  cursor: "pointer",
  transform: "scale(0.8)",
  "&.active": {
    background: "linear-gradient(to right, #f27121, #e94057)",
    svg: {
      fontSize: "12px",
      color: "white",
    },
    h4: {
      color: "white",
    },
  },
};
function Category() {
  return (
    <Grid sx={{ display: "flex" }}>
      <Link style={lnkStyle} to={"/cuisine/Italian"}>
        <FaPizzaSlice
          style={{
            color: "#fff",
          }}
        />
        <h4
          style={{
            color: "#fff",
            fontSize: 14,
          }}>
          Italian
        </h4>
      </Link>
      <Link style={lnkStyle} to={"/cuisine/American"}>
        <FaHamburger
          style={{
            fontSize: "24px",
            color: "#fff",
          }}
        />
        <h4
          style={{
            color: "#fff",
            fontSize: 14,
          }}>
          American
        </h4>
      </Link>
      <Link style={lnkStyle} to={"/cuisine/Thai"}>
        <GiNoodles
          style={{
            fontSize: "24px",
            color: "#fff",
          }}
        />
        <h4
          style={{
            color: "#fff",
            fontSize: 14,
          }}>
          Thai
        </h4>
      </Link>
      <Link style={lnkStyle} to={"cuisine/Japanese"}>
        <GiChopsticks
          style={{
            fontSize: "24px",
            color: "#fff",
          }}
        />
        <h4
          style={{
            fontSize: 14,
            color: "#fff",
          }}>
          Japanese
        </h4>
      </Link>
    </Grid>
  );
}
// const List = styled.div`
//   display: flex;
//   justify-content: center;
//   // margin: 2rem 0rem;
// `;
// const SLink = styled(NavLink)`
//   display: flex;
//   height:20px,
//   width:20px,
//   flex-direction: column;
//   justify-content: center;
//   align-items: center;
//   border-radius: 50%;
//   margin-right: 2rem;
//   text-decoration: none;
//   background: linear-gradient(35deg, #494949, #313131);
//   width: 6rem;
//   height: 6rem;
//   cursor: pointer;
//   transform: scale(0.8);
//   h4 {
//     color: white;
//     font-size: 0.8rem;
//   }
//   svg {
//     color: white;
//     font-size: 1.5rem;
//   }
//   &.active {
//     background: linear-gradient(to right, #f27121, #e94057);
//     svg {
//     fontSize:12px,
//       color: white;
//     }
//     h4 {
//       color: white;
//     }
//   }
// `;
export default Category;
