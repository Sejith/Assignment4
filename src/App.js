import "./App.css";
import React, { useState, useEffect } from "react";
import axios from "axios";

function camelCase(str) {
  return str.replace(/\b(\w)/g, (match, firstChar) => {
    return firstChar.toUpperCase();
  });
}

function App() {
  const [userData, setUserData] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("All");
  

  useEffect(() => {
    axios
      .get("https://course-api.com/react-store-products")
      .then((res) => setUserData(res.data));
  }, []);
  
  const handleCompanyFilter = (company) => {
    setSelectedCompany(company);
  };
  
  const filteredUserData = selectedCompany === "All" ? userData : userData.filter(item => item.company.toLowerCase() === selectedCompany.toLowerCase());

  return (
    <div className="App">
      <div className="left">
        <input type="text" placeholder="search..." required />
        <h5 className="company">Company</h5>
        <h5 className="companyList"><button onClick={() => handleCompanyFilter("All")}>All</button></h5>
        <h5 className="companyList"><button onClick={() => handleCompanyFilter("Ikea")}>Ikea</button></h5>
        <h5 className="companyList"><button onClick={() => handleCompanyFilter("Marcos")}>Marcos</button></h5>
        <h5 className="companyList"><button onClick={() => handleCompanyFilter("Caressa")}>Caressa</button></h5>
        <h5 className="companyList"><button onClick={() => handleCompanyFilter("Liddy")}>Liddy</button></h5>
      </div>
      <div className="right">
        {filteredUserData.map((item, index) => (
          <div className="card" key={index}>
            <img src={item.image} alt={item.name} />
            <h5 className="model">{camelCase(item.name)}</h5>
            <h5 className="price">{item.price}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
