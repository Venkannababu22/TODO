import { useState } from 'react';

import './App.css';

function App() {
  const [text, setText] = useState("");
  const [data, setData] = useState([]);
  const [status, setStatus] = useState([])
  const [isClicked, setIsClicked] = useState(false);
  
  let bool = true;

  const addText = (e) => {
    setText(e.target.value);
  }

  const addDataToTable = () => {

    if(text === ""){
      alert("Please enter the task description")
      return;
    }
    setIsClicked(true)
    setData([...data, text]);
    setStatus([...status, "Pending"])
    setText("");
  };

  const deleteRow = (index) => {
    setData(data.filter((_, i) => i !== index));
    setStatus(status.filter((_, i) => i !== index));
    if (data.length === 1) {
      setIsClicked(false);
    }
  };
  

  const handleFinish = (index) => {
    const newStatus = [...status];
    // newStatus[index] = newStatus[index] === "Pending" ? "Completed" : "Pending"; 
    newStatus[index] = "Completed"; 
    setStatus(newStatus);
    bool = false;
  };
 
 return (
    <div className='container'>
      <h2 className='title'>TO DO App</h2>
      <div className='textSave'>
        <input className='textArea' type='text' placeholder='Enter the task here' value={text} onChange={addText}/>
        <button className='saveButton' onClick={addDataToTable}>Add</button>
      </div>
      <table>
        <thead>
          { isClicked &&
          <tr className='tableHeadRow'>
              <th id='one'>S.no</th>
              <th id='two'>Todo Item</th>
              <th id='three'>Status</th>
              <th id='four'>Actions</th>
          </tr>
          }
        </thead>
        <tbody>
        {data &&
            data.map((item, i) => (
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{item}</td>
                <td>{status[i]}</td>
                <td className='hover'>
                  <button className='btn' onClick={() => deleteRow(i)}>Delete</button>
                  {bool &&  
                    <button className='btn1' onClick={() =>handleFinish(i)}>Finished</button>
                  }
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
