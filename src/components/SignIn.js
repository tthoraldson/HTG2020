import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import Switch from '@material-ui/core/Switch';
import Modal from '@material-ui/core/Modal';

import { useHistory, useLocation } from "react-router-dom";

import Session from './Session'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  modal: {
    display: 'flex',
    padding: theme.spacing(1),
    alignItems: 'center',
    justifyContent: 'center',
  },
}));

export default function SignIn() {
  
  const classes = useStyles();

  const [state, setState] = React.useState({
    professional: false,
  });

  const handleChange = (event) => {
    if (event.target.name === "professional"){
      setState({ ...state, [event.target.name]: event.target.checked });
    }
    else {
      setState({ ...state, [event.target.name]: event.target.value });
    }
  };

  const [user, setUser] = React.useState({})

  const getUser = (state) =>  {
    let user;
    if(state.user || state.password){
      if (state.professional == true) {
        user = Session.professionals[state.user]
      }
      else {
        user= Session.users[state.user]
      }
    }
    return user;
  }

  let history = useHistory();
  let location = useLocation();
  const handleSubmit = event => {
    event.preventDefault();
    
    let user = getUser(state)
    if (user == undefined){
      openModalWithErrorMsg()
      return;
    }
    let { from } = location.state || { from: { pathname: "/" } };
    history.replace("/home", user);
  };

  // modal
  const [open, setOpen] = React.useState(false);

  const openModalWithErrorMsg = () => {
    setOpen(true);
  };

  const closeModal = () => {
    setOpen(false);
  };



  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate > 
          <FormControlLabel
              control={<Switch checked={state.professional} onChange={handleChange} name="professional" color="primary"/>}
              label="Professional"
          />


          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="user"
            label="User name"
            name="user"
            autoComplete="email"
            autoFocus
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleChange}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />

          <Modal
            open={open}
            onClose={closeModal}
            disablePortal
            disableEnforceFocus
            disableAutoFocus
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
          >
            <h1>Wrong user or password</h1>
          </Modal>


          <Button
            //type="submit"
            fullWidth
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            className={classes.submit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}

// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sign-in/SignIn.js