import React from 'react';
import AppBar from '../components/AppBar';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

export default function Dashboard() {
  return (
    <div>
      <AppBar />
      <Container fluid='lg'>
        <Typography variant='h1'>Dashboard</Typography>
        <Grid container spacing={3}>
          <Grid item>
            <Card elevation={6}>
              <CardContent>
                <Typography variant='h4'>New journey</Typography>
                <Typography variant='body1'>
                  Plan a new journey, choose dates, locations, pay and happy journey!
                </Typography>
              </CardContent>
              <CardActions>
                <Button color='primary' onClick={() => window.open('http://localhost:3000/plan', '_self')}>
                  Plan Now
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item>
            <Card elevation={6}>
              <CardContent>
                <Typography variant='h4'>My story</Typography>
                <Typography variant='body1'>View your past journeys.</Typography>
              </CardContent>
              <CardActions>
                <Button color='primary'>Show</Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
}
