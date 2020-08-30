import React, { Component } from 'react';
import VideoCard from '../VideoCard/VideoCard';
import Loading from '../Loading/Loading'

export default class Timeline extends Component {
    constructor(props) {
        super(props);
        
        let toggles = [];

        props.tweets.forEach(tweet => toggles.push(false));

        this.state = { toggleState: toggles };
    }

    collapseHandler = i => {
        let updated = this.state.toggleState.map(
            (elem, index) => (index === i) ? !elem : false);
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
