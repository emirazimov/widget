import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const ReservationFailed = ({ setActiveStep }) => {
    return (
        <Grid container direction='column' justify='center' alignItems='center' style={{ height: '80vh' }}>
            <Grid item>
                <Typography>Something goes wrong</Typography>
            </Grid>
            <Grid item>
                <Button color='primary' variant='contained' onClick={() => setActiveStep(0)}>Back</Button>
            </Grid>
        </Grid>
    )
}

export default ReservationFailed
