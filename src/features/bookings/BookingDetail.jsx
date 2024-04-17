import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "../../ui/Button";
import ButtonGroup from "../../ui/ButtonGroup";
import ButtonText from "../../ui/ButtonText";
import Heading from "../../ui/Heading";
import Row from "../../ui/Row";
import Spinner from "../../ui/Spinner";
import Tag from "../../ui/Tag";
import BookingDataBox from "./BookingDataBox";

import { useMoveBack } from "../../hooks/useMoveBack";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Modal from "../../ui/Modal";
import useDeleteBooking from "./useDeleteBooking";
import useReadBooking from "./useReadBooking";
import useUpdateBookingCheckOut from "./useUpdateBookingCheckOut";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const { data: booking, status, error } = useReadBooking();
  // because when the component mounts, data from custom hook (useReadBooking)
  // not yet arrive, so using optional chaining to prevent from reaching into
  // value of undefined
  const bookingStatus = booking?.status;
  const bookingId = booking?.id;
  const { updateBookingCheckOutMutation, isUpdatingBookingCheckOut } =
    useUpdateBookingCheckOut();
  const { deleteBookingMutation, isDeleting } = useDeleteBooking();

  const moveBack = useMoveBack();

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  switch (status) {
    case "pending":
      return <Spinner />;
    case "error":
      return <p>Error: {error.message}</p>;
  }

  return (
    <>
      <Row $type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{bookingId}</Heading>
          <Tag $type={statusToTagName[bookingStatus]}>
            {bookingStatus.replace("-", " ")}
          </Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {bookingStatus === "unconfirmed" && (
          <Button onClick={() => navigate(`/checkin/${bookingId}`)}>
            Check In
          </Button>
        )}

        {bookingStatus === "checked-in" && (
          <Button
            disabled={isUpdatingBookingCheckOut}
            onClick={() => updateBookingCheckOutMutation(bookingId)}>
            Check Out
          </Button>
        )}

        <Modal>
          <Modal.Toggler target="delete">
            <Button $variation="danger" disabled={isDeleting}>
              Delete
            </Button>
          </Modal.Toggler>
          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="Booking"
              onConfirm={() =>
                deleteBookingMutation(bookingId, {
                  onSuccess: () => navigate(-1),
                })
              }
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>

        <Button $variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
