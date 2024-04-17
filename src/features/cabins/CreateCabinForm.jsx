import { useForm } from "react-hook-form";

import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import FormRow from "../../ui/FormRow";

import useCreateCabin from "./useCreateCabin";
import useUpdateCabin from "./useUpdateCabin";

function CreateCabinForm({ cabinToEdit = {}, onCloseModal }) {
  const {
    id: cabinToEditId,
    image: cabinToEditImage,
    ...cabinToEditValues
  } = cabinToEdit;
  const isEditSession = Boolean(cabinToEditId);
  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? cabinToEditValues : {},
  });
  const { errors } = formState;
  const { createCabinMutation, isCreating } = useCreateCabin();
  const { updateCabinMutation, isUpdating } = useUpdateCabin();
  const isMutating = isCreating || isUpdating;

  function onSubmit(formData) {
    let image = null;

    // - ISSUE DESCRIPTION
    // after finishing updating other fields and using tab key to jump
    // through remaining fields, after focusing in and focusing out
    // file input its value will be changed, although I didn't select
    // any new file, it's super strange
    // - SOLUTION EXPLANATION
    // I first extract out image (which is string when updating) from
    // cabinToEdit, then providing React Hook Form defaultValues with
    // partial data from supabase, right now image should be undefined
    // if user doesn't tab through all fields, then the final value of image
    // field has to be undefined, then I provide the extracted value from
    // cabinToEdit, if does user, the return value from the image field
    // should be an empty filelist, so that I detect it by checking its
    // length property, if it were 0, I again use the extracted value
    if (formData.image === undefined || formData.image?.length === 0) {
      image = cabinToEditImage;
    } else {
      image = formData.image[0];
    }

    if (isEditSession) {
      updateCabinMutation(
        { ...formData, image, id: cabinToEditId },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    } else {
      createCabinMutation(
        { ...formData, image },
        {
          onSuccess: () => {
            reset();
            onCloseModal?.();
          },
        }
      );
    }
  }

  function onError(formErrors) {
    console.error("Form Errors:", formErrors);
  }

  return (
    <Form
      onSubmit={handleSubmit(onSubmit, onError)}
      $type={onCloseModal ? "modal" : "form"}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input
          type="text"
          id="name"
          disabled={isMutating}
          {...register("name", {
            required: {
              value: true,
              message: "Cabin name has to be provided.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          id="maxCapacity"
          disabled={isMutating}
          {...register("maxCapacity", {
            valueAsNumber: true,
            required: "Max capacity has to be provided.",
            min: {
              value: 1,
              message: "Max capacity has to be at least 1.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isMutating}
          {...register("regularPrice", {
            valueAsNumber: true,
            required: {
              value: true,
              message: "Regular price has to be provided.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isMutating}
          defaultValue={0}
          {...register("discount", {
            valueAsNumer: true,
            required: {
              value: true,
              message: "Discount has to be provided.",
            },
            validate: discountValue =>
              discountValue < getValues("regularPrice") ||
              "Discount has to be less than regular price.",
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          {...register("description", {
            required: {
              value: true,
              message: "Description has to be provided.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          id="image"
          accept="image/*"
          {...register("image", {
            required: {
              value: isEditSession ? false : true,
              message: "Image has to be provided.",
            },
          })}
          disabled={isMutating}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation="secondary"
          type="reset"
          onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button disabled={isMutating}>{isEditSession ? "Edit" : "Add"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
