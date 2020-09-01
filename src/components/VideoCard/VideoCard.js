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
        <div style={{ display: "block" }}>
            <div className="result">
                <div className="acc_header">
                    <img src={props.vidsObj.acc.profile_image_url_https}/>
                    <h2>{`${props.vidsObj.acc.name} (@${props.vidsObj.acc.screen_name})`}</h2>
                    <CollapseBtn handler={() => props.collapseHandler(props.index)} />
                </div>
                <br/>
                {/* <div className="vid-container"
                    style={{ display : (props.isToggled ? "" : "none") }}
                >{vidsRendered}</div> */}
                <div className="vid-container">{vidsRendered}</div>
            </div>
        </div>

    );
}

export default videocard;