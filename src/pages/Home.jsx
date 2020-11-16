import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    height: '100vh',
    background: 'url(../assets/images/airplane.jpg)',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 0
  },
  inner: {
    minWidth: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    padding: '2rem',
    borderRadius: 3
  },
  heading: { fontWeight: '600', color: theme.palette.primary.main },
  pad: { margin: '2rem auto' }
}));

export default function Home() {
  const { loginWithRedirect } = useAuth0();
  const classes = useStyles();

  return (
    <Paper elevation={0} className={classes.root}>
      <Paper elevation={3} className={classes.inner}>
        <Typography variant='h2' component='h1' className={classes.heading}>
          Plan my Journey
        </Typography>
        <Typography variant='h4'>Welcome!</Typography>
        <Grid className={classes.pad}>
          <Typography variant='body1'>Login to your account or create a new account to get started.</Typography>
          <Typography variant='body2'>Click the 'Get Started' button to login securely with Auth0.</Typography>
        </Grid>
        <Grid container justify='center'>
          <Button color='primary' size='large' onClick={loginWithRedirect}>
            Get Started
          </Button>
        </Grid>
      </Paper>
    </Paper>
  );
}
