import React, { Component } from 'react'
import VideoCard from "../VideoCard/VideoCard"

import { accVidFetchStates } from "../../util"

class Accounts extends Component {
    constructor(props) {
        super(props);

        this.state = {toggleState: null, currPage: 0, maxPage: 0 };
    }

    incrementPage = () => {
        if (this.state.currPage + 1 > this.state.maxPage) {
            this.setState({ currPage: 0 });
        } else {
            this.setState({ currPage: this.state.currPage + 1 });
        }
        
        let toggles = [false, false, false, false, false, false, false, false];
        this.setState({ toggleState: toggles });
    }
    
    derementPage = () => {
        if (this.state.currPage - 1 < 0) {
            this.setState({ currPage: this.state.maxPage });
        } else {
            this.setState({ currPage: this.state.currPage - 1 });
        }

        let toggles = [false, false, false, false, false, false, false, false];
        this.setState({ toggleState: toggles });
    }

    collapseHandler = i => {
        let updated = this.state.toggleState.map(
            (elem, index) => (index === i) ? !elem : false);
        this.setState({ toggleState: updated });
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (!this.props.accVidsLoaded &&
    //         this.props.accVids) {

    //         this.setState({ accVidsLoaded: true });
            
    //         let toggles = [false, false, false, false, false, false, false, false];
    //         this.setState({ toggleState: toggles })
    //     }
        
    //     if (!this.prevProps.accVidsLoaded &&
    //         this.props.accVidsLoaded) {

    //         let len = this.props.accVids.length;
    //         let maxPage = (len - len % 8) / 8;
    //         this.setState({ maxPage: maxpage });
    //     }
    // }
    
    render() {
        let accsRendered = null;
        
        if (this.props.accVidsLoaded == 
            (accVidFetchStates.FETCHING ||
            accVidFetchStates.FETCHED)) {
            accsRendered = this.props.accVids.slice(
                this.state.currPage * 8, (this.state.currPage * 8) + 8
            ).map((vidsObj, index) =>
                <VideoCard
                    key={index}
                    index={index}
                    vidsObj={vidsObj}
                    collapseHandler={this.collapseHandler}
                    isToggled={this.state.toggleState[index]}
                />
            );
        }

        return (
            <div id="accs">
                <div id="input">
                    {/* <p id="loading-accs" class="nonclickable">Loading</p>
                    <p id="no-accs" class="nonclickable">No accounts found</p> */}
                    <button id="retrieve"
                            class="big-button"
                            onClick={this.props.retrieveHandler}>Retrieve videos</button>
                </div>

                <div id="flip-page">
                    <button class="flip manipulator" onClick={this.derementPage} id="left"/>
                    <button class="flip manipulator" onClick={this.incrementPage} id="right"/>
                </div>

                <div id="results">{accsRendered}</div>
            </div>
        );
    }
}

export default Accounts;
