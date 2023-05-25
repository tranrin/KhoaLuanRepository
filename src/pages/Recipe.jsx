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
  ratingRecipe,
  saveRecipe,
} from "../api/recipe.api";
import { LoadingButton } from "@mui/lab";
import Ultils from "../Ultils";
import PrintToPDF from "../components/PrintPDF";
function Recipe() {

  let params = useParams();
  const [details, setDetails] = useState({});
  const [activeTab, setActiveTab] = useState("instructions");
  const [idRecipe, setIdRecipe] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [listSavedRecipe, setlistSavedRecipe] = useState([]);
  const [open, setOpen] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [rating, setRating] = useState();
  const [tokenValue, setTokenValue] = useState(localStorage.getItem("token"));
  useEffect(() => {
    console.log("Token value:", tokenValue);
    // setTokenValue(tokenValue);
  }, [tokenValue]);

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
  const handleRating = async (newValue) => {
    await ratingRecipe({
      sao: newValue,
      congThucID: params.name,
    }).then(async () => {
      await getDetailsRecipe(params.name).then((payload) => {
     
        setRating(payload?.data?.thongTinChung?.saoTrungBinh);
        // setIsRating(payload.data.thongTinChung.saoTrungBinh)
      });
    });
  };
  useEffect(() => {
    getDetailsRecipe(params.name).then((payload) => {
      console.log(payload.data.danhGiaByUserId)

        //setRatingByUser(payload.data.danhGiaByUserId.sao + 1)
      setRating(payload?.data?.thongTinChung?.saoTrungBinh);
      setDetails(payload.data);
    });
  }, [rating]);

  useEffect(() => {
    getDetailsRecipe(params.name).then((payload) => {
      setRating(payload?.data?.thongTinChung?.saoTrungBinh);
      setDetails(payload.data);
    });
  }, [tokenValue]);

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
          <PrintToPDF handleClose={() => setOpen(false)} isOpen={open} Data={details}/>

          <h2>{details?.thongTinChung?.tenCongThuc}</h2>
          {/* <img> src={details.img}</img> */}

          <img
            style={{
              borderRadius: 6,
            }}
            src={
              process.env.REACT_APP_URI_Local +
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
              value={rating ?? 0}
              // precision={0.5}
            />{" "}
            <Typography>
              {" "}
              {details?.thongTinChung?.tongSoLuong} Ratings
            </Typography>
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
            <Button onClick={() => setOpen(true)} variant="contained">
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
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                }}>
                Level
              </Typography>
              {details?.thongTinChung?.nameDoKho}
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                }}>
                Preparing Time
              </Typography>
              {details?.thongTinChung?.thoiGianChuanBi}
              <Typography
                sx={{
                  fontSize: 16,
                  fontWeight: 500,
                }}>
                Cooking Time
              </Typography>
              {details?.thongTinChung?.thoiGianNau}
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
            disabled={tokenValue === null}
            onChange={(event, newValue) => {
              handleRating(newValue);
            }}
            style={{
              fontSize: 60,
            }}
            name="half-rating"
          />{" "}
        </Box>
        {tokenValue === null ? (
          <Typography
            sx={{
              color: "red",
            }}
            variant="caption">
            You must login to rating
          </Typography>
        ) : null}
      </Box>
      <Container
        style={{ margin: 20, borderTop: "solid 2px #ccc", padding: 12 }}>
        {/* <CommentExampleComment></CommentExampleComment> */}
        <Comments
          // commentsUrl="http://localhost:3000/comments"
          currentUserId="1"
          CongThucId={params.name}
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
