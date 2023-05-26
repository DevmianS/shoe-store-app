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

export default function Filters({total}) {
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
      padding: 0,
      display: 'flex',
      fontSize: 16,
      fontWeight: 400,
      paddingBottom: '32px',
      flexDirection: 'row',
      gap: 1,
      alignItems: 'center',
    },
    accordionSummary: {padding: 0},
    accordionTitle: {fontWeight: 500},
    accordionSubTitle: {fontSize: 25},
  };

  const {arrIdFilters, setArrIdFilters, navigateToSearch} = useFilter();

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
          {' (' + total + ') '}
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
            <Accordion sx={styles.accordion} elevation={0}>
              <AccordionSummary
                sx={styles.accordionSummary}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="body1" sx={styles.accordionTitle}>
                  Show More Brands
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={styles.accordionDetails}>
                {arrIdFilters.brands &&
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
              </AccordionDetails>
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
            <PriceRangeSlider />
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
            <Accordion sx={styles.accordion} elevation={0}>
              <AccordionSummary
                sx={styles.accordionSummary}
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography variant="body1" sx={styles.accordionTitle}>
                  Show More Colors
                </Typography>
              </AccordionSummary>
              <AccordionDetails sx={styles.accordionDetails}>
                {arrIdFilters.colors &&
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
              </AccordionDetails>
            </Accordion>
          </AccordionDetails>
        </Accordion>
      </Stack>
    </>
  );
}
