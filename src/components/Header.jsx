import React from 'react';
import styles from './Header.module.css'
import { Link } from 'react-router-dom';

export const Header = ({ cartitems }) => {
    return (
        <div className={styles.header}>
            <h1> <Link to='/'>Wish Store</Link></h1>
            
            <div className={styles.cartcount}>
              <Link to='/Productform'> Add your product</Link> 
            </div>
            <div className={styles.cartcount}>
              <Link to='/Cart'> Cart</Link> 
            </div>
        </div>
    )
}