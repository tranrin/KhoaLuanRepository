import { useState, useEffect } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import Recipe from "../pages/Recipe";
import { Link } from "react-router-dom";
import { Rating } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslation } from 'react-i18next';

function Veggie() {
  const { t } = useTranslation()
  const [veggie, setVeggie] = useState([]);
  useEffect(() => {
    getVeggie();
  }, []);
  const getVeggie = async () => {
    const api = await fetch(
      process.env.REACT_APP_URI_Local + "api/CongThuc/CongThucGetsByTop",
      {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      },
    );
    const data = await api.json();
    setVeggie(data);
    console.log(data);
  };

  return (
    <div>
      <Wrapper>
        <h3>
        {t('topRecipe')}

        </h3>
        <Splide
          options={{
            perPage: 3,
            arrows: false,
            pagination: false,
            drag: "free",
            gap: "5rem",
          }}>
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={"/recipe/" + recipe.id}>
               
                    <p>
                          <Gradient>
                          {recipe.tenCongThuc}
                    <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center       ",
                              }}>
                                  <Rating
                                readOnly
                                name="half-rating"
                                defaultValue={recipe?.saoTrungBinh || null}
                                value={recipe?.saoTrungBinh || null}
                              />{" "}
                              
                            </Box>
                            <Typography sx={{ fontWeight: 600 }} variant="p">
                                {console.log(recipe?.saoTrungBinh)}
                                {recipe?.tongSoLuong} Ratings
                              </Typography>
                    </Gradient>           
                    </p>
            
                    <img src={ process.env.REACT_APP_URI_Local + recipe.anhKemTheo} alt={recipe.tenCongThuc} />
              
              
                  </Link>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  );
}
const Wrapper = styled.div`
  margin: 4rem 0rem;
`;
const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  // overflow: hidden;
  position: relative;
  img {
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  p {
    position: absolute;
    z-index: 10;
    left: 50%;
    bottom: 0%;
    transform: translate(-50%, 0%);
    color: white;
    width: 100%;
    text-align: center;
    font-weight: 600;
    font-size: 1rem;
    height: 40%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;
const Gradient = styled.div`
  z-index: 3;
  position: absolute;
  width: 100%;
  height: 100%;
  background: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5));
`;

export default Veggie;
