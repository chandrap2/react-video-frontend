import React from 'react';
import logo from './logo.svg';
// import './App.css';

function App() {
  return (
    <div className="App">

      <div id="title"> <h1>I want this video</h1> </div>

      <div id="sign-in">
        <div id="login-btn" class="big-button" style={{}}>Sign in</div>
        <div id="signed-in" class="nonclickable" style={{}}>
          Signed in as
        <img id="user-pic" style={{}}></img>
        </div>
        <button id="logout-btn" class="big-button" style={{}}>Sign out</button>
      </div>

      <br/>

        <div id="tabs" style={{}}>
          <div id="tab-timeline" class="manipulator"
            style={{color: "#638897", backgroundColor: "#ffffc9", padding: "12px", borderStyle: "solid", cursor: "auto"}}>
            Timeline</div>

          <div id="tab-accs" class="manipulator">Accounts</div>
        </div>

        <div id="accs" style={{}}>
          <div id="input" style={{}}>
            <p id="loading-accs" class="nonclickable">Loading</p>
            <p id="no-accs" class="nonclickable" style={{}}>No accounts found</p>
            <div id="retrieve" class="big-button" style={{}}>Retrieve videos</div>
          </div>

          <div id="flip-page" style={{}}>
            <div class="flip manipulator" id="left"></div>
            <div class="flip manipulator" id="right"></div>
          </div>

          <div id="results"> </div>
        </div>

        <div id="timeline" style={{}}>
          <p id="loading-timeline" class="nonclickable" style={{}}>
            Loading
    </p>

          <div id="timeline-results"> </div>
        </div>

    </div>
  );
}

export default App;
