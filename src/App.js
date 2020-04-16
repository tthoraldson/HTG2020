import React from 'react';

import Button from '@material-ui/core/Button';
import { createMuiTheme , makeStyles, MuiThemeProvider} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';

import Header from './Header';

import Link from '@material-ui/core/Link';

import logo from './logo.svg';
import './App.css';

// green-ish theme
const gtheme = createMuiTheme({
  palette: {
    primary: {
      light: '#85bc5c',
      main: '#558c2f',
      dark: '#255e00',
      contrastText: '#000',
    },
    secondary: {
      light: '#ffffff',
      main: '#f1f8e9',
      dark: '#bec5b7',
      contrastText: '#000',
    },
  },
});

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginTop: theme.spacing(8),
    marginBottom: theme.spacing(2),
    backgroundColor: theme.palette.grey[800]
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    // backgroundColor:
    //   theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));


const App = () => {
  const classes = useStyles(gtheme);

  return(
    
    <div className={classes.root}>
      <MuiThemeProvider theme={gtheme}>
      <Header title="Blog" sections={sections} />
      <Container component="main" className={classes.main} maxWidth="lg">
      HELLO WORLD
      </Container>

      <Copyright />
      </MuiThemeProvider>
    
    </div>


    
     
    
  );
}


const Copyright = () => {
  return (
    <Typography variant="body2" color="textSecondary">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// const App = () => {
//   const classes = useStyles(gtheme);

//   return (
//     <div className={classes.root}>
      
//       <CssBaseline />
//       <Container component="main" className={classes.main} maxWidth="sm">
//         <Typography variant="h2" component="h1" gutterBottom>
//           Sticky footer
//         </Typography>
//         <Typography variant="h5" component="h2" gutterBottom>
//           {'Pin a footer to the bottom of the viewport.'}
//           {'The footer will move as the main element of the page grows.'}
//         </Typography>
//         <Typography variant="body1">Sticky footer placeholder.</Typography>
//       </Container>
//       <footer className={classes.footer}>
//         <Container maxWidth="sm">
//           <Typography variant="body1">My sticky footer can be found here.</Typography>
//           <Copyright />
//         </Container>
//       </footer>
//     </div>
//   );
// }

const Hello = (props) => {
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
    </div>
  )
}


// const App = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>

//         <Hello name="Kasia" age={26 + 10} />

//         <Button variant="contained" color="primary">
//             Hello World
//         </Button>

//         <StickyFooter />

//       </header>
//     </div>
//   );
// }




export default App


// some code shamelessly stolen from:
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/sticky-footer/StickyFooter.js