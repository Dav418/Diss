import React, { Component } from 'react';
import {passCheck} from '../askForPass';
 
export default ren;
let roomTableVar;
class roomTable extends Component {
    constructor(roomList){
        super(roomList)
        this.state = {
            roomList = [
                {id: 1, roomName: 'test', pNumber: '0', state: 'Private'}
            ]
        }
    }
    render() { 
        return ( 
            <React.Fragment>
                <table id="roomChooseTable">
                    <tbody>
                        <tr>{this.renderTableHeader()}</tr>
                        {this.renderTableData()}
                    </tbody>
                </table>
            </React.Fragment>

        );
    }

    updateList(list){
        this.state.roomList = list;
    }

    renderTableData(){
        return this.state.roomList.map((room,index) =>{
            const {id, roomName, pNumber,state} = room;
            return (
                <tr key ={id}>
                    <td><button onClick={passCheck(roomName,checkState(state) )}>Join</button></td>
                    <td>{roomName}</td>
                    <td>{pNumber}</td>
                    <td>{state}</td>
                </tr>
            )
        })
    }
    checkState(s){
        return s === 'Private' ? true : false;
    }
    renderTableHeader(){
        let header = Object.keys(this.state.roomList[0]);
        return header.map((key,index)=>{
            <th key ={index}>{key.toUppderCase()}</th>
        }
        )}
    }
 
export default roomTable;