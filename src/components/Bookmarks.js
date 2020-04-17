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

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Profile from "./Profile";

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

  const fetchBookmarks = async () => {
    const response = await fetch(url);
    
    let data = []
    if(response.status == 200){
      data = await response.json();
    }
    
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchBookmarks();
  }, []);

  return { data, loading };
};

const Bookmarks = (props) => {
  
  const url = `http://127.0.0.1:5000/consumer/${props.user_id}/bookmarks`
  const classes = useStyles()
  const { data, loading } = useFetch(url);
   
  // modal
  const [open, setOpen] = React.useState(false);
  const [row_id, setRowID] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (id) => {
    console.log(id)
    setOpen(true);
    setRowID(id)
  }


  return (

    <div className="App">
    {loading ? (
      <div>Loading...</div>
    ) : (
  
    <React.Fragment>

    <Modal
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
      <Profile professional_id={row_id} consumer_id={props.user_id} />
    </Fade>
    </Modal>

    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Fullname</TableCell>
            <TableCell align="right">Qualifications</TableCell>
            <TableCell align="right">Profession&nbsp;</TableCell>
            <TableCell align="right">Specialties&nbsp;</TableCell>
            <TableCell align="right">Languages&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} hover role="checkbox" onClick={() => handleClick(row.id)} >
              <TableCell component="th" scope="row">
                {row.fullname}
              </TableCell>
              <TableCell align="right">{row.qualifications}</TableCell>
              <TableCell align="right">{row.profession}</TableCell>
              <TableCell align="right">{row.specialties}</TableCell>
              <TableCell align="right">{row.languages}</TableCell>
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



// }

// Header.propTypes = {
//   sections: PropTypes.array,
//   title: PropTypes.string,
// };

export default Bookmarks