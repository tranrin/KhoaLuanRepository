import {
  Button,
  Fab,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import React, { useEffect } from "react";
import {
  createRecipe,
  getDetailsRecipeToUpdate,
  upLoadImage,
  updateRecipe,
} from "../api/recipe.api";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RoundButton from "../components/RoundedButton";
import { useParams } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const HOURS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23,
];
const MINS = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59,
];

const level = [
  {
    doKho: 1,
    nameDoKho: "Easy",
  },
  {
    doKho: 2,
    nameDoKho: "Intermediate",
  },
  {
    doKho: 3,
    nameDoKho: "Advanced",
  },
  {
    doKho: 4,
    nameDoKho: "Expert",
  },
];

const category = [
  {
    idCategory: 1,
    nameCategory: "Italian",
  },
  {
    idCategory: 2,
    nameCategory: "American",
  },
  {
    idCategory: 3,
    nameCategory: "Thai",
  },
  {
    idCategory: 4,
    nameCategory: "Japanese",
  },
];

const EditRecipe = () => {
  const [prepareHours, setPrepareHours] = React.useState(0);
  const [prepareMin, setPrepareMin] = React.useState(0);
  const [cookHours, setCookHours] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(false);
  const [cookMin, setCookMin] = React.useState(0);
  const [file, setFile] = React.useState("");
  const [preview, setPreview] = React.useState("");
  const [payload, setPayload] = React.useState({
    thongTinChung: {
      id: "",
      tenCongThuc: "",
      moTa: "",
      thoiGianNau: 0,
      thoiGianChuanBi: 0,
      idCategory: 0,
      anhKemTheo: null,
      doKho: 0,
      ngayTao: new Date(),
    },
    nguyenLieu: [
      {
        tenNguyenLieu: "",
      },
    ],
    buocNau: [
      {
        moTa: "",
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
    },
  ]);
  const handleSubmit = async () => {
    delete payload.thongTinChung.prepareHours;
    delete payload.thongTinChung.prepareMins;
    delete payload.thongTinChung.cookHours;
    delete payload.thongTinChung.cookMins;
    const formData = new FormData();
    formData.append("File", file);
    if (file.name != "") {
      const uploadImage = await upLoadImage(formData)
        .then(async (item) => {
          setIsLoading(true);
          setPayload({
            ...payload,
            thongTinChung: {
              ...payload.thongTinChung,
              anhKemTheo: payload?.thongTinChung?.anhKemTheo,
            },
          });
          await updateRecipe(payload).then((data) => {
            console.log(data);
          });

          await getDetailsRecipeToUpdate(param.id).then((payload) => {
            setPayload(payload?.data);
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      await updateRecipe(payload).then((data) => {});
    }

    // const test = await createRecipe(payload).then((data) => {});
  };

  const convertMinutesToHoursAndMinutes = (minutes) => {
    var hours = Math.floor(minutes / 60); // Lấy phần nguyên khi chia cho 60 để tính giờ
    var remainingMinutes = minutes % 60; // Lấy phần dư khi chia cho 60 để tính phút
    return {
      hours: hours,
      minutes: remainingMinutes,
    };
  };
  // const [stepMethod, setStepMethod] = React.useState([1]);

  const param = useParams();
  useEffect(() => {
    getDetailsRecipeToUpdate(param.id).then((payload) => {
      console.log(payload.data)
      setPayload(payload?.data);
      setStepMethodPayload(payload?.data?.buocNau);
      setIngredientPayload(payload?.data?.nguyenLieu);
      const timePre = convertMinutesToHoursAndMinutes(
        payload?.data?.thongTinChung?.thoiGianChuanBi,
      );
      console.log(payload?.data?.thongTinChung?.thoiGianChuanBi);
      const timeCook = convertMinutesToHoursAndMinutes(
        payload?.data?.thongTinChung?.thoiGianNau,
      );
      setPrepareHours(timePre.hours);
      setPrepareMin(timePre.minutes);
      setCookHours(timeCook.hours);
      setCookMin(timeCook.minutes);
    });
  }, []);

  const handleRemoveItem = (indexToRemove, name) => {
    if (name === "ingredientPayload") {
      const newPayload = ingredientPayload.filter((item, index) => {
        return index !== indexToRemove;
      });
      setIngredientPayload(newPayload);
      setPayload({
        ...payload,
        ...payload.thongTinChung,
        nguyenLieu: newPayload,
      });
    }
    if (name === "methodPayload") {
      const newPayload = stepMethodPayload.filter((item, index) => {
        return index !== indexToRemove;
      });
      setStepMethodPayload(newPayload);
      setPayload({
        ...payload,
        ...payload.thongTinChung,
        buocNau: newPayload,
      });
    }
  };

  const handleChangeIngredient = (index) => (event) => {
    const { name, value } = event.target;
    setIngredientPayload((prevPayload) => {
      const newPayload = [...prevPayload];
      newPayload[index] = {
        ...newPayload[index],
        [name]: value,
      };
      setPayload({
        ...payload,
        ...payload.thongTinChung,
        nguyenLieu: newPayload,
      });
      return newPayload;
    });
  };

  const handleChangeStepMethod = (index) => (event) => {
    const { name, value } = event.target;

    setStepMethodPayload((prevPayload) => {
      const newPayload = [...prevPayload];
      newPayload[index] = {
        ...newPayload[index],
        [name]: value,
      };
      setPayload({
        ...payload,
        ...payload.thongTinChung,
        buocNau: newPayload,
      });
      return newPayload;
    });
  };

  const handleChangeInput = (e, name) => {
    console.log(payload);
    console.log(cookHours * 60 + cookMin);
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

    if (name === "anhKemTheo") {
      if (e.target.files[0] != null) {
        setFile(e.target.files[0]);
        const objectUrl = window.URL.createObjectURL(e.target.files[0]);
        setPreview(objectUrl);
        setPayload({
          ...payload,
          thongTinChung: {
            ...payload.thongTinChung,
            anhKemTheo: e.target.value,
          },
        });
      }
    }
    setPayload({
      ...payload,
      thongTinChung: {
        ...payload.thongTinChung,
        [name]: e.target.value,
        thoiGianChuanBi: prepareHours * 60 + prepareMin,
        thoiGianNau: cookHours * 60 + cookMin,
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
        marginTop: 12,
        boxShadow: "0 0 20px 2px rgb(49, 49, 49,0.5)",
      }}
      container
      md={12}
      xs={12}
      lg={12}>
      <Grid item md={12} xs={12} lg={12}>
        <Typography marginBottom={2} fontSize={20} fontWeight={600}>
          Recipe Editing
        </Typography>
        <Grid container md={12} xs={12} lg={12}>
          <Grid item md={3} lg={3} xs={12}>
            {payload?.thongTinChung.anhKemTheo === "" ? (
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
                  <Typography fontSize={12}>
                    Tap or click to add photo
                  </Typography>
                </Fab>
              </label>
            ) : (
              <label htmlFor="upload-photo">
                <input
                  style={{ display: "none" }}
                  id="upload-photo"
                  name="anhkKemTheo"
                  type="file"
                  onChange={(e) => handleChangeInput(e, "anhKemTheo")}
                />
                {preview != "" ? (
                  <img
                    width={"100%"}
                    style={{
                      borderRadius: 20,
                      marginBottom: 2,
                      "&::hover": {
                        borderRadius: 100,
                      },
                    }}
                    src={preview}
                  />
                ) : (
                  <img
                    width={"100%"}
                    style={{
                      borderRadius: 20,
                      marginBottom: 2,
                      "&::hover": {
                        borderRadius: 100,
                      },
                    }}
                    src={`${
                      process.env.REACT_APP_URI_Local +
                      payload?.thongTinChung?.anhKemTheo
                    }`}
                  />
                )}
              </label>
            )}
          </Grid>
          <Grid spacing={1} item md={9} lg={9} xs={12}>
            <Grid spacing={1} container md={12} xs={12} lg={12}>
              <Grid item xs={12} md={12} lg={12}>
                <TextField
                  fullWidth
                  required
                  id="outlined-basic"
                  label="Recipe Title (keep it short and descriptive)"
                  variant="outlined"
                  name="tenCongThuc"
                  value={payload?.thongTinChung?.tenCongThuc || ""}
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
                  value={payload?.thongTinChung?.moTa || ""}
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
                        value={prepareHours}
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
                        value={prepareMin}
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
                        value={cookHours}
                        label="Hours"
                        name="cookHours"
                        onChange={(e) => handleChangeInput(e, "cookHours")}>
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
                        label="Mins"
                        value={cookMin}
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
                        value={payload?.thongTinChung?.doKho || ""}
                        onChange={(e) => handleChangeInput(e, "doKho")}>
                        {level.map((item) => {
                          return (
                            <MenuItem value={item.doKho} key={item.idCategory}>
                              {item.nameDoKho}
                            </MenuItem>
                          );
                        })}
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
                        value={payload?.thongTinChung?.idCategory || ""}
                        onChange={(e) => handleChangeInput(e, "idCategory")}>
                        {category.map((item) => {
                          return (
                            <MenuItem
                              value={item.idCategory}
                              key={item.nameCategory}>
                              {item.nameCategory}
                            </MenuItem>
                          );
                        })}
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
            {ingredientPayload?.map((item, index) => {
              return (
                <Stack
                  sx={{
                    with: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexDirection: "row",
                  }}>
                  <TextField
                    sx={{ marginBottom: 1, width: 0.9 }}
                    label="ingredient"
                    key={index}
                    name={`tenNguyenLieu`}
                    value={item.tenNguyenLieu || ""}
                    onChange={handleChangeIngredient(index)}
                  />
                  <RoundButton
                    sx={{
                      marginLeft: 1,
                      fontSize: 25,
                      width: "12px",
                    }}
                    onClick={() => handleRemoveItem(index, "ingredientPayload")}
                    label={
                      <DeleteOutlineIcon
                        sx={{
                          color: "#fff",
                        }}
                      />
                    }
                  />
                </Stack>
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
            {stepMethodPayload &&
              stepMethodPayload?.map((item, index) => {
                return (
                  <Stack
                    sx={{
                      with: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexDirection: "row",
                    }}>
                    <TextField
                      sx={{ marginBottom: 1 }}
                      fullWidth
                      label={"step " + (index + 1)}
                      name={`moTa`}
                      value={item?.moTa || ""}
                      key={index}
                      onChange={handleChangeStepMethod(index)}
                    />
                    <RoundButton
                      sx={{
                        marginLeft: 1,
                        fontSize: 25,
                        width: "12px",
                      }}
                      onClick={() => handleRemoveItem(index, "methodPayload")}
                      label={
                        <DeleteOutlineIcon
                          sx={{
                            color: "#fff",
                          }}
                        />
                      }
                    />
                  </Stack>
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
        <LoadingButton
          loading={isLoading}
          sx={{
            marginRight: 1,
            color: "rgb(49, 49, 49)",
            borderColor: "rgb(49, 49, 49)",
          }}
          onClick={() => handleSubmit()}
          variant="outlined">
          Save
        </LoadingButton>
      </Grid>
    </Grid>
  );
};

export default EditRecipe;
