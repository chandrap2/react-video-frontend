import React from 'react'

const videocard = (props) => {
    return (
        <div className="result">
            <div className="acc_header">
                {/* <img src={props.acc.pic}/> */}
                <h2>{`${props.acc.name} (@${props.acc.screen_name})`}</h2>
                {/* <div className="collapse manipulator" onClick={props.collapseHandler}></div> */}
            </div>
            <br/>
            <div className="vid-container">
                {/* {
                    props.vids.map(vid => 
                        <vid
                        src={vid.url} 
                        poster={vid.thumbnail} 
                        preload="none" 
                        width="200px" 
                        height="200px" 
                        controls></vid>
                    )
                } */}
                Da vids
            </div>
        </div>
    );
}

export default videocard;