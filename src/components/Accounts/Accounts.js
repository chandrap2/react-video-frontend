import React, { Component } from 'react'
import VideoCard from "../VideoCard/VideoCard"
import Loading from "../Loading/Loading"

import { accVidFetchStates } from "../../util"

class Accounts extends Component {
    state = {
        toggleState: null,
        currPage: 0,
        pages: 1,
    }

    incrementPage = () => {
        this.setState({
            currPage: (this.state.currPage + 1 == this.state.pages) ?
            0 : this.state.currPage + 1
        });
        
        let toggles = [false, false, false, false, false, false, false];
        this.setState({ toggleState: toggles });
    }
    
    derementPage = () => {
        this.setState({
            currPage: (this.state.currPage - 1 < 0) ?
                    this.state.pages - 1 : this.state.currPage - 1
        });

        let toggles = [false, false, false, false, false, false, false];
        this.setState({ toggleState: toggles });
    }

    collapseHandler = i => {
        let updated = this.state.toggleState.map(
            (elem, index) => (index === i) ? !elem : false);
        this.setState({ toggleState: updated });
    }

    componentDidUpdate(prevProps, prevState) {
        console.log("prevprops", prevProps.accVidsLoaded);
        console.log("currprops", this.props.accVidsLoaded);
        console.log("-------------------");

        if (!this.state.toggleState &&
            this.props.accVids &&
            this.props.accVids.length == 7) {
            
            console.log("[accounts.js] first 8 loaded");
            let toggles = [false, false, false, false, false, false, false, false];
            this.setState({ toggleState: toggles });
        }
        
        if ((prevProps.accVidsLoaded == accVidFetchStates.NOT_FETCHED ||
            prevProps.accVidsLoaded == accVidFetchStates.FETCHING) &&
            this.props.accVidsLoaded == accVidFetchStates.FETCHED) {
                console.log("[accounts.js] everything loaded");

                let len = this.props.accVids.length;
                let pages = (len % 7 == 0) ?
                    len / 7 : Math.floor(len / 7) + 1;
                this.setState({ pages: pages });
        }
    }
    
    render() {
        let input = (this.props.accVidsLoaded == accVidFetchStates.LOADING_ACCS ||
                    this.props.accVidsLoaded == accVidFetchStates.FETCHING) ?
            <Loading/> :
            (<button id="retrieve"
            className="big-button"
            onClick={this.props.retrieveHandler}>Retrieve videos</button>);

        let flipper = (this.props.accVidsLoaded == accVidFetchStates.FETCHED) ?
            (<div id="flip-page">
                <button className="flip manipulator" onClick={this.derementPage} id="left" />
                <button className="flip manipulator" onClick={this.incrementPage} id="right" />
            </div>) : null;
        
        let accsRendered = (
            this.props.accVids && this.props.accVids.length > 0) ? 

            this.props.accVids.slice(
                this.state.currPage * 7, (this.state.currPage * 7) + 7
            ).map((vidsObj, index) =>
                <VideoCard
                    key={index}
                    index={index}
                    vidsObj={vidsObj}
                    collapseHandler={this.collapseHandler}
                    isToggled={this.state.toggleState ? 
                        this.state.toggleState[index] : false}
                />
            ) : null;

        return (
            <div id="accs">
                <div id="input">{input}</div>
                {flipper}
                <div id="results">{accsRendered}</div>
            </div>
        );
    }
}

export default Accounts;
