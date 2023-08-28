import { Button } from "@mui/material";
import React from "react";
import { IBooking } from "./booking";

interface ISingleBookingSLotProps {
  start: Date;
  selectedBookingTimes: Array<Date | null>;
  setSelectedBookingTimes: React.Dispatch<
    React.SetStateAction<Array<Date | null>>
  >;
  avaialbe: boolean;
  bookings: IBooking[] | null;
}

const SingleBookingSLot = (props: ISingleBookingSLotProps) => {
  const handleClick = () => {
    let flag = true;
    let tempArray = [];
    if (props.selectedBookingTimes.length >= 1) {
      for (const booking of props.selectedBookingTimes) {
        if (booking?.getTime() !== props.start.getTime()) {
          tempArray.push(booking);
        } else {
          flag = false;
        }
      }
      if (!flag) {
        props.setSelectedBookingTimes(tempArray);
      }
    }
    if (flag) {
      if (props.selectedBookingTimes.length >= 2) {
        tempArray = [...props.selectedBookingTimes];

        tempArray.shift();
        tempArray.push(props.start);

        props.setSelectedBookingTimes(tempArray);
      } else {
        props.setSelectedBookingTimes([
          ...props.selectedBookingTimes,
          props.start,
        ]);
      }
    }
  };

  const inSelectedBookingTimes = () => {
    for (const booking of props.selectedBookingTimes) {
      if (booking?.getTime() === props.start.getTime()) {
        return true;
      }
    }
    return false;
  };
  return (
    <Button
      onClick={handleClick}
      variant={props.avaialbe ? "contained" : "outlined"}
      disabled={!props.avaialbe}
      color={inSelectedBookingTimes() ? "secondary" : "primary"}
      href=""
    >
      {props.start.getHours().toString().padStart(2, "0")} :
      {props.start.getMinutes().toString().padStart(2, "0")}
    </Button>
  );
};

export default SingleBookingSLot;

