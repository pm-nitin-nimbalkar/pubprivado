import React, { useState } from 'react';
import Collapse from 'react-collapse';

const Table = ({ data }) => {
  const [openRow, setOpenRow] = useState(null);

  const handleRowClick = (index) => {
    setOpenRow((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Age</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <tr onClick={() => handleRowClick(index)}>
              <td>{item.name}</td>
              <td>{item.age}</td>
              <td>{item.email}</td>
            </tr>
            <tr>
              <td colSpan="3">
                <Collapse isOpened={openRow === index}>
                  <div className="row-details">
                    {/* Additional row details can be placed here */}
                    <p>Additional information for {item.name}</p>
                  </div>
                </Collapse>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </tbody>
    </table>
  );
};

export default Table;
