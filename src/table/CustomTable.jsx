import React from "react";
import "../css/poll-results.css";

const CustomTable = ({ columns, data }) => {
  return (
    <table>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th key={index}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={row?.mySelection ? "highlightedRow" : null}
          >
            {columns.map((column, columnIndex) => {
              return column.header === "Rank" ? (
                <td key={columnIndex}>{rowIndex}</td>
              ) : (
                <td key={columnIndex}>{row[column.key]}</td>
              );
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CustomTable;
