import React from 'react';
import { create } from 'ipfs-http-client';

const ipfs = create({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' });

class App extends React.Component {
  state = {
    file: null,
    ipfsHash: null,
  };

  handleFileUpload = (event) => {
    this.setState({ file: event.target.files[0] });
  };

  handleUpload = async () => {
    const { file } = this.state;

    if (!file) {
      return;
    }

    const buffer = await file.arrayBuffer();
    const result = await ipfs.add(buffer);
    this.setState({ ipfsHash: result.cid.toString() });
  };

  render() {
    const { file, ipfsHash } = this.state;

    return (
      <div>
        <h1>IPFS Image Uploader</h1>
        <input type="file" onChange={this.handleFileUpload} />
        <button onClick={this.handleUpload}>Upload to IPFS</button>
        {ipfsHash && (
          <div>
            <p>IPFS Hash:</p>
            <a href={`https://ipfs.io/ipfs/${ipfsHash}`}>{ipfsHash}</a>
          </div>
          
        )}
      </div>
      
    );
  }
}

export default App;
