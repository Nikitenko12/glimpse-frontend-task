import React, { useCallback, useState } from "react";
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import { MAX_CSV_FILE_SIZE, COLUMN_WIDTH_IN_PIXELS } from "./constants";

const CsvDropzone = ({ onDataLoaded }) => {
  // State to manage drag-and-drop status
  const [isDragging, setIsDragging] = useState(false);

  // State to reset the file input
  const [fileInputKey, setFileInputKey] = useState(Date.now());

  // State to store error messages
  const [error, setError] = useState("");

  // Callback function to handle file drops
  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];

      if (file) {
        // Check file size
        if (file.size > MAX_CSV_FILE_SIZE) {
          setError("File size exceeds 5MB. Please upload a smaller file.");
          return;
        }

        // Check file type
        if (file.type !== "text/csv" && !file.name.endsWith(".csv")) {
          setError("Invalid file type. Please upload a CSV file.");
          return;
        }

        // Parse the CSV file
        Papa.parse(file, {
          complete: (results) => {
            const data = results.data;

            // Check if the file contains data
            if (data.length === 0 || data[0].length === 0) {
              setError(
                "Invalid CSV file. Please upload a file with valid data."
              );
              return;
            }

            // Map CSV headers to column definitions
            const columns = data[0].map((header) => ({
              dataKey: header,
              label: header,
              width: COLUMN_WIDTH_IN_PIXELS,
            }));

            // Map CSV rows to objects
            const rows = data.slice(1).map((row) => {
              const rowObject = {};
              row.forEach((cell, index) => {
                rowObject[columns[index].dataKey] = cell;
              });
              return rowObject;
            });

            // Clear any previous errors and pass data to parent component
            setError("");
            onDataLoaded(rows, columns);
            setFileInputKey((prevKey) => prevKey + 1); // Reset file input
          },
          header: false,
          skipEmptyLines: true,
          error: (error) => {
            setError(`Error parsing file: ${error.message}`);
          },
        });
      }
    },
    [onDataLoaded] // Dependency array
  );

  // Setup react-dropzone hooks
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <>
      {/* Dropzone area for CSV file upload */}
      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed #666",
          padding: 2,
          borderRadius: 2,
          textAlign: "center",
          cursor: "pointer",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "150px",
          transition: "background-color 0.3s",
          backgroundColor: isDragging ? "#e3e3e3" : "#fff",
        }}
        onDragEnter={() => setIsDragging(true)}
        onDragLeave={() => setIsDragging(false)}
        onDragOver={(event) => event.preventDefault()}
      >
        {/* Hidden file input */}
        <input
          key={fileInputKey}
          {...getInputProps()}
          type="file"
          accept=".csv"
          style={{ display: "none" }}
        />
        <Typography variant="h6" sx={{ color: "#333" }}>
          Drag and drop a CSV file here, or click here to select one
        </Typography>
      </Box>

      {/* Snackbar for displaying error messages */}
      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError("")}
      >
        <Alert onClose={() => setError("")} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </>
  );
};

export default CsvDropzone;
