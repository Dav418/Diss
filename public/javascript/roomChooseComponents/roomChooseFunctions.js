function populateTable(roomList) {
	$(".roomTableDiv").empty();

	if (roomList.length == 0) {
		var txt = $("<p></p>").text("No rooms! Why dont you make one?");
		$("#roomTableDiv").append(txt);
	} else {
		var number_of_rows = roomList.length;
		var table_body = $("<table/>");
		table_body.addClass("roomTableClass");

		var table_head = $("<tr>");
		var head_data1 = $("<th>").text("   ");
		table_head.append(head_data1);

		var head_data2 = $("<th>").text("Room Name");
		table_head.append(head_data2);

		var head_data3 = $("<th>").text("Player Number");
		table_head.append(head_data3);

		var head_data4 = $("<th>").text("State");
		table_head.append(head_data4);

		table_body.append(table_head);

		for (var i = 0; i < number_of_rows; i++) {
			var row = $("<tr>");
			table_body.append(row);

			var data = $("<td>");
			data.append(
				createJoinButton(
					roomList[i].roomName,
					findRoomState(roomList[i].roomState)
				)
			);
			row.append(data);

			var data2 = $("<td>");
			data2.append(roomList[i].roomName);
			row.append(data2);

			var data3 = $("<td>");
			data3.append(roomList[i].pNumb);
			row.append(data3);

			var data4 = $("<td>");
			data4.append(roomList[i].roomState);

			row.append(data4);
		}

		$("#roomTableDiv").append(table_body);
		var txt = $("<p></p>").text("Alternatively, make one below!");
		$("#roomTableDiv").append(txt);
	}
}

function findRoomState(i) {
	if (i == "Private") {
		return true;
	} else {
		return false;
	}
}

function createJoinButton(room, state) {
	return $("<button/>", {
		text: "Join",
		id: "btn_Join",
		click: function () {
			askForPassword(room, state);
		},
	});
}
