import React, { Component } from 'react'
import VideoCard from "../VideoCard/VideoCard"
import Loading from "../Loading/Loading"

import { accVidFetchStates } from "../../util"

class Accounts extends Component {
    constructor(props) {
        super(props);

        if (props.accVidsLoaded === accVidFetchStates.LOADING_ACCS ||
            props.accVidsLoaded === accVidFetchStates.NOT_FETCHED) {
            
            this.state = {
                toggleState: null,
                currPage: 0,
                pages: 1,
            }
        } else {
            let len = this.props.accVids.length;
            let pages = (len % 7 == 0) ?
                len / 7 : Math.floor(len / 7) + 1;

            this.state = {
                toggleState: [false, false, false, false, false, false, false],
                currPage: 0,
                pages: pages,
            }
        }
    }


    incrementPage = () => {
        this.setState({
            currPage: (this.state.currPage + 1 == this.state.pages) ?
            0 : this.state.currPage + 1
        });
        
        let toggles = [false, false, false, false, false, false, false];
        this.setState({ toggleState: toggles });
    }
    
    decrementPage = () => {
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
                <button className="flip manipulator" onClick={this.decrementPage} id="left">
                    
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 512 512" className="arrow" xmlSpace="preserve">
                                        <path id="arrow" d="M492,236H68.442l70.164-69.824c7.829-7.792,7.859-20.455,0.067-28.284c-7.792-7.83-20.456-7.859-28.285-0.068
                        l-104.504,104c-0.007,0.006-0.012,0.013-0.018,0.019c-7.809,7.792-7.834,20.496-0.002,28.314c0.007,0.006,0.012,0.013,0.018,0.019
                        l104.504,104c7.828,7.79,20.492,7.763,28.285-0.068c7.792-7.829,7.762-20.492-0.067-28.284L68.442,276H492
                        c11.046,0,20-8.954,20-20C512,244.954,503.046,236,492,236z"/>
                    </svg>

                </button>
                <button className="flip manipulator" onClick={this.incrementPage} id="right">
                    
                    <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
                        viewBox="0 0 512 512" className="arrow" xmlSpace="preserve">
                                        <path d="M506.134,241.843c-0.006-0.006-0.011-0.013-0.018-0.019l-104.504-104c-7.829-7.791-20.492-7.762-28.285,0.068
                    c-7.792,7.829-7.762,20.492,0.067,28.284L443.558,236H20c-11.046,0-20,8.954-20,20c0,11.046,8.954,20,20,20h423.557
                    l-70.162,69.824c-7.829,7.792-7.859,20.455-0.067,28.284c7.793,7.831,20.457,7.858,28.285,0.068l104.504-104
                    c0.006-0.006,0.011-0.013,0.018-0.019C513.968,262.339,513.943,249.635,506.134,241.843z"/>
                    </svg>

                </button>
                <span>Page {this.state.currPage + 1} / {this.state.pages} </span>
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
                        lastCard={index == 7}
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
