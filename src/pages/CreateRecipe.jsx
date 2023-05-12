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
import { createRecipe } from "../api/recipe.api";

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
  const [prepareHours, setPrepareHours] = React.useState(0);
  const [prepareMin, setPrepareMin] = React.useState(0);
  const [cookHours, setCookHours] = React.useState(0);
  const [cookMin, setCookMin] = React.useState(0);
  const [ingredients, setIngredients] = React.useState([1]);
  const [payload, setPayload] = React.useState({
    thongTinChung: {
      tenCongThuc: "",
      moTa: "",
      thoiGianNau: 0,
      thoiGianChuanBi: 0,
      idCategory: 0,
      anhKemTheo: null,
      ngayTao: " 2023-05-05T21:37:48.567",
      doKho: 0,
    },
    nguyenLieu: [
      {
        tenNguyenLieu: "",
      },
    ],
    buocNau: [
      {
        moTa: "",
        thuTu: 1,
      },
    ],
  });
  const [ingredientPayload, setIngredientPayload] = React.useState([
    {
      tenNguyenLieu: "",
    },
  ]);
  const [stepMethodPayload, setStepMethodPayload] = React.useState([
    {
      moTa: "",
      thuTu: 0,
    },
  ]);
  // const [stepMethod, setStepMethod] = React.useState([1]);
  const myHeaders = new Headers();
  const myInit = {
    method: "GET",
    headers: myHeaders,
    mode: "cors",
    cache: "default",
  };
  const handleSubmit = () => {
    delete payload.thongTinChung.prepareHours;
    delete payload.thongTinChung.prepareMins;
    delete payload.thongTinChung.cookHours;
    delete payload.thongTinChung.cookMins;
    // const test = await createRecipe(payload);
    fetch(
      "https://9018-2402-800-6273-529a-4c8e-ce19-9ecd-3665.ngrok-free.app/api/CongThuc/CongThucGets/sa",
      {},
    )
      .then((response) => {
        response.header(
          "Access-Control-Allow-Methods",
          "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        );
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Server response was not OK");
        }
      })
      .then((data) => {
        try {
          const jsonData = JSON.parse(data);
          console.log(jsonData); // Do something with the data
        } catch (error) {
          console.error("Failed to parse JSON data", error);
        }
      })
      .catch((error) => console.error(error));

    // const data = await api.json();
  };

  const handleChangeIngredient = (index) => (event) => {
    const { name, value } = event.target;

    setIngredientPayload((prevPayload) => {
      const newPayload = [...prevPayload];
      newPayload[index] = {
        ...newPayload[index],
        [name]: value,
      };

      return newPayload;
    });

    setPayload({
      ...payload,
      nguyenLieu: ingredientPayload,
    });
  };

  const handleChangeStepMethod = (index) => (event) => {
    const { name, value } = event.target;

    setStepMethodPayload((prevPayload) => {
      const newPayload = [...prevPayload];
      newPayload[index] = {
        ...newPayload[index],
        [name]: value,
        thuTu: index + 1,
      };
      return newPayload;
    });
    setPayload({
      ...payload,
      buocNau: stepMethodPayload,
    });
  };

  const handleChangeInput = (e, name) => {
    if (name === "prepareHours") {
      setPrepareHours(e.target.value);
    }

    if (name === "prepareMins") {
      setPrepareMin(e.target.value);
    }

    if (name === "cookHours") {
      setCookHours(e.target.value);
    }

    if (name === "cookMins") {
      setCookMin(e.target.value);
    }

    setPayload({
      ...payload,
      thongTinChung: {
        ...payload.thongTinChung,
        [name]: e.target.value,
        thoiGianChuanBi:
          prepareHours + " " + "hour" + " " + prepareMin + " " + "min",
        thoiGianNau: cookHours + " " + "hour" + " " + cookMin + " " + "min",
      },
    });
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
                name="anhkKemTheo"
                type="file"
                onChange={(e) => handleChangeInput(e, "anhKemTheo")}
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
                  name="tenCongThuc"
                  onChange={(e) => handleChangeInput(e, "tenCongThuc")}
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
                  name="moTa"
                  onChange={(e) => handleChangeInput(e, "moTa")}
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
                        name="prepareHours"
                        onChange={(e) => handleChangeInput(e, "prepareHours")}>
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
                        name="prepareMins"
                        onChange={(e) => handleChangeInput(e, "prepareMins")}
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
                        name="cookHours"
                        onChange={(e) => handleChangeInput(e, "cookHours")}>
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
                        label="Mins"
                        name="cookMins"
                        onChange={(e) => handleChangeInput(e, "cookMins")}>
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
                      <InputLabel id="demo-simple-select-label">
                        Difficulty level
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Difficulty level"
                        name="doKho"
                        onChange={(e) => handleChangeInput(e, "doKho")}>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={2}>3</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid paddingRight={0.5} item xs={12} md={6} lg={6}>
                    <Typography>Category</Typography>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Category
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label="Category"
                        name="idCategory"
                        onChange={(e) => handleChangeInput(e, "idCategory")}>
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={2}>3</MenuItem>
                        <MenuItem value={2}>4</MenuItem>
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
                  name={`tenNguyenLieu`}
                  onChange={handleChangeIngredient(index)}
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
            {stepMethodPayload.map((item, index) => {
              return (
                <TextField
                  sx={{ marginBottom: 1 }}
                  fullWidth
                  label={"step " + (index + 1)}
                  name={`moTa`}
                  key={index}
                  onChange={handleChangeStepMethod(index)}
                />
              );
            })}

            <Button
              sx={{
                bgcolor: "rgb(49, 49, 49)",
              }}
              onClick={() =>
                setStepMethodPayload([
                  ...stepMethodPayload,
                  stepMethodPayload.push({
                    moTa: "",
                    thuTu: "",
                  }),
                ])
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
          onClick={() => handleSubmit()}
          variant="outlined">
          Save
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateRecipe;
