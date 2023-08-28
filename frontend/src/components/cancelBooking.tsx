import { Button } from "@mui/material";
import { IBooking } from "./booking";

interface CancelBookingButtonProps {
  booking: IBooking;
  setSelecetedBooking: React.Dispatch<React.SetStateAction<string | null>>;
}

const CancelBookingButton = (props: CancelBookingButtonProps) => {
  return (
    <Button
      variant="contained"
      onClick={() => {
        props.setSelecetedBooking(props.booking._id);
      }}
    >
      {new Date(props.booking.start).getHours().toString().padStart(2, "0")}:
      {new Date(props.booking.start).getMinutes().toString().padStart(2, "0")}-
      {new Date(props.booking.end).getHours().toString().padStart(2, "0")}:
      {new Date(props.booking.end).getMinutes().toString().padStart(2, "0")}
    </Button>
  );
};

export default CancelBookingButton;

