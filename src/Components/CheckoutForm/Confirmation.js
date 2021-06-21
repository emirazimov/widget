import React from 'react'
import { connect } from 'react-redux';
import { Preloader } from './../Helpers/Preloader';
import Grid from '@material-ui/core/Grid';
import { Success } from '../../assets/icons';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import ReservationFailed from './ReservationFailed';
import { createReservation, logOut } from './../../Redux/form-reducer';


const Confirmation = ({ createReservation, companyName, email, setExpanded, isSuccess, isFetching, setActiveStep, formSummary, logOut }) => {


    React.useEffect(() => {
        createReservation(formSummary)
    }, [])

    return (
        <>
            {isFetching ? <Preloader /> :
                isSuccess ?
                    <Grid container direction="column" spacing={2} justify='center' alignItems='center' style={{ height: '80vh' }}>
                        <Grid item>
                            <Success />
                        </Grid>
                        {/* <Grid item>
                            <Typography variant='body2'>Success</Typography>
                        </Grid> */}
                        <Grid item>
                            <Typography variant='body2' align='center'>Your reservation was successfully <Typography variant='body2' >submitted. A confirmation email was</Typography> sent to {email && email}.</Typography>
                        </Grid>
                        <Grid item>
                            <Typography variant='body2'>Thanks, {companyName && companyName}</Typography>
                        </Grid>
                        <Grid item>
                            <Button onClick={() => { setExpanded(false); setActiveStep(0); logOut() }} variant='contained' color='primary' fullWidth>Done</Button>
                        </Grid>
                    </Grid>
                    :
                    <ReservationFailed setActiveStep={setActiveStep} />
            }
        </>
    )
}

const mapStateToProps = (state) => {
    return {
        isSuccess: state.companyProfile.isSuccess,
        isFetching: state.cars.isFetching,
        formSummary: state.formData,
        email: state.formData.client.email,
        companyName: state.companyProfile.profile.companyName
    }
}

export default connect(mapStateToProps, { createReservation, logOut })(Confirmation);
