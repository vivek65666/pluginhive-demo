import React, { useState, useEffect } from 'react';

// Temporary local API URL (We will update this after deploying backend to AWS)
const API_URL = "http://localhost:5000"; 

export default function App() {
  const [products, setProducts] = useState([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const fetchProducts = async () => {
    try {
      const res = await fetch(`${API_URL}/api/products`);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  useEffect(() => { fetchProducts(); }, []);

  const handleAdd = async (e) => {
    e.preventDefault();
    await fetch(`${API_URL}/api/products`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, price, stock })
    });
    setName(''); setPrice(''); setStock('');
    fetchProducts();
  };

  const handleDelete = async (id) => {
    await fetch(`${API_URL}/api/products/${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>PluginHive Candidate Project - Inventory Dashboard</h2>
      <p><strong>Stack:</strong> React.js, Node.js, Express, AWS</p>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Price" type="number" value={price} onChange={e => setPrice(e.target.value)} required />
        <input placeholder="Stock" type="number" value={stock} onChange={e => setStock(e.target.value)} required />
        <button type="submit">Add Item</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map(p => (
          <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
            <span><strong>{p.name}</strong> - ${p.price} ({p.stock} in stock)</span>
            <button onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}