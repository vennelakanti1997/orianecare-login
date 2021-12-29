import React from "react";
import { Table } from "react-bootstrap";
import { CareGiverData, columns } from "../components/BenchCareGiversData";

function BenchCareGivers() {
  return (
    <div className="pt-5">
      <h1 className="pt-5">CareGivers On Bench</h1>
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
          {CareGiverData.map((item, index) => {
            return (
              <tr>
                <td key={index}>{item.Name}</td>
                <td key={index}>{item.Contact}</td>
                <td key={index}>{item.Address}</td>
                <td key={index}>{item.Date}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
}

export default BenchCareGivers;
