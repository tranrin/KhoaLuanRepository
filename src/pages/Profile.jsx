import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import { Fab, TextField, Typography, Button, Box } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { editProfile, getProfile } from "../api/user.api";
import { LoadingButton } from "@mui/lab";
import CircularProgress from "@mui/material/CircularProgress";
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
  const [profilePayload, SetProfilePayload] = useState(default_payload);
  const [isLoading, setIsLoading] = useState(false);
  const [isMounting, setIsMounting] = useState(false);
  useEffect(() => {
    setIsMounting(true);
    getProfile()
      .then((payload) => {
        SetProfilePayload(payload.data);
      })
      .finally(() => {
        setIsMounting(false);
      });
  }, []);

  const handleChange = (e, name) => {
    const { value } = e.target;
    SetProfilePayload({
      ...profilePayload,
      [name]: value,
    });
  };

  const handleEdit = () => {
    setIsLoading(true);
    editProfile(profilePayload)
      .then((payload) => {})
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  return (
    <Grid
      sx={{
        marginTop: 20,
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
          Public profile
        </Typography>
        <Typography>
          This information will appear on your public profile and can be seen by
          other members. Create a screen name for when you post on our site or
          when you enter a competition as we are required to publish the
          winners.
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
              Profile photo
            </Typography>

            <label htmlFor="upload-photo">
              {profilePayload && profilePayload.image != null ? (
                <Box
                  sx={{
                    width: 1,
                    height: 1,
                    borderRadius: 50,
                  }}>
                  <img
                    style={{
                      width: 200,
                      borderRadius: 12,
                    }}
                    src={process.env.REACT_APP_URI_Local + profilePayload.image}
                    alt="image profile"
                  />
                </Box>
              ) : (
                <>
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
              label="Email"
              InputLabelProps={{ shrink: true }}
              value={(profilePayload && profilePayload.email) || ""}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              fullWidth
              id="outlined-basic"
              label="Screen name"
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
              label="Bio"
              multiline
              InputLabelProps={{ shrink: true }}
              value={profilePayload && profilePayload.bio}
              onChange={(e) => handleChange(e, "bio")}
              maxRows={4}
            />
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
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
          </Grid>
          <Grid item xs={12} md={12} lg={12}>
            <TextField
              sx={{
                width: 0.992,
              }}
              id="outlined-multiline-flexible"
              label="Location"
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
                  label="Facebook URL"
                  value={(profilePayload && profilePayload.facebookURL) || ""}
                  onChange={(e) => handleChange(e, "facebookURL")}
                />
              </Grid>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  id="outlined-multiline-flexible"
                  label="Twitter URL"
                />
              </Grid>{" "}
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  id="outlined-multiline-flexible"
                  label="Instagram URL"
                  value={(profilePayload && profilePayload.instagramURL) || ""}
                  onChange={(e) => handleChange(e, "instagramURL")}
                />
              </Grid>{" "}
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  fullWidth
                  id="outlined-multiline-flexible"
                  label="Website URL"
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
              Save change
            </LoadingButton>
          </Grid>
        </>
      )}
    </Grid>
  );
};

export default Profile;
