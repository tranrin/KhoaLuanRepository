import React from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box } from "@mui/material";
function Search() {
  const [getinput, setInput] = useState("");
  const navigate = useNavigate();
  const submitHandle = (e) => {
    e.preventDefault();
    navigate("/searched/" + getinput);
  };
  return (
    <Box
      sx={{
        height: "50%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginRight: 12,
      }}
      onSubmit={submitHandle}>
      <input
        style={{
          background: "linear-gradient(35deg, #494949, #313131)",
          fonSize: "1.5rem",
          height: " 50%",
          color: "white",
          padding: "1rem 3rem",
          border: "none",
          borderRadius: " 1rem",
          outline: "none",
          marginRight: 12,
        }}
        type="text"
        placeholder="Search"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        value={getinput}
      />
      <FaSearch />
    </Box>
  );
}
// const FormStyle = styled.form`
//   //margin: 0rem 15rem;
//   height: 50%;
//   display: flex;
//   flex-direction: row;
//   justify-content: center;
//   div {
//     position: relative;
//     width: 45%;
//   }

//   input {
//     background: linear-gradient(35deg, #494949, #313131);
//     font-size: 1.5rem;
//     height: 50%;
//     color: white;
//     padding: 1rem 3rem;
//     border: none;
//     border-radius: 1rem;
//     outline: none;
//   }
//   svg {
//     position: absolute;
//     top: 50%;
//     height: 50%;
//     left: 0%;
//     transform: translate(100%, -50%);
//     color: white;
//   }
// `;

export default Search;
