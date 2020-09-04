import React, { Component } from 'react';
import VideoCard from '../VideoCard/VideoCard';
import Loading from '../Loading/Loading'

export default class Timeline extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            toggleState: (props.tweets) ?
                props.tweets.map(() => false) : null}
    }
    
    collapseHandler = i => {
        let updated = this.state.toggleState.map(
            (elem, index) => (index === i) ? !elem : false);
        this.setState({ toggleState: updated });
    }
    
    componentDidMount() { // gets timeline
        this.props.timelineHandler();
    }

    componentDidUpdate(prevProps, prevState) {
        if (!prevProps.tweets && this.props.tweets) {
            let toggles = this.props.tweets.map(tweet => false);
            this.setState({ toggleState: toggles });
        }
    }

    render() {
        return <div id="timeline-results">
            {(this.props.tweets && this.state.toggleState) ?
                this.props.tweets.map(
                    (tweet, index) => (
                        <VideoCard 
                            key={index} 
                            index={index} 
                            vidsObj={tweet} 
                            collapseHandler={this.collapseHandler}
                            isToggled={this.state.toggleState[index]}
                            />)
                    ) : <Loading />}
        </div>;
    }
}
