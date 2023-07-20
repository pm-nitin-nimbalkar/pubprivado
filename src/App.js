import React, { useEffect, useState } from 'react';
import './App.css';
import Table from './Table';
import SimpleCharts from './DomainGraph';
import CMPCharts from './CMPGraph';
import Header from './Header';
import Sidebar from './Sidebar';

function App() {
  const [domainRecordsMap, setDomainRecordsMap] = useState(null);
  const [countData, setCount] = useState(null);
  const [cmpCountData, setCmpCount] = useState(null);

  useEffect(() => {
    // Function to fetch data
    const fetchData = async () => {
      try {
        let data = {};
        let countData = {};
        let cmpData = {};

        const response = await fetch('http://172.16.10.110:5500/api/data/compliance');
        const jsonData = await response.json();

        jsonData.testdata.body.hits.hits.map((record, index) => {
          let row = record._source;
          let domain = row.orig;
          let cmp = row.cmpNm;

          if(row?.errors?.violations?.length >1 || row?.errors?.misconfigs?.length > 1) {
            if(!data[domain]) {
              data[domain] = [row];
            } else {
              data[domain].push(row);
            }
          }
          if(!countData[domain]) {
            countData[domain] = {
              violations: (row?.errors?.violations?.length > 1) ? 1 : 0,
              misconfigs: (row?.errors?.misconfigs?.length > 1) ? 1 : 0,
              error: (row?.errors?.misconfigs?.length > 1) || (row?.errors?.violations?.length > 1) ? 1 : 0,
              total: 1
            }
          } else {
            countData[domain] = {
              violations: (row?.errors?.violations?.length > 1) ? ++countData[domain].violations : countData[domain].violations,
              misconfigs: (row?.errors?.misconfigs?.length > 1) ? ++countData[domain].misconfigs : countData[domain].misconfigs,
              error: (row?.errors?.misconfigs?.length > 1) || (row?.errors?.violations?.length > 1) ? ++countData[domain].error : countData[domain].error,
              total: ++countData[domain].total
            }
          }
          if(!cmpData[cmp]) {
            cmpData[cmp] = {
              violations: (row?.errors?.violations?.length > 1) ? 1 : 0,
              misconfigs: (row?.errors?.misconfigs?.length > 1) ? 1 : 0,
              error: (row?.errors?.misconfigs?.length > 1) || (row?.errors?.violations?.length > 1) ? 1 : 0,
              total: 1
            }
          } else {
            cmpData[cmp] = {
              violations: (row?.errors?.violations?.length > 1) ? ++cmpData[cmp].violations : cmpData[cmp].violations,
              misconfigs: (row?.errors?.misconfigs?.length > 1) ? ++cmpData[cmp].misconfigs : cmpData[cmp].misconfigs,
              error: (row?.errors?.misconfigs?.length > 1) || (row?.errors?.violations?.length > 1) ? ++cmpData[cmp].error : cmpData[cmp].error,
              total: ++cmpData[cmp].total
            }
          }
        });

        setDomainRecordsMap(data);
        setCount(countData);
        setCmpCount(cmpData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    // Call the fetch data function
    fetchData();
  }, []); // Empty dependency array to run effect only once on component mount

  if (!domainRecordsMap) {
    return <h3>Loading...</h3>;
  } else {
    return (

      <div style={appStyle}>
         <Header />
         <div style={contentStyle}>
          <Sidebar />
          <div className="App">
            <h1>Domains</h1>
            <Table data={{domainRecordsMap, countData}} />
            {/* <div style={{display: "flex"}}>
              <SimpleCharts countData={countData}/>
              <CMPCharts countData={cmpCountData}/>
            </div>
            <div style={{display: "flex"}}>
              <SimpleCharts countData={countData}/>
              <SimpleCharts countData={countData}/>
            </div> */}
          </div>
        </div>
          
      </div>
    );
  }
}

const appStyle = {
  height: "100vh", // Set the height of the App component to 100% of the viewport height
  display: "flex",
  flexDirection: "column",
};


const contentStyle = {
  display: "flex",
  flex: 1, // Allow the Main component to take up the remaining height
};

export default App;
