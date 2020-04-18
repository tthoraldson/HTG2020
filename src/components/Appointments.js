import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import{ useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  table: {
    minWidth: 650,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

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

// fire and forget
const appointmentAction = async url => {
  await fetch(url, {
    method: 'PUT'
  })
};

const ActionButtons = (props) => {

  const [disabled, setDisabled] = useState(false);

  const confirm = (aid, pid) => {
    let url = `http://127.0.0.1:5000/appointments/accept-availability/${aid}/${pid}/${props.user_id}`
    appointmentAction(url)
    setDisabled(true)
  }

  const resign = (aid, pid) => {
    let url = `http://127.0.0.1:5000/appointments/reject-availability/${aid}/${pid}/${props.user_id}`
    appointmentAction(url)
    setDisabled(true)
  }
  
  return (
    <React.Fragment>
    <Button size="small" color="primary" disabled={disabled} onClick={() => confirm(props.appointments_id, props.professional_id)} >
    Confirm
    </Button>
    <Button size="small" color="secondary" disabled={disabled} onClick={() => resign(props.appointments_id, props.professional_id)} >
    Resign
    </Button>
    </React.Fragment>
  )
}


const Appointments = (props) => {

  const url = props.url
  const classes = useStyles()
  const { data, loading } = useFetch(url);

  return (

    <div className="App">
    {loading ? (
      <div>Loading...</div>
    ) : (
  
    <React.Fragment>
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Qualifications</TableCell>
            <TableCell align="right">Profession&nbsp;</TableCell>
            {/* this two rows are missing in reponse - change it for dates */}
            <TableCell align="right">Status&nbsp;</TableCell>

            {/* Better way to do it? */}
            {(props.showActions=="yes" || props.status=="Scheduled") ? (
              <TableCell align="right">Appointment date and time&nbsp;</TableCell>
            ) : ( 
              <React.Fragment/>
            )}

            {(props.showActions=="yes" || props.status=="Scheduled") ? (
              <TableCell align="right">Appointment duration&nbsp;</TableCell>
            ) : ( 
              <React.Fragment/>
            )}

            {( props.status=="Scheduled") ? (
              <TableCell align="right">Contact details&nbsp;</TableCell>
            ) : ( 
              <React.Fragment/>
            )}

            {(props.showActions=="yes") ? (
              <TableCell align="right">Actions&nbsp;</TableCell>
            ) : ( 
              <React.Fragment/>
            )}  

          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.appointments_id} hover role="checkbox">
              <TableCell component="th" scope="row">
                {row.fullname}
              </TableCell>
              <TableCell align="right">{row.qualifications}</TableCell>
              <TableCell align="right">{row.profession}</TableCell>
              <TableCell align="right">{props.status}</TableCell>

              {/* Better way to do it? */}
              {(props.showActions=="yes" || props.status=="Scheduled") ? (
                <TableCell align="right">{row.appointment_date}</TableCell>
              ) : ( 
                <React.Fragment/>
              )}

              {(props.showActions=="yes" || props.status=="Scheduled") ? (
                <TableCell align="right">{row.appointment_duration}</TableCell>
              ) : ( 
                <React.Fragment/>
              )}

              {(props.status=="Scheduled") ? (
              <TableCell align="right">{row.contact_method}({row.contact_details})&nbsp;</TableCell>
              ) : ( 
                <React.Fragment/>
              )}

              {(props.showActions=="yes") ? (
                <TableCell align="right">
                  <ActionButtons user_id={props.user_id} appointments_id={row.appointments_id} professional_id={row.professional_id} />
                </TableCell>
              ) : ( 
                <React.Fragment/>
              )}

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </React.Fragment>

    )}
    </div>
  )
}


Appointments.defaultProps = {
  showActions: "no",
};

export default Appointments