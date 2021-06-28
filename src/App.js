import Accordion from "@material-ui/core/Accordion"
import AccordionDetails from "@material-ui/core/AccordionDetails"
import AccordionSummary from "@material-ui/core/AccordionSummary"
import Card from "@material-ui/core/Card"
import CssBaseline from "@material-ui/core/CssBaseline"
import Slide from "@material-ui/core/Slide"
import Button from "@material-ui/core/Button"
import Dialog from "@material-ui/core/Dialog"
import { ThemeProvider } from "@material-ui/styles"
// import { isMobile } from 'react-device-detect';
import React, { useEffect } from "react"
import Draggable from "react-draggable"
import { connect } from "react-redux"
import { BookinglaneIcon } from "./assets/icons"
import CheckOut from "./Components/CheckoutForm/CheckOut/CheckOut"
import CompanyProfile from "./Components/CompanyProfile/CompanyProfile"
import {
  getCompanyProfile,
  initializing,
} from "./Redux/company-profile-reducer"
import { getCompanyToken } from "./Redux/company-token-reducer"
import theme from "./Theme"

import { Preloader } from "./Components/Helpers/Preloader"
import { userScreenHeight, userScreenWidth, useStyles } from "./AppStyles"
import { AppBar, useMediaQuery } from "@material-ui/core"
import { useRef } from "react"

let xOrdinate = 0
let yOrdinate = 0
// const cardHeight = document.getElementById("mainContent").clientHeight

const App = (props) => {
  const classes = useStyles(props)

  const [activeStep, setActiveStep] = React.useState(0)
  let position = React.useRef({ x: 0, y: 0 })
  const [expanded, setExpanded] = React.useState(false)
  const [disabled, setDisabled] = React.useState(false)
  const [disabledWidget, setDisabledWidget] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const [heightOfCard, setHeightOfCard] = React.useState(0)
  const refOfCard = useRef(null)
  const [heightOfBookNow, setHeightOfBookNow] = React.useState(0)
  const refOfBookNow = useRef(null)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleCloseDialog = () => {
    setOpen(false)
  }

  const handleClose = () => {
    setExpanded(false)
  }

  const handleChange = (panel) => (event, isExpanded) => {
    yOrdinate = position.current.y
    xOrdinate = position.current.x
    position.current.y = 0
    if (userScreenWidth - xOrdinate < 500) {
      position.current.x = userScreenWidth - 520
    }
    if (xOrdinate < -20) {
      position.current.x = 0
    }
    setExpanded(isExpanded ? panel : false)
  }

  const enableAccordionButton = (e) => {
    setTimeout(() => {
      setDisabled(false)
    }, 120)
    setHeightOfCard(refOfCard.current.clientHeight)

    {
      /*Этот обработчик чтобы сам раскрывшийся виджет не выходил за рамки экрана если перетаскивается за пределы то он возвращается */
    }
    if (expanded) {
      yOrdinate = position.current.y
      xOrdinate = position.current.x
      if (xOrdinate + 500 > userScreenWidth) {
        position.current.x = userScreenWidth - 430
      }
      if (xOrdinate < -20) {
        position.current.x = 0
      }
      if (yOrdinate - heightOfCard < -userScreenHeight) {
        position.current.y = -userScreenHeight + heightOfCard
      }
      if (yOrdinate > 0) {
        position.current.y = 0
      }
    }
    {
      /*Тот же обратчик только для иконки Book Now! с пульсацией до раскрытой иконке*/
    }
    yOrdinate = position.current.y
    xOrdinate = position.current.x
    if (xOrdinate < 0) {
      position.current.x = -60
    }
    if (xOrdinate + 300 > userScreenWidth) {
      position.current.x = userScreenWidth - 300
    }
    if (yOrdinate - 180 < -userScreenHeight) {
      position.current.y = -userScreenHeight + 220
    }

    if (yOrdinate > 0) {
      position.current.y = 0
    }
    // console.log(position.current.y)
    // console.log(userScreenHeight)
  }
  React.useEffect(() => {
    setHeightOfBookNow(refOfBookNow.current.clientHeight)
  }, [heightOfBookNow])
  const handleDrag = (e, ui) => {
    position.current.x = ui.x
    position.current.y = ui.y
    if (!expanded)
      setTimeout(() => {
        setDisabled(true)
      }, 120)
  }

  const nextStep = () => setActiveStep((prevActiveStep) => prevActiveStep + 1)
  const backStep = () => setActiveStep((prevActiveStep) => prevActiveStep - 1)

  const jwtToken = localStorage.getItem("Authorization")

  useEffect(() => {
    if (jwtToken) {
      return
    }
    props.getCompanyToken()
  }, [jwtToken])

  const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />
  })

  const isMobile = useMediaQuery("(max-width:650px)")

  return (
    <>
      {isMobile ? (
        <>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <div className={classes.mainMobile}>
              <Accordion
                elevation={0}
                disabled={disabled}
                classes={{
                  root: classes.MuiAccordionroot,
                  disabled: classes.disabledButton,
                }}
                TransitionProps={{
                  timeout: 0,
                }}
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  className={classes.accordion}
                  expandIcon={<BookinglaneIcon />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                ></AccordionSummary>
                <AccordionDetails>
                  {jwtToken && (
                    <Card
                      className={classes.contentMobile}
                      style={{ bottom: userScreenHeight - yOrdinate }}
                      style={
                        activeStep === 1
                          ? { overflowY: "hidden" }
                          : { overflowY: "auto" }
                      }
                    >
                      <CompanyProfile
                        setExpanded={handleClose}
                        initializing={props.initializing}
                        expanded={expanded}
                        setActiveStep={setActiveStep}
                      >
                        {props.initializing ? (
                          <CheckOut
                            isFetching={props.isFetching}
                            setExpanded={handleClose}
                            activeStep={activeStep}
                            setActiveStep={setActiveStep}
                            nextStep={nextStep}
                            backStep={backStep}
                          />
                        ) : null}
                      </CompanyProfile>
                    </Card>
                  )}
                  {!jwtToken && null}
                </AccordionDetails>
              </Accordion>
            </div>
            {/* <div className={classes.main}>

              <Button className={classes.mobileButton} variant="outlined" color="primary" onClick={handleClickOpen}>
                <BookinglaneIcon />
              </Button>

            </div>
            <Dialog fullScreen open={open} onClose={handleCloseDialog} scroll='body' TransitionComponent={Transition}>
              <div className={classes.mobileMain}>
                {jwtToken &&
                  <Card className={classes.mobileContent} style={activeStep === 1 ? { overflowY: 'hidden' } : { overflowY: 'auto' }} >
                    <CompanyProfile handleCloseDialog={handleCloseDialog} expanded={expanded} setActiveStep={setActiveStep} />
                    <CheckOut isFetching={props.isFetching} handleCloseDialog={handleCloseDialog} activeStep={activeStep} setActiveStep={setActiveStep} nextStep={nextStep} backStep={backStep} />
                  </Card>
                }
                {!jwtToken && null}
              </div>
            </Dialog> */}
          </ThemeProvider>
        </>
      ) : (
        <>
          <CssBaseline />
          <ThemeProvider theme={theme}>
            <div className={classes.main}>
              <Draggable
                onDrag={handleDrag}
                onStop={enableAccordionButton}
                position={position.current}
                // disabled={false}
                // bounds="body"
                handle=".companyProfileClassForDrag, #panel1a-header"
              >
                <Accordion
                  elevation={0}
                  disabled={disabled}
                  classes={{
                    root: classes.MuiAccordionroot,
                    disabled: classes.disabledButton,
                  }}
                  TransitionProps={{
                    timeout: 0,
                  }}
                  expanded={expanded === "panel1"}
                  onChange={handleChange("panel1")}
                >
                  <AccordionSummary
                    className={classes.accordion}
                    expandIcon={<BookinglaneIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    ref={refOfBookNow}
                  ></AccordionSummary>
                  <AccordionDetails>
                    {jwtToken && (
                      <div className="mainContent">
                        <Card
                          className={classes.content}
                          style={{ bottom: userScreenHeight - yOrdinate }}
                          style={
                            activeStep === 1
                              ? { overflowY: "hidden" }
                              : { overflowY: "auto" }
                          }
                          ref={refOfCard}
                          // style={{ borderRadius: "10px" }}
                        >
                          <AppBar position="sticky" color=" #101020">
                            <div className="companyProfileClassForDrag">
                              {/* этот класс c div-oм для реакт драга чтобы можно было перетаскивать по шапке виджета*/}
                              <div className={classes.companyProfile}>
                                {/* это для pointer cursora */}
                                <CompanyProfile
                                  setExpanded={handleClose}
                                  initializing={props.initializing}
                                  expanded={expanded}
                                  setActiveStep={setActiveStep}
                                />
                              </div>
                            </div>
                          </AppBar>

                          {props.initializing ? (
                            <CheckOut
                              isFetching={props.isFetching}
                              setExpanded={handleClose}
                              activeStep={activeStep}
                              setActiveStep={setActiveStep}
                              nextStep={nextStep}
                              backStep={backStep}
                            />
                          ) : null}
                        </Card>
                      </div>
                    )}
                    {!jwtToken && null}
                  </AccordionDetails>
                </Accordion>
              </Draggable>
            </div>
          </ThemeProvider>
        </>
      )}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    isFetching: state.cars.isFetching,
    // companyName: state.companyProfile.profile.companyName,
    initializing: state.companyProfile.initializing,
  }
}

export default connect(mapStateToProps, { getCompanyProfile, getCompanyToken })(
  App
)
