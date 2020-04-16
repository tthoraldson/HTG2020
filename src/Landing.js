import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import Header from './Header';
import MainLandingElement from './MainLandingElement'
import Featured from './Featured';
import Footer from './Footer';


import bg_image from './bg1.jpeg';
import ana from './ana.png';
import jack from './jack.png';

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    marginTop: theme.spacing(3),
  },
}));

const mainLandingElementContent = {
  title: 'Connecting people in difficult times',
  description:
    "Multiple lines of text that form the lede, informing new readers quickly and efficiently about what's most interesting in this post's contents.",
  image: bg_image,
  imgText: 'Hand in Hand',
  linkText: 'Continue reading…',
};

const featured = [
  {
    title: 'Joana Silva, MD',
    date: 'April 19',
    description:
      "I received my Master of Arts degree in Clinical Psychology from Antioch University. My therapy approach integrates, Person-Centered, Strength Based, Cognitive Behavioral Therapy, Guided Imagery, Relaxation and Hypnotherapy.",
    image: ana,
    imageText: 'Joana',
  },
  {
    title: 'Jack',
    date: 'April 28',
    description:
      "I feel very lonely. I was worried that my depression may return but could not afford therapy. Thankfully I found somebody who helped me. I asked for availability and returned the confirmation in no time. With professional support, I'm ready to face difficult times.",
    image: jack,
    imageText: 'Jack',
  },
];

const social_icons = [
    { name: 'GitHub', icon: GitHubIcon },
    { name: 'Twitter', icon: TwitterIcon },
    { name: 'Facebook', icon: FacebookIcon },
  ]


export default function Landing() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <Header page_title="Hand in Hand" />
        <main>
          <MainLandingElement post={mainLandingElementContent} />
          
          <Grid container spacing={4}>

            {featured.map((post) => (
              <Featured key={post.title} post={post} />
            ))}

          </Grid>
        </main>
      </Container>
      <Footer title="HTG2020" description="Something here to give the footer a purpose!"  social={social_icons} />
    </React.Fragment>
  );
}

// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/blog/Blog.js