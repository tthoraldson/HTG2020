import React from 'react';
import Grid from '@material-ui/core/Grid';
import MainLandingElement from './MainLandingElement'
import Featured from './Featured';

import bg_image from './bg1.jpeg';
import ana from './ana.png';
import jack from './jack.png';

const mainLandingElementContent = {
  title: 'Connecting people in difficult times.',
  description:
    "The network of people looking for psychological support and professionals who could offer their help to those in need.",
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
      "I feel very lonely. I was worried that my depression may return but could not afford therapy. Thankfully I found somebody who helped me. I asked for availability and received the confirmation in no time. With professional support, I'm ready to face difficult times.",
    image: jack,
    imageText: 'Jack',
  },
];

// todo ES6 style

export default function Landing() {

  return (
    <React.Fragment>
      <MainLandingElement post={mainLandingElementContent} />

          <Grid container spacing={4}>

            {featured.map((post) => (
              <Featured key={post.title} post={post} />
            ))}

          </Grid>

      
    </React.Fragment>
  );
}

// https://github.com/mui-org/material-ui/blob/master/docs/src/pages/getting-started/templates/blog/Blog.js