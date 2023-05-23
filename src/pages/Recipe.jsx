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
import {
  getDetailsRecipe,
  getSavedRecipe,
  saveRecipe,
} from "../api/recipe.api";
import { LoadingButton } from "@mui/lab";

function Recipe() {
  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [idRecipe, setIdRecipe] = useState();
  const fetchDetails = async () => {
    const data = await fetch(
      process.env.REACT_APP_URI_Local + '/api/CongThuc/CongThucGet/' + params.name,
          {
        headers:{
                      "ngrok-skip-browser-warning": "69420"
             }     }
    );
    const detailData = await data.json();
    setDetails(detailData);
  };
  const handleSaveRecipe = () => {
    setIsLoading(true);
    saveRecipe({
      congThucID: params && params.name,
      nguoiDungID: "string",
    })
      .then(() => {})
      .finally(() => {
        setIsLoading(false);
      });
    setIsSaved(true);
    /// call function save here
  };
  useEffect(() => {}, [params.name]);

  useEffect(() => {
    getDetailsRecipe(params.name).then((payload) => {
      setDetails(payload.data);
    });

    return () => setDetails({});
  }, []);

  useEffect(() => {
    getSavedRecipe().then((payload) => {
      setlistSavedRecipe(payload.data);
    });
  }, [isLoading]);

  useEffect(() => {
    const isTrue = listSavedRecipe?.filter((item) => {
      return item.congThucID.toString() === params.name;
    });
    setIsSaved(isTrue.length > 0);
  }, [listSavedRecipe, isLoading]);

  return (
    <>
      <DetailWrapper>
        <div>
          <h2>{details?.thongTinChung?.tenCongThuc}</h2>
          {/* <img> src={details.img}</img> */}

          <img
            style={{
              borderRadius: 6,
            }}
            src={
              details?.thongTinChung?.anhKemTheo
              // ? details?.thongTinChung?.anhKemTheo
              // : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"
            }
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
            <LoadingButton
              disabled={isSaved}
              loading={isLoading}
              onClick={handleSaveRecipe}
              sx={{
                marginRight: 1,
              }}
              variant="contained">
              {" "}
              {isSaved ? (
                <>
                  <BookmarkAddedIcon /> Saved
                </>
              ) : (
                <>
                  <BookmarkAddedIcon /> Save{" "}
                </>
              )}
            </LoadingButton>
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
              <h3
                dangerouslySetInnerHTML={{
                  __html: details?.thongTinChung?.moTa,
                }}></h3>
              <ul>
                <Typography
                  sx={{
                    fontSize: 16,
                    fontWeight: 500,
                  }}>
                  Step method
                </Typography>

                {details?.buocNau?.map((buocNau) => {
                  return <li key={buocNau.id}>{buocNau.moTa}</li>;
                })}
              </ul>
            </div>
          )}
          {activeTab === "ingredients" && (
            <ul>
              {details?.nguyenLieu?.map((nguyenLieu) => {
                console.log(nguyenLieu);
                return <li key={nguyenLieu.id}>{nguyenLieu.tenNguyenLieu}</li>;
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
        <Typography variant="h4">Your rating</Typography>
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
