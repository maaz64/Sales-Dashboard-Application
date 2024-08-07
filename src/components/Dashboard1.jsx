import React, { useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
// import { fetchTodaysSales } from '../services/api';
import data from "../data.json"

const Dashboard1 = () => {
  const [salesData, setSalesData] = useState(data['todays-sales']);
  const [gridApi, setGridApi] = useState(null);
 

// if there is backend we can fetch the data here using fetchTodaysSales function defin /service/api.js but right now we are using mock data

//   useEffect(() => {
//     fetchTodaysSales()
//       .then(data => setSalesData(data))
//       .catch(err => console.error(err));
//   }, []);

  const columns = [
    { headerName: "Product Name", field: "productName", sortable: true, filter: true },
    { headerName: "Category", field: "category", sortable: true, filter: true },
    { headerName: "Quantity Sold", field: "quantitySold", sortable: true, filter: true },
    { headerName: "Sales Amount", field: "salesAmount", sortable: true, filter: true }
  ];

  const productChartData = {
    labels: salesData.map(item => item.productName),
    datasets: [
      {
        label: 'Sales Amount',
        data: salesData.map(item => item.salesAmount),
        backgroundColor: 'rgba(75, 192, 192, 0.6)'
      }
    ]
  };

  const categoryChartData = {
    labels: [...new Set(salesData.map(item => item.category))],
    datasets: [
      {
        label: 'Sales Amount',
        data: salesData.reduce((acc, item) => {
          const index = acc.findIndex(el => el.category === item.category);
          if (index === -1) acc.push({ category: item.category, salesAmount: item.salesAmount });
          else acc[index].salesAmount += item.salesAmount;
          return acc;
        }, []).map(item => item.salesAmount),
        backgroundColor: 'rgba(153, 102, 255, 0.6)'
      }
    ]
  };

  return (
    <div >
      <h2>Today's Sales</h2>
      <div className="chart-container">
        <Bar data={productChartData} />
      </div>
      <div className="chart-container">
        <Bar data={categoryChartData} />
      </div>
      <div className="ag-theme-alpine" style={{ height: 400, width: '100%', margin: '10px' }}>
        <AgGridReact
          columnDefs={columns}
          rowData={salesData}
          onGridReady={params => setGridApi(params.api)}
        />
      </div>
    </div>
  );
}

export default Dashboard1;
