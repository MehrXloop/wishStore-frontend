import React from 'react'
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './DetailPage.module.css';

const DetailPage = () => {

    const {id} = useParams();
    const [product, setProduct] = useState({});

    useEffect(() => {
        fetch(`http://localhost:8080/products/get/${id}`)
            .then((res) => res.json())
            .then((result) => {
                setProduct(result);
            });
    }, []);
  return (
    <>
    <div className={styles.detailpage}>
    <h1>{product.name}</h1>
    <img src={product.url} alt='detailimg' width='400'/>
    <h1>${product.price}</h1>
    <p>{product.detailDesc}</p>
    </div>
    </>
  )
}

export default DetailPage