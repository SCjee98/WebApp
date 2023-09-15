import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import LiveClock from "react-live-clock";
import { Container, Paper, Typography } from "@mui/material";

const DashboardCalendar = () => {
  return (
    <Container>
      {/* <Typography variant="h6">Calendar</Typography> */}
      <Paper elevation={3} style={{ padding: "1rem" }}>
        {/* Live Time */}
        <div style={{ marginBottom: "1rem" }}>
          <Typography variant="h5">
            <LiveClock format="HH:mm:ss" ticking />
          </Typography>
        </div>

        {/* Date Picker */}
        <div>
          <DatePicker
            selected={new Date()}
            onChange={(date) => console.log("Selected date:", date)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="MMMM d, yyyy h:mm aa"
          />
        </div>
      </Paper>
    </Container>
  );
};

export default DashboardCalendar;
