import React, { Component } from "react";

class roomTable extends Component {
	constructor() {
        super();
        
        this.state={rooms:[
            { id: 1, roomName: 'Test 1', pNumb: 1, state: 'Public' },
            { id: 2, roomName: 'Test 2', pNumb: 2, state: 'Public' },
            { id: 3, roomName: 'Test 3', pNumb: 3, state: 'Private' },
            { id: 4, roomName: 'test 4', pNumb: 4, state: 'Private' }

        ]}
    }
    renderTableData() {
        return this.state.rooms.map((room, index) => {
           const { id, roomName, pNumb, state } = room //destructuring
           return (
              <tr key={id}>
                 <td><button>Join!</button></td>
                 <td>{roomName}</td>
                 <td>{pNumb}</td>
                 <td>{state}</td>
              </tr>
           )
        })
    }

	render() {
		return (
			<React.Fragment>
				<table>
                    <th>
                        <tr></tr>
                        <tr>Room Name</tr>
                        <tr>Number of players</tr>
                        <tr>State</tr>
                    </th>
                        <tbody>{this.renderTableData}</tbody>
                </table>
			</React.Fragment>
		);
	}
}

export default roomTable;

ReactDOM.render(roomTable, document.getElementById("roomTableID"));
