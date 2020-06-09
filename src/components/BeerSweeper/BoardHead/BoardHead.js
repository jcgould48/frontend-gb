import React from "react"
import PropTypes from "prop-types"


const BoardHead = props => {
    // let minutes = Math.floor(props.time/60);
    // let seconds = props.time-minutes* 60 || 0;

    // let formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

    // let time = `${minutes}:${formattedSeconds}`

    let status =
    props.status === "running" || props.status === "waiting" ? (
        <span className="iconify" data-icon="emojione-v1:beer-mug" data-inline="false"></span>
    ) : (
        <span className="iconify" data-icon="emojione-v1:clinking-beer-mugs" data-inline="false"></span>
    );

    return (
        <div className="board-head">
            {/* <div className="flag-count">{props.flagsUsed}</div> */}
            <button className="reset" onClick={props.handleReset}>
                {status} 
            </button>
            {/* <div className="timer">{time}</div> */}
        </div>
    )
}

BoardHead.propTypes = {
    // time: PropTypes.number.isRequired,
    // flagsUsed: PropTypes.number.isRequired
  };

export default BoardHead;