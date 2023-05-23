import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  Stack,
  TextField,
  FormControlLabel,
  Checkbox,
  useTheme,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useProductData from '@/hooks/useProductData';

export default function Filters({filterResult, filterCategory}) {
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

  const {
    genders,
    brands,
    categories,
    colors,
    setColors,
    setGenders,
    setBrands,
  } = useProductData({
    filter: true,
  });

  const checkBoxChangeGenderHandler = event => {
    console.log('event: ', event, event.target.value);
    setGenders(
      genders.map(gender => {
        if (gender.id == event.target.value) {
          return {
            ...gender,
            needed: !gender.needed,
          };
        }
        return gender;
      }),
    );
  };

  const checkBoxChangeBrandHandler = event => {
    console.log('event: ', event, event.target.value);
    setBrands(
      brands.map(brands => {
        if (brands.id == event.target.value) {
          return {
            ...brands,
            needed: !brands.needed,
          };
        }
        return brands;
      }),
    );
  };

  const checkBoxChangeColorHandler = event => {
    console.log('event: ', event, event.target.value);
    setColors(
      colors.map(color => {
        if (color.id == event.target.value) {
          return {
            ...color,
            needed: !color.needed,
          };
        }
        return color;
      }),
    );
  };

  return (
    <>
      <Stack sx={styles.wrapper}>
        <Typography variant="body5" component="p">
          {filterCategory || 'Shoes/Air Force 1'}
        </Typography>
        <Typography variant="h2" sx={styles.accordionSubTitle} component="h2">
          {filterResult || 'Nike (7)'}
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
            {genders &&
              genders.map(gender => {
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
      {/* <Stack sx={styles.wrapper}>
        <Accordion sx={styles.accordion} elevation={0} defaultExpanded>
          <AccordionSummary
            sx={styles.accordionSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="body1" sx={styles.accordionTitle}>
              Kids
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={styles.accordionDetails}>
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="Boys"
            />
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="Girls"
            />
          </AccordionDetails>
        </Accordion>
      </Stack> */}
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
            {brands &&
              brands.map(brand => {
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
            <TextField placeholder="Min" size="small" onChange={() => {}} />
            -
            <TextField placeholder="Max" size="small" onChange={() => {}} />
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
            {colors &&
              colors.map(color => (
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
      </Stack>
    </>
  );
}
