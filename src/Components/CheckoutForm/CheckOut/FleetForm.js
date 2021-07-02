import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import ListItem from "@material-ui/core/ListItem"
import Paper from "@material-ui/core/Paper"
import { makeStyles } from "@material-ui/core/styles"
import Typography from "@material-ui/core/Typography"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import React from "react"
import Carousel from "react-material-ui-carousel"
import { connect } from "react-redux"
import { BackArrowIcon, ForwardArrowIcon } from "../../../assets/icons"
import { Preloader } from "./../../Helpers/Preloader"
import { setCarId } from "../../../Redux/form-reducer"
import { AppBar, useMediaQuery } from "@material-ui/core"
import Box from "@material-ui/core/Box"

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: "#313159",
    borderRadius: "8px",
    paddingTop: "15px",
    paddingLeft: "0px",
    paddingBottom: "6px",
    cursor: "pointer",
    // "&:hover": {
    //   backgroundColor: "red",
    // },
    // "&$selected": { backgroundColor: "white" },
  },
  contentContainer: {
    padding: theme.spacing(2),
    height: "100%",
    flexWrap: "nowrap",
  },
  carContainer: {
    overflowY: "scroll",
    overflowX: "hidden",

    "&::-webkit-scrollbar": {
      width: "0.7em",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "#3F3D4A",
      borderRadius: "8px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#555",
    },
  },
  priceBox: {
    backgroundColor: "#851EDF",
    padding: theme.spacing(1),
  },
  buttonGroup: {
    bottom: 15,
    position: "absolute",

    padding: "10px 24px 0px 0",
    backgroundColor: theme.palette.background.paper,
  },
  carInfoCont: {
    [theme.breakpoints.down("xs")]: {
      alignItems: "center",
      padding: theme.spacing(0),
    },
    margin: "0px",
    marginTop: "-10px",
    width: "170px",
  },
  listRoot: {
    opacity: "0.5",
    "&:hover": { opacity: "1" },
  },

  active: {
    "&.Mui-selected": {
      backgroundColor: "#313159",
    },
    "&.Mui-selected:hover": {
      backgroundColor: "#313159",
    },
    opacity: "1",
  },
}))

const FleetForm = React.memo(({ cars, isFetching, back, next, setCarId }) => {
  const classes = useStyles()
  const [carCard, setCarCard] = React.useState(0)
  const [carModal, setCarModal] = React.useState(null)
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = (id) => {
    setCarModal(id)
    setOpen(true)
  }

  const handleClose = () => {
    setCarModal(null)
    setOpen(false)
  }

  const handleClick = (id) => {
    setCarCard(id)
  }

  let result = null
  if (carModal) {
    result = cars.find((cars) => carModal === cars.id)
  }

  React.useEffect(() => {
    setCarCard(carCard)
  }, [carCard])

  const isMobile = useMediaQuery("(max-width:650px)")

  return (
    <>
      {isFetching ? (
        <Preloader />
      ) : (
        <Grid
          container
          justify="center"
          style={{
            height: isMobile ? "86%" : "89%",
            paddingTop: isMobile ? "0px" : "0px",
          }}
        >
          <Grid
            container
            direction="column"
            spacing={1}
            className={classes.contentContainer}
          >
            <Grid item>
              {/* <AppBar
              position="sticky"
              color=" #101020"
              style={{ top: '100px', bottom: '0' }}
            > */}
              <Typography
                style={{
                  fontFamily: "Roboto",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  fontSize: "24px",
                  lineHeight: "36px",
                }}
              >
                Select vehicle
              </Typography>
              {/* </AppBar> */}
            </Grid>
            <Grid
              item
              className={classes.carContainer}
              style={{ paddingBottom: "10px" }}
            >
              <Grid container direction="column" spacing={2}>
                {cars.map((car, index) => (
                  <Grid item key={`${car.id}${car.name}`}>
                    <ListItem
                      className={classes.root}
                      onClick={() => {
                        handleClick(car.id)
                      }}
                      selected={car.id === carCard}
                      classes={{
                        root: classes.listRoot,
                        selected: car.id && classes.active,
                      }}
                      // style={{
                      //   opacity: "0.5",
                      //   "&:hover": { opacity: "1" },
                      // }}
                    >
                      <Grid
                        container
                        direction="row"
                        justify="space-between"
                        alignItems="center"
                      >
                        <Grid
                          item
                          style={{ marginLeft: "13px", marginBottom: "-2px" }}
                        >
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
                                  "&$button": {
                                    backgroundColor: "#10B7EC",
                                    filter: "brightness(120%)",
                                    opacity: "0.4",
                                  },
                                },
                                marginTop: "-80px",
                                // marginBottom: "-30px",
                                color: "grey",
                              },
                            }}
                            activeIndicatorIconButtonProps={{
                              style: {
                                color: "white",
                                height: "10px",
                              },
                            }}
                            indicatorContainerProps={{
                              style: { height: "0px" },
                            }}
                          >
                            {car.imageUrls.length !== 0 ? (
                              car.imageUrls.map((url) => (
                                <span
                                  key={url.id}
                                  variant="outlined"
                                  color="primary"
                                  onClick={() => handleClickOpen(car.id)}
                                >
                                  <div
                                    style={{
                                      position: "absolute",
                                      width: "75px",
                                      height: "20px",
                                      backgroundColor: "#313159",
                                      borderBottomRightRadius: "10px",
                                      fontSize: "13px",
                                      paddingLeft: "12px",
                                    }}
                                  >
                                    or similar
                                  </div>
                                  <img
                                    src={url.path}
                                    style={{
                                      width: "170px",
                                      height: "127px",
                                      borderRadius: "8px",
                                      cursor: "zoom-in",
                                    }}
                                    alt="car"
                                  />
                                </span>
                              ))
                            ) : (
                              <>
                                <span
                                  style={{
                                    position: "absolute",
                                    width: "75px",
                                    height: "20px",
                                    backgroundColor: "#313159",
                                    borderBottomRightRadius: "10px",
                                    fontSize: "13px",
                                    paddingLeft: "12px",
                                  }}
                                >
                                  or similar
                                </span>
                                <img
                                  src={
                                    "https://fl-1.cdn.flockler.com/embed/not-found.png"
                                  }
                                  style={{
                                    width: "170px",
                                    height: "120px",
                                    borderRadius: "8px",
                                  }}
                                  alt="car"
                                />
                              </>
                            )}
                          </Carousel>

                          {carModal && (
                            <Dialog
                              open={open}
                              onClose={handleClose}
                              aria-labelledby="alert-dialog-title"
                              aria-describedby="alert-dialog-description"
                            >
                              <DialogActions>
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
                                    },
                                  }}
                                  activeIndicatorIconButtonProps={{
                                    style: {
                                      color: "#10B7EC",
                                    },
                                  }}
                                  indicatorContainerProps={{
                                    style: {},
                                  }}
                                >
                                  {carModal &&
                                    result.imageUrls.map((url) => (
                                      <img
                                        src={url.path}
                                        style={{
                                          width: "600px",
                                          height: "400px",
                                          borderRadius: "8px",
                                        }}
                                        alt="car"
                                        key={`${url.id}${url.path}`}
                                      />
                                    ))}
                                </Carousel>
                              </DialogActions>
                            </Dialog>
                          )}
                        </Grid>
                        <Grid item style={{ width: "46.5%" }}>
                          <Grid
                            container
                            direction="row"
                            spacing={2}
                            className={classes.carInfoCont}
                          >
                            <Typography
                              variant="body2"
                              style={{ fontSize: "18px" }}
                            >
                              {car.make} {car.model}
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
                                    fontSize: "13px",
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
                                    fontSize: "13px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {car.type}
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
                                    fontSize: "13px",
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
                                    fontSize: "13px",
                                    fontWeight: "400",
                                  }}
                                >
                                  {car.capacity}
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
                                    fontSize: "13px",
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
                                  ${car.price}
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
                ))}
              </Grid>
            </Grid>
            {/* <AppBar
            position="sticky"
            color="primary"
            className={classes.appBar}
            style={{ top: "auto", bottom: "0" }}
          > */}
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
                    setCarId(carCard)
                  }}
                  color="primary"
                  endIcon={<ForwardArrowIcon />}
                  disabled={carCard ? false : true}
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
            {/* </AppBar> */}
          </Grid>
        </Grid>
      )}
    </>
  )
})

const mapStateToProps = (state) => {
  return {
    cars: state.cars.cars,
    isFetching: state.cars.isFetching,
  }
}

export default connect(mapStateToProps, { setCarId })(FleetForm)
