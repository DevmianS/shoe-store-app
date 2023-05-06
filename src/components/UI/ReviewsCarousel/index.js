import {Box, Button, Grid, Paper, Rating, Typography} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {useState} from 'react';

const reviews = [
  {
    comment:
      'Lorem Ipsum is a really great company because the team is passionate about the projects they produce, the people they work with, the quality of the work they do.',
    user: 'John Stone',
    rating: 4.5,
    location: 'Ukraine, Chernivtsi',
  },
  {
    comment:
      'ValRun is a really great company because the team is passionate about the projects they produce, the people they work with, the quality of the work they do.',
    user: 'John Stone',
    rating: 5,
    location: 'Ukraine, Chernivtsi',
  },
];

export default function ReviewsCarousel() {
  const [currentReview, setCurrentReview] = useState(reviews[0]);

  return (
    <>
      <Paper elevation={1} sx={{backgroundColor: 'rgb(207, 216, 220, 0.6)'}}>
        <Grid
          container
          sx={{
            maxWidth: 756,
          }}
        >
          <Grid item xs={9}>
            <Box>
              <Typography component="p" variant="body1">
                {currentReview.comment}
              </Typography>
              <Typography component="span">{currentReview.user}</Typography>
              <Rating precision={0.5} readOnly value={currentReview.rating} />
              <Typography component="p" variant="body3">
                {currentReview.location}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={3}>
            <Box>
              <Button>
                <KeyboardArrowLeft />
              </Button>
              <Button>
                <KeyboardArrowRight />
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
