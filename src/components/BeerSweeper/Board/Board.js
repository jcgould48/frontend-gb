import React, { Component } from 'react'
import Row from "../Row/Row"


class Board extends Component {
   constructor(props){
       super(props)
       this.state=
       {
           rows: this.createBoard(props)
       }
   } 

   componentWillReceiveProps(nextProps) {
    if (
      this.props.openCells > nextProps.openCells ||
      this.props.columns !== nextProps.columns
    ) {
      this.setState({
        rows: this.createBoard(nextProps)
      });
    }
  }


    createBoard = props => {
        let board = [];
        for(let i = 0; i<props.rows; i++){
            board.push([]);

            for(let j=0; j<props.columns; j++){
                board[i].push({
                    x: j,
                    y: i,
                    count: 0,
                    isOpen: false,
                    hasBeer: false,
                    hasFlag: false,
                })
            }
           
            }
            for (let i=0; i<props.beers; i++){
                let randomRow = Math.floor(Math.random()*props.rows)
                let randomColumn = Math.floor(Math.random()*props.columns)

                let cell =board[randomRow][randomColumn]
                // console.log(cell)
                if(cell.hasBeer){
                    i--;
                } else {
                    cell.hasBeer = true;
                }
        }
        return board;
    }

    // flag = cell => {
    //     if (this.props.status === "ended") {
    //       return;
    //     }
    //     let rows = this.state.rows;
    
    //     cell.hasFlag = !cell.hasFlag;
    //     this.setState({ rows });
    //     this.props.changeFlagAmount(cell.hasFlag ? -1 : 1);
    //   };

    open = cell => {
       if (this.props.status === "ended"){
           return;
       }
       
        let asyncCountBeers = new Promise(resolve =>{
            let beers =this.handleBeers(cell);
            resolve(beers);
        })
        asyncCountBeers.then(numberOfBeers=>{
            
            let rows = this.state.rows;
            let current = rows[cell.y][cell.x]
    
            if(current.hasBeer && this.props.openCells === 0){
                let newRows =this.createBoard(this.props);
                this.setState({
                    rows:newRows
                } ,()=>{
                    this.open(cell);
                })
            } else {
                if(!current.isOpen){
                    this.props.onCellClick(); 
    
                    current.isOpen = true;
                    current.count = numberOfBeers
                    this.setState({rows})

                    if(!current.hasBeer && numberOfBeers===0){
                        this.openAroundCell(cell);
                    }
                    if (current.hasBeer && this.props.openCells !==0){
                        this.props.endGame();
                    }
                }
            }
        })
        
       
    }

    handleBeers = cell => {
        let beersInProx = 0;
        for(let row = -1 ; row<=1; row++){
            for(let col =-1; col <=1; col++){
                if (cell.y + row >=0 && cell.x +col >= 0){
                    if(cell.y +row <this.state.rows.length &&
                        cell.x + col <this.state.rows[0].length
                        ){
                            if(this.state.rows[cell.y+row][cell.x+col].hasBeer &&
                                !(row===0 & col === 0)
                                ){
                                beersInProx++;
                            }
                        }
                }
            }
        }
        return beersInProx
    };

    openAroundCell = cell => {
        let rows = this.state.rows;
        for(let row=-1; row <= 1; row++){
            for (let col =-1; col<=1; col++){
                if (cell.y + row >=0 && cell.x +col >= 0){
                    if(cell.y +row <rows.length &&
                        cell.x + col <rows[0].length
                        ){
                            if(
                                !rows[cell.y +row][cell.x+col].hasBeer && 
                                !rows[cell.y +row][cell.x+col].isOpen
                                ){
                                    this.open(rows[cell.y+row][cell.x+col])
                                }
                        }
                }
                
            }
        }
    }

    render() {
        let rows = this.state.rows.map((cells, index)=> {
            return (
                
                <Row 
                cells={cells}
                key={index}
                // flag={this.flag}
                open={this.open}
                />
            )
        })
        return (
            <div className="board">
                {rows}
            </div>
            
        )
    }
}

export default Board