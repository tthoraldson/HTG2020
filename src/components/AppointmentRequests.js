import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import{ useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import TextField from '@material-ui/core/TextField';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';
import AccessTimeIcon from '@material-ui/icons/AccessTime';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing(2),
    outline: 'none',
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: "300px",
    padding: theme.spacing(2),
    textAlign: 'center',
    justifyContent: 'center',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    // width: 300,
  },

  input: {
    width: 42,
  },
}));

// fire and forget
const rejectAppointment = async url => {
  await fetch(url, {
    method: 'PUT'
  })
};

// post appointment schedule - fire and forget
const fetchResults = async(aid, pid, dateTime, duration) => {
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  let urlencoded = new URLSearchParams();
  urlencoded.append("date-time", dateTime);
  urlencoded.append("duration-min", duration);

  let requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: urlencoded,
    redirect: 'follow'
  };
  const url = `http://127.0.0.1:5000/appointments/accept-availability-requests/${aid}/${pid}`
  await fetch(url, requestOptions)
}

const ConsumerCard = (props) => {
  const classes = useStyles()
  const [disabled, setDisabled] = useState(false);

  const schedule = () => {
    setOpen(true);
    setDisabled(true)
  }

  const reject = () => {
    let url = `http://localhost:5000/appointments/decline-availability-requests/${props.aid}/${props.user_id}`
    rejectAppointment(url)
    setDisabled(true)
  }

  //modal
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  //duration slider
  const [value, setValue] = useState(30);
  const [dateTime, setDateTime] = useState("2017-05-24T10:30")

  const handleDateTimeChange = (event) => {
    setDateTime(event.target.value);
  };

  const handleSliderChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleInputChange = (event) => {
    setValue(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleBlur = () => {
    if (value < 0) {
      setValue(0);
    } else if (value > 100) {
      setValue(100);
    }
  };

  const handleSchedule = () => {
    fetchResults(props.aid, props.user_id, dateTime, value)
    setOpen(false);
  }

  return (
    // modal with schedule
    <React.Fragment>
    <Modal
    disableEnforceFocus
    disableAutoFocus
    aria-labelledby="transition-modal-title"
    aria-describedby="transition-modal-description"
    className={classes.modal}
    open={open}
    onClose={handleClose}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
    >
      <Fade in={open}>

        <Paper className={classes.container}>

        <Typography gutterBottom  variant="h5" component="h2" component="h2">
          Schedule appointment
        </Typography>
        
        <form className={classes.container} noValidate>

            <Grid container spacing={1} xs={12}>
              
              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle2" component="h2">
                  Date and time
                </Typography>
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                id="datetime-local"
                type="datetime-local"
                defaultValue={dateTime}
                className={classes.textField}
                onChange={handleDateTimeChange}
                InputLabelProps={{
                  shrink: true,
                }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography gutterBottom variant="subtitle2" component="h2">
                  Duration
                </Typography>
              </Grid>
              
              <Grid item xs={2}>
                <AccessTimeIcon />
              </Grid>
              
              <Grid item xs={6}>
                <Slider
                  value={typeof value === 'number' ? value : 0}
                  onChange={handleSliderChange}
                  aria-labelledby="input-slider"
                />
              </Grid>

              <Grid item xs>
                <Input
                  className={classes.input}
                  value={value}
                  margin="dense"
                  onChange={handleInputChange}
                  onBlur={handleBlur}
                  inputProps={{
                    step: 10,
                    min: 0,
                    max: 100,
                    type: 'number',
                    'aria-labelledby': 'input-slider',
                  }}
                />
              </Grid>
              
              <Grid item xs={12}>
                <Button size="small" color="secondary" onClick={() => handleSchedule()} >
                  Confirm
                </Button>
              </Grid>

            </Grid>
      
          </form>

        </Paper>
      
      </Fade>
    
    </Modal>

      <Paper className={classes.paper}> 
        <Typography gutterBottom  variant="h5" component="h2" component="h2">
          {props.username}  
        </Typography>
        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
          Requested: {props.requested}
        </Typography>
        <Button size="small" color="primary" disabled={disabled} onClick={() => schedule()} >
          Schedule
        </Button>
        <Button size="small" color="secondary" disabled={disabled} onClick={() => reject()} >
          Reject
        </Button>
      </Paper>
    </React.Fragment>
  )
}

const useFetch = url => {

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRequestedAppointments = async () => {
    const response = await fetch(url);
    
    let data = []
    if(response.status == 200){
      data = await response.json();
    }
    
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchRequestedAppointments();
  }, []);

  return { data, loading };
};

const AppointmentRequests = (props) => {

  const url = props.url
  const user_id = props.user_id
  const classes = useStyles()
  const { data, loading } = useFetch(url);

  return (

    <div className={classes.root}>
    {loading ? (
      <div>Loading...</div>
    ) : (
  
    <React.Fragment>

      <Grid container spacing={3}>
      {data.map((row) => (    
        <Grid item xs={4}>
          <ConsumerCard username={row.username} requested={row.requested} aid={row.appointments_id} user_id={user_id}/>
        </Grid>
      ))}
      </Grid>

    </React.Fragment>

    )}
    </div>
  )
}

AppointmentRequests.defaultProps = {
  showActions: "no",
};

export default AppointmentRequests