import React from 'react';

const user = (props) => {
    let elem;

    console.log(props.signedIn, typeof props.signedIn);
    if (props.signedIn) {
        elem = (
            <div id="signed-in" className="nonclickable" style={{}}>
                Signed in as
                <img id="user-pic" style={{}} />
            </div>
        );
    } else {
        elem = (
            <div id="login-btn" className="big-button" style={{}}>Sign in</div>
        );
    }

    return <div id="sign-in">{ elem }</div>;
}

export default user;
