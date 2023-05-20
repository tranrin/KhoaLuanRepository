import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import CommentExampleComment from "../components/CommentCard";
import { Container, Header, List } from "semantic-ui-react";
import ButtonExampleLabeledBasicShorthand from "../components/LableShortHand";
import LikeButton from "../components/LikeButton";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import LocalPrintshopIcon from "@mui/icons-material/LocalPrintshop";
import { Box, Button, Rating, Typography } from "@mui/material";
import StarRateIcon from "@mui/icons-material/StarRate";
import Comments from "../components/comments/Comments";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [idRecipe, setIdRecipe] = useState();
  const { id } = params;
  const fetchDetails = async () => {
    const data = await fetch(
      `https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`,
    );
    const detailData = await data.json();
    setDetails(detailData);
    console.log(detailData.extendedIngredients);
  };
  const handleSaveRecipe = () => {
    setIdRecipe(id);
    /// call function save here
  };
  useEffect(() => {
    console.log(id);
  }, [params.name]);

  useEffect(() => {
    fetchDetails();
  }, [params.name]);
  return (
    <>
      <DetailWrapper>
        <div>
          <h2>{details.title}</h2>
          {/* <img> src={details.img}</img> */}
          <img
            style={{
              borderRadius: 6,
            }}
            src={details.image}
            alt={details.title}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}>
            <Rating
              readOnly
              name="half-rating"
              defaultValue={2.5}
              precision={0.5}
            />{" "}
            <Typography> 7 Ratings</Typography>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}>
            <Button
              sx={{
                marginRight: 1,
              }}
              variant="contained">
              {" "}
              <BookmarkAddedIcon onClick={() => handleSaveRecipe()} /> Save
            </Button>
            <Button variant="contained">
              {" "}
              <LocalPrintshopIcon /> Print
            </Button>
          </div>
        </div>
        <Info>
          <Button
            className={activeTab === "instructions" ? "active" : ""}
            onClick={() => {
              setActiveTab("instructions");
            }}>
            Instructions
          </Button>
          <Button
            className={activeTab === "ingredients" ? "active" : ""}
            onClick={() => {
              setActiveTab("ingredients");
            }}>
            Ingredients
          </Button>
          {activeTab === "instructions" && (
            <div>
              <h3 dangerouslySetInnerHTML={{ __html: details.summary }}></h3>
              <h3
                dangerouslySetInnerHTML={{ __html: details.instructions }}></h3>
            </div>
          )}
          {activeTab === "ingredients" && (
            <ul>
              {details.extendedIngredients.map((ingredient) => {
                return <li key={ingredient.id}>{ingredient.original}</li>;
              })}
            </ul>
          )}
        </Info>
      </DetailWrapper>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
        }}>
        <Typography variant="h4">You rating</Typography>
        <Box>
          <Rating
            style={{
              fontSize: 60,
            }}
            name="half-rating"
            defaultValue={0}
          />{" "}
        </Box>
      </Box>
      <Container
        style={{ margin: 20, borderTop: "solid 2px #ccc", padding: 12 }}>
        {/* <CommentExampleComment></CommentExampleComment> */}
        <Comments
          // commentsUrl="http://localhost:3000/comments"
          currentUserId="1"
        />
      </Container>
    </>
  );
}
const DetailWrapper = styled.div`
  margin-top: 100px;
  margin-bottom: 5rem;
  display: flex;

  .active {
    background: linear-gradient(35deg, #494949, #313131);
    color: white;
  }
  h2 {
    margin-bottom: 2rem;
  }
  li {
    font-size: 1.2rem;
    line-height: 2.5rem;
  }
  ul {
    margin-top: 2rem;
  }
  img {
    max-width: 390px;
  }
`;

// const Button = styled.button`
//   padding: 1rem 2rem;
//   color: #313131;
//   background: white;
//   border: 2px solid black;
//   margin-right: 2rem;
//   font-weight: 600;
//   border-radius: 6px;
// `;
const Info = styled.div`
  margin-left: 5rem;
`;

export default Recipe;
