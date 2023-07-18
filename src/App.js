import React from 'react';
import './App.css';
import Table from './Table';

const tableData = [
  { name: 'John Doe', age: 25, email: 'john@example.com' },
  { name: 'Jane Smith', age: 30, email: 'jane@example.com' },
  { name: 'Bob Johnson', age: 28, email: 'bob@example.com' },
  // Add more data rows here if needed
];

function App() {
  return (
    <div className="App">
      <h1>Table with Accordion Rows</h1>
      <Table data={tableData} />
    </div>
  );
}

export default App;
