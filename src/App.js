import React from 'react';
import {Switch, Route} from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Landing from './components/Landing';
import Footer from './components/Footer';

import { makeStyles } from '@material-ui/core/styles';
import Header from './components/Header';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
  toolbar: {
    borderBottom: `6px solid ${theme.palette.divider}`,
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


const SignIn = () => {
  return (
    <div>
      <h2>SignIn FORM</h2>
    </div>
  );
}

const App = () => {
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
      </Switch>
      
      </main>
    
    </Container>
    
    <Footer />

    </div>
  );
}

export default App