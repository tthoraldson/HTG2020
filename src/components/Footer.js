import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';

import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import FavoriteIcon from '@material-ui/icons/Favorite';


function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Made with '}
      <FavoriteIcon width="20px" height="20px"/>
      {' at '}
      <Link color="inherit" href="https://www.hackthegap.com/">
        Hack The Gap
      </Link>{' '}
      {'2020'}
      {'.'}
    </Typography>
  );
}

// could this be passed as a props?
const useStyles = makeStyles((theme) => ({
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  },
}));


export default function Footer(props) {
  const classes = useStyles();
  const { title, social } = props;

  return (
    <footer className={classes.footer}>
      <Container maxWidth="lg">
        <Typography variant="h6" align="center" gutterBottom>
          {title}
        </Typography>
        <Copyright />
      </Container>
    </footer>
  );
}

Footer.defaultProps = {
  social: [
    { name: 'GitHub', icon: GitHubIcon, href: 'http://github.com/tthoraldson/HTG2020'},
    //{ name: 'Twitter', icon: TwitterIcon },
    //{ name: 'Facebook', icon: FacebookIcon },
  ],
  title: "Hand in Hand",
};

Footer.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  social: PropTypes.array,
};