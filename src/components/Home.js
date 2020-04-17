import React from 'react';
import Grid from '@material-ui/core/Grid';

import bg_image from './bg1.jpeg';
import ana from './ana.png';
import jack from './jack.png';
import Bookmarks from './Bookmarks';
import Appointments from './Appointments'
import SearchForm from './SearchForm'

import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';


const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    // width: 600,
  },
}));

const Welcome = (props) => {
  if(props.professional){
    return (
      <React.Fragment>
        <h1>Welcome {props.fullname}, {props.qualifications}</h1>
      </React.Fragment> )
  }
  return(
    <React.Fragment>
      <h1>Welcome {props.fullname}, how are you today?</h1>
    </React.Fragment> 
  )
}

const TabPanel = (props) => {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && <Box p={3}>{children}</Box>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}


const Home = (props) => {


  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  // constructor(props) {
  //     console.log("HOME user: ", props)
  //     super(props);
  //     // this.state = {isLoggedIn: false};
  //     this.user_id = this.props.user_id;
  //     this.professional = this.props.professional;
  //     this.bookmarks = [{fullname:"ddd", qualifications:"ddd", profession:'fdfd', specialties:'fdfdf', languages:'fff'},{ 
  //                       fullname:"jhjghj", qualifications:"jhh", profession:"ukyjy", specialties:'dfdf', languages:"fsfd"}]
  //   }

  let bookmarks;
  let requested_appointents;
  let requested_appointments_url;
  let rejected_appointments_url;
  let rejected_appointents;
  let to_confirm_appointments_url;
  let to_confirm_appointments;
  let scheduled_appointments_url;
  let scheduled_appointents;

  bookmarks = <Bookmarks user_id = {props.user_id} />

  requested_appointments_url = `http://127.0.0.1:5000/appointments/list-requested/${props.user_id}`
  requested_appointents = <Appointments user_id = {props.user_id} url = {requested_appointments_url} status="Waiting for answer"/>

  rejected_appointments_url = `http://127.0.0.1:5000/appointments/list-requested-declined/${props.user_id}`
  rejected_appointents = <Appointments user_id = {props.user_id} url = {requested_appointments_url} status="Declined"/>

  to_confirm_appointments_url = `http://127.0.0.1:5000/appointments/list-requested-to-confirm/${props.user_id}`
  to_confirm_appointments = <Appointments user_id = {props.user_id} url = {to_confirm_appointments_url} status="To confirm" showActions="yes"/>

  scheduled_appointments_url = `http://localhost:5000/appointments/list-requested-scheduled/${props.user_id}`
  scheduled_appointents = <Appointments user_id = {props.user_id} url = {scheduled_appointments_url} status="Scheduled"/>

  return (

      <React.Fragment>
        <Welcome professional={props.professional} fullname={props.fullname} qualifications={props.qualifications} />
        

        <div className={classes.root}>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Search" {...a11yProps(0)} />
            <Tab label="Scheduled" {...a11yProps(1)} />
            <Tab label="To confirm" {...a11yProps(2)} />
            <Tab label="Bookmarks" {...a11yProps(2)} />
          </Tabs>
        </AppBar>

        <SwipeableViews
        axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
        index={value}
        onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <SearchForm user_id = {props.user_id}/>
          </TabPanel>
          
          <TabPanel value={value} index={1} dir={theme.direction}>
            {scheduled_appointents}
          </TabPanel>
          
          <TabPanel value={value} index={2} dir={theme.direction}>
            {to_confirm_appointments}
          </TabPanel>
          
          <TabPanel value={value} index={3} dir={theme.direction}>
            {bookmarks}
          </TabPanel>
          
        </SwipeableViews>
    </div>


        


      </React.Fragment>
    );
  
}

export default Home
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/blog/Blog.js