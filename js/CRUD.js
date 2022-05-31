console.log("We are in CRUD");

//CRUD

//Get
function getData() {
  return fetch(fetchRidersUrl)
    .then(res => {
        if (res.ok) { //Error handle for server error
          console.log("Get request succesfull");
        } else {
          console.log("Get unsuccesfull");
        }
        return res;
      }
    )
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.log(error));
}

//Post
function postData(name, teamId, nationality, time, mountainPoints, sprintPoints) {
  return fetch(fetchRidersUrl, {
    method: "POST",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      name: name,
      team: {
        id: teamId,
        name: fetchTeamsUrl + "/" + teamId,
      },
      nationality: nationality,
      time: time,
      mountainPoints: mountainPoints,
      sprintPoints: sprintPoints,
    })
  })
    .then(res => res.json())
    .catch(error => console.log(error));
}


//Put
function putData(id, name, teamId, nationality, time, mountainPoints, sprintPoints) {
  return fetch(fetchRidersUrl + "/" + id, {
    method: "PUT",
    headers: {
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      riderId: id,
      name: name,
      team: {
        id: teamId,
        name: fetchTeamsUrl + "/" + teamId,
      },
      nationality: nationality,
      time: time,
      mountainPoints: mountainPoints,
      sprintPoints: sprintPoints,
    })
  })
    .then(res => res.json())
    .catch(error => console.log(error));
}


//Delete
function deleteData(id) {
  return fetch(fetchRidersUrl + "/" + id, {
    method: "DELETE",
    headers: {
      'content-type': 'application/json'
    },
  })
    .then(res => {
        if (res.ok) { //Error handle for server error
          console.log("Delete request succesfull");
        } else {
          console.log("Delete unsuccesfull");
        }
        return res;
      }
    )
    .then(res => console.log(res))
}




