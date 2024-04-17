import styled from "styled-components";
import {
  Square2StackIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";

import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import CreateCabinForm from "../cabins/CreateCabinForm";

import useDeleteCabin from "./useDeleteCabin";
import useCreateCabin from "./useCreateCabin";
import Menus from "../../ui/Menus";

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Price = styled.div`
  font-family: "Sono";
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: "Sono";
  font-weight: 500;
  color: var(--color-green-700);
`;

export default function CabinRow({ cabin }) {
  const { deleteCabinMutation, isDeleting } = useDeleteCabin();
  const {
    id: cabinId,
    name,
    maxCapacity,
    regularPrice,
    discount,
    image,
    description,
  } = cabin;
  const { createCabinMutation, isCreating } = useCreateCabin();

  function handleDuplicate() {
    createCabinMutation({
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
      name: `Copy of ${name}`,
    });
  }

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <p>Fits up to {maxCapacity} guets</p>
      <Price>{formatCurrency(regularPrice)}</Price>
      <Discount>{formatCurrency(discount)}</Discount>
      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggler target={cabinId} />
            <Menus.List name={cabinId}>
              <Menus.Button
                icon={<Square2StackIcon />}
                onClick={handleDuplicate}
                disabled={isCreating}>
                Duplicate
              </Menus.Button>
              <Modal.Toggler target="update">
                <Menus.Button icon={<PencilIcon />}>Update</Menus.Button>
              </Modal.Toggler>
              <Modal.Toggler target="delete">
                <Menus.Button icon={<TrashIcon />}>Delete</Menus.Button>
              </Modal.Toggler>
            </Menus.List>
          </Menus.Menu>

          <Modal.Window name="update">
            <CreateCabinForm cabinToEdit={cabin} />
          </Modal.Window>

          <Modal.Window name="delete">
            <ConfirmDelete
              resourceName="cabin"
              onConfirm={() => deleteCabinMutation(cabinId)}
              disabled={isDeleting}
            />
          </Modal.Window>
        </Modal>
      </div>
    </Table.Row>
  );
}
