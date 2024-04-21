import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from "react";

function App() {
  const [apiResponse, setAPIResponse] = useState('');

  useEffect(()=>{
      fetch('http://localhost:9000/testAPI')
      .then(res=>res.text())
      .then(res=>setAPIResponse(res));
  },[]);

  return (
    <div className="App">
        <p>{apiResponse}</p>
    </div>
  );
}

export default App;
