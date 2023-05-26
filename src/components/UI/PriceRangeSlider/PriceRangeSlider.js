import {Slider, Input, Box} from '@mui/material';

import {useFilter} from '@/context/FilterContext';

import {useState, useEffect} from 'react';

const PriceRangeSlider = () => {
  const {arrIdFilters, setArrIdFilters} = useFilter();

  const {minPrice: min, maxPrice: max} = arrIdFilters;

  useEffect(() => {
    console.log('set initial min max price');
    if (min && min > 0) {
      setMinPrice(Number(min));
    }
    if (max && max > 1) {
      setMaxPrice(Number(max));
    }
  }, [min, max]);

  const [minPrice, setMinPrice] = useState(1);
  const [maxPrice, setMaxPrice] = useState(10000);

  const transmitPrice = () => {
    console.log('Transmitprice');
    setArrIdFilters(prevState => {
      return {
        ...prevState,
        minPrice: minPrice,
        maxPrice: maxPrice,
      };
    });
  };

  const handleMinPriceChange = event => {
    setMinPrice(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleMaxPriceChange = event => {
    setMaxPrice(event.target.value === '' ? '' : Number(event.target.value));
  };

  const handleSliderChange = (event, newValue) => {
    setMinPrice(newValue[0]);
    setMaxPrice(newValue[1]);
  };

  return (
    <Box sx={{width: '90%'}}>
      <Slider
        min={1}
        max={10000}
        value={[minPrice, maxPrice]}
        onChange={handleSliderChange}
        valueLabelDisplay="auto"
        sx={{width: '100%'}}
        onChangeCommitted={transmitPrice}
      />
      <Box
        sx={{display: 'flex', justifyContent: 'space-around', width: '100%'}}
      >
        <Input
          value={minPrice}
          onChange={handleMinPriceChange}
          inputProps={{
            step: 1,
            min: 0,
            max: 100,
            type: 'number',
          }}
          sx={{width: '45%'}}
          onBlur={transmitPrice}
        />
        <Input
          sx={{width: '45%'}}
          value={maxPrice}
          onChange={handleMaxPriceChange}
          inputProps={{
            step: 1,
            min: 0,
            max: 100,
            type: 'number',
          }}
          onBlur={transmitPrice}
        />
      </Box>
    </Box>
  );
};
export default PriceRangeSlider;
