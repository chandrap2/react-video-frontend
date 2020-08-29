import React from 'react'

const videocard = (props) => {
    return (
        <div style={{ display: "block" }}>
            <div className="result">
                <div className="acc_header">
                    <img src={props.user.profile_image_url_https}/>
                    <h2>{`${props.user.name} (@${props.user.screen_name})`}</h2>
                    {/* <div className="collapse manipulator" onClick={props.collapseHandler}></div> */}
                </div>
                <br/>
                <div className="vid-container">
                    {props.vids.map((vid, index) => {
                        return <video 
                                    src={vid.vid}
                                    poster={vid.thumbnail}
                                    width="200"
                                    height="200"
                                    key={index}
                                    controls
                                />
                    })}
                </div>
            </div>
        </div>

    );
}

export default videocard;