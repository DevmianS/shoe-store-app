import {Box, IconButton, Paper, Rating, Stack, Typography} from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';
import {useCallback, useEffect, useRef, useState} from 'react';
import {reviews} from '@/components/UI/ReviewsCarousel/utils';

export default function ReviewsCarousel() {
  const timerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstIndex = currentIndex === 0;
    const newIndex = isFirstIndex ? reviews.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };

  const goToNext = useCallback(() => {
    const isLastIndex = currentIndex === reviews.length - 1;
    const newIndex = isLastIndex ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex]);

  useEffect(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      goToNext();
    }, 20000);

    return () => clearTimeout(timerRef.current);
  }, [goToNext]);

  return (
    <>
      <Paper
        elevation={1}
        sx={{
          background:
            'radial-gradient(55.99% 112.1% at 69.71% 44.01%, rgba(253, 253, 253, 0.074) 0%, rgba(0, 0, 0, 0) 100%),radial-gradient(64.9% 185.04% at 19.81% 27.89%, rgba(255, 255, 255, 0.42) 0%, rgba(255, 255, 255, 0.06) 100%)',
          backdropFilter: 'blur(12px)',
          border: '2px solid rgba(255, 255, 255, 0.64)',
          borderRadius: 8,
          maxWidth: 756,
          maxHeight: 317,
          p: '2%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Box sx={{width: '100%', lineHeight: '135.3%'}}>
          <Typography component="span">
            <Box sx={{float: 'right'}}>
              <IconButton
                sx={{
                  width: 38,
                  height: 38,
                  border: '1px solid #FFFFFF',
                  borderRadius: 32,
                  m: 1,
                }}
                onClick={goToPrevious}
              >
                <KeyboardArrowLeft />
              </IconButton>
              <IconButton
                sx={{
                  width: 38,
                  height: 38,
                  border: '1px solid #FFFFFF',
                  borderRadius: 32,
                  m: 1,
                }}
                onClick={goToNext}
              >
                <KeyboardArrowRight />
              </IconButton>
            </Box>
            {reviews[currentIndex].comment}
          </Typography>
        </Box>
        <Box sx={{mt: 2}}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start',
              alignItems: 'end',
              minWidth: '50%',
              columnGap: 3,
            }}
          >
            <Typography
              component="span"
              variant="body4"
              sx={{
                fontWeight: 700,
              }}
            >
              {reviews[currentIndex].user}
            </Typography>
            <Rating
              precision={0.5}
              value={reviews[currentIndex].rating}
              readOnly
              sx={{
                color: '#FE645E',
                columnGap: 2,
              }}
            />
          </Box>
          <Typography component="p" variant="body2" sx={{color: '#797979'}}>
            {reviews[currentIndex].location}
          </Typography>
        </Box>
      </Paper>
    </>
  );
}