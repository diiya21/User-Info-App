const API_URL = "https://reqres.in/api/users";
const userContainer = document.getElementById("user-container");

async function getUserInfo() {
  // JUST TO UNDERSTAND HOW IT WORKS WITH THEN CATCH BLOCK
  // fetch(API_URL).then((data) => {
  //     return data.json();
  // }).then((dataJSON) => {
  //     createCardUI();
  // }).catch((error) => {
  //     userInfoData = dataInJson.data || [];
  // })
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    generateAllCards(data.data);
  } catch (error) {
    console.log("There was an error", error);
  }
}

function createCardUI(user) {
  let cardUI = `
    <div class="card m-4" style="width: 18rem;">
      <img src="${user.avatar}" class="card-img-top" alt="...">
      <div class="card-body">
        <h5 class="card-title">${user.first_name} ${user.last_name}</h5>
        <p class="card-text">${user.email}</p>
        <button class="btn btn-primary" onclick="getUserDetails(${user.id})">Get Details</button>
      </div>
    </div>
  `;

  userContainer.innerHTML += cardUI;
}

async function getUserDetails(userId) {
  const userDetailsUrl = `${API_URL}/${userId}`;
  try {
    const response = await fetch(userDetailsUrl);
    const data = await response.json();

    if (response.ok) {
      showUserDetails(data.data);
    } else {
      console.error("Error fetching user details:", data.error);
    }
  } catch (error) {
    console.error("Error fetching user details:", error);
  }
}

function showUserDetails(user) {
  const userDetailsModal = `
    <div class="modal" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">${user.first_name} ${user.last_name}</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <img src="${user.avatar}" class="img-fluid mb-2" alt="...">
            <p><strong>Email:</strong> ${user.email}</p>
            <p><strong>Company:</strong> ${user.company}</p>
            <p><strong>Website:</strong> ${user.website}</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Append modal to the body and show
  document.body.insertAdjacentHTML("beforeend", userDetailsModal);
  $(".modal").modal("show"); // Using Bootstrap jQuery for modal
}

function generateAllCards(userData = []) {
  for (let i = 0; i < userData.length; i++) {
    createCardUI(userData[i]);
  }
}

getUserInfo();
