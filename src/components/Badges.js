import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import{ useState, useEffect } from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import LoyaltyIcon from '@material-ui/icons/Loyalty';

import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

const useFetch = url => {

  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchBadges = async () => {
    const response = await fetch(url);
    
    let data = {}
    if(response.status == 200){
      data = await response.json();
    }

    setData(data.badges);
    setLoading(false);
  };

  useEffect(() => {
    fetchBadges();
  }, []);

  return { data, loading };
};


const Badge = (props) => {
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          <LoyaltyIcon /> Badge 
        </Typography>
        <Typography variant="h5" component="h2">
          {props.badge_name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.badge_description}
        </Typography>
        <Typography variant="body2" component="p">
          Thank you for your kindness. 
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}


const Badges = (props) => {

  const url = `http://127.0.0.1:5000/professional/${props.user_id}`
  const classes = useStyles()
  const { data, loading } = useFetch(url);
  
  return (
    <React.Fragment>

      <Grid container spacing={1} xs={12}>
        
        {data.map((row) => (
          
          <Grid item xs={3}>
            <Badge badge_name={row.badge_name} badge_description={row.badge_description} />
          </Grid> 

        ))}
      
      </Grid>

    </React.Fragment>
    
  );
}

export default Badges