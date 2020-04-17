import React from 'react';
import Grid from '@material-ui/core/Grid';

import bg_image from './bg1.jpeg';
import ana from './ana.png';
import jack from './jack.png';
import Bookmarks from './Bookmarks';
import Appointments from './Appointments'
import SearchForm from './SearchForm'
// {user: "Kate", user_id: 3, professional: false, fullname: "Kate"}

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

class Home extends React.Component {

  constructor(props) {
      console.log("HOME user: ", props)
      super(props);
      // this.state = {isLoggedIn: false};
      this.user_id = this.props.user_id;
      this.professional = this.props.professional;
      this.bookmarks = [{fullname:"ddd", qualifications:"ddd", profession:'fdfd', specialties:'fdfdf', languages:'fff'},{ 
                        fullname:"jhjghj", qualifications:"jhh", profession:"ukyjy", specialties:'dfdf', languages:"fsfd"}]
    }

  render() {
    let bookmarks;
    let requested_appointents;
    let requested_appointments_url;
    let rejected_appointments_url;
    let rejected_appointents;
    let to_confirm_appointments_url;
    let to_confirm_appointments;
    let scheduled_appointments_url;
    let scheduled_appointents;

    if(!this.professional){
      bookmarks = <Bookmarks user_id = {this.user_id} />

      requested_appointments_url = `http://127.0.0.1:5000/appointments/list-requested/${this.user_id}`
      requested_appointents = <Appointments user_id = {this.user_id} url = {requested_appointments_url} status="Waiting for answer"/>

      rejected_appointments_url = `http://127.0.0.1:5000/appointments/list-requested-declined/${this.user_id}`
      rejected_appointents = <Appointments user_id = {this.user_id} url = {requested_appointments_url} status="Declined"/>

      to_confirm_appointments_url = `http://127.0.0.1:5000/appointments/list-requested-to-confirm/${this.user_id}`
      to_confirm_appointments = <Appointments user_id = {this.user_id} url = {to_confirm_appointments_url} status="To confirm" showActions="yes"/>

      scheduled_appointments_url = `http://localhost:5000/appointments/list-requested-scheduled/${this.user_id}`
      scheduled_appointents = <Appointments user_id = {this.user_id} url = {scheduled_appointments_url} status="Scheduled"/>
    }

    return (
      <React.Fragment>
        <Welcome professional={this.props.professional} fullname={this.props.fullname} qualifications={this.props.qualifications} />
        
        <p>
        <SearchForm user_id = {this.user_id}/>
        </p>
        
        
        {bookmarks}
        <p>Requested appointments</p>
        {requested_appointents}
        <p>Rejected</p>
        {rejected_appointents}
        <p>To confirm</p>
        {/* TODO the list shows already confirmed appointments */}
        {to_confirm_appointments}
        <p>Scheduled</p>
        {scheduled_appointents}

      </React.Fragment>
    );
  }
}

export default Home
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/blog/Blog.js