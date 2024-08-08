import React, { useState } from "react";
import CsvDropzone from "./CsvDropzone";
import DataTable from "./DataTable";
import { Box, Button, Typography, Container, Paper } from "@mui/material";

const App = () => {
  // State to store CSV data and column definitions
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);

  // Callback to handle the loaded data from CsvDropzone
  const handleDataLoaded = (loadedData, columnDefs) => {
    setData(loadedData);
    setColumns(columnDefs);
  };

  // Callback to reset the data and columns
  const handleReset = () => {
    setData([]);
    setColumns([]);
  };

  return (
    <Box px={8} py={6}>
      {data.length === 0 ? (
        <>
          {/* Container for the CSV upload section */}
          <Container maxWidth="md" sx={{ marginTop: 4 }}>
            <Paper
              elevation={3}
              sx={{
                padding: 3,
                borderRadius: 2,
                backgroundColor: "#f5f5f5",
              }}
            >
              {/* Heading and description for the CSV upload */}
              <Typography
                variant="h4"
                gutterBottom
                sx={{ color: "#333", fontWeight: "bold" }}
              >
                CSV Data Table
              </Typography>

              <Typography variant="body1" gutterBottom sx={{ color: "#666" }}>
                Upload a CSV file to see its contents displayed in a table
                format. The CSV file should contain headers in the first row and
                data in subsequent rows. Ensure the file size does not exceed
                5MB.
              </Typography>

              {/* CsvDropzone component for file upload */}
              <CsvDropzone onDataLoaded={handleDataLoaded} />
            </Paper>
          </Container>
        </>
      ) : (
        <>
          {/* Heading and description for the table view */}
          <Typography
            variant="h4"
            gutterBottom
            sx={{ color: "#333", fontWeight: "bold" }}
          >
            CSV Data Table
          </Typography>
          <Typography variant="body1" sx={{ color: "#666", marginBottom: 2 }}>
            This table displays the contents of your CSV file. You can view and
            interact with the data below.
          </Typography>

          {/* Button to reset the data and return to the upload view */}
          <Button variant="contained" onClick={handleReset} sx={{ mb: 2 }}>
            Reset
          </Button>

          {/* DataTable component to display the CSV data */}
          <DataTable data={data} columns={columns} onReset={handleReset} />
        </>
      )}
    </Box>
  );
};

export default App;
