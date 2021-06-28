import React, { useEffect } from "react"
import { connect } from "react-redux"
import { getCompanyProfile } from "../../Redux/company-profile-reducer"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { makeStyles } from "@material-ui/core/styles"
import { CloseWidgetIcon } from "../../assets/icons"
import Divider from "@material-ui/core/Divider"
import { isMobile } from "react-device-detect"
import { Preloader } from "../Helpers/Preloader"
import AppBar from "@material-ui/core/AppBar"

const useStyles = makeStyles((theme) => ({
  companyContainer: {
    padding: theme.spacing(1.5),
    // position: 'fixed',
  },
  companyLogo: {
    borderRadius: "100px",
    width: "55px",
    height: "55px",
    marginLeft: "15px",
    userDrag: "none",
    userSelect: "none",
    mozUserSelect: "none",
    webkitUserDrag: "none",
    webkitUserSelect: "none",
    msUserSelect: "none",
  },
  companyName: {
    fontFamily: "Roboto",
    fontWeight: "700",
    color: "white",
    fontSize: "24px",
    textTransform: "none",
  },
}))

const CompanyProfile = ({
  initializing,
  profile,
  getCompanyProfile,
  handleCloseDialog,
  setExpanded,
  setActiveStep,
}) => {
  const classes = useStyles()

  const jwtToken = localStorage.getItem("Authorization")

  useEffect(() => {
    if (jwtToken) {
      getCompanyProfile()
    }
  }, [getCompanyProfile, jwtToken])

  return (
    <>
      {/* {isMobile ? <> <Grid container direction="row"
                justify="space-between"
                alignItems="center"
                className={classes.companyContainer}>
                <Grid item>
                    <img src={profile.companyLogoPath} className={classes.companyLogo} alt='companyLogo' />
                </Grid>
                <Grid item xs={5}>
                    <Typography className={classes.companyName}>{profile.companyName}</Typography>
                </Grid>
                <Grid item>
                    <span style={{ cursor: 'pointer' }} onClick={() => { handleCloseDialog(false); setActiveStep(0) }}>
                        <CloseWidgetIcon />
                    </span>
                </Grid>
            </Grid>
                <Divider orientation='horizontal' variant='fullWidth' />
            </> : */}
      {/* {initializing ? ( */}

      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
        className={classes.companyContainer}
      >
        <Grid item>
          <img
            // src={profile.companyLogoPath}
            className={classes.companyLogo}
            alt="companyLogo"
          />
        </Grid>
        <Grid item xs={6} md={8}>
          <Typography className={classes.companyName}>
            {profile.companyName}
          </Typography>
        </Grid>
        <Grid item>
          <span
            style={{ cursor: "pointer" }}
            onClick={() => {
              setExpanded(false)
              setActiveStep(0)
            }}
          >
            <CloseWidgetIcon />
          </span>
        </Grid>
      </Grid>

      <Divider orientation="horizontal" variant="fullWidth" />

      {/* ) : (
        <Preloader />
      )} */}
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    profile: state.companyProfile.profile,
  }
}

export default connect(mapStateToProps, { getCompanyProfile })(CompanyProfile)
