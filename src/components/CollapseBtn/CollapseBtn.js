import React from 'react';

const collapseBtn = props => {
    return (
        <button 
        className="collapse manipulator" 
        onClick={props.handler} />
    );
}

export default collapseBtn;
