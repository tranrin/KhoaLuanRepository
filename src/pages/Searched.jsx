import{useEffect,useState} from 'react'
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Typography } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import Box from "@mui/material/Box";
import { Rating } from "@mui/material";


function Searched() {
    let params = useParams(" ");
    const [searchedRecipes, setSearchedRecipes] = useState([]);
    const getSearched = async(name) =>{
        const data = await fetch(process.env.REACT_APP_URI_Local + 'api/CongThuc/CongThucGets/'+name) 
        const recipes = await data.json();
        setSearchedRecipes(recipes)
    }
    useEffect(()=>{
        getSearched(params.search)
    },[params.search])
    if(searchedRecipes.length == 0){
        return(
        <Grid>
            <Typography variant="h1">
            No Items Were Found
            <SearchOffIcon fontSize='large'></SearchOffIcon>
            </Typography>
        </Grid>) 
    }
    else{
  return (
    <Grid>
  { searchedRecipes.map((item)=>{
            return(
                <Card key={item.id}>
                      <Link to={'/recipe/' + item.id}>
                      <img src={ process.env.REACT_APP_URI_Local +item.anhKemTheo} alt={item.tenCongThuc}></img>
                      <h4>{item.tenCongThuc}</h4>
                      <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center       ",
                }}>
                    <Rating
                  readOnly
                  name="half-rating"
                  defaultValue={item?.saoTrungBinh || null}
                  value={item?.saoTrungBinh || null}
                />{" "}
                 <Typography sx={{ fontWeight: 600 }} variant="p">
                                {console.log(item?.saoTrungBinh)}
                                {item?.tongSoLuong} Ratings
                              </Typography>
              </Box>
                      </Link>
                </Card>
            )
        }) }
    </Grid>
  )}
}
const Grid = styled.div`
padding-top: 200px;
display: Grid;
grid-template-columns: repeat(auto-fit, minmax(20rem, 1fr));
grid-gap: 3rem;
`;
const Card = styled.div`
img{
    width: 100%;
    border-radius: 2rem;
}
a{
    text-decoration: none;
}
h4{
    text-align: center;
    padding: 1rem;

}
`


export default Searched