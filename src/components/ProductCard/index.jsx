import Image from "next/image"
import styles from './ProductCard.module.css'
import { Button } from "@mui/material"

export default function ProductCard ({title,price,category,imgPath}){
return (
<div className={styles.card}>
    <div className={styles.card__add}>Add</div>
    <div className={styles.card__image}>
        <Image src={imgPath} alt={`${title} ${category}`}/>
    </div>
    <div className={styles.card__footer}>
        <div className={styles.card__row}>
            <h3 className={styles.card__title}>{title}</h3>
            <span className={styles.card__price}>${price}</span>
        </div>
        <p className={styles.card__category}>{category}</p>
    </div>
</div>)
}
