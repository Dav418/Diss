function inject() {
	leaderboardList = [
		{
			playerName: "Dav",
			win: 10,
			loose: 3,
			winloose: 10 / 3,
			money: 100000,
		},
		{
			playerName: "Tim",
			win: 0,
			loose: 43,
			winloose: 0 / 43,
			money: 10,
		},
	];
	populateTable(leaderboardList);
}

function populateTable(leaderboardList) {
	$(".leaderboardDiv").empty();

	if (leaderboardList.length == 0) {
		alert("Error: leaderboard list was sent over empty");
	} else {
		var number_of_rows = leaderboardList.length;

		var table_body = $("<table>");

		var table_head = $("<tr>");
		var head_data1 = $("<th>").text("Name");
		table_head.append(head_data1);

		var head_data2 = $("<th>").text("Wins");
		table_head.append(head_data2);

		var head_data3 = $("<th>").text("Losses");
		table_head.append(head_data3);

		var head_data4 = $("<th>").text("Win/Loose %");
		table_head.append(head_data4);

		var head_data5 = $("<th>").text("Money");
		table_head.append(head_data5);

		table_body.append(table_head);

		for (var i = 0; i < number_of_rows; i++) {
			var row = $("<tr>");
			table_body.append(row);

			var data1 = $("<td>");
			data1.append(leaderboardList[i].playerName);
			row.append(data1);

			var data2 = $("<td>");
			data2.append(leaderboardList[i].win);
			row.append(data2);

			var data3 = $("<td>");
			data3.append(leaderboardList[i].loose);
			row.append(data3);

			var data4 = $("<td>");
			data4.append(leaderboardList[i].winloose);
			row.append(data4);

			var data5 = $("<td>");
			data5.append(leaderboardList[i].money);
			row.append(data5);
		}
		$("#leaderboardDiv").append(table_body);
	}
}
