import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './CartList.module.css'

const CartList = () => {

    const [sessionProducts, setSessionProducts] = useState([])
    const Nav = useNavigate();

    function checkOut(){
        fetch('http://localhost:8081/cart/addAll', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(sessionProducts)
          })
            .then(response => {
              // Handle the response from the server
              if (response.ok) {
                // Data sent successfully
                console.log('Data sent to the database.');
                handleDeductionAll()
                Nav('/Thankyou');
              } else {
                // Handle any errors
                console.error('Error sending data to the database.');
              }
            })
            .catch(error => {
              // Handle any network errors
              console.error('Network error:', error);
            });
    }

    // const [cart, setCart] = useState([]);
   

    // useEffect(() => {
    //     fetch('http://localhost:8081/cart/all')
    //     .then((res) => res.json())
    //     .then((result) => setCart(result))
    // }, [cart])

    useEffect(() => {
      const storedProducts = sessionStorage.getItem('myObjects');
      if (storedProducts) {
        const parsedObjects = JSON.parse(storedProducts);
        setSessionProducts(parsedObjects);
      } else {
        setSessionProducts([]);
      }
    }, []);
    
    function deleteProduct(id) {
        // Update the products state by filtering out the deleted product
        setSessionProducts((prevsessionProducts) => prevsessionProducts.filter((product) => product.id !== id));
      
        // Retrieve the cart items from session storage
        const cartStorageString = sessionStorage.getItem('myObjects');
        const cartStorage = JSON.parse(cartStorageString) || [];
      
        // Filter out the deleted product from the cart items
        const updatedCartStorage = cartStorage.filter((item) => item.id !== id);
      
        // Update the session storage with the updated cart items
        sessionStorage.setItem('myObjects', JSON.stringify(updatedCartStorage));
      
        // Update the cartStorage state with the updated cart items
        setSessionProducts(updatedCartStorage);
      }

    function handleDeductionAll(){
        setSessionProducts([]);
        sessionStorage.removeItem('myObjects');
}
  return (  
    <>
  {sessionProducts.length === 0 ?<p>cart is empty</p>:
  <table className={styles.table}>
      <thead>
          <tr> 
              <th>S.no</th>
              <th> Image </th>
              <th> Name </th>
              <th> Price(per item)</th>
              <th>Quantity </th>
              <th> Total Price </th>
          </tr>
      </thead>
      <tbody>
          {sessionProducts.map((x) => {
              return (
                  <tr key={x.id}>
                      <td>{x.id}</td>
              <td> <img src={x.url} alt='img' width='100'/></td>
              <td> {x.name} </td>
              <td>${x.price}</td>
              <td>{x.quantity}</td>
              <td>${x.price * x.quantity}</td>
              <button onClick={()=> deleteProduct(x.id)}>X</button></tr>
              
              )
          })}
      </tbody>
  </table>}

 <button onClick={handleDeductionAll}>
         remove all
 </button>
 <button className={styles.checkout} onClick={checkOut}>CheckOut</button>
    </>
    )
}

export default CartList