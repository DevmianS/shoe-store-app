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

  return (
    <>
      <Stack sx={styles.wrapper}>
        <Typography variant="body5" component="p">
          {filterCategory || 'Shoes/Air Force 1'}
        </Typography>
        <Typography variant="h2" sx={styles.accordionSubTitle} component="h2">
          {filterResult || 'Nike (7)'}
        </Typography>
        <Accordion sx={styles.accordion} elevation={0}>
          <AccordionSummary
            sx={styles.accordionSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="body1" sx={styles.accordionTitle}>
              Gender
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={styles.accordionDetails}>
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="Men"
            />
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="Women"
            />
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
      </Stack>
      <Stack sx={styles.wrapper}>
        <Accordion sx={styles.accordion} elevation={0}>
          <AccordionSummary
            sx={styles.accordionSummary}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography variant="body1" sx={styles.accordionTitle}>
              Brand
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={styles.accordionDetails}>
            <TextField size="small" placeholder="Search" />
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="Adidas (+350)"
            />
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="Asics (+840)"
            />
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="New Balance (+840)"
            />
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="Nike"
            />
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="Puma (+350)"
            />
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="Reebok (+97)"
            />
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
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="White"
            />
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="Black"
            />
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="Red"
            />
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="Blue"
            />
          </AccordionDetails>
        </Accordion>
      </Stack>
    </>
  );
}
