import { useState } from 'react';
import axios from 'axios';

const items = [
  { id: 1, name: 'Item 1', category: 'Category A', date: '2024-06-01' },
  { id: 2, name: 'Item 2', category: 'Category B', date: '2024-06-02' },
  { id: 3, name: 'Item 3', category: 'Category A', date: '2024-06-03' },
];

export default function Landing() {
  const [data, setData] = useState(items);
  const [filter, setFilter] = useState('');
  const [sortField, setSortField] = useState('');
  const [newItem, setNewItem] = useState({ name: '', category: '', date: '' });

  const handleFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleSort = (field) => {
    setSortField(field);
    const sortedData = [...data].sort((a, b) => (a[field] > b[field] ? 1 : -1));
    setData(sortedData);
  };

  const handleInsert = () => {
    setData([...data, { ...newItem, id: data.length + 1 }]);
  };

  const handleDelete = (id) => {
    setData(data.filter(item => item.id !== id));
  };

  const filteredData = data.filter(item => item.name.includes(filter) || item.category.includes(filter));

  return (
    <div>
      <h1>Landing Page</h1>
      <input type="text" placeholder="Filter by name or category" value={filter} onChange={handleFilter} />
      <button onClick={() => handleSort('name')}>Sort by Name</button>
      <button onClick={() => handleSort('date')}>Sort by Date</button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item.id}>
              <td>{item.name}</td>
              <td>{item.category}</td>
              <td>{item.date}</td>
              <td>
                <button onClick={() => handleDelete(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Add New Item</h2>
      <input type="text" placeholder="Name" value={newItem.name} onChange={e => setNewItem({ ...newItem, name: e.target.value })} />
      <input type="text" placeholder="Category" value={newItem.category} onChange={e => setNewItem({ ...newItem, category: e.target.value })} />
      <input type="date" value={newItem.date} onChange={e => setNewItem({ ...newItem, date: e.target.value })} />
      <button onClick={handleInsert}>Add Item</button>
    </div>
  );
}
