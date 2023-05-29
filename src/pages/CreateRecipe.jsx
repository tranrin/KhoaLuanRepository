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
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import { useTranslation } from 'react-i18next';
import React, { useEffect } from "react";
import { createRecipe, saveRecipe, upLoadImage } from "../api/recipe.api";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import RoundButton from "../components/RoundedButton";
import AlertDialog from "../components/Alert";
const defaulPayload = {
  thongTinChung: {
    tenCongThuc: "",
    moTa: "",
    thoiGianNau: 0,
    thoiGianChuanBi: 0,
    idCategory: 0,
    anhKemTheo: null,
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
    },
  ],
};
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
  const { t } = useTranslation()
  const category = [
    {
      idCategory: 1,
      nameCategory: t('recipeUpdate.category.italian'),
    },
    {
      idCategory: 2,
      nameCategory:  t('recipeUpdate.category.american'),
    },
    {
      idCategory: 3,
      nameCategory:  t('recipeUpdate.category.thai'),
    },
    {
      idCategory: 4,
      nameCategory:  t('recipeUpdate.category.japanese'),
    },
  ];
  
  const level = [
    {
      doKho: 1,
      nameDoKho: t('recipeUpdate.difficultylevel.easy'),
    },
    {
      doKho: 2,
      nameDoKho:  t('recipeUpdate.difficultylevel.intermediate'),
    },
    {
      doKho: 3,
      nameDoKho:t('recipeUpdate.difficultylevel.advanced'),
    },
    {
      doKho: 4,
      nameDoKho: t('recipeUpdate.difficultylevel.expert'),
    },
  ];
  const [prepareHours, setPrepareHours] = React.useState(0);
  const [prepareMin, setPrepareMin] = React.useState(0);
  const [cookHours, setCookHours] = React.useState(0);
  const [cookMin, setCookMin] = React.useState(0);
  const [preview, setPreview] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [file, setFile] = React.useState("");
  const [textAlert, setTextAlert] = React.useState("");

  const [payload, setPayload] = React.useState(defaulPayload);
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

  const handleRemoveItem = (indexToRemove, name) => {
    if (name === "ingredientPayload")
      setIngredientPayload((prevPayload) => {
        return prevPayload.filter((_, index) => index !== indexToRemove);
      });
    if (name === "methodPayload")
      setStepMethodPayload((prevPayload) => {
        return prevPayload.filter((_, index) => index !== indexToRemove);
      });
  };

  const handleSubmit = async () => {
    // alert.show("Oh look, an alert!");
    let hasValidationError = false;
    // Check thongTinChung properties
    const {
      tenCongThuc,
      moTa,
      thoiGianNau,
      thoiGianChuanBi,
      idCategory,
      anhKemTheo,
      doKho,
    } = payload.thongTinChung;

    if (
      !tenCongThuc ||
      tenCongThuc.trim() === "" ||
      !moTa ||
      moTa.trim() === ""
    ) {
      setOpen(true);
      hasValidationError = true;
      setTextAlert("Please enter all fields.");
    }

    payload.nguyenLieu.forEach((nguyenLieu, index) => {
      if (!nguyenLieu.tenNguyenLieu || nguyenLieu.tenNguyenLieu.trim() === "") {
        hasValidationError = true;
        setOpen(true);

        setTextAlert(`Please enter all fields`);
      }
    });

    // Check buocNau properties
    payload.buocNau.forEach((buocNau, index) => {
      if (!buocNau.moTa || buocNau.moTa.trim() === "") {
        hasValidationError = true;
        setOpen(true);
        setTextAlert(`Please enter all fields`);
      }
    });

    // Perform further validation if needed...

    // If there are no validation errors, proceed with submitting the form
    if (!hasValidationError) {
      // Submit form logic here
      delete payload.thongTinChung.prepareHours;
      delete payload.thongTinChung.prepareMins;
      delete payload.thongTinChung.cookHours;
      delete payload.thongTinChung.cookMins;
      console.log(payload);
      const formData = new FormData();
      formData.append("File", file);
      const uploadImage = await upLoadImage(formData).then(async (item) => {
        console.log(item);
        const file = item.data.replace("C:\\fakepath\\", "");
        setPayload({
          ...payload,
          thongTinChung: {
            ...payload.thongTinChung,
            anhKemTheo: file,
          },
        });
        await createRecipe(payload)
          .then((data) => {
            console.log(data);
          })
          .finally(() => {
            setPayload(defaulPayload);
            setOpen(true)
            setTextAlert("Creating successfully.");
          });
      });
    }

    // const test = await createRecipe(payload).then((data) => {});
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

    if (name === "anhKemTheo") {
      setFile(e.target.files[0]);
      if (e.target.files[0] != null) {
        const objectUrl = window.URL.createObjectURL(e.target.files[0]);
        setPreview(objectUrl);
        setPayload({
          ...payload,
          thongTinChung: {
            ...payload.thongTinChung,
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
      <AlertDialog
        handleClose={() => setOpen(false)}
        isOpen={open}
        text={textAlert}
      />
      <Grid item md={12} xs={12} lg={12}>
        <Typography marginBottom={2} fontSize={20} fontWeight={600}>
          Recipe Details
        </Typography>
        <Grid container md={12} xs={12} lg={12}>
          <Grid item md={3} lg={3} xs={12}>
            {preview === "" ? (
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
                <img
                  width={"100%"}
                  style={{
                    borderRadius: 20,
                    marginBottom: 2,
                    "&::hover": {
                      borderRadius: 100,
                    },
                  }}
                  src={`${preview}`}
                />
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
                   {t('recipeUpdate.timings')}
                </Typography>
                <Grid gap={1} container md={12} xs={12} lg={12}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Typography>
                    {t('recipeUpdate.prepTime')}

                    </Typography>
                  </Grid>
                  <Grid item md={4} lg={4} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                     
                        {t('recipeUpdate.hours')}
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
                                {hour} {t('recipeUpdate.hours')}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={4} lg={4} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                  
                        {t('recipeUpdate.mins')}
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
                                {hour}  {t('recipeUpdate.mins')}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
                <Grid gap={1} container md={12} xs={12} lg={12}>
                  <Grid item xs={12} md={12} lg={12}>
                    <Typography> {t('recipeUpdate.cookTime')}</Typography>
                  </Grid>
                  <Grid item md={4} lg={4} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
           
                        {t('recipeUpdate.hours')}
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
                                {hour}  {t('recipeUpdate.mins')}
                              </MenuItem>
                            );
                          })}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item md={4} lg={4} xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {t('recipeUpdate.mins')}
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
                                {hour}  {t('recipeUpdate.mins')}
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
                    <Typography> {t('recipeUpdate.difficultylevel.title')}</Typography>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                     {t('recipeUpdate.difficultylevel.title')}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label= {t('recipeUpdate.difficultylevel.title')}
                        name="doKho"
                        onChange={(e) => handleChangeInput(e, "doKho")}>
                        <MenuItem value={level[0].doKho}>{level[0].nameDoKho}</MenuItem>
                        <MenuItem value={level[1].doKho}>{level[1].nameDoKho}</MenuItem>
                        <MenuItem value={level[2].doKho}>{level[2].nameDoKho}</MenuItem>
                        <MenuItem value={level[3].doKho}>{level[3].nameDoKho}</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid paddingRight={0.5} item xs={12} md={6} lg={6}>
                    <Typography>{t('recipeUpdate.category.title')}</Typography>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        {t('recipeUpdate.category.title')}
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        label= {t('recipeUpdate.category.title')}
                        name="idCategory"
                        onChange={(e) => handleChangeInput(e, "idCategory")}>
                        <MenuItem value={category[0].idCategory}>{category[0].nameCategory}</MenuItem>
                        <MenuItem value={category[1].idCategory}>{category[1].nameCategory}</MenuItem>
                        <MenuItem value={category[2].idCategory}>{category[2].nameCategory}</MenuItem>
                        <MenuItem value={category[3].idCategory}>{category[3].nameCategory}</MenuItem>
                        
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
            <Typography fontWeight={600}> {t('recipeUpdate.ingredient')}</Typography>
            <Typography>
            {t('recipeUpdate.ingredients')}
             
            </Typography>
            {/* <Typography
              sx={{
                marginBottom: 1,
              }}>
              You can split your ingredients into groups, e.g. sauce, filling
              etc.
            </Typography> */}
            {ingredientPayload.map((item, index) => {
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
             {t('recipeUpdate.addIngre')}
            </Button>
          </Grid>
          <Grid item md={6} lg={6} xs={12}>
            <Typography sx={{ marginBottom: 1 }} fontWeight={600}>
            
              {t('recipeUpdate.method')}
            </Typography>
            {stepMethodPayload.map((item, index) => {
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
                 {t('recipeUpdate.addMethod')}

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
           {t('recipeUpdate.save')}
        </Button>
      </Grid>
    </Grid>
  );
};

export default CreateRecipe;
