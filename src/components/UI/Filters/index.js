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

export default function Filters() {
  const SearchSectionWrapper = styled(Stack)(({theme}) => ({
    display: 'flex',
    flexDirection: 'col',
    width: 320,
    paddingLeft: '40px',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: '7px',
    borderBottom: '1px solid',
    borderColor: theme.palette.divider,
  }));
  const StyledAccordion = styled(Accordion)(() => ({
    width: '100%',
  }));
  const StyledAccordionDetails = styled(AccordionDetails)(() => ({
    padding: 0,
    display: 'flex',
    flexDirection: 'column',
    fontSize: 16,
    fontWeight: 400,
    paddingBottom: '32px',
  }));
  const StyledAccordionSummary = styled(AccordionSummary)(() => ({padding: 0}));
  const AccordionTitle = styled(Typography)(() => ({fontWeight: 500}));

  return (
    <>
      <SearchSectionWrapper>
        <Typography variant="body5" component="p">
          Shoes/Air Force 1
        </Typography>
        <Typography variant="h2" sx={{fontSize: 25}} component="h2">
          Air Force 1 (137)
        </Typography>
        <StyledAccordion elevation={0}>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <AccordionTitle variant="body1">Gender</AccordionTitle>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="Men"
            />
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="Women"
            />
          </StyledAccordionDetails>
        </StyledAccordion>
      </SearchSectionWrapper>
      <SearchSectionWrapper>
        <StyledAccordion elevation={0}>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <AccordionTitle variant="body1">Kids</AccordionTitle>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="Boys"
            />
            <FormControlLabel
              control={<Checkbox size="small" onChange={() => {}} />}
              label="Girls"
            />
          </StyledAccordionDetails>
        </StyledAccordion>
      </SearchSectionWrapper>
      <SearchSectionWrapper>
        <StyledAccordion elevation={0}>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <AccordionTitle variant="body1">Brand</AccordionTitle>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
            <TextField size="small" placeholder="Search"></TextField>
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
          </StyledAccordionDetails>
        </StyledAccordion>
      </SearchSectionWrapper>
      <SearchSectionWrapper>
        <StyledAccordion elevation={0}>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <AccordionTitle variant="body1">Price</AccordionTitle>
          </StyledAccordionSummary>
          <StyledAccordionDetails
            sx={{flexDirection: 'row', gap: 1, alignItems: 'center'}}
          >
            <TextField placeholder="Min" size="small" onChange={() => {}} />
            -
            <TextField placeholder="Max" size="small" onChange={() => {}} />
          </StyledAccordionDetails>
        </StyledAccordion>
      </SearchSectionWrapper>
      <SearchSectionWrapper sx={{borderBottom: 'none'}}>
        <StyledAccordion elevation={0}>
          <StyledAccordionSummary expandIcon={<ExpandMoreIcon />}>
            <AccordionTitle variant="body1">Color</AccordionTitle>
          </StyledAccordionSummary>
          <StyledAccordionDetails>
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
          </StyledAccordionDetails>
        </StyledAccordion>
      </SearchSectionWrapper>
    </>
  );
}
