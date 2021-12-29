import React from 'react'
import { Table } from 'react-bootstrap';
import { columns, FeedbackData } from '../components/FeedBackData';

function Feedback() {
    return (
        <div className="pt-5">
        <h1 className="pt-5">Followup</h1>
        <Table>
          <thead>
            <tr>
              {columns.map((item, index) => {
                return (
                  <th key={index} className={item.cname}>
                    {item.Header}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {FeedbackData.map((item, index) => {
              return (
                <tr>
                  <td key={index}>{item.Name}</td>
                  <td key={index}>{item.Date}</td>
                  <td key={index}>{item.Feedback}</td>
                  
  
                  <td key={index}>{item.Address}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    )
}

export default Feedback
