import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { Link, useParams } from "react-router-dom";

function Cuisine() {
  let params = useParams();
  const [cuisine, setCuisine] = useState([]);
  const getCuisine = async (idCategory) => {
    const data = await fetch(
      process.env.REACT_APP_URI_Local + 'api/CongThuc/CongThucGetsByCategory/' + idCategory,
      // {
        // headers:{
        //               "ngrok-skip-browser-warning": "69420"
        //      }     }
    );
    const recipes = await data.json();
    console.log(recipes);
    setCuisine(recipes);
  };
  useEffect(() => {
    getCuisine(params.type);
  }, [params.type]);
  return (
    <Grid
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      exit={{ opacity: 0 }}
      cuisine
      transaction={{ duration: 0.5 }}>
      {cuisine &&
        cuisine.map((item) => {
          return (
            <Card key={item.id}>
              <Link to={"/recipe/" + item.id}>
                <img src={ process.env.REACT_APP_URI_Local + item.anhKemTheo} alt={item.tenCongThuc} />
                <h4>{item.tenCongThuc}</h4>
              </Link>
            </Card>
          );
        })}
    </Grid>
  );
}
const Grid = styled(motion.div)`
  display: Grid;
  grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
  grid-gap: 3rem;
  margin-top: 100px;
`;
const Card = styled.div`
  img {
    width: 100%;
    border-radius: 2rem;
  }
  a {
    text-decoration: none;
  }
  h4 {
    text-align: center;
    padding: 1rem;
  }
`;

export default Cuisine;
