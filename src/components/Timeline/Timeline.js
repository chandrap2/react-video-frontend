import React, { Component } from 'react';
import VideoCard from '../VideoCard/VideoCard';
import Loading from '../Loading/Loading'

import { sendHttpGetReq, getVids } from '../../util';

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        
        let toggles = [];

        props.tweets.forEach(tweet => toggles.push(false));

        this.state = { toggleState: toggles };
    }

    collapseHandler = i => {
        let updated = [...this.state.toggleState];
        console.log("current: ", updated);
        updated[i] = !updated[i];
        console.log("updated: ", updated);
        // console.log(this.state.toggleState);
        this.setState({ toggleState: updated });
    }

    render() {
        return (this.props.tweets) ?
            this.props.tweets.map(
                (tweet, index) => (
                    <VideoCard 
                        key={index} 
                        index={index} 
                        user={tweet.user} 
                        collapseHandler={this.collapseHandler}
                        vids={this.state.toggleState[index] ? tweet.vids : null}
                    />)
            ) : <Loading />;
    }
}
