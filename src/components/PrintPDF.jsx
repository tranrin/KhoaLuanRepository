import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Grid, Stack } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "#fff",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};
const FAKE_INGREDIENT = ["1 Ca", "1 Thit", "2 KG Suong Bo", "Mau me"];

const FAKE_METHOD = ["Bat nuoc", "Luoc Ca", "Ngam Suong", "Nem Mau me"];

const PrintToPDF = ({ isOpen, handleClose, Data }) => {
  console.log(Data,"data")
  const createPDF = async () => {
    const pdf = new jsPDF("portrait", "pt", "a4");
    const img =
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505";
    const imgProperties = pdf.getImageProperties(img);
    // Convert the HTML element to an image
    const canvas = await html2canvas(document.querySelector("#pdf"), {
      useCORS: true,
    });
    const imgData = canvas.toDataURL(
      "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505",
    );
    var img1 = new Image()
    img1.src = process.env.REACT_APP_URI_Local + Data.thongTinChung?.anhKemTheo 

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
    // Add the image to the PDF
    pdf.addImage(imgData, "JPG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("output.pdf");
  };

  return (
    <div>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description">
        <Box sx={style}>
          <div
            id="pdf"
            style={{
              padding: "12px",
            }}>
            <Grid container md={12} xs={12} lg={12}>
              <Grid item xs={12} md={12} lg={12}>
                <Grid container md={12} xs={12} lg={12}>
                  <Grid
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                    item
                    xs={12}
                    md={7}
                    lg={7}>
                    <Typography
                      sx={{
                        fontSize: 56,
                        color: "#285d5d",
                        position: "relative",
                        fontWeight: 600,
                      }}
                      variant="h1">
                      good
                      <Typography
                        sx={{
                          fontSize: 12,
                          color: "#285d5d",
                          position: "absolute",
                          top: 0,
                          left: 5,
                          fontWeight: 600,
                        }}
                        caption>
              
                      </Typography>
                    </Typography>
                    <Typography
                      sx={{ fontSize: 56, color: "#285d5d" }}
                      variant="h1">
                      food
                    </Typography>
        
                    
                  </Grid>
                  
                  <Grid item xs={12} md={5} lg={5}>
                    <img
                      width={"100%"}
                      src={
                        "https://images.immediate.co.uk/production/volatile/sites/30/2020/08/chorizo-mozarella-gnocchi-bake-cropped-9ab73a3.jpg?quality=90&resize=556,505"
                      }
                    />
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Grid spacing={2} container xs={12} md={12} lg={12}>
                <Grid
                    sx={{
                      fontSize: 12,
                      fontWeight: 600,
                    }}
                   >
                    <Typography
                      sx={{
                        fontSize: 24,
                        color: "#285d5d",
                        fontWeight: 600,
                        margin: 2
                      }}
                      variant="body1">
                       Recipe name :      <span style={{marginLeft: 5}}>{Data  ?  Data.thongTinChung?.tenCongThuc : ''  }</span>
                    </Typography>
               
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 500,
                            corlo: "#000",
                            marginLeft: 5
                          }}
                          variant="caption">
                          Description:
                        </Typography>   
                        {Data ? Data.thongTinChung?.moTa : null }             
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Grid spacing={2} container xs={12} md={12} lg={12}>
                  <Grid item xs={12} md={4} lg={4}>
                    <Typography
                      sx={{
                        fontSize: 24,
                        color: "#285d5d",
                        fontWeight: 600,
                      }}
                      variant="body1">
                      Ingredient
                    </Typography>
                    {Data ? null : Data?.nguyenLieu?.map((item, index) => (
                      <Stack
                        sx={{
                          borderBottom: "1px solid #ccc",
                        }}>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 500,
                          }}
                          variant="caption">
                          {item.tenNguyenLieu}
                        </Typography>
                      </Stack>
                    ))}
                  </Grid>
                  <Grid
                    sx={{
                      fontSize: 24,
                      fontWeight: 600,
                    }}
                    item
                    xs={12}
                    md={8}
                    lg={8}>
                    <Typography
                      sx={{
                        fontSize: 24,
                        color: "#285d5d",
                        fontWeight: 600,
                      }}
                      variant="body1">
                      Method
                    </Typography>
                    {Data ? null :Data.buocNau.map((item, index) => (
                      <Stack>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 500,
                            corlo: "#000",
                          }}
                          variant="caption">
                          {item.moTa}
                        </Typography>
                      </Stack>
                    ))}
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <Grid spacing={2} container xs={12} md={12} lg={12}>
                  <Grid item xs={12} md={4} lg={4}>
                    <Typography
                      sx={{
                        fontSize: 24,
                        color: "#285d5d",
                        fontWeight: 600,
                      }}
                      variant="body1">
              
                    </Typography>
                    {Data?.nguyenLieu?.map((item, index) => (
                      <Stack
                        sx={{
                          borderBottom: "1px solid #ccc",
                        }}>
                        <Typography
                          sx={{
                            fontSize: 16,
                            fontWeight: 500,
                          }}
                          variant="caption">
                          {item.tenNguyenLieu}
                        </Typography>
                      </Stack>
                    ))}
                  </Grid>
                 
                </Grid>
              </Grid>
            
            </Grid>
          </div>
          <Button onClick={createPDF}>Download</Button>
          <Button onClick={handleClose} autoFocus>
            CLOSE
          </Button>
        </Box>
      </Modal>
    </div>
  );
};

export default PrintToPDF;
