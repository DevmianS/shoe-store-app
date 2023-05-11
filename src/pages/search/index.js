import Head from 'next/head';
import {rwdValue} from '@/utils/theme';

import {
  Typography,
  styled,
  Box,
  Stack,
  Grid,
  Button,
  TextField,
  useTheme,
  useMediaQuery,
  FormControlLabel,
  Checkbox,
} from '@mui/material';

import product1 from '@/assets/product1.jpg';
import product2 from '@/assets/product2.jpg';
import product3 from '@/assets/product3.jpg';
import product4 from '@/assets/product4.jpg';
import product5 from '@/assets/product5.jpg';
import product6 from '@/assets/product6.jpg';
import product7 from '@/assets/product7.jpg';
import product8 from '@/assets/product8.jpg';
import product9 from '@/assets/product9.jpg';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ProductCard from '@/components/UI/ProductCard';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';

const SearchResults = ({userName}) => {
  // STYLED COMPONENTS
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const Column = styled(Box)(({theme}) => ({
    [theme.breakpoints.up('lg')]: {
      flex: '0 0 33%',
    },
    [theme.breakpoints.between('md', 'lg')]: {
      flex: '0 0 50%',
      padding: '0 15px',
      marginBottom: '15px',
    },
    [theme.breakpoints.down('md')]: {
      flex: '0 0 50%',
      padding: '0 8px',
      marginBottom: '16px',
    },
    [theme.breakpoints.up('xl')]: {
      flex: '0 0 25%',
    },
    padding: '0 24px',
    marginBottom: '24px',
  }));

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
  const Row = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    padding: isMobile ? '25px 0' : '40px 0',
  });
  const Content = styled(Box)(({theme}) => ({
    '& .MuiInputBase-root': {
      height: isDesktop ? '48px' : '33px',
      fontSize: isDesktop ? '15px' : '10px',
    },
    '& label': {
      fontSize: isDesktop ? '15px' : '12px',
    },
    flex: '1 1 auto',
    padding: `0 ${rwdValue(20, 60)}`,
  }));

  return (
    <>
      <Head>
        <title>Search</title>
      </Head>
      <NavBarLayout>
        <Row>
          <SideBar areaName="search filters">
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
                  <TextField
                    placeholder="Min"
                    size="small"
                    onChange={() => {}}
                  />
                  -
                  <TextField
                    placeholder="Max"
                    size="small"
                    onChange={() => {}}
                  />
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
          </SideBar>
          <Content>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: rwdValue(20, 40),
              }}
            >
              <Typography variant="h1" component="h1" sx={{flex: '1 1 auto'}}>
                Search Results
              </Typography>
              <Button>
                <Box sx={{display: 'flex', alignItems: 'center'}}>
                  <Typography
                    variant="body1"
                    sx={{
                      fontSize: rwdValue(15, 24),
                      color: theme.palette.text.secondary,
                    }}
                    component="p"
                  >
                    {isMobile ? 'Filters' : 'Hide Filters'}
                  </Typography>{' '}
                  <Typography
                    sx={{
                      color: theme.palette.text.secondary,
                      fontSize: rwdValue(12, 24),
                    }}
                    className="icon-filter"
                    component="i"
                  ></Typography>
                </Box>
              </Button>
            </Box>
            <Box
              display="flex"
              flexWrap="wrap"
              margin={{sm: '0 -8px', md: '0 -24px'}}
            >
              <Column>
                <ProductCard
                  title="Nike Air Max 270"
                  category="Women's Shoes"
                  price={160}
                  imgPath={product1}
                />
              </Column>
              <Column>
                {' '}
                <ProductCard
                  title="Nike Air Max 90"
                  category="Men's Shoes"
                  price={140}
                  imgPath={product2}
                />
              </Column>

              <Column>
                <ProductCard
                  title="Nike Air Force 1 '07 SE"
                  category="Women's Shoes"
                  price={110}
                  imgPath={product3}
                />
              </Column>
              <Column>
                <ProductCard
                  title="Nike Air Max 210"
                  category="Men's Shoes"
                  price={180}
                  imgPath={product4}
                />
              </Column>
              <Column>
                <ProductCard
                  title="Nike Air Max 270"
                  category="Women's Shoes"
                  price={160}
                  imgPath={product5}
                />
              </Column>
              <Column>
                <ProductCard
                  title="Nike Air Max 90"
                  category="Men's Shoes"
                  price={140}
                  imgPath={product6}
                />
              </Column>
              <Column>
                <ProductCard
                  title="Nike Air Force 1 '07 SE"
                  category="Women's Shoes"
                  price={110}
                  imgPath={product7}
                />
              </Column>
              <Column>
                <ProductCard
                  title="Nike Air Max 210"
                  category="Men's Shoes"
                  price={180}
                  imgPath={product8}
                />
              </Column>
              <Column>
                <ProductCard
                  title="Nike Air Max 210"
                  category="Men's Shoes"
                  price={180}
                  imgPath={product9}
                />
              </Column>
            </Box>
          </Content>
        </Row>
      </NavBarLayout>
    </>
  );
};

export default SearchResults;
