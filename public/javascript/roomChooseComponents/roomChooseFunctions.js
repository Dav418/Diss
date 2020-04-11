function hideShowPasswordFeild(box) {
	document.getElementById("roomPass").readOnly = !box.checked;
}

function checkForm(form) {
	if (form.roomCreate.value == "") {
		alert("Cant be empty!");
		form.roomName.focus();
		return false;
	}
	return true;
}

function askForPassword(roomName, isPrivate) {
	if (isPrivate) {
		var passWord = prompt("Password?");
		var checking = true;
		var cancel = false;
	} else {
		var checking = false;
		var cancel = false;
	}

	while (checking) {
		if (passWord == "") {
			alert("Password cant be empty!");
			var passWord = prompt("Password?");
		} else if (passWord) {
			checking = false;
		} else {
			cancel = true;
		}
	}
	if (!cancel) {
		var formData = new FormData();
		formData.append("roomName", roomName);
		formData.append("isPrivate", isPrivate);
		if (isPrivate) {
			formData.append("passWord", passWord);
		}

		fetch("/board/validate", {
			method: "POST",
			enctype: "multipart/form-data",
			body: formData
		}).then(responce => {
			var stat = responce.status;
			if (stat == 200) {
				//redirect
				window.location.replace("board/valid?id=" + roomName);
			} else if (stat == 418) {
				//no room
				alert("Room doesnt exist anymore. This is most likely a server error");
			} else if (stat == 419) {
				alert("Wrong pass");
			}
		});
	}
}
function populateTable(roomList) {
	$(".roomTableDiv").empty();

	if (roomList.length == 0) {
		var txt = $("<p></p>").text("No rooms! Why dont you make one?");
		$("#roomTableDiv").append(txt);
	} else {
		var number_of_rows = roomList.length;
		var number_of_cols = 4;
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
			for (var j = 0; j < number_of_cols; j++) {
				var data = $("<td>");
				if (j == 0) {
					data.append(
						createJoinButton(roomList[i].roomName, findRoomState(i, roomList))
					);
					row.append(data);
				} else if (j == 1) {
					data.append(roomList[i].roomName);
					row.append(data);
				} else if (j == 2) {
					data.append(roomList[i].pNumb);
					row.append(data);
				} else {
					if (findRoomState(i, roomList)) {
						data.append("Private");
					} else {
						data.append("Public");
					}
					row.append(data);
				}
			}
		}

		$("#roomTableDiv").append(table_body);
		var txt = $("<p></p>").text("Alternatively, make one below!");
		$("#roomTableDiv").append(txt);
	}
}

function findRoomState(id, list) {
	list.forEach(element => {
		if (element.id == id) {
			return element.roomState == "Private";
		}
	});
}

function createJoinButton(room, state) {
	return $("<button/>", {
		text: "Join",
		id: "btn_Join",
		click: function() {
			askForPassword(room, state);
		}
	});
}
