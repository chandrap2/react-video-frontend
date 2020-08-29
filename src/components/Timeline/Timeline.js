import React, { Component } from 'react';
import VideoCard from '../VideoCard/VideoCard';
import Loading from '../Loading/Loading'

import { sendHttpGetReq, getVids } from '../../util';

class Timeline extends Component {
    state = {
        tweetsToggled: null
    }

    render() {
        return (this.props.tweets) ?
            this.props.tweets : <Loading />;
    }
}

// class Timeline extends Component {
//     state = {
//         timelineTweets: null
//     }
    
//     componentDidMount() {
//         if (!this.state.timelineTweets) {
//             sendHttpGetReq("/get_timeline")
//             .then(tweets => {
//                 let vids = getVids(tweets);

//                 let results = tweets.map((tweet, index) => {
//                     return ( <VideoCard
//                                 user={tweet.user}
//                                 vids={[ vids[index] ]}
//                                 key={index}
//                             /> );
//                 });

//                 this.setState({ timelineTweets: results });
//             });
//         }
//     }

//     render() {
//         if (this.state.timelineTweets) {
//             return (
//                 <div id="timeline-results">
//                     {this.state.timelineTweets}
//                 </div>
//             );
//         } else {
//             return <p className="nonclickable">Loading</p>;
//             // return <h1>a</h1>;
//         }
//         // return <h1>h1</h1>
//     }
// }

// export default Timeline;
export default Timeline;
