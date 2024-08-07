import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { fetchSalesComparison } from '../services/api';
import data from "../data.json"

const Dashboard2 = () => {
  const [salesData, setSalesData] = useState([...data['sales-comparison']]);
  const [date1, setDate1] = useState(new Date().toISOString().slice(0, 10));
  const [date2, setDate2] = useState(new Date().toISOString().slice(0, 10));
  const [gridApi, setGridApi] = useState(null);


// if there is backend we can fetch the data here using fetchTodaysSales function defin /service/api.js but right now we are using mock data
//   useEffect(() => {
//     fetchSalesComparison(date1, date2)
//       .then(data => setSalesData(data))
//       .catch(err => console.error(err));
//   }, [date1, date2]);

  const columns = [
    { headerName: "Product Name", field: "productName", sortable: true, filter: true },
    { headerName: "Category", field: "category", sortable: true, filter: true },
    { headerName: "Date 1 Sales Amount", field: "date1Sales", sortable: true, filter: true },
    { headerName: "Date 2 Sales Amount", field: "date2Sales", sortable: true, filter: true },
    { headerName: "Difference", field: "difference", sortable: true, filter: true }
  ];

  const productComparisonChartData = {
    labels: salesData.map(item => item.productName),
    datasets: [
      {
        label: `Sales Amount (${date1})`,
        data: salesData.map(item => item.date1Sales),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      },
      {
        label: `Sales Amount (${date2})`,
        data: salesData.map(item => item.date2Sales),
        backgroundColor: 'rgba(153, 102, 255, 0.6)'
      }
    ]
  };

  const categoryComparisonChartData = {
    labels: [...new Set(salesData.map(item => item.category))],
    datasets: [
      {
        label: `Sales Amount (${date1})`,
        data: salesData.reduce((acc, item) => {
          const index = acc.findIndex(el => el.category === item.category);
          if (index === -1) acc.push({ category: item.category, date1Sales: item.date1Sales });
          else acc[index].date1Sales += item.date1Sales;
          return acc;
        }, []).map(item => item.date1Sales),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      },
      {
        label: `Sales Amount (${date2})`,
        data: salesData.reduce((acc, item) => {
          const index = acc.findIndex(el => el.category === item.category);
          if (index === -1) acc.push({ category: item.category, date2Sales: item.date2Sales });
          else acc[index].date2Sales += item.date2Sales;
          return acc;
        }, []).map(item => item.date2Sales),
        backgroundColor: 'rgba(153, 102, 255, 0.6)'
      }
    ]
  };

  return (
    <div>
      <h2>Sales Comparison</h2>
      <div>
        <label>
          Date 1:
          <input type="date" value={date1} onChange={e => setDate1(e.target.value)} />
        </label>
        <label>
          Date 2:
          <input type="date" value={date2} onChange={e => setDate2(e.target.value)} />
        </label>
      </div>
      <div className="chart-container">
        <Bar data={productComparisonChartData} />
      </div>
      <div className="chart-container">
        <Bar data={categoryComparisonChartData} />
      </div>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          columnDefs={columns}
          rowData={salesData}
          onGridReady={params => setGridApi(params.api)}
        />
      </div>
    </div>
  );
}

export default Dashboard2;
