console.log("Vi er in main JS");

//URL for fetching
const fetchTeamsUrl = 'http://localhost:8080/teams';
const fetchRidersUrl = 'http://localhost:8080/riders';

//Fetching data
function fetchData(url) {
  return fetch(url).then(response => response.json());
}

//Create and update table
async function createRidersTable() {

  const teamData = await fetchData(fetchTeamsUrl);
  const riderData = await fetchData(fetchRidersUrl);

  let teamTableBody = document.getElementById("team-table");
  let riderTableBody = document.getElementById("rider_table");
  let displayTime;

  teamTableBody.innerHTML = "";
  teamTableBody.innerHTML += `<tr>
        <th>Team nr.</th>
        <th>Team name</th>
        <br>
      </tr>`;
  for (let i = 0; i < teamData.length; i++) {
    teamTableBody.innerHTML += `<tr>
        <td id="team-id-row">${teamData[i].id}</td>
        <td>${teamData[i].name}</td>
      </tr>`;
  }

  riderTableBody.innerHTML = "";
  riderTableBody.innerHTML += `<tr>
        <th>RiderNr.</th>
        <th>Name</th>
        <th>Team</th>
        <th>Nationality</th>
        <th>Total time</th>
        <th>Sprint Points</th>
        <th>Mountain Points</th>
        <th>&nbspEdit&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbspSave&nbsp&nbsp&nbspDelete</th>
      </tr>`;

  for (let i = 0; i < riderData.length; i++) {
    //Converts to more readable time on the frontend
    displayTime = riderData[i].time;
    displayTime = displayTime.toString();
    let tid = displayTime.slice(0, 2) + "hours " + displayTime.slice(2, 4) + " min " + displayTime.slice(4, 6) + " sec";

    riderTableBody.innerHTML += "<tr id='row" + riderData[i].riderId + "'>" +
      "<td>" + riderData[i].riderId + "</td>" +
      "<td id='name_row" + riderData[i].riderId + "'>" + riderData[i].name + "</td>" +
      "<td id='team_row" + riderData[i].riderId + "'>" + riderData[i].team.name + "</td>" +
      "<td id='nationality_row" + riderData[i].riderId + "'>" + riderData[i].nationality + "</td>" +
      "<td id='totalTime_row" + riderData[i].riderId + "'>" + tid + "</td>" +
      "<td id='mountainPoint_row" + riderData[i].riderId + "'>" + riderData[i].mountainPoints + "</td>" +
      "<td id='sprintPoint_row" + riderData[i].riderId + "'>" + riderData[i].sprintPoints + "</td>" +
      "<td><input type='button' id='edit_button" + riderData[i].riderId + "' value='Edit' class='btn btn-warning btn-sm' onclick='tableEditRow(" + riderData[i].riderId + ")'> " +
      "<input type='button' id='save_button" + riderData[i].riderId + "' value='Save' class='btn btn-success btn-sm' onclick='tableSaveRow(" + riderData[i].riderId + ")'> " +
      "<input type='button' value='Delete' class='btn btn-danger btn-sm' onclick='deleteRow(" + riderData[i].riderId + ")'>"
    ;
  }

  riderTableBody.innerHTML += `  <tr>
        <td></td>
        <td><input type="text" id="new_name"></td>
        <td><input type="number" placeholder='Fill in teamnr. (1-5)' id="new_team"></td>
        <td><input type="text" id="new_nationality"></td>
        <td><input type="number" placeholder='Fill in time like 124522' id="new_totalTime"></td>
        <td><input type="number" id="new_mountainPoint"></td>
        <td><input type="number" id="new_sprintPoint"></td>
        <td><input type="button" class="btn btn-primary" onclick="tableAddRow()" value="Tilføj"></td>
      </tr>
    `;
}


//Delete from frontend table and database
async function deleteRow(number) {
  await deleteData(number);
  await createRidersTable();
}

//Post to frontend table and database
async function tableAddRow() {

  let newName = document.getElementById("new_name").value;
  let newTeam = document.getElementById("new_team").value;
  let newNationality = document.getElementById("new_nationality").value;
  let newTotalTime = document.getElementById("new_totalTime").value;
  let newMountainPoint = document.getElementById("new_mountainPoint").value;
  let newSprintPoint = document.getElementById("new_sprintPoint").value;

  await postData(newName, newTeam, newNationality, newTotalTime, newMountainPoint, newSprintPoint);

  document.getElementById("new_name").value = "";
  document.getElementById("new_team").value = "";
  document.getElementById("new_nationality").value = "";
  document.getElementById("new_totalTime").value = "";
  document.getElementById("new_mountainPoint").value = "";
  document.getElementById("new_sprintPoint").value = "";

  await createRidersTable();

}
//Edit row from frontend table and database
async function tableEditRow(number) {

  document.getElementById("edit_button" + number).style.display = "none";
  document.getElementById("save_button" + number).style.display = "block";

  let name = document.getElementById("name_row" + number);
  let team = document.getElementById("team_row" + number);
  let nationality = document.getElementById("nationality_row" + number);
  let totalTime = document.getElementById("totalTime_row" + number);
  let mountainPoint = document.getElementById("mountainPoint_row" + number);
  let sprintPoint = document.getElementById("sprintPoint_row" + number);

  let name_data = name.innerHTML;
  let team_data = "1";
  let nationality_data = nationality.innerHTML;
  let totalTime_data = totalTime.innerHTML;
  let mountainPoint_data = mountainPoint.innerHTML;
  let sprintPoint_data = sprintPoint.innerHTML;

  name.innerHTML = "<input type='text' id='name_text" + number + "' value='" + name_data + "'>";
  team.innerHTML = "<input type='text' placeholder='Fill in teamnr. (1-5)' id='team_text" + number + "' value='" + team_data + "'>";
  nationality.innerHTML = "<input type='text' id='nationality_text" + number + "' value='" + nationality_data + "'>";
  totalTime.innerHTML = "<input type='number' placeholder='Fill in time like 132211' id='totalTime_text" + number + "' value='" + totalTime_data + "'>";
  mountainPoint.innerHTML = "<input type='number' id='mountainPoint_text" + number + "' value='" + mountainPoint_data + "'>";
  sprintPoint.innerHTML = "<input type='number' id='sprintPoint_text" + number + "' value='" + sprintPoint_data + "'>";

}
//Put and Edit frontend table and database
async function tableSaveRow(number) {
  console.log(number);
  let name_val = document.getElementById("name_text" + number).value;
  let team_val = document.getElementById("team_text" + number).value;
  let nationality_val = document.getElementById("nationality_text" + number).value;
  let totalTime_val = document.getElementById("totalTime_text" + number).value;
  let mountainPoint_val = document.getElementById("mountainPoint_text" + number).value;
  let sprintPoint_val = document.getElementById("sprintPoint_text" + number).value;

  document.getElementById("name_row" + number).innerHTML = name_val;
  document.getElementById("team_row" + number).innerHTML = team_val;
  document.getElementById("nationality_row" + number).innerHTML = nationality_val;
  document.getElementById("totalTime_row" + number).innerHTML = totalTime_val;
  document.getElementById("mountainPoint_row" + number).innerHTML = mountainPoint_val;
  document.getElementById("sprintPoint_row" + number).innerHTML = sprintPoint_val;
  document.getElementById("edit_button" + number).style.display = "block";
  document.getElementById("save_button" + number).style.display = "none";

  await putData(number, name_val, team_val, nationality_val, totalTime_val, mountainPoint_val, sprintPoint_val);
  await createRidersTable();
}

//Refresh on page load
window.addEventListener("load", async () => {
  await loadHeader();
  await loadFooter();
  await createRidersTable()
})




