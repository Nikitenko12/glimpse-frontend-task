import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";

// Define components used by TableVirtuoso for rendering
const VirtuosoTableComponents = {
  // Component for scrolling container with Paper as the wrapper
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  // Component for the table itself
  Table: (props) => (
    <Table
      {...props}
      sx={{
        borderCollapse: "separate",
        tableLayout: "fixed",
      }}
    />
  ),
  // Component for the table header
  TableHead: React.forwardRef((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  // Component for table rows
  TableRow,
  // Component for the table body
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

// DataTable component
const DataTable = ({ data, columns }) => {
  // Fixed header content with column names
  const fixedHeaderContent = () => (
    <TableRow
      sx={{
        backgroundColor: "#1976d2", // Dark blue background color for the header
        color: "#ffffff", // White text color
      }}
    >
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="left"
          sx={{
            width: column.width, // Set width from column definition
            color: "inherit",
            fontSize: "12.5px",
          }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );

  // Content for each row
  const rowContent = (index, row) => (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align="left"
          sx={{
            backgroundColor: index % 2 === 0 ? "#f5f5f5" : "#ffffff", // Alternating row colors
          }}
        >
          {row[column.dataKey]} {/* Cell content based on column key */}
        </TableCell>
      ))}
    </React.Fragment>
  );

  return (
    <Paper style={{ height: "70vh", width: "100%" }}>
      {/* Container with fixed height and full width */}
      <TableVirtuoso
        data={data} // Data to display in the table
        components={VirtuosoTableComponents} // Components used for rendering
        fixedHeaderContent={fixedHeaderContent} // Fixed header content (sticky header)
        itemContent={rowContent} // Content for each row
      />
    </Paper>
  );
};

export default DataTable;
