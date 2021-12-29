import React from "react";
import { Table } from "react-bootstrap";
import { columns, ComplaintData } from "../components/ComplaintsData";

function Complaint() {
  return (
    <div className="pt-5">
      <h1 className="pt-5">Complaints & Issues</h1>
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
          {ComplaintData.map((item, index) => {
            return (
              <tr>
                <td key={index}>{item.Name}</td>
                <td key={index}>{item.Contact}</td>
                <td key={index}>{item.Date}</td>

                <td key={index}>{item.Address}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default Complaint;
