import React from 'react';
import { useState } from 'react';

export const ProductForm = () => {
    const [name, setName] = useState('');
    const [url, setUrl] = useState('');
    const [price, setPrice] = useState();
    const [shortDesc, setShortDesc] = useState('');
    const [longDesc, setLongDesc] = useState('');

    function handleSubmit(e){
        e.preventDefault();
        const newProduct = {
            name: name,
            price: price,
            url: url,
            description: shortDesc,
            detailDesc: longDesc,
        };

        fetch('http://localhost:8080/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newProduct),
        })
            .then((response) => {
                if (response.ok) {
                    console.log('cart Item saved successfully!');
                } else {
                    throw new Error('Error saving product');
                }
            })
            .catch((error) => {
                console.error('Error saving note:', error);
            });
    }

  return (
    <form onSubmit={handleSubmit}>
  <label htmlFor="pname">Product Name:</label><br/>
  <input type="text" id="fname" name="fname" value={name} onChange={e => setName(e.target.value)} required/><br/>
  <label htmlFor="lname">Product Url:</label><br/>
  <input type="text" id="lname" name="lname" value={url} onChange={e => setUrl(e.target.value)} required/><br/>
  <label htmlFor="price">Price:(in $)</label> <br/>
  <input type="number" id="price" name="price" value={price} onChange={e => setPrice(e.target.value)} required/><br/>
  <label htmlFor="shortDesc">Short Description</label> <br/>
  <input type="text" id="shortDesc" name="shortdes"value={shortDesc} onChange={e => setShortDesc(e.target.value)} required/><br/>
  <label htmlFor="longDesc">Long Description</label> <br/>
  <input type="text" id="longDesc" name="longdes" value={longDesc} onChange={e => setLongDesc(e.target.value)} required/>
  <button type='submit'>Add your product </button>
</form>
  )
}
