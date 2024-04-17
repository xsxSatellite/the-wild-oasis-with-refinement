import { useForm } from "react-hook-form";

import Button from "../../ui/Button";
import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";

import useCreateUser from "./useCreateUser";

// Email regex: /\S+@\S+\.\S+/

function SignupForm() {
  const { register, formState, getValues, handleSubmit, reset } = useForm();
  const { errors } = formState;
  const { createUserMutation, isCreatingUser } = useCreateUser();

  function onSuccess({ fullName, password, email }) {
    createUserMutation(
      { fullName, password, email },
      {
        onSuccess: () => reset(),
      }
    );
  }

  function onError(formErrors) {
    console.error("Form Errors:", formErrors);
  }

  return (
    <Form onSubmit={handleSubmit(onSuccess, onError)}>
      <FormRow label="Full name" error={errors?.fullName?.message}>
        <Input
          type="text"
          id="fullName"
          disabled={isCreatingUser}
          {...register("fullName", {
            required: {
              value: true,
              message: "Full name has to be provided.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Email address" error={errors?.email?.message}>
        <Input
          type="email"
          id="email"
          disabled={isCreatingUser}
          {...register("email", {
            required: {
              value: true,
              message: "Email has to be provided.",
            },
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "Please provide a valid email address.",
            },
          })}
        />
      </FormRow>

      <FormRow
        label="Password (min 8 characters)"
        error={errors?.password?.message}>
        <Input
          type="password"
          id="password"
          disabled={isCreatingUser}
          {...register("password", {
            required: {
              value: true,
              message: "Password has to be provided.",
            },
            minLength: {
              value: 8,
              message: "Password has to have at least 8 characters.",
            },
          })}
        />
      </FormRow>

      <FormRow label="Repeat password" error={errors?.passwordConfirm?.message}>
        <Input
          type="password"
          id="passwordConfirm"
          disabled={isCreatingUser}
          {...register("passwordConfirm", {
            required: {
              value: true,
              message: "Password confirmation has to be provided.",
            },
            validate: passwordConfirm =>
              passwordConfirm === getValues().password ||
              "Password confirmation doesn't match password.",
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          disabled={isCreatingUser}
          $variation="secondary"
          type="reset"
          onClick={reset}>
          Cancel
        </Button>
        <Button disabled={isCreatingUser}> Create new user</Button>
      </FormRow>
    </Form>
  );
}

export default SignupForm;
