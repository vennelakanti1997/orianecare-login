import React from 'react'
import { Table } from 'react-bootstrap';
import { CareGiverData, columns } from '../components/CareGiverData';

function DeployedCareGiver() {
    return (
        <div className="pt-5">
        <h1 className="pt-5">Deployed CareGivers</h1>
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
                    <td key={index}>{item.CXName}</td>
                    <td key={index}>{item.Sex}</td>
                    <td key={index}>{item.Date}</td>
                    <td key={index}>{item.Contact}</td>
                    <td key={index}>{item.Address}</td>
                    
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
    )
}

export default DeployedCareGiver
