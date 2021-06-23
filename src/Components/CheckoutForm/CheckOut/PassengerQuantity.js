import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import React, { useState } from "react"
import { useFormContext } from "react-hook-form"
import {
  MinusIcon,
  NumberOfPassengers,
  NumberOfPassengersIcon,
  PlusIcon,
} from "../../../assets/icons"

const PassengerQuantity = ({ passengersqState }) => {
  const { register } = useFormContext()

  const [value, setValue] = useState(0)

  const onDecrease = () => {
    if (value === 0) {
      return
    }
    setValue((value) => value - 1)
  }
  const onIncrease = () => {
    if (value === 14) {
      return
    }
    setValue((value) => value + 1)
  }

  React.useEffect(() => {
    setValue(parseInt(passengersqState))
  }, [passengersqState])

  return (
    <Grid container direction="row" justify="space-between" alignItems="center">
      <Grid item>
        <Grid container direction="row">
          <NumberOfPassengersIcon
            style={{ paddingLeft: "30px" }}
          ></NumberOfPassengersIcon>
          <Typography style={{ color: "white", fontSize: "14px" }}>
            Number of passengers
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <span
              onClick={onDecrease}
              // style={{ "&:hover": { color: "white" } }}
            >
              <MinusIcon />
            </span>
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
            <input
              ref={register}
              name="passengersQuantity"
              onChange={(e) => {
                setValue(e.target.value)
              }}
              value={value}
              size="1"
              style={{
                // pointerEvents: "none",
                marginRight: "3px",
                backgroundColor: "transparent",
                border: "none",
                color: "#FFFFFF",
                textAlign: "center",
                fontFamily: "Roboto",
                textTransform: "none",
                fontWeight: "400",
                fontSize: "14px",
              }}
            />
          </Grid>
          <Grid item>
            <span onClick={onIncrease}>
              <PlusIcon />
            </span>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PassengerQuantity
