import React, { Component } from 'react';
import User from "./components/User/User"
import Tabs from "./components/Tabs/Tabs"
import Timeline from "./components/Timeline/Timeline"
import Accounts from "./components/Accounts/Accounts"

import { sendHttpGetReq,
          signInStates,
          dashboardStates,
          accVidFetchStates,
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

    timelineTweets: null,
    accounts: null,

    accVids: null,
    accVidsLoaded: accVidFetchStates.LOADING_ACCS,
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

  getAccVids = () => {
    let accLimit = Math.min(50, this.state.accounts.length);

    let j = 0;
    let buffer = [];
    this.setState({ accVidsLoaded: accVidFetchStates.FETCHING });

    for (let i = 0; i < accLimit; i++) {
      sendHttpGetReq
      (`/get_vids?acc_name=${this.state.accounts[i].screen_name}&id=${i}`)
      .then(tweets => {
        j++;
        // console.log("getvids", j);

        if (!this.state.accVids) {
          console.log("set accVids");
          this.setState({ accVids: [] });
        }

        let acc = this.state.accounts[i];
        let vids = getVids(tweets.vids);
        
        if (vids.length > 0) {
          let obj = {acc: acc, vids: vids};
          buffer.push(obj);
  
          if (buffer.length == 7 && this.state.accVids.length == 0) {
            // console.log("first 8 loaded");
            this.setState({ accVids: buffer });
            // console.log(this.state.accVids);
            buffer = [];
          }
        }

        if (j == accLimit) {
          this.setState({
            accVids: this.state.accVids.concat(buffer),
            accVidsLoaded: accVidFetchStates.FETCHED
          });
          console.log("received all acc vids");
          console.log(this.state.accVids);
        }
      });
    }
  }

  completeSignIn(user) {
    this.setState(
    {
      user: user,
      signInState: signInStates.SIGNED_IN
    });

    this.getTimeline();
    this.getAccs();
  }

  /** GET TL TWEETS */
  getTimeline() {
    sendHttpGetReq("/get_timeline")
    .then(tweets => {
      let vids = getVids(tweets);
      let results = tweets.map((tweet, index) => {
        return { acc: tweet.user, vids: [vids[index]] };
      });

      this.setState({ timelineTweets: results });
      console.log("received timeline", results.length);
    });
  }

  /** GET FOLLOWED ACCS */
  getAccs() {
    sendHttpGetReq("/get_accs")
    .then(accs => {
      this.setState({ accounts: accs, accVidsLoaded: accVidFetchStates.NOT_FETCHED });
      console.log("received accs", this.state.accounts);
    });
  }

  /**
   * Handles the login flow
   */
  componentDidMount() {
    /** SIGN-IN FLOW */
    sendHttpGetReq("/verify")
    .then(res => (Object.keys(res).length != 0) ? res : Promise.reject("Not signed in"))
    .then(res => this.completeSignIn(res))
    .catch(err => {
      console.log(err);
      this.setState({ signInState: signInStates.SIGNED_OUT });

      this.waitForSignIn()
      .then(res => sendHttpGetReq("/verify"))
      .then(res => this.completeSignIn(res))
      .catch(console.error);
    });
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

        {/* {this.state.dashboardState === dashboardStates.TL ?
          <Timeline tweets={this.state.timelineTweets} /> : null} */}

        {this.state.dashboardState === dashboardStates.TL ?
          <Timeline tweets={this.state.timelineTweets} /> : 
          <Accounts
            accVidsLoaded={this.state.accVidsLoaded}
            accVids={this.state.accVids}
            retrieveHandler={this.getAccVids} />}
        
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
