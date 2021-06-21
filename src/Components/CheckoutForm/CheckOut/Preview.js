import { useMediaQuery } from "@material-ui/core"
import Box from "@material-ui/core/Box"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import ListItem from "@material-ui/core/ListItem"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import TextField from "@material-ui/core/TextField"
import Typography from "@material-ui/core/Typography"
import React from "react"
import Carousel from "react-material-ui-carousel"
import { connect } from "react-redux"
import { BackArrowIcon, ForwardArrowIcon } from "../../../assets/icons"
import { toggleIsFetching } from "../../../Redux/car-reducer"
import { setNoteRedux, setOrderSum } from "../../../Redux/form-reducer"
import Directions from "../../GoogleMap/Directions"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#191929",
    borderRadius: "8px",
  },
  contentContainer: {
    padding: theme.spacing(2),
    overflow: "visible",
  },
  carInfoCont: {
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
      padding: theme.spacing(2),
    },
  },
  priceBox: {
    backgroundColor: "#851EDF",
    padding: theme.spacing(1),
  },
}))

const Preview = ({
  carId,
  cars,
  formData,
  next,
  back,
  setNoteRedux,
  setOrderSum,
}) => {
  const classes = useStyles()
  const selectedCar = cars.find((car) => car.id === carId)

  const [note, setNote] = React.useState("")
  const [distance, setDistance] = React.useState(0)

  const sendNote = (note) => {
    setNoteRedux(note)
  }

  const handleChange = (event) => {
    setNote(event.target.value)
  }

  React.useEffect(() => {
    setNote(formData.orderNotes)
  }, [formData.orderNotes])

  const isMobile = useMediaQuery("(max-width:650px)")

  return (
    <>
      <Grid container spacing={1} className={classes.contentContainer}>
        <Grid item>
          <Typography variant="body2">Preview</Typography>
        </Grid>
      </Grid>
      <Directions
        destinations={formData.orderAddressDetails}
        setDistance={setDistance}
      />
      <Grid container justify="center">
        <Grid
          container
          direction="column"
          spacing={2}
          className={classes.contentContainer}
        >
          <Grid item>
            <Typography variant="body1">Preview</Typography>
          </Grid>
          <Grid item>
            <ListItem className={classes.root}>
              <Grid
                container
                direction="row"
                justify="space-around"
                alignItems="center"
              >
                <Grid item>
                  <Carousel
                    autoPlay={false}
                    animation="slide"
                    navButtonsProps={{
                      style: {
                        width: "1em",
                        height: "1em",
                      },
                    }}
                    indicatorIconButtonProps={{
                      style: {
                        "&:hover": {
                          "& $button": {
                            backgroundColor: "#10B7EC",
                            filter: "brightness(120%)",
                            opacity: "0.4",
                          },
                        },
                        marginTop: "-80px",
                        color: "grey",
                      },
                    }}
                    activeIndicatorIconButtonProps={{
                      style: {
                        color: "white",
                      },
                    }}
                    indicatorContainerProps={{
                      style: { height: "0px" },
                    }}
                  >
                    {selectedCar.imageUrls.map((url) => (
                      <>
                        <span
                          style={{
                            position: "absolute",
                            width: "75px",
                            height: "20px",
                            backgroundColor: "#313159",
                            borderBottomRightRadius: "10px",
                            borderTopLeftRadius: "6px",
                            fontSize: "13px",
                            paddingLeft: "12px",
                          }}
                        >
                          or similar
                        </span>
                        <img
                          src={url.path}
                          style={{
                            width: "150px",
                            height: "120px",
                            borderRadius: "8px",
                          }}
                          alt="car"
                          key={url.id}
                        />
                      </>
                    ))}
                  </Carousel>
                </Grid>
                <Grid item style={{ width: "150px" }}>
                  <Grid
                    container
                    direction="column"
                    spacing={2}
                    className={classes.carInfoCont}
                  >
                    <Typography variant="body2" style={{ fontSize: "18px" }}>
                      {selectedCar.make} {selectedCar.model}
                    </Typography>

                    {/* <Typography
                            variant='body2'
                            style={{ fontSize: '18px' }}
                          ></Typography> */}

                    <Grid
                      container
                      justify="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          style={{
                            color: "white",
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >
                          Type
                        </Typography>
                      </Grid>
                      <Grid item style={{ flexGrow: 1 }}>
                        <Box
                          style={{
                            marginTop: "13px",
                            backgroundColor: "transparent",
                            borderColor: "#736994",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          style={{
                            color: "white",
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >
                          {selectedCar.type}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      justify="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item>
                        <Typography
                          style={{
                            color: "white",
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >
                          Capacity
                        </Typography>
                      </Grid>
                      <Grid item style={{ flexGrow: 1 }}>
                        <Box
                          style={{
                            marginTop: "13px",
                            backgroundColor: "transparent",
                            borderColor: "#736994",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          style={{
                            color: "white",
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >
                          {selectedCar.capacity}
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container justify="row">
                      <Grid item>
                        <Typography
                          style={{
                            color: "white",
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >
                          Color
                        </Typography>
                      </Grid>
                      <Grid item style={{ flexGrow: 1 }}>
                        <Box
                          style={{
                            marginTop: "13px",
                            backgroundColor: "transparent",
                            borderColor: "#736994",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          style={{
                            color: "white",
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >
                          white
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid container justify="row">
                      <Grid item>
                        <Typography
                          style={{
                            color: "white",
                            fontSize: "12px",
                            fontWeight: "400",
                          }}
                        >
                          Amount
                        </Typography>
                      </Grid>
                      <Grid item style={{ flexGrow: 1 }}>
                        <Box
                          style={{
                            marginTop: "13px",
                            backgroundColor: "transparent",
                            borderColor: "#736994",
                            borderStyle: "dashed",
                            borderWidth: "1px",
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Typography
                          style={{
                            color: "white",
                            fontSize: "16px",
                            fontWeight: "500",
                          }}
                        >
                          ${selectedCar.price}
                        </Typography>
                      </Grid>
                    </Grid>
                    {/* <Grid item xs={8}>
                            <Paper className={classes.priceBox}>
                              <Grid container justify="center">
                                <Typography variant="body2">
                                  ${car.price}
                                </Typography>
                              </Grid>
                            </Paper>
                          </Grid> */}
                  </Grid>
                </Grid>
              </Grid>
            </ListItem>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography>Date</Typography>
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <Box
                  style={{
                    marginTop: "13px",
                    backgroundColor: "transparent",
                    borderColor: "#292742",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography>{formData.orderStartDate}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography>Time</Typography>
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <Box
                  style={{
                    marginTop: "13px",
                    backgroundColor: "transparent",
                    borderColor: "#292742",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography>{formData.orderStartTime}</Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography>From</Typography>
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <Box
                  style={{
                    marginTop: "13px",
                    backgroundColor: "transparent",
                    borderColor: "#292742",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography style={{ wordWrap: "break-word" }}>
                  {formData.orderAddressDetails[0].rideCheckPoint}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography>To</Typography>
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <Box
                  style={{
                    marginTop: "13px",
                    backgroundColor: "transparent",
                    borderColor: "#292742",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography style={{ wordWrap: "break-word" }}>
                  {
                    formData.orderAddressDetails[
                      formData.orderAddressDetails.length - 1
                    ].rideCheckPoint
                  }
                </Typography>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography>Vehicle</Typography>
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <Box
                  style={{
                    marginTop: "13px",
                    backgroundColor: "transparent",
                    borderColor: "#292742",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography>{selectedCar.type}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography>Total distance</Typography>
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <Box
                  style={{
                    marginTop: "13px",
                    backgroundColor: "transparent",
                    borderColor: "#292742",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography>{distance} miles</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid item>
                <Typography>Total</Typography>
              </Grid>
              <Grid item style={{ flexGrow: 1 }}>
                <Box
                  style={{
                    marginTop: "13px",
                    backgroundColor: "transparent",
                    borderColor: "#292742",
                    borderStyle: "dashed",
                    borderWidth: "1px",
                  }}
                />
              </Grid>
              <Grid item>
                <Typography>{`$${selectedCar.price}`}</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <TextField
              id="outlined-multiline-static"
              style={{ backgroundColor: "#3F3D4A", borderRadius: "8px" }}
              label="Notes"
              multiline
              fullWidth
              rows={2}
              variant="outlined"
              value={note}
              onChange={handleChange}
            />
          </Grid>
          <Grid item>
            <Grid
              container
              direction="row"
              alignItems="center"
              justify="center"
              spacing={1}
              className={classes.buttonGroup}
            >
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={back}
                  startIcon={<BackArrowIcon />}
                  style={{
                    height: "50px",
                    borderRadius: "8px",
                    backgroundColor: "#1B1837",
                    textTransform: "none",
                  }}
                >
                  Back
                </Button>
              </Grid>
              <Grid item xs={6}>
                <Button
                  variant="contained"
                  fullWidth
                  onClick={() => {
                    next()
                    sendNote(note)
                    setOrderSum(selectedCar.price)
                  }}
                  color="primary"
                  endIcon={<ForwardArrowIcon />}
                  style={{
                    height: "50px",
                    borderRadius: "8px",
                    textTransform: "none",
                  }}
                >
                  Next
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    cars: state.cars.cars,
    formData: state.formData,
    carId: state.formData.carInfo.id,
  }
}

export default connect(mapStateToProps, {
  setNoteRedux,
  setOrderSum,
})(Preview)
