

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product2 = () => {
  const [items, setItems] = useState({});
  const [selectedItem, setSelectedItem] = useState('');
  const [selectedQuantity, setSelectedQuantity] = useState(0);
  const [selectedItemsList, setSelectedItemsList] = useState([]);

  useEffect(() => {
    fetchItems();
    fetchSelectedItems();
  }, []);// eslint-disable-line react-hooks/exhaustive-deps

  const token = localStorage.getItem('token');

  const fetchItems = async () => {
    try {
      const response = await axios.get('https://e-library-server-jyjf.onrender.com/item/all');
      const filteredItems = Object.fromEntries(
        Object.entries(response.data).filter(([key, value]) => value > 0)
      );
      setItems(filteredItems);
    } catch (error) {
      console.error('Error fetching items:', error);
    }
  };

  const fetchSelectedItems = async () => {
    try {
      const response = await axios.get('https://e-library-server-jyjf.onrender.com/selectedOnes/selected-items/getallItems', {
        headers: { 'auth-token': `${token}` },
      });
      const filteredItems = response.data.filter(item => item.quantity > 0);
      setSelectedItemsList(filteredItems);
    } catch (error) {
      console.error('Error fetching selected items:', error);
    }
  };

  const handleRemoveItems = async () => {
    const removeItems = {};
    selectedItemsList.forEach(({ item, quantity }) => {
      removeItems[item] = quantity;
    });

    try {
      const response = await axios.post('https://e-library-server-jyjf.onrender.com/item/remove', { items: removeItems });
      toast.success(`Removed selected item`);
      setItems(response.data.items);
      setSelectedItemsList([]); // Clear selected items list after removal
      fetchSelectedItems();
    } catch (error) {
      console.error('Error removing items:', error);
    }
  };

  const handleAddItemToList = async () => {
    if (selectedItem && selectedQuantity > 0) {
      try {
        const response = await axios.post(
          'https://e-library-server-jyjf.onrender.com/selectedOnes/selected-items/add',
          { item: selectedItem, quantity: selectedQuantity },
          { headers: { 'auth-token': token } }
        );

        const updatedList = response.data;
        setSelectedItemsList(updatedList);

        setSelectedItem('');
        setSelectedQuantity(0);

        // alert(`Added ${selectedQuantity} of ${selectedItem} to selected items`);
        toast.success(`Added ${selectedQuantity} of ${selectedItem} to selected items`);

      } catch (error) {
        if (error.response && error.response.data.error) {
          // alert(error.response.data.error);
          toast.error(error.response.data.error);
        } else {
          console.error('Error adding item to selected items:', error);
        }
      }
    } else {
      // alert('Please select an item and a quantity greater than zero.');
      toast.error(`Please select an item and a quantity greater than zero.`);

    }
  };

  const handleEditQuantity = async (index, newQuantity) => {
    const updatedList = [...selectedItemsList];
    updatedList[index].quantity = newQuantity;
    setSelectedItemsList(updatedList);

    if (newQuantity === 0) {
      handleRemoveItemFromList(updatedList[index]);
    }
  };

  const handleRemoveItemFromList = async (item) => {
    try {
      const response = await axios.post(
        'https://e-library-server-jyjf.onrender.com/selectedOnes/selected-items/remove',
        { item: item.item, quantity: item.quantity },
        { headers: { 'auth-token': token } }
      );
      setSelectedItemsList(response.data);
      fetchItems(); // Fetch updated items to ensure the item with quantity 0 is removed
    } catch (error) {
      console.error('Error removing item:', error);
    }
  };

  return (
    <div style={{ marginTop: '-70px' }}>
    <ToastContainer position="top-right" style={{ marginTop: '3rem' }} />
      <h1 style={{ textAlign: 'center' }}>Books</h1>
      <h2 style={{ marginTop: '1rem' }}>Current available Items</h2>
      <table style={{ marginBottom: '1rem', width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Book Name</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {Object.entries(items).map(([key, value]) => (
            <tr key={key}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{key}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
      
      <div style={{ marginTop: '20px', marginBottom: '20px' }}>
        <h2>Select Books to Add it to list</h2>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <label htmlFor="item-select">Item:</label>
            <select id="item-select" value={selectedItem} onChange={(e) => setSelectedItem(e.target.value)} style={{ width: '100%', padding: '8px', borderRadius: '5px' }}>
              <option value="">Select an item</option>
              {Object.keys(items).map((key) => (
                <option key={key} value={key}>{key}</option>
              ))}
            </select>
          </div>
          <div style={{ flex: '1', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <label htmlFor="quantity-select">Quantity :</label>
            <select id="quantity-select" value={selectedQuantity} onChange={(e) => setSelectedQuantity(parseInt(e.target.value, 10))} style={{ width: '100%', padding: '8px', borderRadius: '5px' }}>
              <option value={0}>Select quantity</option>
              {selectedItem && items[selectedItem] && [...Array(items[selectedItem] + 1).keys()].map((val) => (
                <option key={val} value={val}>{val}</option>
              ))}
            </select>
          </div>
        </div>
        <div style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
          <button className='btn btn-dark' onClick={handleAddItemToList} style={{ marginTop: '10px' }}>Add Item to List</button>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Selected Items:</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {selectedItemsList.map(({ item, quantity }, index) => (
            <li key={index} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
              <span style={{ flex: '1' }}>{item}:</span>
              <input
                type="number"
                value={quantity}
                onChange={(e) => handleEditQuantity(index, parseInt(e.target.value, 10))}
                style={{ flex: '1', padding: '8px', borderRadius: '5px' }}
              />
              <button className='btn btn-dark' onClick={() => handleRemoveItemFromList({ item, quantity })} style={{ flex: '1', padding: '8px' }}>Remove</button>
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: '20px', marginBottom: '20px', textAlign: 'center' }}>
        <button className='btn btn-warning' onClick={handleRemoveItems}>Confirm Items</button>
      </div>
    </div>
  );
};

export default Product2;
