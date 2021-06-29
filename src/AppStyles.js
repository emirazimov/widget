import { makeStyles } from "@material-ui/core"

const userScreenHeight = window.innerHeight
const userScreenWidth = window.innerWidth

const useStyles = makeStyles((theme) => ({
  "@keyframes pulse": {
    "0%": {
      "-moz-box-shadow": "0 0 0 0 rgba(30, 172, 199, 1)",
      "box-shadow": "0 0 0 0 rgba(30, 172, 199, 1)",
    },
    "70%": {
      "-moz-box-shadow": "0 0 0 10px rgba(204,169,44, 0)",
      "box-shadow": "0 0 0 10px rgba(204,169,44, 0)",
    },
    "100%": {
      "-moz-box-shadow": "0 0 0 0 rgba(204,169,44, 0)",
      "box-shadow": "0 0 0 0 rgba(204,169,44, 0)",
    },
  },
  MuiAccordionroot: {
    "&.MuiAccordion-root:before": {
      backgroundColor: "white",
    },
    "& .MuiAccordionDetails-root": {
      padding: "0px",
    },
    "& .MuiAccordionSummary-expandIcon": {
      transition: "0ms",
      animationName: "$pulse",
      animationIterationCount: "infinite",
      animationDuration: "2s",
    },
    "& .MuiButtonBase-root": {
      disableRipple: true,
      disableFocusRipple: true,
      disableElevation: true,
    },
    "& .MuiButtonBase-root.Mui-disabled": {
      backgroundColor: "none",
    },
  },

  main: {
    position: "fixed",
    bottom: "1px",
    webkitUserSelect: "none",
    mozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  },
  mainMobile: {
    position: "fixed",
    bottom: "-1px",
    webkitUserSelect: "none",
    mozUserSelect: "none",
    msUserSelect: "none",
    userSelect: "none",
  },
  accordion: {
    width: "150px",
    height: "150px",
    bottom: "50px",
    left: "90px",
    background: "none",
    padding: theme.spacing(1),
    position: "fixed",
    [theme.breakpoints.down("xs")]: {
      left: "10px",
    },
  },
  content: {
    position: "absolute",
    cursor: "default",
    height: "80vh",
    width: "436px",
    // borderTopRightRadius: '30px',
    // borderTopLeftRadius: '30px',
    // borderBottomRight: '0px',
    // borderBottomLeft: '0px',

    bottom: "-1px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.65em",
      top: "100px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "grey",
      borderRadius: "40px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#c5cde3",
    },
    [theme.breakpoints.down("xs")]: {
      width: userScreenWidth,
      height: userScreenHeight,
    },
    // left: '-20px',
  },
  checkOut: {
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.8em",
      top: "100px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "grey",
      borderRadius: "20px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#c5cde3",
    },
  },
  contentMobile: {
    position: "fixed",
    cursor: "default",

    // borderTopRightRadius: '30px',
    // borderTopLeftRadius: '30px',
    // borderBottomRight: '0px',
    // borderBottomLeft: '0px',

    bottom: "1px",
    overflowY: "scroll",
    "&::-webkit-scrollbar": {
      width: "0.65em",
      top: "100px",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "grey",
      borderRadius: "40px",
    },
    "&::-webkit-scrollbar-thumb:hover": {
      background: "#c5cde3",
    },
    [theme.breakpoints.down("xs")]: {
      width: userScreenWidth,
      height: userScreenHeight,
    },
    // left: '-20px',
  },
  companyProfile: {
    cursor: "move",
    // position: 'sticky',
  },
}))

export { useStyles, userScreenWidth, userScreenHeight }
