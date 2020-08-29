import React, { Component } from 'react';
import User from "./components/User/User"
import VideoCard from "./components/VideoCard/VideoCard"
import Tabs from "./components/Tabs/Tabs"
import Timeline from "./components/Timeline/Timeline"

import { sendHttpGetReq,
          signInStates,
          dashboardStates,
          getVids
        } from "./util.js"

import logo from './logo.svg';
// import './App.css';

class App extends Component {
  state = {
    signInState: signInStates.VERIFYING,
    signInWindow: null,
    user: null,
    dashboardState: dashboardStates.TL,

    accounts: null,
    timelineTweets: null
  }

  /**
   * Handler to open a browser window with the specified url
   * 
   * @param {URL} url 
   */
  openSignInWindow = url => {
    let params = "menubar=no,toolbar=no,width=600,height=600";
    this.setState({ signInWindow: window.open(url, "SignIn", params) });
  }

  /**
   * Handler to close the login window
   *
   */
  closeSignInWindow = () => this.state.signInWindow.close();

  /**
   * Handler to toggle the dashboard state between Tl and ACCS
   */
  switchDashboard = () => {
    (this.state.dashboardState === dashboardStates.TL) ?
      this.setState({ dashboardState: dashboardStates.ACCS }) :
      this.setState({ dashboardState: dashboardStates.TL })
  }

  /**
   * Handles the login flow
   */
  componentDidMount() {
    sendHttpGetReq("/verify")
    .then(res => (Object.keys(res).length != 0) ?
            res : Promise.reject("Not signed in"))
    .then(res => {
        this.setState(
          {
            user: res,
            signInState: signInStates.SIGNED_IN
          })
    })
    .catch(err => {
      console.log(err);
      this.setState({ signInState: signInStates.SIGNED_OUT });
      
      this.waitForSignIn()
        .then(res => sendHttpGetReq("/verify"))
        .then(res => this.setState(
          {
            user: res,
            signInState: signInStates.SIGNED_IN
          })
        )
        .catch(console.error);
    });

  }
  
  componentDidUpdate(prevProps, prevState) {
    if (this.state.signInState !== prevState.signInState &&
        this.state.signInState === signInStates.SIGNED_IN) {
      console.log("getting timeline");
      
      sendHttpGetReq("/get_timeline")
      .then(tweets => {
        let vids = getVids(tweets);
        let results = tweets.map((tweet, index) =>  {
          return { user: tweet.user, vids: [ vids[index] ] };
        });
        
        this.setState({ timelineTweets: results });
        console.log("received timeline");
      });
    }
  }
  
  render() {
    return (
      <div>
        <div id="title"> <h1>I want this video</h1> </div>
        
        <User
          user={this.state.user} 
          signInState={this.state.signInState} 
          signInWindowHandlers={
            {open: this.openSignInWindow, 
            close: this.closeSignInWindow}}
        />

        <Tabs
          dashboardState={this.state.dashboardState} 
          switchHandler={this.switchDashboard}
        />

        {this.state.timelineTweets &&
        this.state.dashboardState === dashboardStates.TL ? 
          <Timeline tweets={this.state.timelineTweets} /> : null}
        
      </div>
    );
  }

  waitForSignIn() {
    return new Promise(res => {
      let checkCookie = setInterval(async () => {

        sendHttpGetReq("/is_logged_in")
          .then(response => {
            if (response.signedIn) {
              this.closeSignInWindow();
              clearInterval(checkCookie);
              res();
            }
          });
      }, 1000);
    });
  }
}

export default App;
