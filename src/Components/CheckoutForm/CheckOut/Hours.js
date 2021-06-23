import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import React, { useState } from "react"
import { useFormContext } from "react-hook-form"
import { MinusIcon, PlusIcon } from "../../../assets/icons"

const Hours = ({ hoursState, setHourly }) => {
  const { register } = useFormContext()

  const [value, setValue] = useState(0)

  const onDecrease = () => {
    if (value === 0) {
      return
    }
    setValue((value) => value - 1)
  }
  const onIncrease = () => {
    setValue((value) => value + 1)
  }

  React.useEffect(() => {
    if (hoursState !== 0) {
      setHourly(true)
      setValue(parseInt(hoursState))
    }
  }, [hoursState])

  return (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="center"
      style={{ marginTop: "-10px" }}
    >
      <Grid item>
        <Typography
          style={{ color: "white", marginLeft: "12px", fontSize: "16px" }}
        >
          Hours
        </Typography>
      </Grid>
      <Grid item>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
        >
          <Grid item>
            <span onClick={onDecrease}>
              <MinusIcon />
            </span>
          </Grid>
          <Grid item style={{ textAlign: "center" }}>
            <input
              ref={register}
              name="hours"
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
                fontSize: "16px",
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

export default Hours
