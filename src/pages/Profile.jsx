import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Fab, TextField, Typography, Button, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { editProfile, getProfile } from "../api/user.api";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
import { upLoadImage } from "../api/recipe.api";
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';

const default_payload = {
  email: "tranngocrin12@gmail.com",
  birthDate: "2023-05-20T15:51:19.686Z",
  screenName: "",
  bio: "",
  location: "",
  image: "",
  facebookURL: "facebook.com",
  instagramURL: "https://www.instagram.com/",
  websiteURL: "string",
  twitterURL: "string",
};


const Profile = () => {
  const { t } = useTranslation()
  const navigate = useNavigate();
  const [profilePayload, SetProfilePayload] = useState(default_payload);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounting, setIsMounting] = useState(false);
  const [file, setFile] = React.useState("");
  const [preview, setPreview] = React.useState("");
  useEffect(() => {
    setIsMounting(true);
    getProfile()
      .then((payload) => {
        console.log(payload.data);
        SetProfilePayload(payload.data);
      })
      .finally(() => {
        setIsMounting(false);
      });
  }, []);

  const handleChange = (e, name) => {
    console.log(name);
    const { value } = e.target;
    if (name === "image") {
      if (e.target.files[0] != null) {
        setFile(e.target.files[0]);
        const objectUrl = window.URL.createObjectURL(e.target.files[0]);
        setPreview(objectUrl);
        // setPayload({
        //   ...payload,
        //   thongTinChung: {
        //     ...payload.thongTinChung,
        //     anhKemTheo: e.target.value,
        //   },
        // });
      }
    }
    if (name != "image") {
      SetProfilePayload({
        ...profilePayload,
        [name]: value,
      });
    }
  };

  const handleEdit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append("File", file);
    if (file.name != "" ) {
  //    console.log(file.name,"namefilieeee" + file.name);

      const uploadImage = await upLoadImage(formData)
        .then(async (item) => {
   
        
       //   console.log(item.text(),"datareturn");
          setIsLoading(true);
          console.log({
            ...profilePayload,
            image: item?.data,
            
          },"datacheck");
      if(item?.data != 'Object reference not set to an instance of an object.'){
        localStorage.setItem('imageUser',item?.data)
      }
          await editProfile({
            ...profilePayload,
            image: item?.data,
          }).then((payload) => { 
            console.log(payload,"payload")
          
          });
        })
        .finally(async () => {
          setIsLoading(false);
          setFile("");
      window.location.reload();
        });
    }
    if (file.name === undefined) {
      console.log("not null");

      await editProfile(profilePayload)
        .then((payload) => {
       
        })
        .catch((error) => {
          console.error(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  return (
    <Grid
      sx={{
        marginTop: 10,
        border: "solid #ccc 2px",
        borderRadius: 5,
        boxShadow: "0 0 20px 2px rgb(49, 49, 49,0.8)",
      }}
      padding={2}
      marginBottom={10}
      spacing={1}
      container
      md={12}
      xs={12}
      lg={12}>
      <Grid item md={12} xs={12} lg={12}>
        <Typography fontWeight={600} variant="h4">
        {t('profile.title')}
        
        </Typography>
        <Typography>  {t('profile.description')}
         
        </Typography>
      </Grid>
      {isMounting === true ? (
        <>
          <Box sx={{ display: "flex" }}>
            <CircularProgress />{" "}
          </Box>
        </>
      ) : (
        <>
          <Grid
            alignItems={"center"}
            justifyContent={"center"}
            item
            md={12}
            xs={12}
            lg={12}>
            <Typography marginBottom={2} fontWeight={600}>
           {t('profile.image')}
            </Typography>

            <label htmlFor="upload-photo">
              {profilePayload && profilePayload.image != null ? (
                <>
                  <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={(e) => handleChange(e, "image")}
                  />
                  <Box
                    sx={{
                      width: 1,
                      height: 1,
                      borderRadius: 50,
                      "&:hover": {
                        opacity: 0.7,
                      },
                    }}>
                    {preview != "" ? (
                      <img
                        width={"300px"}
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
                        width={"300px"}
                        style={{
                          borderRadius: 20,
                          marginBottom: 2,
                          "&::hover": {
                            borderRadius: 100,
                          },
                        }}
                        src={`${
                          process.env.REACT_APP_URI_Local +
                          profilePayload?.image
                        }`}
                      />
                    )}
                  </Box>
                </>
              ) : (
                <>
                  <input
                    style={{ display: "none" }}
                    id="upload-photo"
                    name="upload-photo"
                    type="file"
                    onChange={(e) => handleChange(e, "image")}
                  />
                  <Fab
                    sx={{
                      width: 200,
                      height: 200,
                      borderRadius: "50%",
                    }}
                    color="default"
                    size="small"
                    component="span"
                    aria-label="add"
                    variant="extended">
                    <AccountCircleIcon sx={{ fontSize: 100 }} />
                  </Fab>
                </>
              )}
            </label>
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              fullWidth
              id="outlined-basic"
              disabled
              label= {t('profile.email')}
              InputLabelProps={{ shrink: true }}
              value={(profilePayload && profilePayload.email) || ""}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              fullWidth
              id="outlined-basic"
              label={t('profile.screenName')}
              InputLabelProps={{ shrink: true }}
              value={profilePayload && profilePayload.screenName}
              onChange={(e) => handleChange(e, "screenName")}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label={t('profile.bio')}
              multiline
              InputLabelProps={{ shrink: true }}
              value={profilePayload && profilePayload.bio}
              onChange={(e) => handleChange(e, "bio")}
              maxRows={4}
            />
          </Grid>
          {/* <Grid item xs={12} md={12} lg={12}>
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label="Birthday"
              multiline
              InputLabelProps={{ shrink: true }}
              value={
                profilePayload &&
                new Date(profilePayload.birthDate).toDateString()
              }
              onChange={(e) => handleChange(e, "birthDate")}
              maxRows={4}
            />
          </Grid> */}
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              sx={{
                width: 0.992,
              }}
              id="outlined-multiline-flexible"
              label={t('profile.location')}
              InputLabelProps={{ shrink: true }}
              onChange={(e) => handleChange(e, "location")}
              value={(profilePayload && profilePayload.location) || ""}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <Grid container spacing={1} xs={12} md={12} lg={12}>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  id="outlined-multiline-flexible"
                  defaultValue={""}
                  label={t('profile.facebook-URL')}
                  value={(profilePayload && profilePayload.facebookURL) || ""}
                  onChange={(e) => handleChange(e, "facebookURL")}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  id="outlined-multiline-flexible"
                  label={t('profile.twitter-URL')}
                  value={(profilePayload && profilePayload.twitterURL) || ""}
                  onChange={(e) => handleChange(e, "twitterURL")}
                />
              </Grid>{" "}
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  id="outlined-multiline-flexible"
                  label={t('profile.instagram-URL')}
                  value={(profilePayload && profilePayload.instagramURL) || ""}
                  onChange={(e) => handleChange(e, "instagramURL")}
                />
              </Grid>{" "}
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  id="outlined-multiline-flexible"
                  label={t('profile.website-URL')}
                  value={(profilePayload && profilePayload.websiteURL) || ""}
                  onChange={(e) => handleChange(e, "websiteURL")}
                />
              </Grid>
            </Grid>
          </Grid>
          <Grid item md={12} xs={12} lg={12}>
            <LoadingButton
              loading={isLoading}
              onClick={() => handleEdit()}
              sx={{
                bgcolor: " rgb(49, 49, 49)",
                "&:hover": {
                  bgcolor: "rgb(49, 49, 49,0.8)",
                },
              }}
              variant="contained">
                  {t('profile.saveChange')}

            </LoadingButton>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Profile;
