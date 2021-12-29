import React from "react";
import { Table } from "react-bootstrap";
import { CollectionsData, columns } from "../components/PendingCOllections";

function PendingCollections() {
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
          {CollectionsData.map((item, index) => {
            return (
              <tr>
                <td key={index}>{item.Name}</td>
                <td key={index}>{item.Date}</td>
                <td key={item}>{item.Amount}</td>
                <td key={index}>{item.Contact}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default PendingCollections;
