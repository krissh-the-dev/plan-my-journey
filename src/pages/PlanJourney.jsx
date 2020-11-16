import React, { useState, useEffect } from 'react';
import AppBar from '../components/AppBar';
import {
  Container,
  TextField,
  Grid,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  Radio,
  RadioGroup,
  FormControlLabel,
  MenuItem
} from '@material-ui/core';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import PayPalButton from '../components/PayPalButton';

import { useAuth0 } from '@auth0/auth0-react';

import { create as newJourney } from '../functions/airtable';

// eslint-disable-next-line
String.prototype.isEmpty = function () {
  return this.length === 0 || !this.trim();
};

export default function PlanJourney() {
  const [noOfPassengers, setNoPassengers] = useState(1);
  const [isPaid, setIsPaid] = useState(false);
  const [isPaymentDisabled, setIsPaymentDisabled] = useState(false);
  const [fare, setFare] = useState(400);

  const { user } = useAuth0();

  const [source, setSource] = useState({
    sourceCity: '',
    sourceState: '',
    sourceCountry: ''
  });

  const [destination, setDestination] = useState({
    destinationCity: '',
    destinationState: '',
    destinationCountry: ''
  });

  const [date, changeDate] = useState(new Date());

  const [passengers, setPassengers] = useState({
    passengerName_1: '',
    passengerAge_1: 20,
    passengerSex_1: 'Female'
  });

  const [plan, setPlan] = useState('Economy');

  const handlePassengersChange = evt => {
    const { id, name, value } = evt.target;
    setPassengers(prev => ({ ...prev, [id || name]: value }));
  };

  const handleSourceChange = event => {
    const { id, value } = event.target;
    setSource(currVal => ({ ...currVal, [id]: value }));
  };

  const handleDestinationChange = event => {
    const { id, value } = event.target;
    setDestination(currVal => ({ ...currVal, [id]: value }));
  };

  const addPassenger = () => {
    if (noOfPassengers === 4) {
      return;
    }
    setNoPassengers(curr => curr + 1);
  };

  useEffect(() => {
    const sourceValues = Object.values(source);
    const destValues = Object.values(destination);
    if (
      sourceValues.findIndex(value => value.isEmpty()) === -1 &&
      destValues.findIndex(value => value.isEmpty()) === -1
    ) {
      setIsPaymentDisabled(false);
    } else {
      setIsPaymentDisabled(true);
    }
  }, [source, destination]);

  useEffect(() => {
    let amount = 300;
    if (source.sourceCountry !== destination.destinationCountry) {
      amount += 200;
    }
    if (source.sourceState !== destination.destinationState) {
      amount += 100;
    }
    switch (plan) {
      case 'Economy':
        amount += 50;
        break;
      case 'Basic':
        amount += 100;
        break;
      case 'Premium':
        amount += 150;
        break;

      default:
        amount = 1000;
    }
    setFare(amount * noOfPassengers);
  }, [plan, source, destination, noOfPassengers]);

  const handleSubmit = event => {
    event.preventDefault();
    if (!isPaid) {
      return;
    }

    const row = {
      email: user.email,
      ...source,
      ...destination,
      ...date,
      passengers: JSON.stringify(passengers),
      plan,
      payment: isPaid
    };
    console.table(row);
    const result = newJourney(row);

    console.log(result);
  };

  return (
    <>
      <AppBar />
      <Container maxWidth='md' style={{ margin: '5rem auto' }}>
        <form onSubmit={handleSubmit}>
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container spacing={6} direction='column'>
              <Grid item container spacing={3}>
                <Grid item style={{ flex: '1' }}>
                  <TextField
                    fullWidth
                    required
                    id='sourceCity'
                    value={source.sourceCity}
                    onChange={handleSourceChange}
                    label='Source City'
                    variant='outlined'
                  />
                </Grid>
                <Grid item style={{ flex: '1' }}>
                  <TextField
                    fullWidth
                    required
                    id='destinationCity'
                    value={destination.destinationCity}
                    onChange={handleDestinationChange}
                    label='Destination City'
                    variant='outlined'
                  />
                </Grid>
              </Grid>

              <Grid item container spacing={3}>
                <Grid item style={{ flex: '1' }}>
                  <TextField
                    fullWidth
                    required
                    id='sourceState'
                    value={source.sourceState}
                    onChange={handleSourceChange}
                    label='Source State'
                    variant='outlined'
                  />
                </Grid>
                <Grid item style={{ flex: '1' }}>
                  <TextField
                    fullWidth
                    required
                    id='destinationState'
                    value={destination.destinationState}
                    onChange={handleDestinationChange}
                    label='Destination State'
                    variant='outlined'
                  />
                </Grid>
              </Grid>

              <Grid item container spacing={3}>
                <Grid item style={{ flex: '1' }}>
                  <TextField
                    fullWidth
                    required
                    id='sourceCountry'
                    value={source.sourceCountry}
                    onChange={handleSourceChange}
                    label='Source Country'
                    variant='outlined'
                  />
                </Grid>
                <Grid item style={{ flex: '1' }}>
                  <TextField
                    fullWidth
                    required
                    id='destinationCountry'
                    label='Destination Country'
                    value={destination.destinationCountry}
                    onChange={handleDestinationChange}
                    variant='outlined'
                  />
                </Grid>
              </Grid>

              <Grid item style={{ flex: '1' }}>
                <Typography variant='body1'>Choose your journey date</Typography>
                <DatePicker
                  autoOk
                  disablePast
                  orientation='landscape'
                  variant='static'
                  openTo='date'
                  value={date}
                  onChange={changeDate}
                />
              </Grid>

              <Grid item container spacing={3}>
                <Grid item container justify='space-between' alignItems='center' style={{ flex: '1' }}>
                  <Typography variant='h5'>Passengers</Typography>
                  <Button color='primary' onClick={addPassenger}>
                    Add Passenger
                  </Button>
                </Grid>
              </Grid>

              <Grid item container spacing={3}>
                <Grid item style={{ flex: '2 1 60%' }}>
                  <TextField
                    id='passengerName_1'
                    label='Name'
                    required
                    variant='outlined'
                    value={passengers.passengerName_1}
                    onChange={handlePassengersChange}
                    fullWidth
                  />
                </Grid>
                <Grid item container spacing={3} style={{ flex: '1 1 40%' }}>
                  <Grid item style={{ flex: '1 1 50%' }}>
                    <TextField
                      type='number'
                      id='passengerAge_1'
                      label='Age'
                      required
                      value={passengers.passengerAge_1}
                      onChange={handlePassengersChange}
                      variant='outlined'
                      fullWidth
                    />
                  </Grid>
                  <Grid item style={{ flex: '1 1 50%' }}>
                    <FormControl variant='outlined'>
                      <InputLabel id='passengerSex_1'>Sex *</InputLabel>
                      <Select
                        labelId='passengerSex_1'
                        id='passengerSex_1'
                        name='passengerSex_1'
                        defaultValue='Female'
                        value={passengers.passengerSex_1}
                        onChange={handlePassengersChange}
                        required
                      >
                        <MenuItem value={'Male'}>Male</MenuItem>
                        <MenuItem value={'Female'}>Female</MenuItem>
                        <MenuItem value={'Other'}>Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              {noOfPassengers >= 2 && (
                <Grid item container spacing={3}>
                  <Grid item style={{ flex: '2 1 60%' }}>
                    <TextField
                      id='passengerName_2'
                      label='Name'
                      variant='outlined'
                      onChange={handlePassengersChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item container style={{ flex: '1 1 40%' }}>
                    <Grid item style={{ flex: '1 1 50%' }}>
                      <TextField
                        type='number'
                        id='passengerAge_2'
                        label='Age'
                        variant='outlined'
                        onChange={handlePassengersChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item style={{ flex: '1 1 50%' }}>
                      <FormControl variant='outlined'>
                        <InputLabel id='passengerSex_2'>Sex</InputLabel>
                        <Select
                          labelId='passengerSex_2'
                          id='passengerSex_2'
                          name='passengerSex_2'
                          defaultValue='Female'
                          onChange={handlePassengersChange}
                        >
                          <MenuItem value={'Male'}>Male</MenuItem>
                          <MenuItem value={'Female'}>Female</MenuItem>
                          <MenuItem value={'Other'}>Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {noOfPassengers >= 3 && (
                <Grid item container spacing={3}>
                  <Grid item style={{ flex: '2 1 60%' }}>
                    <TextField
                      id='passengerName_3'
                      label='Name'
                      variant='outlined'
                      onChange={handlePassengersChange}
                      fullWidth
                    />
                  </Grid>
                  <Grid item container style={{ flex: '1 1 40%' }}>
                    <Grid item style={{ flex: '1 1 50%' }}>
                      <TextField
                        type='number'
                        id='passengerAge_3'
                        label='Age'
                        variant='outlined'
                        onChange={handlePassengersChange}
                        fullWidth
                      />
                    </Grid>
                    <Grid item style={{ flex: '1 1 50%' }}>
                      <FormControl variant='outlined'>
                        <InputLabel id='passengerSex_3'>Sex</InputLabel>
                        <Select
                          labelId='passengerSex_3'
                          id='passengerSex_3'
                          name='passengerSex_3'
                          defaultValue='Female'
                          onChange={handlePassengersChange}
                        >
                          <MenuItem value={'Male'}>Male</MenuItem>
                          <MenuItem value={'Female'}>Female</MenuItem>
                          <MenuItem value={'Other'}>Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              {noOfPassengers >= 4 && (
                <Grid item container spacing={3}>
                  <Grid item style={{ flex: '2 1 60%' }}>
                    <TextField id='passengerName_4' label='Name' variant='outlined' fullWidth />
                  </Grid>
                  <Grid item container style={{ flex: '1 1 40%' }}>
                    <Grid item style={{ flex: '1 1 50%' }}>
                      <TextField type='number' id='passengerAge_4' label='Age' variant='outlined' fullWidth />
                    </Grid>
                    <Grid item style={{ flex: '1 1 50%' }}>
                      <FormControl variant='outlined'>
                        <InputLabel id='passengerSex_4'>Sex</InputLabel>
                        <Select
                          labelId='passengerSex_4'
                          id='passengerSex_4'
                          name='passengerSex_4'
                          defaultValue='Female'
                        >
                          <MenuItem value={'Male'}>Male</MenuItem>
                          <MenuItem value={'Female'}>Female</MenuItem>
                          <MenuItem value={'Other'}>Other</MenuItem>
                        </Select>
                      </FormControl>
                    </Grid>
                  </Grid>
                </Grid>
              )}

              <Grid item container spacing={3}>
                <Grid item container justify='space-between' alignItems='center' style={{ flex: '1' }}>
                  <Typography variant='h5'>Choose your plan</Typography>
                  <RadioGroup
                    row
                    aria-label='plan'
                    name='plan'
                    id='plan'
                    value={plan}
                    onChange={e => setPlan(e.target.value)}
                  >
                    <FormControlLabel value='Economy' control={<Radio color='primary' />} label='Economy' />
                    <FormControlLabel value='Basic' control={<Radio color='primary' />} label='Basic' />
                    <FormControlLabel value='Premium' control={<Radio color='primary' />} label='Premium' />
                  </RadioGroup>
                </Grid>

                <Grid item container direction='column' spacing={3}>
                  <Grid item container justify='space-between' style={{ flex: '1 1 100%' }}>
                    <Grid item>
                      <Typography variant='h5'>Payment</Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant='h5' style={{ color: '#8a2be2' }}>
                        ${fare}
                      </Typography>
                    </Grid>
                  </Grid>
                  <Grid item>
                    {!isPaymentDisabled && (
                      <PayPalButton
                        isPaid={isPaid}
                        setIsPaid={setIsPaid}
                        fare={fare}
                        setDisabled={setIsPaymentDisabled}
                      />
                    )}
                  </Grid>
                </Grid>

                <Grid item container spacing={5}>
                  <Grid item>
                    <Button color='primary' variant='contained' size='large' type='submit'>
                      Submit
                    </Button>
                  </Grid>
                  <Grid item>
                    <Button color='primary' size='large'>
                      Clear
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </MuiPickersUtilsProvider>
        </form>
      </Container>
    </>
  );
}
