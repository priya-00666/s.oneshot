import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { Box, Button, Container, Typography } from "@mui/material";
import React, { useState } from "react";
import BookingSlot from "./bookingSlot";
import { useNavigate } from "react-router-dom";
import MyAppBar from "./appbar";

export interface IBooking {
  _id: string;
  user: string;
  start: Date;
  end: Date;
}

const Booking: React.FC = () => {
  const navigate = useNavigate();

  const [selectedDate, setSelectedDate] = useState<Date | null>(
    new Date(new Date().setHours(0, 0, 0, 0))
  );
  const [selectedBookingTimes, setSelectedBookingTimes] = useState<
    Array<Date | null>
  >([]);
  const [bookings, setBookings] = useState<Array<IBooking> | null>(null);

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ date: selectedDate?.toISOString() }),
      });
      if (response.status === 200) {
        response.json().then((res) => {
          if (res.bookings.length > 0) {
            setBookings(res.bookings);
          } else {
            setBookings([]);
          }
        });
      }
      if (response.status === 401) {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateChange = (date: Date | null) => {
    date?.setHours(0, 0, 0, 0);
    setSelectedDate(date);
  };

  const handleClick = async () => {
    if (selectedBookingTimes) {
      let tempArray = [];
      if (selectedBookingTimes.length >= 2) {
        tempArray = [...selectedBookingTimes].sort(
          (a, b) => a!.getTime() - b!.getTime()
        );
      } else {
        tempArray = [...selectedBookingTimes, selectedBookingTimes[0]];
      }
      if (tempArray[1] instanceof Date) {
        tempArray[1] = new Date(
          new Date(tempArray[1]).setMinutes(tempArray[1].getMinutes() + 30)
        );

        try {
          const response = await fetch("http://localhost:5000/booking/book", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              start: tempArray[0]?.toISOString(),
              end: tempArray[1].toISOString(),
            }),
          });
          if (response.status === 201) {
            response.json().then((res) => {
              if (bookings) {
                console.log(res);

                setBookings([...bookings, res.booking]);
              } else {
                setBookings([res.booking]);
              }
            });
          } else if (response.status === 400) {
            response.json().then((res) => alert(res.message));
          }
          if (response.status === 401) {
            navigate("/");
          }
        } catch {}
      }
    }
  };

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
        >
          <Box marginY={"2%"} display="flex" flexDirection={"column"}>
            <Box marginY={"5%"}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  label="Select a date"
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </LocalizationProvider>
            </Box>
            <Button variant="contained" onClick={handleSubmit} size="small">
              GO
            </Button>
          </Box>
          <Typography variant="h5">Time slots</Typography>
          <BookingSlot
            bookings={bookings}
            selectedDate={selectedDate}
            setSelectedBookingTimes={setSelectedBookingTimes}
            selectedBookingTimes={selectedBookingTimes}
          />
          <Button
            variant="contained"
            style={{ backgroundColor: "red" }}
            onClick={handleClick}
          >
            BOOK
          </Button>
        </Box>
      </Container>
    </>
  );
};
export default Booking;

