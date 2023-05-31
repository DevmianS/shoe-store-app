import Head from 'next/head';
import {useState} from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import {rwdValue, theme} from '@/utils/theme';
import useMyProducts from '@/hooks/useMyProducts';

import NavBarLayout from '@/components/Layout/NavBarLayout';
import AvatarStaticLayout from '@/components/Layout/AvatarStaticLayout';

import Button from '@/components/UI/Button';
import NoContent from '@/components/UI/NoContent';
import ProductCard from '@/components/UI/ProductCard';
import TopBanner from '@/components/UI/TopBanner';
import LoadingCards from '@/components/UI/LoadingCards';
import ProductAction from '@/components/UI/ProductAction';

const myProductsStyles = {
  row: {
    display: 'flex',
    justifyContent: 'space-between',
    paddingBottom: rwdValue(0, 40),
  },
  header: {
    flex: '1 1 auto',
    paddingLeft: rwdValue(10, 60),
    paddingRight: rwdValue(10, 60),
  },
  title: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: rwdValue(20, 30),
    marginBottom: rwdValue(20, 35),
  },
  avatarWrapper: {
    marginLeft: rwdValue(20, 50),
    marginBottom: rwdValue(20, 30),
    flexDirection: 'row',
    alignItems: 'end',
    marginTop: {xs: '-15px', md: '-30px'},
  },
  avatar: {
    marginRight: rwdValue(5, 15),
    border: '4px solid white',
    zIndex: 2,
  },

  name: {fontSize: rwdValue(14, 20)},
  points: {
    fontSize: rwdValue(12, 15),
    color: theme.palette.text.tetriary,
    marginBottom: {xs: 0, md: rwdValue(0, 12)},
  },
  h1: {marginBottom: rwdValue(20, 35)},
  productsRow: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: {xs: '0 -8px', md: '0 -24px'},
  },
  msgBody: {maxWidth: '320px', textAlign: 'center', margin: '0 auto'},
  msgIcon: {
    fontSize: 20,
    width: 72,
    height: 72,
    borderRadius: '50%',
    background: '#F9FAFB',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '50px auto 10px',
  },
  msgTitle: {fontSize: rwdValue(16, 20), marginBottom: '10px'},
  msgText: {
    fontSize: rwdValue(12, 15),
    marginBottom: rwdValue(32, 40),
  },
  msgBtn: {
    maxWidth: 'fit-content',
    fontSize: rwdValue(12, 15),
    height: {xs: 'auto', md: '40px'},
    padding: {xs: '4px 10px', md: '6px 16px'},
  },
};

const MyProducts = ({productsList}) => {
  const {products, isLoading} = useMyProducts();
  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openEditProduct, setOpenEditProduct] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  const addProductClickHandler = e => {
    e.preventDefault();
    setOpenAddProduct(true);
  };
  const editProductClickHandler = (e, id) => {
    e.preventDefault();
    setSelectedId(id);
    setOpenEditProduct(true);
  };

  return (
    <>
      <Head>
        <title>Wellrun | My Products</title>
      </Head>
      <ProductAction
        openState={openAddProduct}
        setOpenState={setOpenAddProduct}
      />
      <ProductAction
        openState={openEditProduct}
        setOpenState={setOpenEditProduct}
        isEditing
        productId={selectedId}
      />
      <NavBarLayout sidebarVisible>
        <Box sx={myProductsStyles.row}>
          <Box sx={myProductsStyles.header}>
            <TopBanner imgPath={'/banner.jpg'} />
            <AvatarStaticLayout />
            <Box sx={myProductsStyles.title}>
              <Typography variant="h1" component="h1">
                My products
              </Typography>
              {Array.isArray(products) && products.length > 0 && (
                <Button
                  sx={myProductsStyles.msgBtn}
                  onClick={addProductClickHandler}
                >
                  Add product
                </Button>
              )}
            </Box>
            <Box sx={myProductsStyles.productsRow}>
              {isLoading ? (
                <LoadingCards />
              ) : Array.isArray(products) && products.length > 0 ? (
                products.map(product => {
                  const {id, attributes} = product;
                  return (
                    <ProductCard
                      showOptions
                      productId={id}
                      key={id}
                      title={attributes.name}
                      price={attributes.price}
                      imgPath={attributes.images.data}
                      category={attributes.categories.data}
                      onEdit={editProductClickHandler}
                    />
                  );
                })
              ) : (
                <NoContent buttonAction={addProductClickHandler} />
              )}
            </Box>
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};

export default MyProducts;
