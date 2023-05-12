import {
  Button,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import React, { useEffect } from "react";

const HOURS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23,
];
const MINS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
];

const CreateRecipe = () => {
  const [value, setValue] = React.useState(0);
  const [ingredients, setIngredients] = React.useState([1]);
  const [stepMethod, setStepMethod] = React.useState([1]);
  const [ingredientPayload, setIngredientPayload] = React.useState([
    {
      tenNguyenLieu: "",
    },
  ]);
  // const [stepMethod, setStepMethod] = React.useState([1]);

  const handleChangeInput = (e, name) => {
    console.log(name);
    console.log(e.target.value);
  };
  return (
    <Grid
      marginBottom={12}
      padding={5}
      sx={{
        border: "solid #ccc 2px",
        borderRadius: 5,
        boxShadow: "0 0 20px 2px rgb(49, 49, 49,0.5)",
      }}
      container
      md={12}
      xs={12}
      lg={12}>
      <Grid item md={12} xs={12} lg={12}>
        <Typography marginBottom={2} fontSize={20} fontWeight={600}>
          Recipe Details
        </Typography>
        <Grid container md={12} xs={12} lg={12}>
          <Grid item md={3} lg={3} xs={12}>
            <label htmlFor="upload-photo">
              <input
                style={{ display: "none" }}
                id="upload-photo"
                name="upload-photo"
                type="file"
              />
              <Fab
                sx={{
                  width: 200,
                  height: 200,
                  borderRadius: 12,
                  display: "flex",
                  flexDirection: "column",
                }}
                color="default"
                size="small"
                component="span"
                aria-label="add"
                variant="extended">
                <CameraAltIcon sx={{ fontSize: 100 }} />
                <Typography fontSize={12}>Tap or click to add photo</Typography>
              </Fab>
            </label>
          </Grid>
          <Grid spacing={1} item md={9} lg={9} xs={12}>
            <Grid spacing={1} container md={12} xs={12} lg={12}>
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Recipe Title (keep it short and descriptive)"
                  variant="outlined"
                  name="recipe-title"
                  onChange={(e) => handleChangeInput(e, "recipe-title")}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  id="outlined-basic"
                  label="Short Intro (10-15 words)"
                  variant="outlined"
                  multiline
                  rows={2}
                  name="recipe-intro"
                  onChange={(e) => handleChangeInput(e, "recipe-intro")}
                />
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Typography marginTop={1} marginBottom={1} fontWeight={600}>
                  Timings
                </Typography>
                <Grid gap={1} container md={12} xs={12} lg={12}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Typography>Prep Time (approx.)</Typography>
                  </Grid>
                  <Grid item md={4} lg={4} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Hours
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Hours"
                        name="prepare-hours"
                        onChange={(e) => handleChangeInput(e, "prepare-hours")}>
                        {HOURS &&
                          HOURS.map((hour, i) => {
                            return (
                              <MenuItem value={hour} key={i}>
                                {hour} hours
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={4} lg={4} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Mins
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Mins"
                        name="prepare-min"
                        onChange={(e) => handleChangeInput(e, "prepare-min")}
                        // onChange={handleChange}
                      >
                        {MINS &&
                          MINS.map((hour, i) => {
                            return (
                              <MenuItem value={hour} key={i}>
                                {hour} mins
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid gap={1} container md={12} xs={12} lg={12}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Typography>Cook Time (approx.)</Typography>
                  </Grid>
                  <Grid item md={4} lg={4} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Hours
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={Hours}
                        label="Hours"
                        name="cook-hours"
                        onChange={(e) => handleChangeInput(e, "cook-hours")}>
                        {HOURS &&
                          HOURS.map((hour, i) => {
                            return (
                              <MenuItem value={hour} key={i}>
                                {hour} mins
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={4} lg={4} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Mins
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={Mins}
                        label="Mins"
                        name="cook-mins"
                        onChange={(e) => handleChangeInput(e, "cook-mins")}>
                        {MINS &&
                          MINS.map((hour, i) => {
                            return (
                              <MenuItem value={hour} key={i}>
                                {hour} mins
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Grid container>
                  <Grid paddingRight={0.5} item xs={12} md={6} lg={6}>
                    <Typography>Difficulty level</Typography>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">Age</InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        // value={age}
                        label="Age"
                        // onChange={handleChange}
                      >
                        <MenuItem value={10}>Ten</MenuItem>
                        <MenuItem value={20}>Twenty</MenuItem>
                        <MenuItem value={30}>Thirty</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid marginTop={2} item md={12} xs={12} lg={12}>
        <Grid spacing={2} container md={12} xs={12} lg={12}>
          <Grid item md={6} lg={6} xs={12}>
            <Typography fontWeight={600}>Ingredients</Typography>
            <Typography>
              Please use metric if possible (we have a handy conversion guide to
              help)
            </Typography>
            <Typography
              sx={{
                marginBottom: 1,
              }}>
              You can split your ingredients into groups, e.g. sauce, filling
              etc.
            </Typography>
            {ingredientPayload.map((item, index) => {
              return (
                <TextField
                  sx={{ marginBottom: 1 }}
                  fullWidth
                  label="ingredient"
                  key={index}
                  name={"ingredient" + index + 1}
                  onAbort={(e) => {}}
                  // onChange={}
                />
              );
            })}

            <Button
              sx={{ marginRight: 1, bgcolor: "rgb(49, 49, 49)" }}
              onClick={() =>
                setIngredientPayload([
                  ...ingredientPayload,
                  ingredientPayload.push({
                    tenNguyenLieu: "",
                  }),
                ])
              }
              variant="contained">
              Add next ingrediant
            </Button>
          </Grid>
          <Grid item md={6} lg={6} xs={12}>
            <Typography sx={{ marginBottom: 1 }} fontWeight={600}>
              Method
            </Typography>
            {stepMethod.map((item, index) => {
              return (
                <TextField
                  sx={{ marginBottom: 1 }}
                  fullWidth
                  label={"step " + (index + 1)}
                  key={index}
                />
              );
            })}

            <Button
              sx={{
                bgcolor: "rgb(49, 49, 49)",
              }}
              onClick={() =>
                setStepMethod([...stepMethod, stepMethod.length + 1])
              }
              variant="contained">
              Add next step
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Grid marginTop={2} item xs={3} md={3} lg={3}>
        <Button
          sx={{
            marginRight: 1,
            color: "rgb(49, 49, 49)",
            borderColor: "rgb(49, 49, 49)",
          }}
          variant="outlined">
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateRecipe;
