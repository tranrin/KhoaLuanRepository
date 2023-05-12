import React from "react";
import { Box, Grid, Rating, Tab, Tabs } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { Button, CardActionArea, CardActions } from "@mui/material";
import TabPanel from "@mui/lab/TabPanel";
import { TabContext, TabList } from "@mui/lab";
import { useEffect } from "react";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useNavigate } from "react-router-dom";
const ITEM_HEIGHT = 48;
const RecipeManagement = () => {
  const [value, setValue] = React.useState(2);
  const options = value === 1 ? ["Unsave"] : ["Edit", "Remove"];
  const navigate = useNavigate();
  const [savedRecipe, setSavedRecipe] = React.useState([
    {
      recipeName: "Test",
      image:
        "https://www.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg",
      rating: 4,
    },
    {
      recipeName: "Test",
      image:
        "https://www.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg",
      rating: 4,
    },
    {
      recipeName: "Test",
      image:
        "https://www.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg",
      rating: 4,
    },
  ]);

  const [myRecipe, setMyRecipe] = React.useState([
    {
      recipeName: "Test 2",
      image:
        "https://www.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg",
      rating: 4,
    },
    {
      recipeName: "Test 2",
      image:
        "https://www.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg",
      rating: 4,
    },
    {
      recipeName: "Test 2",
      image:
        "https://www.shutterstock.com/image-photo/surreal-image-african-elephant-wearing-260nw-1365289022.jpg",
      rating: 4,
    },
  ]);
  const [anchorEl, setAnchorEl] = React.useState();

  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (option) => {
    navigate("/edit-recipe/2");
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(1);
  }, []);
  return (
    <Grid container md={12} xs={12} lg={12}>
      <Grid
        sx={{ display: "flex", justifyContent: "center" }}
        item
        md={12}
        xs={12}
        lg={12}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "center",
              }}>
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example">
                <Tab label="Saved Recipe" value={1} />
                <Tab label="My Recipe" value={2} />
              </TabList>
            </Box>
            <TabPanel value={1}>
              <Grid container spacing={2} md={12} xs={12} lg={12}>
                {savedRecipe.map((item, index) => {
                  return (
                    <Grid item xs={12} md={6} lg={4}>
                      <Card sx={{ width: "100%" }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            width="100%"
                            image={item.image}
                            alt="green iguana"
                          />
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                            }}>
                            <IconButton
                              aria-label="more"
                              id="long-button"
                              aria-controls={open ? "long-menu" : undefined}
                              aria-expanded={open ? "true" : undefined}
                              aria-haspopup="true"
                              onClick={handleClick}>
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="long-menu"
                              MenuListProps={{
                                "aria-labelledby": "long-button",
                              }}
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              PaperProps={{
                                style: {
                                  maxHeight: ITEM_HEIGHT * 4.5,
                                  width: "20ch",
                                },
                              }}>
                              {options.map((option) => (
                                <MenuItem
                                  key={option}
                                  selected={option === "Unsave"}
                                  onClick={() => handleClose(option)}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Menu>
                          </div>
                          <CardContent sx={{ padding: 2 }}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div">
                              {item.recipeName}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center       ",
                              }}>
                              <Rating
                                readOnly
                                name="half-rating"
                                defaultValue={3}
                              />{" "}
                              <Typography sx={{ fontWeight: 600 }} variant="p">
                                {" "}
                                7 Ratings
                              </Typography>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </TabPanel>
            <TabPanel value={2}>
              {" "}
              <Grid container spacing={2} md={12} xs={12} lg={12}>
                {myRecipe.map((item, index) => {
                  return (
                    <Grid item xs={12} md={6} lg={4}>
                      <Card sx={{ width: "100%" }}>
                        <CardActionArea>
                          <CardMedia
                            component="img"
                            width="100%"
                            image={item.image}
                            alt="green iguana"
                          />
                          <div
                            style={{
                              position: "absolute",
                              top: 0,
                              right: 0,
                            }}>
                            <IconButton
                              aria-label="more"
                              id="long-button"
                              aria-controls={open ? "long-menu" : undefined}
                              aria-expanded={open ? "true" : undefined}
                              aria-haspopup="true"
                              onClick={handleClick}>
                              <MoreVertIcon />
                            </IconButton>
                            <Menu
                              id="long-menu"
                              MenuListProps={{
                                "aria-labelledby": "long-button",
                              }}
                              anchorEl={anchorEl}
                              open={open}
                              onClose={handleClose}
                              PaperProps={{
                                style: {
                                  maxHeight: ITEM_HEIGHT * 4.5,
                                  width: "20ch",
                                },
                              }}>
                              {options.map((option) => (
                                <MenuItem
                                  key={option}
                                  selected={option === "Unsave"}
                                  onClick={() => handleClose(option)}>
                                  {option}
                                </MenuItem>
                              ))}
                            </Menu>
                          </div>
                          <CardContent sx={{ padding: 2 }}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div">
                              {item.recipeName}
                            </Typography>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center       ",
                              }}>
                              <Rating
                                readOnly
                                name="half-rating"
                                defaultValue={3}
                              />{" "}
                              <Typography sx={{ fontWeight: 600 }} variant="p">
                                {" "}
                                7 Ratings
                              </Typography>
                            </Box>
                          </CardContent>
                        </CardActionArea>
                      </Card>
                    </Grid>
                  );
                })}
              </Grid>
            </TabPanel>
          </TabContext>
        </Box>
      </Grid>
      <Grid item md={12} xs={12} lg={12}></Grid>
    </Grid>
  );
};

export default RecipeManagement;