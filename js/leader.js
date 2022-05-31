const fetchRidersByTime = 'http://localhost:8080/riders/orderbytime';

function fetchData1(url) {
  return fetch(url).then(response => response.json());
}

async function createLeaderTable() {

    const riderData = await fetchData1(fetchRidersByTime);

    let leaderTableBody = document.getElementById("leader-table");

    leaderTableBody.innerHTML = "";
    leaderTableBody.innerHTML += `<tr>
        <th>Nr.</th>
        <th>Name</th>
        <th>Team</th>
        <th>Nationality</th>
        <th>Total time</th>
        <th>Sprint Points</th>
        <th>Mountain Points</th>
      </tr>`;

    for (let i = 0; i < riderData.length; i++) {

      //Converts to more readable time on the frontend
      displayTime = riderData[i].time;
      displayTime = displayTime.toString();
      let tid = displayTime.slice(0, 2) + "hours " + displayTime.slice(2, 4) + " min " + displayTime.slice(4, 6) + " sec";

      leaderTableBody.innerHTML += "<tr id='row" + riderData[i].riderId + "'>" +
        "<td>" + (i+1) + "</td>" +
        "<td id='name_row" + riderData[i].riderId + "'>" + riderData[i].name + "</td>" +
        "<td id='team_row" + riderData[i].riderId + "'>" + riderData[i].team.name + "</td>" +
        "<td id='nationality_row" + riderData[i].riderId + "'>" + riderData[i].nationality + "</td>" +
        "<td id='totalTime_row" + riderData[i].riderId + "'>" + tid + "</td>" +
        "<td id='mountainPoint_row" + riderData[i].riderId + "'>" + riderData[i].mountainPoints + "</td>" +
        "<td id='sprintPoint_row" + riderData[i].riderId + "'>" + riderData[i].sprintPoints + "</td>";

    }
 }

 window.addEventListener("load", async () => {
    await createLeaderTable();
    await loadFooter();
    await loadHeader();
 })

