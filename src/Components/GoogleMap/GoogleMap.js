import Grid from "@material-ui/core/Grid"
import InputAdornment from "@material-ui/core/InputAdornment"
import MenuItem from "@material-ui/core/MenuItem"
import { makeStyles } from "@material-ui/core/styles"
import { useForm, useFormContext } from "react-hook-form"
import TextField from "@material-ui/core/TextField"
import { GoogleApiWrapper, Map, Marker } from "google-maps-react"
import React, { forwardRef, useState } from "react"
import PlacesAutocomplete, {
  geocodeByAddress,
  getLatLng,
} from "react-places-autocomplete"
import {
  AddLocIcon,
  DeleteLocIcon,
  EndLocationIcon,
  StartLocationIcon,
} from "../../assets/icons"
import rideCheckPointErrors from "./../CheckoutForm/CheckOut/AdressForm"
import MapStyles from "./mapStyles"

var redBorder = null

const useStyles = makeStyles((theme) => ({
  mapContainer: {
    width: "91.5%",
    height: "200px",
    position: "relative",
    marginLeft: "17px",
    borderRadius: "20px",
  },
  destinationContainer: {
    padding: theme.spacing(1),
  },
  destinationText: {
    padding: theme.spacing(1),
  },
  dropDown: {
    position: "absolute",
    zIndex: 1000,
    justifyContent: "center",
    width: "500px",
  },
  destinationInputFrom: {},
  inputRoot: {
    height: "40px",
    backgroundColor: "#191929",
    "&::placeholder": {
      color: "white",
    },
    fontSize: "14px",
  },
  noBorderDefault: {
    border: "1px solid #191929",
  },
  noBorderRed: {
    border: "1px solid #db5858",
  },
  input: {
    // "&::-webkit-input-placeholder": {
    //   /* Chrome/Opera/Safari */ color: "white",
    //   opacity: "1",
    // },
    // "&::-moz-placeholder": {
    //   /* Firefox 19+ */ color: "white",
    //   opacity: "1",
    // },
    // "&:-ms-input-placeholder": {
    //   /* IE 10+ */ color: "white",
    //   opacity: "1",
    // },
    // "&:-moz-placeholder": {
    //   /* Firefox 18- */ color: "white",
    //   opacity: "1",
    // },
    "&::placeholder": {
      color: "white",
      opacity: "1",
      fontSize: "14px",
    },
  },
}))

const GoogleMap = React.memo(
  forwardRef(
    ({
      setDestinations,
      destinations,
      orderAddressDetails,
      ref,
      errors,
      redBorderOnSubmit,
      redBorderOnSubmit2,
      ...props
    }) => {
      const classes = useStyles(redBorderOnSubmit)

      const [condition, setCondition] = useState([])

      const handleChanger = (e) => {
        setCondition(e.event.target)
        console.log(condition)
      }
      const [markers, setMarkers] = useState([])
      const [mapCenter, setMapCenter] = useState({
        lat: 49.2827291,
        lng: -123.1207375,
      })

      const setUseHookState = (value, id) => {
        let newArr = [...destinations]
        newArr[id].rideCheckPoint = value
        setDestinations(newArr)
      }

      const handleChange = (value, id) => {
        setUseHookState(value, id)
      }

      let selectedArray = null

      const handleSelect = async (value, id) => {
        setUseHookState(value, id)
        const results = await geocodeByAddress(value)
        const latLng = await getLatLng(results[0])
        const placeId = results[0].place_id
        let placeType = 0
        if (results[0].types.some((types) => types === "airport")) {
          placeType = 2
        }
        selectedArray = [...destinations]
        selectedArray[id] = {
          ...selectedArray[id],
          latitude: latLng.lat,
          longitude: latLng.lng,
          placeId: placeId,
          placeType: placeType,
        }
        setDestinations(selectedArray)
        setMapCenter({ lat: latLng.lat, lng: latLng.lng })
        setMarkers([...markers, { lat: latLng.lat, lng: latLng.lng }])
      }

      const addEndPoint = () => {
        let newArr = [
          ...destinations,
          {
            rideCheckPoint: "",
            latitude: 0,
            longitude: 0,
            placeType: 0,
            placeId: "",
          },
        ]
        setDestinations(newArr)
      }

      const removeEndPoint = (index) => {
        let newArr = [...destinations]
        newArr.splice(index, 1)
        setDestinations(newArr)
      }

      React.useEffect(() => {
        setDestinations(orderAddressDetails)
      }, [orderAddressDetails])

      return (
        <>
          <Grid container direction="column">
            <Grid item className={classes.mapContainer}>
              <Map
                google={props.google}
                disableDefaultUI={true}
                center={{
                  lat: mapCenter.lat,
                  lng: mapCenter.lng,
                }}
                styles={MapStyles}
              >
                {markers.map((marker, id) => (
                  <Marker
                    key={`${id}${marker.lat}`}
                    lat={marker.lat}
                    lng={marker.lng}
                  />
                ))}
              </Map>
            </Grid>
            <Grid item className={classes.destinationContainer}>
              <Grid container direction="column">
                {destinations.map((destination, id) => (
                  <PlacesAutocomplete
                    value={destinations[id].rideCheckPoint}
                    onChange={(value) => handleChange(value, id)}
                    onSelect={(value) => handleSelect(value, id)}
                    key={`${destination.id}${id}`}
                  >
                    {({
                      getInputProps,
                      suggestions,
                      getSuggestionItemProps,
                      loading,
                    }) => (
                      <div>
                        <Grid item className={classes.destinationText}>
                          <TextField
                            position="start"
                            style={{
                              height: "40px",
                              border: "none",
                              marginTop: "-4px",
                            }}
                            variant="outlined"
                            name="rideCheckPoint"
                            defaultValue={destinations[id].rideCheckPoint}
                            fullWidth
                            // inputRef={ref}
                            InputProps={{
                              classes: {
                                root: classes.inputRoot,
                                notchedOutline: redBorderOnSubmit
                                  ? classes.noBorderRed
                                  : classes.noBorderDefault,
                                input: classes.input,
                              },

                              startAdornment: (
                                <InputAdornment style={{ marginRight: "10px" }}>
                                  {id === 0 && <StartLocationIcon />}
                                  {id === destinations.length - 1 && (
                                    <EndLocationIcon />
                                  )}
                                  {id > 0 && id < destinations.length - 1 && (
                                    <span
                                      style={{
                                        borderRadius: "50%",
                                        width: "24px",
                                        height: "25px",
                                        backgroundColor: "transparent",
                                        border: "2px solid #FFFFFF",
                                        textAlign: "center",
                                        fontFamily: "Roboto",
                                        fontWeight: "700",
                                        fontSize: "0.9rem",
                                        marginLeft: "-5px",
                                        marginRight: "-5px",
                                      }}
                                    >
                                      {id}
                                    </span>
                                  )}
                                </InputAdornment>
                              ),
                              endAdornment: (
                                <InputAdornment
                                  style={{ cursor: "pointer" }}
                                  position="end"
                                >
                                  {id === destinations.length - 1 && (
                                    <span onClick={addEndPoint}>
                                      <AddLocIcon />
                                    </span>
                                  )}
                                  {id > 0 && id < destinations.length - 1 && (
                                    <span onClick={() => removeEndPoint(id)}>
                                      <DeleteLocIcon />
                                    </span>
                                  )}
                                </InputAdornment>
                              ),
                            }}
                            {...getInputProps({
                              placeholder: id === 0 ? "From" : "To",
                              className: "location-search-input",
                            })}
                          />
                        </Grid>
                        <div className={classes.dropDown}>
                          {loading && (
                            <div style={{ alignItems: "center" }}>
                              Loading...
                            </div>
                          )}
                          {suggestions.map((suggestion, id) => {
                            const className = suggestion.active
                              ? "suggestion-item--active"
                              : "suggestion-item"
                            // inline style for demonstration purpose
                            const style = suggestion.active
                              ? {
                                  backgroundColor: "#101020",
                                  cursor: "pointer",
                                  textTransform: "none",
                                  justifyContent: "center",

                                  width: "380px",
                                }
                              : {
                                  backgroundColor: "#160E31",
                                  cursor: "pointer",
                                  textTransform: "none",
                                  width: "380px",
                                  justifyContent: "center",
                                }
                            return (
                              <div
                                key={`${id}${suggestion.description}`}
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                  style,
                                })}
                              >
                                <MenuItem
                                  style={{
                                    whiteSpace: "pre-line",
                                    fontSize: "14px",
                                  }}
                                >
                                  {suggestion.description}
                                </MenuItem>
                              </div>
                            )
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                ))}
              </Grid>
            </Grid>
          </Grid>
        </>
      )
    }
  )
)
export default GoogleApiWrapper({
  apiKey: "AIzaSyCmKhi_5V_pulQtm6DFJ8teDZpR9I5hJoM",
  libraries: ["places", "drawing", "geometry"],
})(GoogleMap)
