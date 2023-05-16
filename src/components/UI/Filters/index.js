import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
  styled,
  Stack,
  TextField,
  useTheme,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import useOwnStyles from '@/utils/styles';

export default function Filters() {
  const {filters: styles} = useOwnStyles();

  return (
    <>
      <Stack sx={styles.wrapper}>
        <Typography variant="body5" component="p">
          Shoes/Air Force 1
        </Typography>
        <Typography variant="h2" sx={{fontSize: 25}} component="h2">
          Air Force 1 (137)
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
