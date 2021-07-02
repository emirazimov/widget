import { makeStyles } from "@material-ui/core"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import {
  DatePicker,
  DateTimePicker,
  // TimePicker,
  // KeyboardTimePicker,
} from "@material-ui/pickers"
import "date-fns"
import React from "react"
import { Controller, useFormContext } from "react-hook-form"
import InputMask from "react-input-mask"
import { PlacesAutocomplete } from "react-places-autocomplete"
import { TimePicker } from "antd"
import "antd/dist/antd.css"
import "./index.css"

const useStyles = makeStyles((theme) => ({
  inputRoot: {
    height: "40px",
    background: "#282836",
  },
  noBorder: {
    border: "none",
  },
  // input: {
  //   height: "40px",
  // },
}))

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

export const CustomFormInputForPayment = ({
  defaultValue,
  name,
  required,
  ...props
}) => {
  const { control } = useFormContext()
  const classes = useStyles()

  return (
    <Controller
      as={TextField}
      control={control}
      name={name}
      required={required}
      defaultValue={defaultValue}
      InputProps={{
        classes: {
          root: classes.inputRoot,
          notchedOutline: classes.noBorder,
        },
      }}
      style={{ height: "40px" }}
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
  const classes = useStyles()

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
