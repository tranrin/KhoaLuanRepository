import { useState, useEffect } from "react";
import styled from "styled-components";
import { Splide, SplideSlide } from '@splidejs/react-splide'
import '@splidejs/react-splide/css';
import Recipe from "../pages/Recipe";
import { Link } from "react-router-dom";


function Veggie() {
  const [veggie, setVeggie] = useState([]);
  useEffect(() => {
    getVeggie();
  }, [])
  const getVeggie = async () => {
    // const check = localStorage.getItem("veggie");
    // if (check) {
    //   setVeggie(JSON.parse(check));
    // }
    // else {
        console.log("vao roi")
      // const api = await fetch(`https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9&tags=vegetarian`)
        const api = await fetch(`https://d669-171-225-251-76.ngrok-free.app/api/User/GetProfileUser`,{
        method: "POST", 
        headers:{
          
            "Authorization": "bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6IjE5dDEwODEwMjBAaHVzYy5lZHUudm4iLCJleHAiOjE2ODQ1NjI3MTksImlzcyI6Imh0dHA6Ly9yZWNpcGVmb29kYXBpLmNvbS8iLCJhdWQiOiJodHRwOi8vcmVjaXBlZm9vZGFwaS5jb20vIn0.yt-yX5Qua4pLQSKnUXOQcEr8Q-jFKkMAHBZ4SEonbfk",
            "ngrok-skip-browser-warning": "69420"
          }
          // mode: 'cors'
        }
      // ,
      // {
      //   //method: "POST",
      // //   headers:{
      // //   //"Access-Control-Allow-Origin": "*",
      // //  //
      // //   //'Authorization': 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1laWRlbnRpZmllciI6InRyYW5uZ29jcmluMTVAZ21haWwuY29tIiwiZXhwIjoxNjg0MzEwNDM4LCJpc3MiOiJodHRwOi8vcmVjaXBlZm9vZGFwaS5jb20vIiwiYXVkIjoiaHR0cDovL3JlY2lwZWZvb2RhcGkuY29tLyJ9.NWaMfDASYk_0TNnM4nazqSg5PvvT5fa-jJLZrE3Wpqw'
      // // },
      //  // mode: 'cors'
      // }
      ).then(response =>{
        console.log(response);
        if(response.ok){
             console.log("checkjson",response); //first consume it in console.log
            return response.json(); //then consume it again, the error happens

        }})
      try{
        console.log('ehhe',await api.json())
        // await api.json()
      }
      catch(e){
        console.log(e,"checkerror")
      //}
      console.log(await api,"api")
      // console.log(await api," ")
    //  const data = await api.json();
     const data = await api.json();
      //localStorage.setItem("veggie", JSON.stringify(data.recipes))
     // setVeggie(data.recipes);
      console.log(data)
    }

  }


  return (
    <div>
      <Wrapper>
        <h3>Our vegetarian Picks</h3>
        <Splide options={{
          perPage: 3 ,
          arrows: false,
          pagination: false,
          drag: "free",
          gap: '5rem',
        }}>
          {veggie.map((recipe) => {
            return (
              <SplideSlide key={recipe.id}>
                <Card>
                  <Link to={'/recipe/'+ recipe.id}></Link>
                  <p>{recipe.title}</p>
                  <img src={recipe.image} alt={recipe.title} />
                  <Gradient></Gradient>
                </Card>
              </SplideSlide>
            );
          })}
        </Splide>
      </Wrapper>
    </div>
  )

}
const Wrapper = styled.div`
margin: 4rem 0rem;
`;
const Card = styled.div`
  min-height: 25rem;
  border-radius: 2rem;
  overflow: hidden;
  position: relative;
  img{
    border-radius: 2rem;
    position: absolute;
    left: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
   }
   p{
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
background: linear-gradient(rgba(0,0,0,0), rgba(0,0,0,0.5));
`;


export default Veggie