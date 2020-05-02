import React, { useState, useEffect } from "react";
import moment from 'moment-timezone';
import { saveAs } from "file-saver";
import * as XLSX from 'xlsx';

const ExportExcel = props => {

  const [excelData, setExcelData] = useState([]);
  const [fields, setFields] = useState([]);
  const [excelHeaders, setExcelHeaders] = useState([]);

  useEffect(() => {
    const { data, fields } = props;

    setExcelData(data);
    setExcelHeaders(Object.keys(fields).map((key) => fields[key]));
    setFields(Object.keys(fields));
  }, [props])

  const convertToCsV = () => {
    const cellData = getCellData();
    const header = excelHeaders.join(',');

    return header + "\n" + cellData;
  }

  const getCellData = () => {
    return excelData.map((row) => {
      return fields.map((field) => {
        if (row.hasOwnProperty(field)) {
          return row[field];
        }
        return null;
      }).join(',');
    }).join("\n");
  }

  const saveExcel = () => {
    const { fileName } = props;

    const csv = convertToCsV();
    const rows = csv.split('\n');
    const excelData = rows.map(rowCell => rowCell.split(','));

    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';

    const ws = XLSX.utils.json_to_sheet(excelData, { skipHeader: true });
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

    const blob = new Blob(
      [excelBuffer],
      {
        type: fileType
      }
    );

    saveAs(blob, [fileName + " - " + moment(new Date()).tz('Asia/Manila').format('MMMM-DD-YYYY') + ".xlsx"]);
  }

  return (
    <button
      className="generate-excel-btn"
      onClick={() => saveExcel()}
    >
      {props.buttonLabel}
    </button>
  );
}

export default ExportExcel;