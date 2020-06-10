import React from 'react'

const Cell = (props) => {
   let renderCell =()=>{
    if(props.data.isOpen){
        if (props.data.hasBeer){
            return(
                <div
            className="cell open"
            onContextMenu={e => {
              e.preventDefault();
            }}
            onClick={() => props.open(props.data)}
          >
            <span className="iconify" data-icon="emojione-v1:clinking-beer-mugs" data-inline="false"></span>
          </div>
        );
      } else if (props.data.count === 0) {
        return (
          <div
            className="cell open"
            onContextMenu={e => {
              e.preventDefault();
              // props.flag(props.data);
            }}
            onClick={() => props.open(props.data)}
          />
        );
      } else {
        return (
          <div
            className="cell open"
            onContextMenu={e => {
              e.preventDefault();
            }}
            onClick={() => props.open(props.data)}
          >
            {props.data.count}
          </div>
        );
      }
    } 
    // else if (props.data.hasFlag) {
    //   return (
    //     <div
    //       className="cell open-flag"
    //       onContextMenu={e => {
    //         e.preventDefault();
    //         props.flag(props.data);
    //       }}
    //       onClick={() => props.open(props.data)}
    //     >
    //       <span class="iconify" data-icon="dashicons:flag" data-inline="false"></span>
    //     </div>
    //   );
    // } 
    else {
      return (
        <div
          className="cell"
          onContextMenu={e => {
            e.preventDefault();
            // props.flag(props.data);
          }}
          onClick={() => props.open(props.data)}
        />
      );
    }
  };

    return renderCell();
}
 
export default Cell;