import React, { useState, useEffect, useRef  } from 'react';
import { setCookie, getCookie, deleteCookie } from './library/cookieUtils';
import { generateUniqueKey } from './library/util';
// import logo from './logo.svg';
import './App.css';
import { useWebSocket } from './Context/WebSocketContext';

function App() {
  const { isServerConnected, setIsServerConnected, 
          alertMessage, setAlertMessage, 
            machines, setMachines, key, setKey, socketRef } = useWebSocket();
  //const socketRef = useRef(null);
  const timeToWait = 15; // Set the initial countdown value
  //const [isServerConnect, setIsServerConnect] = useState(false); // State to hold the current countdown value
  const [countdown, setCountdown] = useState(0); // State to hold the current countdown value
  const [isFormConnectValid, setIsFormConnectValid] = useState(false); // State to hold the current countdown value
  const [isConnect, setIsConnect] = useState(false); // State to hold the current countdown value
  //const [key, setKey] = useState('');
  const [command, setCommand] = useState('');
  const [selectedMachines, setSelectedMachines] = useState([]);
  const [commandsList, setCommandsList] = useState([]);
  //const [alertMessage, setAlertMessage] = useState('');

  const [runCommand, setRunCommand] = useState(false);
  const [stopCommand, setStopCommand] = useState(false);
  
  useEffect(() => {
    const managerKey = getCookie('manager_key');
    if (managerKey) {
      setKey(managerKey);
    }
  }, []);

  // Effect to decrease the countdown every second
  useEffect(() => {
    if (countdown <= 0) {
      setIsFormConnectValid(false);
      return; // If countdown is 0 or less, stop the effect
    }

    const interval = setInterval(() => {
      setCountdown((prevCountdown) => {
        if (prevCountdown <= 0) {
          setIsFormConnectValid(false);
          clearInterval(interval); // Clear the interval if countdown reaches 0
          return 0; // Set countdown to 0 if it reaches 0
        }
        //console.log("Wait for next connection: ", countdown);
        return prevCountdown - 1; // Decrease countdown by 1
      });
    }, 1000); // Update countdown every second

    // Clear interval when the countdown reaches 0 or the component is unmounted
    return () => {
      clearInterval(interval);
    };
  }, [countdown]); // Effect runs whenever countdown changes

  const handleGenerateKey = () => {
    // Logic for generating the key
    setIsConnect(false);
    setKey(generateUniqueKey());

  };

  function startCountdown() {
    console.log("resiger_manager");
    socketRef.current.emit('register_manager', { key: key });
  }

  const handleConnect = (e) => {
    //e.preventDefault(); // Prevent form from submitting

    const keyInput = document.getElementById('keyInput'); // Get input element

    // Trigger HTML5 validation
    if (keyInput.checkValidity()) {
      e.preventDefault();
      // If input is valid, continue with the logic
      //console.log('Form is valid. Connecting with key:', key);
      // Add your socket connection or other logic here
      setIsFormConnectValid(true);
      if(isConnect) {
        setCookie("manager_key", key);
        setCountdown(timeToWait);
        setIsConnect(false);
        startCountdown();
      }
    } else {
      setIsFormConnectValid(false);
      setCountdown(0);
      console.log('Input is invalid. Please enter a key with at least 50 characters.');
    }
  };


  const handleCommand = (e) => {
    e.preventDefault();

    if(runCommand) {
      handleRun();
    } else if(stopCommand) {
      handleStop();
    }

  };

  const handleRun = () => {
    
    if(runCommand) {
      setRunCommand(false);
      // Logic to run the command
      if (command && selectedMachines.length) {

        socketRef.current.emit('send-command', {
            'client_ids': selectedMachines,
            'miner_command': command,
            'action': 1  //execute
        });

        //add to command list from right
        setCommandsList([
          ...commandsList,
          { command, machines: selectedMachines.join(', '), id: Date.now() }
        ]);
        //setCommand('');
        //setSelectedMachines([]);
      }
    }
    setRunCommand(false);
  };

  const handleStop = () => {

    if(stopCommand) {
      setStopCommand(false);

      socketRef.current.emit('send-command', {
          'client_ids': selectedMachines,
          'miner_command': command,
          'action': 2  //execute
      });
    }
    setStopCommand(false);
  };

  const handleRunFromList = (id) => {
    const machine = commandsList.find((command) => command.id === id);

    if(id && machine) {
      const selectedMachines = machine.machines.split(', ');

      socketRef.current.emit('send-command', {
          'client_ids': selectedMachines,
          'miner_command': machine.command,
          'action': 1  //execute
      });
    }

  };

  const handleStopFromList = (id) => {
    const machine = commandsList.find((command) => command.id === id);

    if(id && machine) {
      const selectedMachines = machine.machines.split(', ');

      socketRef.current.emit('send-command', {
          'client_ids': selectedMachines,
          'miner_command': machine.command,
          'action': 2  //execute
      });
    }

  };

  const handleDelete = (id) => {
    setCommandsList(commandsList.filter(item => item.id !== id));
    //window.socket.emit('deleteCommand', { machines: selectedMachines.join(', ') });
  };

  return (
    <>
      
      
      <div className="container my-4">

        <h2 className="text-center mb-4">Manage Your Mining Machines</h2>
        {!isServerConnected && (
          <div className="alert alert-warning alert-dismissible fade show" role="alert">
            The server has disconnected.
          </div>
        )}
        {alertMessage && (
          <div className="alert alert-info alert-dismissible fade show" role="alert">
            {alertMessage}
          </div>
        )}
        <div className="row">
          {/* Section 1: Left side - 50% width */}
          <div className="col-md-6">
            <h5>Step 1: Generate your key and connect to the server with your key.</h5>

            {/* Input for key */}
            <form onSubmit={handleConnect}>
              <div className="mb-3">
                <label htmlFor="keyInput" htmlFor="keyInput" className="form-label">
                  Input or generate your key
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="keyInput"
                  value={key}
                  onChange={(e) => setKey(e.target.value)}
                  required
                  minLength="50"
                />
              </div>

              {/* Button to generate key */}
              <div className="mb-3 d-flex">
                <button className="btn btn-primary me-2" onClick={handleGenerateKey}>
                  Generate Key
                </button>
                <button type="submit" className="btn btn-success"
                        disabled={!isServerConnected}
                        onClick={(e) => countdown<=0 && setIsConnect(true)}>
                  {countdown <= 0 ? "Connect" : "Cooldown: " + countdown}
                </button>
              </div>

            </form>

            <h5>Step 2: Download the client software and install it on the computer you want to control.
                <br/>- Copy your key into your machine's config.json file.
                <br/>- Run the software.
            </h5>
            <p>Link Linux, Link Window, Link Macos</p>

            <h5>Step 3: Check if your machine is connected here and run a command to manage it.</h5>
            <form 
              onSubmit={handleCommand}
            >
              {/* Input for command */}
              <div className="mb-3">
                <label htmlFor="commandInput" className="form-label">
                  Send command to your machine
                </label>
                <textarea
                  className="form-control"
                  id="commandInput"
                  rows="4"
                  value={command}
                  required
                  onChange={(e) => setCommand(e.target.value)}
                  placeholder="SRBMiner-MULTI --disable-gpu --algorithm [your algorithm] --pool stratum+tcp://[your server] --wallet [your wallet] --password x"
                ></textarea>
              </div>

              {/* Select box for machines */}
              <div className="mb-3">
                <label htmlFor="machineSelect" className="form-label">
                  Choose your machines
                </label>
                <select
                  className="form-select"
                  id="machineSelect"
                  value={selectedMachines}
                  required
                  onChange={(e) =>
                    setSelectedMachines(
                      Array.from(e.target.selectedOptions, (option) => option.value)
                    )
                  }
                  multiple
                >
                  {machines.map((machine, index) => (
                    <option key={index} value={machine.client_id}>
                      {machine.name}
                    </option>
                  ))}
                </select>
                {!machines.length && (
                    <>
                      <span className="text-muted" style={{fontSize:'12px'}}>You don't have any machine yet</span>
                    </>
                  )}
              </div>

              {/* Buttons to run and stop */}
              <div className="mb-3">
                <button className="btn btn-danger me-2" type="submit" onClick={(e) => setRunCommand(true)}>
                  Run Command
                </button>
                <button className="btn btn-warning" type="submit" onClick={(e) => setStopCommand(true)}>
                  Stop
                </button>
              </div>
            </form>
          </div>

          {/* Section 2: Right side - 50% width */}
          <div className="col-md-6">
            <h5>* Command and Machine Information</h5>

            {/* Table to show the commands, machines, and Run button */}
            <table className="table table-striped table-bordered border">
              <thead>
                <tr>
                  <th>Command</th>
                  <th>Machine</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {commandsList.map((item) => (
                  <tr key={item.id}>
                    <td className="text-break">{item.command}</td>
                    <td>{item.machines}</td>
                    <td>
                      <button
                        className="btn btn-success me-2"
                        onClick={() => handleRunFromList(item.id)}
                      >
                        Run
                      </button>

                      <button
                        className="btn btn-warning me-2 mt-1"
                        onClick={() => handleStopFromList(item.id)}
                      >
                        Stop
                      </button>

                      <button
                        className="btn btn-danger me-2 mt-1"
                        onClick={() => {
                          handleDelete(item.id);
                        }}
                      >
                        Delete
                      </button>

                      <button
                        className="btn btn-info mt-1"
                        onClick={() => alert(`Comming soon`)}
                      >
                        Check
                      </button>
                    </td>

                  </tr>
                ))}
              </tbody>
            </table>
          </div>


        </div>
      </div>

      
    </>
  );
}

export default App;
