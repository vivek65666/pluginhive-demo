import React, { useState } from 'react';

export default function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Sample Item 1', price: 29.99, stock: 15 },
    { id: 2, name: 'Sample Item 2', price: 49.99, stock: 8 }
  ]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');

  const handleAdd = (e) => {
    // 1. Prevent default form reload behavior
    e.preventDefault();

    if (!name || !price || !stock) return;

    // 2. Create new item object
    const newItem = {
      id: Date.now(),
      name: name.trim(),
      price: parseFloat(price),
      stock: parseInt(stock, 10)
    };

    // 3. Update React state locally
    setProducts((prev) => [...prev, newItem]);

    // 4. Clear input fields
    setName('');
    setPrice('');
    setStock('');
  };

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', fontFamily: 'sans-serif' }}>
      <h2>PluginHive Candidate Project - Inventory Dashboard</h2>
      <p><strong>Stack:</strong> React.js, Node.js, Express, AWS</p>

      <form onSubmit={handleAdd} style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <input 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
        <input 
          placeholder="Price" 
          type="number" 
          step="0.01" 
          value={price} 
          onChange={(e) => setPrice(e.target.value)} 
          required 
        />
        <input 
          placeholder="Stock" 
          type="number" 
          value={stock} 
          onChange={(e) => setStock(e.target.value)} 
          required 
        />
        <button type="submit">Add Item</button>
      </form>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((p) => (
          <li key={p.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid #ccc' }}>
            <span><strong>{p.name}</strong> - ${p.price} ({p.stock} in stock)</span>
            <button type="button" onClick={() => handleDelete(p.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}