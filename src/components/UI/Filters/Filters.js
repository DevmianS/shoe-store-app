import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Stack,
  FormControlLabel,
  Checkbox,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import {useFilter} from '@/context/FilterContext';

import PriceRangeSlider from '@/components/UI/PriceRangeSlider';
import {useState} from 'react';

export default function Filters({total, maxPriceCalculated}) {
  const theme = useTheme();
  const styles = {
    wrapper: {
      display: 'flex',
      flexDirection: 'col',
      width: 320,
      paddingLeft: '40px',
      alignItems: 'flex-start',
      gap: 1,
      marginBottom: '7px',
      borderBottom: '1px solid',
      borderColor: theme.palette.divider,
    },
    accordion: {
      width: '100%',
      overflow: 'hidden',
    },
    accordionDetails: {
      padding: 0,
      display: 'flex',
      flexDirection: 'column',
      fontSize: 16,
      fontWeight: 400,
      paddingBottom: '32px',
    },
    accordionDetailsAlt: {
      display: 'flex',
      width: '100%',
      fontSize: 16,
      fontWeight: 400,
      paddingBottom: '32px',
      flexDirection: 'row',
      gap: 1,
      alignItems: 'center',
      /*       background: 'red',
       */ padding: '15px',
    },
    accordionSummary: {padding: 0},
    accordionTitle: {fontWeight: 500},
    accordionSubTitle: {fontSize: 25},
  };

  const [expandBrand, setExpandBrand] = useState(false);
  const [expandColor, setExpandColor] = useState(false);
  const [expandSize, setExpandSize] = useState(false);
  const [expandCategory, setExpandCategory] = useState(false);

  const {arrIdFilters, setArrIdFilters} = useFilter();

  const checkBoxChangeCategoryHandler = event => {
    console.log('event: ', event, event.target.value);
    let newArr = arrIdFilters.categories.map(category => {
      if (category.id == event.target.value) {
        return {
          ...category,
          needed: !category.needed,
        };
      }
      return category;
    });
    setArrIdFilters(prevState => {
      return {
        ...prevState,
        categories: newArr,
      };
    });
  };

  const checkBoxChangeSizeHandler = event => {
    console.log('event: ', event, event.target.value);
    let newArr = arrIdFilters.sizes.map(size => {
      if (size.id == event.target.value) {
        return {
          ...size,
          needed: !size.needed,
        };
      }
      return size;
    });
    setArrIdFilters(prevState => {
      return {
        ...prevState,
        sizes: newArr,
      };
    });
  };
  const checkBoxChangeGenderHandler = event => {
    console.log('event: ', event, event.target.value);
    let newArr = arrIdFilters.genders.map(gender => {
      if (gender.id == event.target.value) {
        return {
          ...gender,
          needed: !gender.needed,
        };
      }
      return gender;
    });
    setArrIdFilters(prevState => {
      return {
        ...prevState,
        genders: newArr,
      };
    });
  };

  const checkBoxChangeBrandHandler = event => {
    console.log('event: ', event, event.target.value);
    let newArr = arrIdFilters.brands.map(brand => {
      if (brand.id == event.target.value) {
        return {
          ...brand,
          needed: !brand.needed,
        };
      }
      return brand;
    });
    setArrIdFilters(prevState => {
      return {
        ...prevState,
        brands: newArr,
      };
    });
  };

  const checkBoxChangeColorHandler = event => {
    console.log('event: ', event, event.target.value);
    let newArr = arrIdFilters.colors.map(color => {
      if (color.id == event.target.value) {
        return {
          ...color,
          needed: !color.needed,
        };
      }
      return color;
    });
    setArrIdFilters(prevState => {
      return {
        ...prevState,
        colors: newArr,
      };
    });
  };

  console.log('arrIdFilters.name: ', arrIdFilters.name, total);

  return (
    <>
      <Stack sx={styles.wrapper}>
        <Typography variant="body5" component="p"></Typography>
        <Typography variant="h2" sx={styles.accordionSubTitle} component="h2">
          {arrIdFilters.name[0] || 'All products'}
          {' (' + (total || 0) + ') '}
        </Typography>
        <Accordion sx={styles.accordion} elevation={0} defaultExpanded>
          <AccordionSummary
            sx={styles.accordionSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="body1" sx={styles.accordionTitle}>
              Gender
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={styles.accordionDetails}>
            {arrIdFilters.genders &&
              arrIdFilters.genders.map(gender => {
                return (
                  <FormControlLabel
                    key={gender.name}
                    control={
                      <Checkbox
                        size="small"
                        value={gender.id}
                        checked={gender.needed}
                        onChange={checkBoxChangeGenderHandler}
                      />
                    }
                    label={gender.name}
                  />
                );
              })}
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Stack sx={styles.wrapper}>
        <Accordion sx={styles.accordion} elevation={0} defaultExpanded>
          <AccordionSummary
            sx={styles.accordionSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="body1" sx={styles.accordionTitle}>
              Brand
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={styles.accordionDetails}>
            {arrIdFilters.brands &&
              arrIdFilters.brands.slice(0, 3).map(brand => {
                return (
                  <FormControlLabel
                    key={brand.id}
                    control={
                      <Checkbox
                        size="small"
                        value={brand.id}
                        checked={brand.needed}
                        onChange={checkBoxChangeBrandHandler}
                      />
                    }
                    label={brand.name}
                  />
                );
              })}
            {expandBrand &&
              arrIdFilters.brands &&
              arrIdFilters.brands.slice(3).map(brand => {
                return (
                  <FormControlLabel
                    key={brand.id}
                    control={
                      <Checkbox
                        size="small"
                        value={brand.id}
                        checked={brand.needed}
                        onChange={checkBoxChangeBrandHandler}
                      />
                    }
                    label={brand.name}
                  />
                );
              })}
            <Accordion
              sx={styles.accordion}
              elevation={0}
              onClick={() => setExpandBrand(!expandBrand)}
            >
              <AccordionSummary
                sx={styles.accordionSummary}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="body1" sx={styles.accordionTitle}>
                  {expandBrand ? 'Show Less brands' : 'Show More Brands'}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={styles.accordionDetails}></AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Stack sx={styles.wrapper}>
        <Accordion sx={styles.accordion} elevation={0} defaultExpanded>
          <AccordionSummary
            sx={styles.accordionSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="body1" sx={styles.accordionTitle}>
              Price
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={styles.accordionDetailsAlt}>
            <PriceRangeSlider maxPriceCalculated={maxPriceCalculated} />
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Stack sx={styles.wrapper}>
        <Accordion sx={styles.accordion} elevation={0}>
          <AccordionSummary
            sx={styles.accordionSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="body1" sx={styles.accordionTitle}>
              Size
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={styles.accordionDetails}>
            {arrIdFilters.sizes &&
              arrIdFilters.sizes
                .slice(0, 3)
                .map(size => (
                  <FormControlLabel
                    key={size.id}
                    control={
                      <Checkbox
                        size="small"
                        value={size.id}
                        checked={size.needed}
                        onChange={checkBoxChangeSizeHandler}
                      />
                    }
                    label={size.value}
                  />
                ))}
            {expandSize &&
              arrIdFilters.sizes &&
              arrIdFilters.sizes
                .slice(3)
                .map(size => (
                  <FormControlLabel
                    key={size.id}
                    control={
                      <Checkbox
                        size="small"
                        value={size.id}
                        checked={size.needed}
                        onChange={checkBoxChangeSizeHandler}
                      />
                    }
                    label={size.value}
                  />
                ))}
            <Accordion
              sx={styles.accordion}
              elevation={0}
              onClick={() => setExpandSize(!expandSize)}
            >
              <AccordionSummary
                sx={styles.accordionSummary}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="body1" sx={styles.accordionTitle}>
                  {expandSize ? 'Show Less Sizes' : 'Show More Sizes'}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={styles.accordionDetails}></AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Stack sx={styles.wrapper}>
        <Accordion sx={styles.accordion} elevation={0}>
          <AccordionSummary
            sx={styles.accordionSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="body1" sx={styles.accordionTitle}>
              Categories
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={styles.accordionDetails}>
            {arrIdFilters.categories &&
              arrIdFilters.categories
                .slice(0, 3)
                .map(category => (
                  <FormControlLabel
                    key={category.id}
                    control={
                      <Checkbox
                        size="small"
                        value={category.id}
                        checked={category.needed}
                        onChange={checkBoxChangeCategoryHandler}
                      />
                    }
                    label={category.name}
                  />
                ))}
            {expandCategory &&
              arrIdFilters.categories &&
              arrIdFilters.categories
                .slice(3)
                .map(category => (
                  <FormControlLabel
                    key={category.id}
                    control={
                      <Checkbox
                        size="small"
                        value={category.id}
                        checked={category.needed}
                        onChange={checkBoxChangeCategoryHandler}
                      />
                    }
                    label={category.name}
                  />
                ))}
            <Accordion
              sx={styles.accordion}
              elevation={0}
              onClick={() => setExpandCategory(!expandCategory)}
            >
              <AccordionSummary
                sx={styles.accordionSummary}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="body1" sx={styles.accordionTitle}>
                  {expandCategory
                    ? 'Show Less Categories'
                    : 'Show More Categories'}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={styles.accordionDetails}></AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
      </Stack>
      <Stack sx={styles.wrapper}>
        <Accordion sx={styles.accordion} elevation={0}>
          <AccordionSummary
            sx={styles.accordionSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="body1" sx={styles.accordionTitle}>
              Color
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={styles.accordionDetails}>
            {arrIdFilters.colors &&
              arrIdFilters.colors
                .slice(0, 3)
                .map(color => (
                  <FormControlLabel
                    key={color.id}
                    control={
                      <Checkbox
                        size="small"
                        value={color.id}
                        checked={color.needed}
                        onChange={checkBoxChangeColorHandler}
                      />
                    }
                    label={color.name}
                  />
                ))}
            {expandColor &&
              arrIdFilters.colors &&
              arrIdFilters.colors
                .slice(3)
                .map(color => (
                  <FormControlLabel
                    key={color.id}
                    control={
                      <Checkbox
                        size="small"
                        value={color.id}
                        checked={color.needed}
                        onChange={checkBoxChangeColorHandler}
                      />
                    }
                    label={color.name}
                  />
                ))}
            <Accordion
              sx={styles.accordion}
              elevation={0}
              onClick={() => setExpandColor(!expandColor)}
            >
              <AccordionSummary
                sx={styles.accordionSummary}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="body1" sx={styles.accordionTitle}>
                  {expandColor ? 'Show Less Colors' : 'Show More Colors'}
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={styles.accordionDetails}></AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </>
  );
}
