import Head from 'next/head';
import Link from 'next/link';

import {Typography, Box, Stack} from '@mui/material';

import useOwnStyles from '@/utils/styles';
import bannerImg from '@/assets/banner.jpg';

import SideBar from '@/components/Layout/SideBar';
import NavBarLayout from '@/components/Layout/NavBarLayout';

import ProductCard from '@/components/UI/ProductCard';
import TopBanner from '@/components/UI/TopBanner';
import AvatarStatic from '@/components/UI/AvatarStatic';
import Button from '@/components/UI/Button';

const MyProducts = ({userName, productsList}) => {
  const {myProducts: styles} = useOwnStyles();
  return (
    <>
      <Head>
        <title>Wellrun | My Products</title>
      </Head>
      <NavBarLayout>
        <Box sx={styles.row}>
          <SideBar />
          <Box sx={styles.header}>
            <TopBanner imgPath={bannerImg.src} />
            <Stack sx={styles.avatarWrapper}>
              <AvatarStatic variant="medium" sx={styles.avatar} />
              <Box>
                <Typography variant="body2" component="h3" sx={styles.name}>
                  {userName || 'Jane Meldrum'}
                </Typography>
                <Typography sx={styles.points}>1 374 bonus points</Typography>
              </Box>
            </Stack>
            <Typography variant="h1" component="h1" sx={styles.h1}>
              My products
            </Typography>
            <Box sx={styles.productsRow}>
              {productsList &&
                productsList.length > 0 &&
                productsList.map(product => {
                  return (
                    <ProductCard
                      key={product.id}
                      title={product.attributes.name}
                      category={product.attributes.category}
                      price={product.attributes.price}
                      imgPath={product.attributes.image}
                    />
                  );
                })}
              {!productsList && (
                <Box sx={styles.msgBody}>
                  <Typography
                    className="icon-bag-o"
                    sx={styles.msgIcon}
                  ></Typography>
                  <Typography
                    component="h2"
                    variant="body2"
                    sx={styles.msgTitle}
                  >
                    You don’t have any products yet
                  </Typography>
                  <Typography component="p" variant="body1" sx={styles.msgText}>
                    Post can contain video, images and text.
                  </Typography>
                  <Link href="/add-product">
                    <Button sx={styles.msgBtn}>Add product</Button>
                  </Link>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
      </NavBarLayout>
    </>
  );
};

export default MyProducts;
