import React, { useEffect, useState } from "react";
import MyAppBar from "./appbar";
import { Box, Button, Container, Typography } from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { IBooking } from "./booking";
import CancelBookingButton from "./cancelBooking";

const MyBookings = () => {
  const [bookings, setBookings] = useState<Array<IBooking>>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [selectedBooking, setSelectedBooking] = useState<string | null>(null);
  const handleDateChange = (date: Date | null) => {
    date?.setHours(0, 0, 0, 0);
    setSelectedDate(date);
  };

  const handleCLick = async () => {
    try {
      const response = await fetch("http://localhost:5000/mybookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          date: selectedDate?.toISOString(),
        }),
      });
      if (response.status === 200) {
        response.json().then((res) => setBookings(res.bookings));
      }
    } catch {}
  };

  const cancelBooking = async () => {
    if (selectedBooking) {
      try {
        const response = await fetch("http://localhost:5000/booking", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            id: selectedBooking,
          }),
        });
        if (response.status === 200) {
          handleCLick();
        }
      } catch {}
    }
  };

  useEffect(() => {
    cancelBooking();
  }, [selectedBooking]);
  return (
    <>
      <MyAppBar />
      <Container>
        <Box
          display="flex"
          flexDirection={"column"}
          height="100vh"
          alignItems={"center"}
          justifyContent={"center"}
          minWidth="100vh"
          gap={"2%"}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Select a date"
              value={selectedDate}
              onChange={handleDateChange}
            />
          </LocalizationProvider>
          <Button variant="contained" onClick={handleCLick} size="small">
            GO
          </Button>
          <Typography variant="h5">My Bookings(Click to cancel)</Typography>
          <Box
            display={"flex"}
            flexWrap={"wrap"}
            width={"100vh"}
            gap={"10px"}
            justifyContent={"center"}
            padding={"10vh"}
          >
            {bookings.map((booking, i) => (
              <CancelBookingButton
                key={i}
                booking={booking}
                setSelecetedBooking={setSelectedBooking}
              />
            ))}
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default MyBookings;

