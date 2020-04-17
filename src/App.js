import React from 'react';
import {Switch, Route} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';

import Landing from './components/Landing';
import Footer from './components/Footer';
import Header from './components/Header';
import SignIn from './components/SignIn'
import Home from './components/Home'

import { useHistory, useLocation } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  toolbar: {
    borderBottom: `0px`,
  },
  toolbarTitle: {
    flex: 1,
  },
  toolbarSecondary: {
    justifyContent: 'space-between',
    overflowX: 'auto',
  },
  toolbarLink: {
    padding: theme.spacing(1),
    flexShrink: 0,
  },
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
  },
}));


const App = () => {

  let location = useLocation();
  let user = location.state

  console.log("USER: ", user);

  const classes = useStyles();
  return( 
    <div className={classes.root}>
    <CssBaseline />
    
    <Container>
      <Header page_title="Hand in Hand" />

      <main>
      
      <Switch>
        <Route exact path="/" component={Landing}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/home" component={() => <Home{...user} />}/>

      </Switch>
      
      </main>
    
    </Container>
    
    <Footer />

    </div>
  );
}

export default App