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
import ScatterPlotIcon from "@mui/icons-material/ScatterPlot";
import { Link, useNavigate } from "react-router-dom";
import RoundButton from "../components/RoundedButton";
import {
  deleteRecipe,
  deleteSavedRecipe,
  getRecipeWithUser,
  getSavedRecipe,
} from "../api/recipe.api";
import { event } from "react-ga";
const ITEM_HEIGHT = 48;
const RecipeManagement = () => {
  const [value, setValue] = React.useState(2);
  const options = value === 1 ? ["Unsave"] : ["Edit", "Remove"];
  const navigate = useNavigate();
  const [savedRecipe, setSavedRecipe] = React.useState([]);

  const [myRecipe, setMyRecipe] = React.useState([]);
  const [anchorEl, setAnchorEl] = React.useState();
  const [idEdit, setIdEdit] = React.useState();
  useEffect(() => {
    const listRecipeUser = getRecipeWithUser();
    listRecipeUser.then((list) => {
      console.log(list, "list");
      return setMyRecipe(list.data);
    });
  }, []);

  useEffect(() => {
    const listSavedRecipeUser = getSavedRecipe();
    listSavedRecipeUser.then((list) => {
      return setSavedRecipe(list.data);
    });
  }, []);

  const open = Boolean(anchorEl);
  const handleClick = (event, id) => {
    setAnchorEl(event.currentTarget);
    setIdEdit(id);
  };
  const handleClose = (e, option, id) => {
    if (option === "Edit") {
      navigate("/edit-recipe/" + idEdit);
    }
    if (option === "Unsave") {
      deleteSavedRecipe(idEdit).then(async () => {
        await getSavedRecipe().then((list) => {
          setSavedRecipe(list.data);
        });
      });
    }

    if (option === "Remove") {
      deleteRecipe(idEdit).then(async (data) => {
        await getRecipeWithUser().then((list) => {
          setMyRecipe(list.data);
        });
      });
    }
    setAnchorEl(null);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    setValue(1);
  }, []);
  return (
    <Grid
      sx={{
        marginTop: 10,
      }}
      container
      md={12}
      xs={12}
      lg={12}>
      <Grid
        sx={{ display: "flex", justifyContent: "center" }}
        item
        md={12}
        xs={12}
        lg={12}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <RoundButton
            sx={{
              marginLeft: 4,
            }}
            label={"Create Recipe"}
            onClick={() => navigate("/recipe/create")}
          />
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "center",
              }}>
              <TabList
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#000",
                    color: "#000",
                  },
                }}
                onChange={handleChange}
                aria-label="lab API tabs example">
                <Tab
                  sx={{
                    color: "#000 !important",
                    "&:hover": {
                      borderColor: "#fff",
                    },
                  }}
                  label="Saved Recipe"
                  value={1}
                />
                <Tab
                  sx={{
                    color: "#000 !important",
                    "&:hover": {
                      borderColor: "#fff",
                    },
                  }}
                  label="My Recipe"
                  value={2}
                />
              </TabList>
            </Box>
            <TabPanel value={1}>
              <Grid container spacing={2} md={12} xs={12} lg={12}>
                {savedRecipe.map((item, index) => {
                  return (
                    <Grid key={index} item xs={12} md={6} lg={4}>
                      <Card sx={{ position: "relative", width: "100%" }}>
                        <div
                          style={{
                            position: "absolute",
                            top: 2,
                            left: 220,
                            width: "100%",
                            height: "100%",
                          }}>
                          <ScatterPlotIcon
                            sx={{
                              color: "#fff",
                              fontWeight: 600,
                              background: "#ccc",
                              border: "#000 2px solid",
                              "&:hover": {
                                cursor: "pointer",
                              },
                            }}
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={(e) => handleClick(e, item.id)}
                          />

                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}>
                            <MenuItem
                              onClick={(e) =>
                                handleClose(e, "Unsave", item.id)
                              }>
                              Unsave
                            </MenuItem>
                          </Menu>
                        </div>
                        <CardMedia
                          component="img"
                          width="100%"
                          image={
                            //process.env.REACT_APP_URI_Local + item.anhKemTheo
                            item.anhKemtheo
                              ? process.env.REACT_APP_URI_Local +
                                item.anhKemtheo
                              : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"
                          }
                          alt="green iguana"
                        />

                        <CardContent sx={{ padding: 2 }}>
                          <Link to={"/recipe/" + item.congThucID}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div">
                              {item.tenCongThuc}
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
                                defaultValue={item?.soSaoTrungBinh || null}
                                value={item?.soSaoTrungBinh || null}
                              />{" "}
                              <Typography sx={{ fontWeight: 600 }} variant="p">
                                {console.log(item?.soSaoTrungBinh)}
                                {item?.soNguoiDanhGia} Ratings
                              </Typography>
                            </Box>
                          </Link>
                        </CardContent>
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
                      <Card sx={{ width: "100%", position: "relative" }}>
                        <div
                          style={{
                            position: "absolute",
                            top: 2,
                            left: 220,
                            width: "100%",
                            height: "100%",
                          }}>
                          <ScatterPlotIcon
                            sx={{
                              color: "#fff",
                              fontWeight: 600,
                              background: "#ccc",
                              border: "#000 2px solid",
                              "&:hover": {
                                cursor: "pointer",
                              },
                            }}
                            id="basic-button"
                            aria-controls={open ? "basic-menu" : undefined}
                            aria-haspopup="true"
                            aria-expanded={open ? "true" : undefined}
                            onClick={(e) => handleClick(e, item.id)}
                          />

                          <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                              "aria-labelledby": "basic-button",
                            }}>
                            <MenuItem onClick={(e) => handleClose(e, "Edit")}>
                              Edit
                            </MenuItem>
                            <MenuItem onClick={(e) => handleClose(e, "Remove")}>
                              Remove
                            </MenuItem>
                          </Menu>
                        </div>
                        <CardMedia
                          component="img"
                          width="100%"
                          image={
                            item.anhKemTheo
                              ? process.env.REACT_APP_URI_Local +
                                item.anhKemTheo
                              : "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxleHBsb3JlLWZlZWR8Mnx8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"
                          }
                          alt="green iguana"
                        />

                        <CardContent sx={{ padding: 2 }}>
                          <Link to={"/recipe/" + item.id}>
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div">
                              {item.tenCongThuc}
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
                                defaultValue={item?.saoTrungBinh || null}
                                value={item?.saoTrungBinh || null}
                              />{" "}
                              <Typography sx={{ fontWeight: 600 }} variant="p">
                                {console.log(item?.saoTrungBinh)}
                                {item?.tongSoLuong} Ratings
                              </Typography>
                            </Box>
                          </Link>
                        </CardContent>
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
