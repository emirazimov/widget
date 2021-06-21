import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import {
  DatePicker,
  DateTimePicker,
  TimePicker,
  KeyboardTimePicker,
} from "@material-ui/pickers"
import "date-fns"
import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import InputMask from "react-input-mask"
import { PlacesAutocomplete } from "react-places-autocomplete"

export const CustomFormInput = ({ defaultValue, name, required, ...props }) => {
  const { control } = useFormContext()

  return (
    <Controller
      as={TextField}
      control={control}
      name={name}
      required={required}
      defaultValue={defaultValue}
      {...props}
    />
  )
}

export const FormInput = ({ defaultValue, name, required, ...props }) => {
  const { control } = useFormContext()

  return (
    <Controller
      as={TextField}
      control={control}
      name={name}
      required={required}
      defaultValue={defaultValue}
      {...props}
    />
  )
}

export const CustomMaskInput = ({
  defaultValue,
  name,
  required,
  mask,
  ...props
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      as={InputMask}
      control={control}
      name={name}
      required={required}
      mask={mask}
      defaultValue={defaultValue}
      {...props}
    />
  )
}

export const CustomAutocomplete = ({
  defaultValue,
  name,
  required,
  ...props
}) => {
  const { control } = useFormContext()

  return (
    <Controller
      as={PlacesAutocomplete}
      control={control}
      name={name}
      required={required}
      {...props}
    />
  )
}

export const DateInputControl = ({ name, required, ...props }) => {
  const { control } = useFormContext()

  return (
    <Controller
      as={DatePicker}
      name={name}
      required={required}
      style={{ cursor: "pointer" }}
      {...props}
      control={control}
    ></Controller>
  )
}
export const TimeInputControl = ({ name, required, ...props }) => {
  const { control } = useFormContext()

  return (
    <Controller
      as={TimePicker}
      name={name}
      required={required}
      style={{ cursor: "pointer" }}
      {...props}
      control={control}
    ></Controller>
  )
}
