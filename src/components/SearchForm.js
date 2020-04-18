import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';

import IconButton from '@material-ui/core/IconButton';
import SearchIcon from '@material-ui/icons/Search';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import{ useState, useEffect } from 'react';

import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';

import Profile from "./Profile";


const useStyles = makeStyles((theme) => ({
  root: {
    padding: '2px 4px',
    marginBottom: '10px',
    display: 'flex',
    alignItems: 'center',
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  divider: {
    height: 28,
    margin: 4,
  },
  table: {
    minWidth: 650,
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

const BookmarkButton = (props) => {
    // fire and forget
    const putBookmark = async (user_id, professional_id) => {
      let url = `http://127.0.0.1:5000/consumer/${props.user_id}/bookmark/${props.professional_id}`
      await fetch(url, {
        method: 'PUT'
      })
    };

  const [bookmark_disabled, setDisabled] = useState(undefined)
  const addToBookmarks = (event, professional_id) => {
    event.stopPropagation()
    putBookmark(props.user_id, professional_id)
    setDisabled(true)
  }

  return(
    <IconButton color="primary" z-index="9999" disabled={bookmark_disabled} aria-label="bookmark" onClick={(e) => addToBookmarks(e, props.professional_id)}>  
      <BookmarkBorderIcon />
    </IconButton>
  );
}


const SearchForm = (props) => {

  const classes = useStyles();

  const [formString, setString] = useState(undefined)
  const [data, setSearchResult] = useState([]);

  const fetchResults = async (string) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

    let urlencoded = new URLSearchParams();
    urlencoded.append("s", string);

    let requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: urlencoded,
      redirect: 'follow'
    };

    const response = await fetch("http://127.0.0.1:5000/professional/search", requestOptions)
    let data = []
    
    if(response.status == 200){
      data = await response.json();
    }
    return data;
  }
  
  const handleChange = (event) => {
    setString(event.target.value);
  };

  // handlers can be async!
  const handleSubmit = async() => {
    let data = await fetchResults(formString)
    setSearchResult(data);
  };

  // modal with profile
  const [open, setOpen] = React.useState(false);
  const [row_id, setRowID] = React.useState(0);

  const handleClose = () => {
    setOpen(false);
  };

  const showProfile = (id) => {
    setOpen(true);
    setRowID(id)
  }

  return (
    <React.Fragment>
      {/* modal showin professional profile */}
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


      {/* search form  */}
      <Paper component="form" className={classes.root}>
        <InputBase
          className={classes.input}
          placeholder="Search for professional"
          inputProps={{ 'aria-label': 'search for professional' }}
          value={formString}
          onChange={handleChange}
        />
        <IconButton className={classes.iconButton} aria-label="search" onClick={handleSubmit}>
          <SearchIcon />
        </IconButton>
      </Paper>

      {/* search results */}
      <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Fullname</TableCell>
            <TableCell align="right">Qualifications</TableCell>
            <TableCell align="right">Profession&nbsp;</TableCell>
            <TableCell align="right">Specialties&nbsp;</TableCell>
            <TableCell align="right">Languages&nbsp;</TableCell>
            <TableCell align="right">Bookmark it&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.professional_id} hover role="checkbox" onClick={() => showProfile(row.professional_id)}>
              <TableCell component="th" scope="row">
                {row.fullname}
              </TableCell>
              <TableCell align="right">{row.qualifications}</TableCell>
              <TableCell align="right">{row.profession}</TableCell>
              <TableCell align="right">{row.specialties}</TableCell>
              <TableCell align="right">{row.languages}</TableCell>
              <TableCell align="right">
                <BookmarkButton professional_id={row.professional_id} user_id={props.user_id} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

    </React.Fragment>
  );
}

export default SearchForm