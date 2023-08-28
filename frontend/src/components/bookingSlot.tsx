import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { IBooking } from "./booking";
import SingleBookingSLot from "./singleBookingSLot";

interface IBookingSlotProps {
  bookings: Array<IBooking> | null;
  selectedDate: Date | null;
  selectedBookingTimes: Array<Date | null>;
  setSelectedBookingTimes: React.Dispatch<
    React.SetStateAction<Array<Date | null>>
  >;
}

interface ICustomeDateWrapper {
  date: Date;
  avaialable: boolean;
}

const BookingSlot = (props: IBookingSlotProps) => {
  const [dates, setDates] = useState<Array<ICustomeDateWrapper>>([]);

  const generateAllSlots = () => {
    const datesArray: Array<ICustomeDateWrapper> = [];
    if (props.selectedDate && props.bookings) {
      for (let i = 0; i < 48; i++) {
        let flag = false;
        const newDate = new Date(props.selectedDate);
        newDate.setMinutes(props.selectedDate.getMinutes() + i * 30);
        for (const booking of props.bookings) {
          const startTime = new Date(booking.start).getTime();
          const endTime = new Date(booking.end).getTime();
          if (newDate.getTime() >= startTime && newDate.getTime() < endTime) {
            flag = true;
            break;
          }
        }
        datesArray.push({ date: newDate, avaialable: !flag });
      }

      setDates(datesArray);
    }
  };

  useEffect(() => {
    generateAllSlots();
  }, [props.bookings]);

  return (
    <>
      <Box
        display={"flex"}
        flexWrap={"wrap"}
        width={"100vh"}
        gap={"10px"}
        justifyContent={"center"}
        padding={"10vh"}
      >
        {dates.map((date, i) => (
          <SingleBookingSLot
            key={i}
            start={date.date}
            setSelectedBookingTimes={props.setSelectedBookingTimes}
            avaialbe={date.avaialable}
            selectedBookingTimes={props.selectedBookingTimes}
            bookings={props.bookings}
          />
        ))}
      </Box>
    </>
  );
};

export default BookingSlot;

