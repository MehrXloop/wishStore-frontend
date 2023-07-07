import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import './ProductList.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [disabled, setDisabled] = useState(true);
  const [styleButton, setStyleButton] = useState('btn-disabled');
  const [cartStorage, setCartStorage] = useState([]);
  const Nav = useNavigate();

  useEffect(() => {
    fetch('http://localhost:8080/products/all')
      .then((res) => res.json())
      .then((result) => {
        setProducts(result);
        setQuantities({});
      });
  }, []);

  useEffect(() => {
    const disabled = Object.values(quantities).every((quantity) => quantity <= 0);
    setDisabled(disabled);
    setStyleButton(disabled ? 'btn-disabled' : 'btn-enabled');
  }, [quantities]);

  function deleteProduct(id) {
    fetch(`http://localhost:8080/products/delete/${id}`, { method: 'DELETE' })
      .then(() => {
        // Update the products state by filtering out the deleted product
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      })
      .catch((error) => {
        // Handle error if needed
        console.error('Error deleting product:', error);
      });
  }



function addToCart(product) {
    const quantity = quantities[product.id] || 0;
    const cartItem = {
      ...product,
      quantity: quantity,
      totalPrice:product.price * quantity
    };
  
    const cartStorageString = sessionStorage.getItem('myObjects');
    let cartStorage = JSON.parse(cartStorageString) || [];
  
    // Check if the same product is already in the cart
    const existingCartItemIndex = cartStorage.findIndex((item) => item.id === product.id);
    if (existingCartItemIndex !== -1) {
      // If the same product exists, update the quantity
      cartStorage[existingCartItemIndex].quantity += quantity;
    } else {
      // If it's a new product, add it to the cart
      cartStorage.push(cartItem);
    }
  
    // Update the session storage and state
    sessionStorage.setItem('myObjects', JSON.stringify(cartStorage));
    setCartStorage(cartStorage);
  }
  
  
 
  function handleCount(product, increment) {
    setQuantities((prevQuantities) => {
      const updatedQuantities = { ...prevQuantities };
      const currentQuantity = updatedQuantities[product.id] || 0;
      const newQuantity = Math.max(0, currentQuantity + increment);
      updatedQuantities[product.id] = newQuantity;
      return updatedQuantities;
    });
  }

  function detailOfProduct(id) {
    Nav(`/Detailpage/${id}`);
  }



  return (
    <div className="products">
      {products.map((product) => {
        const quantity = quantities[product.id] || 0;
        return (
          <div className="card" key={product.id}>
            <button onClick={()=>deleteProduct(product.id)} className="cross-button"> X</button>
            <img src={product.url} alt="Denim Jeans" />
            <h1>{product.name}</h1>
            <p className="price">${product.price}</p>
            <p>{product.description}</p>
            <button
              className="add-button"
              onClick={() => handleCount(product, -1)}
            >
              -
            </button>
            <input className="fieldqty" value={quantity} readOnly></input>
            <button
              className="add-button"
              onClick={() => handleCount(product, 1)}
            >
              +
            </button>
            <button
              onClick={() => addToCart(product)}
              disabled={quantity <= 0}
              className={quantity <= 0 ? 'btn-disabled' : 'btn-enabled'}
            >
              Add to Cart
            </button>
            <button className="button" onClick={() => detailOfProduct(product.id)}>
              Detail Of Product
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default ProductList