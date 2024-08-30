import React, { useState, useEffect } from 'react';
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import CircularProgress from '@mui/material/CircularProgress';
import "./Table.css";
import { useAuth } from "../../context/AuthContext";

// Function to create table row data
const makeStyle = (status) => {
  if (status === "complated") {
    return {
      background: "rgb(59, 215, 129)",
      color: "black",
    };
  } else if (status === "processing") {
    return {
      background: "#ffadad8f",
      color: "rgb(137, 25, 25)",
    };
  } else {
    return {
      background: "#f0ca4c",
      color: "black",
    };
  }
};

export default function BasicTable() {
  const { user } = useAuth();  // Access the user object from context
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Define fetchData function within the component
  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/admin/order/get', {
        headers: {
          'Authorization': `Bearer ${user.accessToken}`,  // Use the token here
        },
      });
      const result = await response.json();
      return result.data;
    } catch (err) {
      throw new Error('Failed to fetch data');
    }
  };

  useEffect(() => {
    // Fetch data on component mount
    fetchData()
      .then((data) => {
        setRows(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [user.accessToken]);  // Re-fetch data if the token changes

  if (loading) {
    return (
      <div className="Table">
        <h3>Recent Orders</h3>
        <CircularProgress />
      </div>
    );
  }

  if (error) {
    return (
      <div className="Table">
        <h3>Recent Orders</h3>
        <p>Error fetching data: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="Table">
      <h3>Recent Orders</h3>
      <TableContainer component={Paper} style={{ boxShadow: "0px 13px 20px 0px #80808029" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table" className="mini_Table">
          <TableHead>
            <TableRow>
              <TableCell style={{ color: "white" }}>Order Number</TableCell>
              <TableCell align="left" style={{ color: "white" }}>Amount</TableCell>
              <TableCell align="left" style={{ color: "white" }}>Date</TableCell>
              <TableCell align="left" style={{ color: "white" }}>Status</TableCell>
              <TableCell align="left" style={{ color: "white" }}></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                <TableCell component="th" scope="row" style={{ color: "white" }}>
                  {row.order_number}
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  {row.amount}
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  {new Date(row.created_at).toLocaleDateString()} {/* Format the date */}
                </TableCell>
                <TableCell align="left" style={{ color: "white" }}>
                  <span className="status" style={makeStyle(row.status)}>
                    {row.status}
                  </span>
                </TableCell>
                <TableCell align="left" className="Details">
                  Details
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
