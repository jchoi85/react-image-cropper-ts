import * as React from 'react';
import './App.css';
import { ReactImageCropperTs } from "./react-image-cropper-ts";

import logo from './logo.svg';

class App extends React.Component {
  onGetBlobFile(blobFile: File){
    console.log(blobFile)
  }

  public render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.tsx</code> and save to reload.
        </p>
        <ReactImageCropperTs onGetBlobFile={this.onGetBlobFile} placeholderImage="" aspect={1} />
      </div>
    );
  }
}

export default App;
