import React from "react";
import { Table } from "react-bootstrap";
import { columns, DocumentsData } from "../components/PendingDocumentsData";

function PendingDocuments() {
  return (
    <div className="pt-5">
      <h1 className="pt-5">OnGoing Patients</h1>
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
          {DocumentsData.map((item, index) => {
            return (
              <tr>
                <td key={index}>{item.Name}</td>

                <td key={item}>{item.Document}</td>
                <td key={index}>{item.Contact}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default PendingDocuments;
