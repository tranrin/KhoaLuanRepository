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
    console.log(getinput, "vaoroi");
    console.log(e.nativeEvent.key, "vaoroi");
    // const value = e.target.value;
    let value = document.getElementById("myInput").value;

    if (e.nativeEvent.key === "Enter" && value != "") {
      console.log("vaoroi");
      e.preventDefault();
      navigate("/searched/" + value);
    }
    console.log(value, "valuevalue");
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
      // onSubmit={submitHandle}
    >
      <input
        id="myInput"
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
        onKeyDown={submitHandle}
        //value={getinput}
      />
      <FaSearch id="myBtn" />
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
