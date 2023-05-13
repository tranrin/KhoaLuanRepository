import React from "react";
import Grid from "@mui/material/Grid";
import { Fab, TextField, Typography, Button } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
const Profile = () => {
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
        </label>
      </Grid>
      <Grid item xs={12} md={6} lg={12}>
        <TextField id="outlined-basic" label="Screen name" variant="outlined" />
      </Grid>
      <Grid item xs={12} md={12} lg={6}>
        <TextField
          fullWidth
          id="outlined-multiline-flexible"
          label="Bio"
          multiline
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
        />
      </Grid>
      <Grid item xs={12} md={12} lg={12}>
        <Grid container spacing={1} xs={12} md={12} lg={12}>
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label="Facebook URL"
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
              label="Instagram URL              "
            />
          </Grid>{" "}
          <Grid item xs={12} md={6} lg={6}>
            <TextField
              fullWidth
              id="outlined-multiline-flexible"
              label="Website URL"
            />
          </Grid>
        </Grid>
      </Grid>
      <Grid item md={12} xs={12} lg={12}>
        <Button
          sx={{
            bgcolor: " rgb(49, 49, 49)",
            "&:hover": {
              bgcolor: "rgb(49, 49, 49,0.8)",
            },
          }}
          variant="contained">
          Save change
        </Button>
      </Grid>
    </Grid>
  );
};

export default Profile;
