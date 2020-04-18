import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LoyaltyIcon from '@material-ui/icons/Loyalty';
import{ useState, useEffect } from 'react';
import Chip from '@material-ui/core/Chip';

const useStyles = makeStyles({
  root: {
    maxWidth: 650,
  },
  media: {
    height: 140,
  },
});

const useFetch = url => {

  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [badges, setBadges] = useState([]);

  const fetchProfile = async () => {
    console.log("fetchProfile")

    const response = await fetch(url);
    
    console.log(response)
    let data = {}
    if(response.status == 200){
      data = await response.json();
    }

    setBadges(data.badges)
    setData(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchProfile();
  }, {});

  return { data, badges, loading};
};

// fire and forget
const requestAppointment = async url => {
  await fetch(url, {
    method: 'PUT'
  })
};

const Profile = (props) => {

  const professional_id = props.professional_id
  const consumer_id = props.consumer_id

  console.log("CONSUMER_ID: ", consumer_id)

  const url = `http://localhost:5000/professional/${props.professional_id}`
  const classes = useStyles()
  const { data, badges, loading } = useFetch(url);

  const appointment_url = `http://localhost:5000/appointments/request-availability/${professional_id}/${consumer_id}`

  // appointment button
  const [disabled, setDisabled] = React.useState(false);

  const handleClick = () => {
    requestAppointment(appointment_url)
    setDisabled(true)
  }

  return (
    <Card className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image="/static/images/cards/contemplative-reptile.jpg"
          title={data.fullname}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {data.fullname}, {data.qualifications}
          </Typography>
          <Typography gutterBottom variant="subtitle1" component="h2">
            {data.profession}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="h2">
           Specialties: {data.specialties}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {data.details}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="h2">
            Languages: {data.languages}
          </Typography>
          <Typography gutterBottom variant="subtitle2" component="h2">
          <div> 

          {badges.map((row) => (
            <Chip icon={<LoyaltyIcon />} label={row.badge_name}/>
          ))}
          </div>
          
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary" disabled={disabled} onClick={() => handleClick()} >
          Ask for appointment
        </Button>
      </CardActions>
    </Card>
  );
}

export default Profile