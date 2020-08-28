import React from 'react'
import { dashboardStates, tabToggleStyle } from "../../util"

const tabs = props => {
    if (props.dashboardState === dashboardStates.TL) {
        return (
            <div id="tabs">
                <div id="tab-timeline" className="manipulator"
                    style={tabToggleStyle}>Timeline</div>
                <div id="tab-accs" className="manipulator"
                    onClick={props.switchHandler}>Accounts</div>
            </div>
        );
    } else { // set on accs dashboard
        return (
            <div id="tabs">
                <div id="tab-timeline" className="manipulator"
                    onClick={props.switchHandler}>Timeline</div>
                <div id="tab-accs" className="manipulator"
                    style={tabToggleStyle}>Accounts</div>
            </div>
        );
    }
}

export default tabs;
