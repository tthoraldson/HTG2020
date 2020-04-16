import React from 'react';
import Grid from '@material-ui/core/Grid';

import bg_image from './bg1.jpeg';
import ana from './ana.png';
import jack from './jack.png';
import Bookmarks from './Bookmarks';

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
    if(!this.professional){
      bookmarks = <Bookmarks user_id = {this.user_id} />
    }

    return (
      <React.Fragment>
        <Welcome professional={this.props.professional} fullname={this.props.fullname} qualifications={this.props.qualifications} />
        {bookmarks}
      </React.Fragment>
    );
  }
}

export default Home
// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/blog/Blog.js