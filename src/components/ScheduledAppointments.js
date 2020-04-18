import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import{ useState, useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


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

const ConsumerCard = (props) => {
  const classes = useStyles()
  const [disabled, setDisabled] = useState(false);

  return (
      <Paper className={classes.paper}>  
        <Typography gutterBottom  variant="h5" component="h2" component="h2">
          {props.username}  
        </Typography>
        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
          Requested: {props.requested}
        </Typography>
        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
          Date and time: {props.appointment_date}
        </Typography>
        <Typography gutterBottom variant="body2" color="textSecondary" component="p">
          Duration: {props.appointment_duration} min.
        </Typography>

        <React.Fragment>
          
        { (props.consumer_accepted) ? (
          <Typography gutterBottom variant="body2" color="secondary" component="p">
            Status: Acepted
          </Typography>
        ):(<span></span>)}
          
        { (props.consumer_resigned) ? (
          <Typography gutterBottom variant="body2" color="primary" component="p">
            Status: Resigned
          </Typography>
        ):(<span></span>)}
         
        { (!props.consumer_resigned && !props.consumer_accepted) ? (
          <Typography gutterBottom variant="body2" color="primary" component="p">
          Status: Wating for confirmation
          </Typography>
        ):(<span></span>)}

        </React.Fragment>
        
      </Paper>

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

const ScheduledAppointments = (props) => {

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
          <ConsumerCard 
            username={row.username} 
            requested={row.requested} 
            aid={row.appointments_id} 
            user_id={user_id}
            appointment_date={row.appointment_date}
            appointment_duration={row.appointment_duration}
            consumer_accepted={row.consumer_accepted}
            consumer_resigned={row.consumer_resigned}
            />
        </Grid>
      ))}
      </Grid>

    </React.Fragment>

    )}
    </div>
  )
}

ScheduledAppointments.defaultProps = {
  showActions: "no",
};

export default ScheduledAppointments