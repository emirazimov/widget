import DateFnsUtils from "@date-io/date-fns"
import { ListItem, TextField } from "@material-ui/core"
import Button from "@material-ui/core/Button"
import Grid from "@material-ui/core/Grid"
import InputAdornment from "@material-ui/core/InputAdornment"
import { makeStyles } from "@material-ui/core/styles"
import Switch from "@material-ui/core/Switch"
import Typography from "@material-ui/core/Typography"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import Autocomplete from "@material-ui/lab/Autocomplete"
import { MuiPickersUtilsProvider } from "@material-ui/pickers"
import React, { useState } from "react"
import { FormProvider, useForm } from "react-hook-form"
import { connect } from "react-redux"
import { placesApi } from "../../../api/api"
import {
  ClockIcon,
  DateIcon,
  ForwardArrowIcon,
  HourlyIcon,
  LeftArrowForAdressForm,
  PlaneIcon,
  RightArrowForAdressForm,
  Ticket,
} from "../../../assets/icons"
import { getCarsByType } from "../../../Redux/car-reducer"
import GoogleMap from "../../GoogleMap/GoogleMap"
import { getCompanyCars } from "./../../../Redux/car-reducer"
import {
  CustomFormInput,
  DataInputControl,
  DateInputControl,
  TimeInputControl,
} from "./CustomFormInput"
import Hours from "./Hours"
import PassengerQuantity from "./PassengerQuantity"
import { withStyles } from "@material-ui/styles"
// import Carousel, { Dots, slidesToShowPlugin } from '@brainhubeu/react-carousel';
import Carousel, { consts } from "react-elastic-carousel"
// import Carousel from "react-material-ui-carousel";
import Tooltip from "@material-ui/core/Tooltip"
import { setFormData } from "./../../../Redux/form-reducer"
import "@brainhubeu/react-carousel/lib/style.css"
import { createMuiTheme } from "@material-ui/core"
import { ThemeProvider } from "@material-ui/styles"
import Blue from "@material-ui/core/colors/blue"
import lime from "@material-ui/core/colors/lime"

const useStyles = makeStyles((theme) => ({
  contentContainer: {
    padding: theme.spacing(2),
    paddingTop: "0px",
    paddingBottom: "0px",
  },

  carItem: {
    backgroundColor: theme.palette.carContainer.color,
    borderRadius: "10px",
    marginTop: theme.spacing(1),
    padding: 0,
    width: "90%",
    height: "85%",
    cursor: "pointer",
    "&:hover": {
      background: "#2c2c33",
    },
  },
  carFont: {
    textTransform: "uppercase",
    fontSize: "12px",
    marginLeft: "-10px",
  },
  carImageContainer: {
    width: "90px",
  },
  carImage: {
    width: "80%",
    height: "40px",
    objectFit: "cover",
    // padding: "5px",
    paddingLeft: "10px",
    userDrag: "none",
    userSelect: "none",
    mozUserSelect: "none",
    webkitUserDrag: "none",
    webkitUserSelect: "none",
    msUserSelect: "none",
  },
  carImageStylesForBiggerTypeOfImage: {
    width: "84%",
    height: "40px",
    objectFit: "contain",
    padding: "5px",
    paddingTop: "12px",
    userDrag: "none",
    userSelect: "none",
    mozUserSelect: "none",
    webkitUserDrag: "none",
    webkitUserSelect: "none",
    msUserSelect: "none",
  },
  carItemContainer: {
    paddingTop: theme.spacing(2),
  },
  preferences: {
    color: "white",
    marginLeft: "13px",
    fontSize: "14px",
    marginTop: "-13px",
  },
  submitButton: {
    paddingTop: "0px",
  },
  active: {
    // color: '#392BAA',
  },
  input: {
    "&::placeholder": {
      color: "white",
      opacity: "1",
      fontSize: "14px",
    },
  },
  listRoot: {
    "&:hover": {
      backgroundColor: "#313159",
    },
  },
  carouselRoot: {
    background: "#191929",

    minWidth: "30px",
    height: "75px",
    marginTop: "8px",
    cursor: "pointer",
    "&:hover": {
      backgroundColor: "#3c365e",
    },
  },
  noBorderDefault: {
    border: "1px solid #191929",
  },
  noBorderRed: {
    border: "1px solid #db5858",
  },
  inputDateTime: {
    height: "40px",
    fontSize: "14px",
  },
  carTypeWithRed: {
    border: "1px solid #db5858",
  },
  carContainerRed: {
    // paddingTop: "20px",
    marginTop: "10px",
    marginBottom: "10px",
    border: "1px solid red",
    borderRadius: "10px",
  },
  carContainerDefault: {
    border: "none",
  },
  carTypeDefault: {
    border: "none",
  },
}))

const AntSwitch = withStyles((theme) => ({
  root: {
    width: 38,
    height: 21,
    padding: 0,
    display: "flex",
  },
  switchBase: {
    "&:hover": {
      paddingRight: "4px",
      paddingBottom: "2px",
      backgroundColor: "#595959",
    },
    padding: 2,
    color: "#191823",
    "&$checked": {
      transform: "translateX(16px)",
      color: theme.palette.common.main,
      "& + $track": {
        opacity: 1,
        backgroundColor: "white",
        borderColor: "white",
      },
    },
  },
  thumb: {
    width: 14,
    height: 14,
    boxShadow: "none",
    marginTop: "1.5px",
    marginLeft: "2px",
  },
  track: {
    border: `1px solid '#2B2A32'`,
    borderRadius: 19,
    opacity: 1,
    backgroundColor: "#2B2A32",
  },
  checked: {},
}))(Switch)

const schema = yup.object().shape({
  destinations: yup.object().shape({
    rideCheckPoint: yup.object().required(),
  }),
  // carsValidation: yup.number().required(),
})
{
  /*компонента перед экспортом обернута в react.memo*/
}
const AdressFormwithoutReactMemo = ({
  next,
  carTypes,
  pageSize,
  getCompanyCars,
  setFormData,
  formData,
}) => {
  const classes = useStyles()
  console.log("AdressFrom")
  const [carSelectionID, setCarSelectionID] = useState(0)
  const [bookingType, setBookingType] = useState(1)
  const [disableHourly, setDisableHourly] = useState(false)
  const [hourly, setHourly] = useState(false)
  const [isGateMeeting, setIsGateMeeting] = useState(false)
  const [isAirline, setIsAirline] = useState(false)
  const [airlineId, setAirlineId] = useState(0)
  const [airlines, setAirlines] = useState([])

  const [selectedDate, handleDateChange] = useState(new Date())
  const [selectedTime, handleTimeChange] = useState(new Date())

  const [redBorderOnSubmit, setRedBorderOnSubmit] = useState(false)
  const [redBorderOnSubmit2, setRedBorderOnSubmit2] = useState(false)
  const [redBorderOnSubmitForDate, setRedBorderOnSubmitForDate] =
    useState(false)
  const [redBorderOnSubmitForTime, setRedBorderOnSubmitForTime] =
    useState(false)
  const [redBorderOnSubmitForCarType, setRedBorderOnSubmitForCarType] =
    useState(false)

  const [destinations, setDestinations] = useState([
    {
      rideCheckPoint: "",
      latitude: 0,
      longitude: 0,
      placeType: 0,
      placeId: "",
    },
    {
      rideCheckPoint: "",
      latitude: 0,
      longitude: 0,
      placeType: 0,
      placeId: "",
    },
  ])

  const handleClick = (id) => {
    setCarSelectionID(id)
  }

  const { errors, register, handleSubmit, setValue, ...methods } = useForm({
    // mode: "onBlur",
    // resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    // console.log(data.orderStartDate, data.orderStartTime)

    if (
      destinations[0].rideCheckPoint &&
      destinations[1].rideCheckPoint &&
      data.orderStartDate &&
      data.orderStartTime &&
      carSelectionID
    ) {
      getCompanyCars({
        hours: data.hours,
        isAirportPickupIncluded: isGateMeeting,
        airlines: { id: airlineId },
        orderAddressDetails: [...destinations],
        page: pageSize,
        bookingType: bookingType,
        typeId: carSelectionID,
      })
      var forRes = data.orderStartDate.toLocaleDateString("en-GB")
      var forRes2 = data.orderStartTime.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
      })
      console.log(data)
      const resData = {
        orderStartDate: `${forRes}`,
        orderStartTime: `${forRes2}`,
      }

      setFormData(resData)

      next()
    } else {
      if (!destinations[0].rideCheckPoint) {
        setRedBorderOnSubmit(true)
      } else {
        setRedBorderOnSubmit(false)
      }
      if (!destinations[1].rideCheckPoint) {
        setRedBorderOnSubmit2(true)
      } else {
        setRedBorderOnSubmit2(false)
      }
      if (!data.orderStartDate?.toLocaleDateString("en-GB")) {
        setRedBorderOnSubmitForDate(true)
      } else {
        setRedBorderOnSubmitForDate(false)
      }
      if (
        !data.orderStartTime?.toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
        })
      ) {
        setRedBorderOnSubmitForTime(true)
      } else {
        setRedBorderOnSubmitForTime(false)
      }
      if (carSelectionID) {
        setRedBorderOnSubmitForCarType(false)
      } else {
        setRedBorderOnSubmitForCarType(true)
      }
    }
    // if (destinations[1].rideCheckPoint) {
    //   getCompanyCars({
    //     hours: data.hours,
    //     isAirportPickupIncluded: isGateMeeting,
    //     airlines: { id: airlineId },
    //     orderAddressDetails: [...destinations],
    //     page: pageSize,
    //     bookingType: bookingType,
    //     typeId: carSelectionID,
    //   })

    //   const resData = {
    //     orderStartDate: `${forRes}`,
    //     orderStartTime: `${forRes2}`,
    //   }

    //   setFormData(resData)

    //   next()
    // } else {
    //   setRedBorderOnSubmit2(true)
    // }
  }

  let firstAirline = destinations[0].placeType

  const fetchAirlines = async () => {
    const data = await placesApi.getAirlines()
    setAirlines(data)
  }

  React.useEffect(() => {
    if (firstAirline === 2) {
      setIsAirline(true)
      setBookingType(3)
      fetchAirlines()
      setDisableHourly(true)
    } else {
      setIsAirline(false)
      setDisableHourly(false)
    }
  }, [firstAirline])

  const myArrow = ({ type, onClick, isEdge }) => {
    const pointer =
      type === consts.PREV ? (
        <LeftArrowForAdressForm />
      ) : (
        <RightArrowForAdressForm />
      )
    return (
      <Button
        onClick={onClick}
        disabled={isEdge}
        className={classes.carouselRoot}
      >
        {pointer}
      </Button>
    )
  }

  return (
    <Grid item>
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Grid item>
            <GoogleMap
              setDestinations={setDestinations}
              destinations={destinations}
              orderAddressDetails={formData.orderAddressDetails}
              ref={register({ required: "Name is required" })}
              setValue={setValue}
              redBorderOnSubmit={redBorderOnSubmit}
              redBorderOnSubmit2={redBorderOnSubmit2}
            />
          </Grid>
          <Grid container justify="center">
            <Grid
              container
              direction="column"
              spacing={2}
              className={classes.contentContainer}
            >
              {isAirline && bookingType === 3 && (
                <>
                  <Grid item>
                    <Autocomplete
                      id="combo-box-demo"
                      options={airlines}
                      defaultValue={null}
                      autoHighlight
                      getOptionLabel={(option) => option.name}
                      renderOption={(option) => (
                        <>
                          <span>{option.code}</span>
                          {option.name} ({option.code})
                        </>
                      )}
                      renderInput={(params) => {
                        params.InputProps.startAdornment = (
                          <InputAdornment position="start">
                            <PlaneIcon />
                          </InputAdornment>
                        )
                        return (
                          <TextField
                            {...params}
                            fullWidth
                            placeholder="Airlines"
                            style={{
                              height: "40px",
                              border: "none",
                              backgroundColor: "#191929",
                              paddingLeft: "10px",
                            }}
                            InputProps={{
                              ...params.InputProps,
                              classes: {
                                root: classes.inputDateTime,
                                input: classes.input, // class name, e.g. `classes-nesting-root-x`
                                notchedOutline: classes.noBorder,
                              },
                              disableUnderline: true,
                            }}
                          />
                        )
                      }}
                      onChange={(event, newValue) => {
                        newValue
                          ? setAirlineId(newValue.id)
                          : setAirlineId(null)
                      }}
                      name="airlines"
                    />
                  </Grid>
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="center"
                    >
                      <Grid item xs={6}>
                        <CustomFormInput
                          name="flightNumber"
                          variant="outlined"
                          placeholder="Flight number"
                          style={{
                            height: "40px",
                            border: "none",
                            backgroundColor: "#191929",
                            width: "170px",
                            marginBottom: "-30px",
                            marginTop: "-10px",
                          }}
                          defaultValue={null}
                          InputProps={{
                            classes: {
                              root: classes.inputDateTime,
                              input: classes.input, // class name, e.g. `classes-nesting-root-x`
                              notchedOutline: classes.noBorder,
                            },
                            startAdornment: (
                              <InputAdornment position="start">
                                <Ticket />
                              </InputAdornment>
                            ),
                          }}
                        />
                      </Grid>
                      <Grid item>
                        <Grid
                          container
                          direction="row"
                          alignItems="center"
                          justify="space-evenly"
                        >
                          <Grid item>
                            <Typography>Gate meeting</Typography>
                          </Grid>
                          <Grid item>
                            <Switch
                              onClick={() => setIsGateMeeting(!isGateMeeting)}
                              color="primary"
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </>
              )}
              <Grid item style={{ width: "100%" }}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <Grid
                    container
                    direction="row"
                    flexWrap="no-wrap"
                    justify="space-between"
                  >
                    <Grid item style={{ width: "47%" }}>
                      {/* <ThemeProvider theme={materialTheme}> */}
                      <DateInputControl
                        name="orderStartDate"
                        // inputVariant="primary"
                        // label="Pick up Date"
                        inputVariant="outlined"
                        style={{
                          backgroundColor: "#191929",
                        }}
                        placeholder="Pick up Date"
                        defaultValue={null}
                        disablePast
                        fullWidth
                        // onChange={(event, x) => {
                        //   handleDateChange(event)
                        //   console.log(x)
                        // }}
                        // classes={{
                        //   root: classes.root, // class name, e.g. `classes-nesting-root-x`
                        //   label: classes.label, // class name, e.g. `classes-nesting-label-x`
                        // }}
                        InputProps={{
                          classes: {
                            root: classes.inputDateTime,
                            input: classes.input, // class name, e.g. `classes-nesting-root-x`
                            notchedOutline: redBorderOnSubmitForDate
                              ? classes.noBorderRed
                              : classes.noBorderDefault,
                          },
                          disableUnderline: true,
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              style={{
                                marginRight: "10px",
                                marginLeft: "-3px",
                              }}
                            >
                              <DateIcon />
                            </InputAdornment>
                          ),
                        }}
                      />

                      {/* </ThemeProvider> */}
                    </Grid>
                    <Grid item style={{ width: "47%" }}>
                      <TimeInputControl
                        name="orderStartTime"
                        inputVariant="outlined"
                        style={{
                          backgroundColor: "#191929",
                          height: "40px",
                        }}
                        // label="Pick up Time"
                        placeholder="Pick up Time"
                        defaultValue={null}
                        disablePast
                        fullWidth
                        InputProps={{
                          classes: {
                            root: classes.inputDateTime,
                            input: classes.input, // class name, e.g. `classes-nesting-root-x`
                            notchedOutline: redBorderOnSubmitForTime
                              ? classes.noBorderRed
                              : classes.noBorderDefault,
                          },
                          disableUnderline: true,
                          startAdornment: (
                            <InputAdornment position="start">
                              <ClockIcon />
                            </InputAdornment>
                          ),
                        }}
                      />
                    </Grid>
                  </Grid>
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item style={{ width: "100%", marginTop: "-10px" }}>
                <PassengerQuantity
                  passengersqState={formData.passengersQuantity}
                />
              </Grid>
              <Grid item style={{ width: "100%", marginTop: "-10px" }}>
                <Grid
                  container
                  direction="row"
                  justify="space-between"
                  alignItems="center"
                >
                  <Grid item>
                    <Grid
                      container
                      direction="row"
                      style={{ paddingLeft: "-12px" }}
                    >
                      <HourlyIcon></HourlyIcon>
                      <Typography style={{ color: "white", fontSize: "14px" }}>
                        Hourly
                      </Typography>
                    </Grid>
                  </Grid>
                  <AntSwitch
                    color="primary"
                    disabled={disableHourly}
                    checked={hourly}
                    onClick={() => {
                      setHourly(!hourly)
                      hourly ? setBookingType(2) : setBookingType(1)
                    }}
                  />
                </Grid>
              </Grid>
              <Grid item style={{ width: "100%" }}>
                {hourly === true && (
                  <Grid item>
                    <Hours
                      hoursState={formData.hours}
                      setHourly={setHourly}
                      hourly={hourly}
                    />
                  </Grid>
                )}
              </Grid>
              <Grid item>
                <Grid item>
                  <Typography className={classes.preferences}>
                    Preferences
                  </Typography>
                </Grid>
                <Grid item>
                  <Grid
                    container
                    direction="row"
                    justify="space-between"
                    alignItems="center"
                    style={{ width: "100%" }}
                    className={
                      redBorderOnSubmitForCarType
                        ? classes.carContainerRed
                        : classes.carContainerDefault
                    }
                  >
                    <Carousel
                      // onClick={() => {}}
                      //   plugins={[
                      //     'clickToChange',
                      //     'infinite',
                      //     'arrows',
                      //     {
                      //       resolve: slidesToShowPlugin,
                      //       options: {
                      //        numberOfSlides: 3
                      //       }
                      //     },
                      //   ]}
                      // NextIcon={'asdf'}
                      // PrevIcon={'asdf'}
                      // navButtonsProps={{
                      //   // Change the colors and radius of the actual buttons. THIS STYLES BOTH BUTTONS
                      //   style: {
                      //     backgroundColor: "cornflowerblue",
                      //     borderRadius: 0,
                      //   },
                      // }}
                      // navButtonsWrapperProps={{
                      //   // Move the buttons to the bottom. Unsetting top here to override default style.
                      //   style: {
                      //     bottom: "0",
                      //     top: "unset",
                      //   },
                      // }}
                      // NextIcon="next" // Change the "inside" of the next button to "next"
                      // PrevIcon="prev"
                      // IndicatorIcon={"dsafa"} // Previous Example
                      // indicatorIconButtonProps={{
                      //   style: {
                      //     padding: "10px", // 1
                      //     color: "blue", // 3
                      //   },
                      // }}
                      // activeIndicatorIconButtonProps={{
                      //   style: {
                      //     backgroundColor: "red", // 2
                      //   },
                      // }}
                      // indicatorContainerProps={{
                      //   style: {
                      //     marginTop: "50px", // 5
                      //     textAlign: "right", // 4
                      //   },
                      // }}
                      renderArrow={myArrow}
                      itemsToShow={3}
                      pagination={false}
                      transitionMs={300}
                    >
                      {carTypes.map((car, indexOfEachCar) => (
                        <>
                          <Grid item key={`${car.id}${car.name}`}>
                            <ListItem
                              className={classes.carItem}
                              onClick={() => handleClick(car.id)}
                              selected={car.id === carSelectionID}
                              classes={{
                                selected: classes.active,
                                root: classes.listRoot,
                              }}
                              name="carsValidation"
                            >
                              <Grid
                                container
                                direction="column"
                                // justify="center"
                                alignItems="center"
                                className={classes.carItemContainer}
                              >
                                <Grid item>
                                  <Typography
                                    className={classes.carFont}
                                    noWrap
                                    variant="body2"
                                  >
                                    {car.name}
                                  </Typography>
                                </Grid>
                                <Grid
                                  item
                                  className={classes.carImageContainer}
                                >
                                  <img
                                    alt="carImage"
                                    src={car.imageUrl}
                                    className={
                                      indexOfEachCar !== 2
                                        ? classes.carImage
                                        : classes.carImageStylesForBiggerTypeOfImage
                                    }
                                  />
                                </Grid>
                              </Grid>
                            </ListItem>
                          </Grid>
                        </>
                      ))}
                    </Carousel>
                  </Grid>
                </Grid>
                <Grid item className={classes.submitButton}>
                  <Grid container justify="center">
                    <Button
                      type="submit"
                      color="primary"
                      variant="contained"
                      fullWidth
                      style={{ height: "40px", borderRadius: "8px" }}
                      endIcon={<ForwardArrowIcon />}
                      // disabled={
                      //   destinations[0].rideCheckPoint &&
                      //   destinations[1].rideCheckPoint &&
                      //   carSelectionID &&
                      //   bookingType
                      //     ? false
                      //     : true
                      // }
                    >
                      <Typography variant="body2" style={{ fontSize: "14px" }}>
                        Next step
                      </Typography>
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </FormProvider>
    </Grid>
  )
}

const AdressForm = React.memo(AdressFormwithoutReactMemo)

const mapStateToProps = (state) => {
  return {
    carTypes: state.companyProfile.profile.carTypes,
    pageSize: state.cars.pageSize,
    formData: state.formData,
  }
}

export default connect(mapStateToProps, {
  getCarsByType,
  getCompanyCars,
  setFormData,
})(AdressForm)
