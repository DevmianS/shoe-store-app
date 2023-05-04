import Image from "next/image"
import Card from '@mui/material/Card';
import styles from './ProductCard.module.css'
import { Grid,Typography,Stack, Box } from "@mui/material";

export default function ProductCard ({title,price,category,imgPath}){

return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card className={styles.card} sx={{borderRadius:0,border:0,boxShadow:0}} >
                <Box sx={{position: 'relative',width:'100%',paddingBottom: '120%',marginBottom: '12px',overflow:'hidden'}}>
                    <Image src={imgPath} alt={`${title} ${category}`} className={styles.card__image}/>
                </Box>
                <Box sx={{position:'relative'}}>
                    <Stack flexDirection={"row"} justifyContent={'space-between'} alignItems={'center'}>
                        <Typography component="h3" fontSize={22} fontWeight={500}>
                            {title || 'Product title'}
                        </Typography>
                        <Typography component="span" fontSize={22} fontWeight={500}>
                            ${price || '100'}
                        </Typography>
                    </Stack>
                    <Typography sx={{fontSize:18,color:"#5C5C5C"}} component="h4">{category || 'category'}</Typography>
                </Box>
            </Card>
        </Grid>)
}
