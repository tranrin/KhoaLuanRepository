import { saveAs } from "file-saver";
import { Button } from "@mui/material";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  pdf,
  Image,
} from "@react-pdf/renderer";
import React from "react";
const styles = StyleSheet.create({
  page: {
    width: "100%",
    height: "100vh",
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});
const PrintableComponent = () => {
  const handlePrint = async () => {
    // get the printable element
    try {
      const doc = (
        <Document>
          <Page>
            <Text style={{ fontSize: 12 }}>Hello, World!</Text>
          </Page>
        </Document>
      );

      const asPdf = pdf(); // {} is important, throws without an argument
      asPdf.updateContainer(doc);
      const pdfBlob = asPdf.toBlob();
      saveAs(await pdfBlob, "document.pdf");
    } catch (error) {
      console.error(error);
      alert("Error generating PDF");
    }
  };

  return (
    <div>
      <PDFViewer>
        <Document>
          <Page size="A4" style={styles.page}>
            <View style={styles.section}>
              <Text>Section #1</Text>
            </View>
            <View style={styles.section}>
              <Text>Section #2</Text>
            </View>
          </Page>
        </Document>
      </PDFViewer>

      <Button onClick={handlePrint}>Print and Save as PDF</Button>
    </div>
  );
};

export default PrintableComponent;
