import React from 'react';
import './App.css';

export default () => {
  const [toggle, setToggle] = React.useState(true);
  const [fileData, setFileData] = React.useState();
  React.useEffect(() => {
    const listener = (_event: any, data: any) => {
      setFileData(data);
    };
    window.ipcRenderer.on('file-data', listener);
    return () => {
      window.ipcRenderer.removeListener('file-data', listener);
    }
  }, [])
  const openFile = () => {
    window.ipcRenderer.send('sync-job', {
      key: 'open-file',
    });
  }
  return (
    <div className="App">
      <button onClick={() => setToggle(!toggle)}>
        {toggle ? 'Close' : 'Open'}
      </button>
      {toggle && (
        <>
          <h3>React typescript template.</h3>
          <p>Hello, World.</p>
        </>
      )}
      <button onClick={openFile}>选择文件</button>
      <div>
        <pre>
          {JSON.stringify(fileData, null, 2)}
        </pre>
      </div>
    </div>
  )
}