import React from 'react'
import CollapseBtn from '../CollapseBtn/CollapseBtn'

import { getLargerProfPic } from "../../util"

const videocard = props => {
    let vidsRendered = null;
    if (props.isToggled) {
        vidsRendered = props.vidsObj.vids.map((vid, index) => {
            return <video
            src={vid.vid}
            poster={vid.thumbnail}
            width="200"
            height="200"
            key={index}
            controls
            />;
        });
    }
    
    return (
        <div style={{ display: "block", marginBottom: (props.lastCard ? "0px" : "") }}>
            <div className="result">
                <div className="acc_header">
                    <img src={props.vidsObj.acc.profile_image_url_https}/>
                    <h2>{props.vidsObj.acc.name + " "}
                        <a href={`https://twitter.com/${props.vidsObj.acc.screen_name}`}>
                            (@{props.vidsObj.acc.screen_name})
                        </a>
                    </h2>
                    <CollapseBtn handler={() => props.collapseHandler(props.index)} />
                </div>
                <br/>
                <div className="vid-container">{vidsRendered}</div>
            </div>
        </div>

    );
}

export default videocard;