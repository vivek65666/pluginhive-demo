const express = require('express');
const cors = require('cors');

const app = express();

// Handle Private Network Access (PNA) and CORS Preflight Requests
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Private-Network', 'true');

  // Respond immediately to OPTIONS preflight calls
  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json());

let products = [
  { id: '1', name: 'Shipping Label Printer', price: 120, stock: 15 },
  { id: '2', name: 'Barcode Scanner', price: 45, stock: 30 }
];

app.get('/api/products', (req, res) => res.json(products));

app.post('/api/products', (req, res) => {
  const { name, price, stock } = req.body;
  const newProduct = {
    id: Date.now().toString(),
    name,
    price: Number(price),
    stock: Number(stock)
  };
  products.push(newProduct);
  res.status(201).json(newProduct);
});

app.delete('/api/products/:id', (req, res) => {
  products = products.filter(p => p.id !== req.params.id);
  res.json({ message: 'Deleted' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});