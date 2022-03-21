var authen = localStorage.getItem("authen");
if(!authen || authen.length < 0x10){
    window.location.href = "index.html";
}

const editTable = document.getElementById("edit-profile-table");
var update_notify_element = document.getElementById('update-notify');

const updateProfileInfo = () => {


    var dateOfBirth = document.getElementById("dateOfBirthInput").value;
    if(!dateOfBirth){
        dateOfBirth = ""
    }
    var name = document.getElementById("nameInput").value;
    var address = document.getElementById("addressInput").value;
    var email = document.getElementById("emailInput").value;
    var data = {};
    data["name"] = name.trim();
    data["address"] = address.trim();
    data["dateOfBirth"] = dateOfBirth;
    data["email"] = email.trim();



    var updateProfileAPI = "http://localhost:8081/api/private/profile/edit";

    fetch(updateProfileAPI, {
        headers: {
            "Authorization": authen,
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(data) ,
    }) .then((response) => {
        if (!response.ok) {
            throw new Error("Cann't update profile info");
        }
        alert("Update successful!");
        location.reload();

    }) .catch((error) => {
        console.log(error);
        update_notify_element.innerText = "Something wrong!!! Cannot update your profile!!!";
    })
}

const updateProfileImage = (image) => {
    var {id, name, uri} = image;
    var updateProfileImageAPI = "http://localhost:8081/api/private/profile/edit/avatar/" + id;

    fetch(updateProfileImageAPI, {headers: {
        "Authorization": authen,
        "Accept": "application/json",
        "Content-Type": "application/json",
    }}) .then((response) => {
        if (!response.ok) {
            throw new Error("update profile image fail");
        }
        localStorage.setItem("avatarURL", uri);
        location.reload();
    }) .catch((error) => {
        console.log(error);
    }) 
}

const loadImage = (event) => {
    console.log(event);
    if (event.target.files && event.target.files.length) {
        console.log("length file: " + event.target.files.length);
        for (var i = 0; i < event.target.files.length; i++) {
            var uploadImageAPI = "http://localhost:8081/api/public/image/upload";
            var data = new FormData();
            data.append("file", event.target.files[i]);
            fetch(uploadImageAPI, {
                method: "POST",
                body: data
            }).then((response) => {
                if (!response.ok) {
                    throw new Error("Failed to upload image")
                }
                return response.json();
            }).then((data) => {
                console.log(data);
                updateProfileImage(data);
            }).catch((error) => {
                console.log(error);
            })
        }

    }
}

const loadCurrentProfile = () => {
    var getProfileAPI = "http://localhost:8081/api/private/profile/edit";
    var htmlContent = "";

    fetch(getProfileAPI, {
        headers: {
            'Authorization' : authen,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        }
    }) .then ((response) => {
        if(!response.ok){
            throw new Error(response.statusText)
        }
        return response.json();
    }) .then((data) => {
        console.log(data);
        var {address, dateOfBirth, email, id, name, profile_Image, username} = data;
        dateOfBirth = (dateOfBirth) ? dateOfBirth.substring(0, 10) : dateOfBirth;
        if(email == null){
            email = "";
        }
        if(address == null){
            address = "";
        }

        htmlContent += 
        `
        <div class="table-row">
            <div class="table-row-header"><img id="profileImage" src="http://localhost:8081${profile_Image.uri}" style="width: 100px; height: 100px;" /> </div>
            <div>
                <h3 style="font-weight: bolder; font-size: 28px;">${username}</h3><br>
                <button onclick="document.getElementById('profileImageInput').click()">Change Profile Photo</button>
                <input type="file" id="profileImageInput" style="display:none" onchange="loadImage(event)"/>
            </div>
        </div>
        <div class="table-row">
            <div class="table-row-header">Name</div>
            <div><input type="text" value="${name}" id="nameInput"/></div>
        </div>
        <div class="table-row">
            <div class="table-row-header">Address</div>
            <div><input type="text" value="${address}" id="addressInput"/></div>
        </div>
        <div class="table-row">
            <div class="table-row-header">Date of birth</div>
            <div><input type="date" value="${dateOfBirth}" id="dateOfBirthInput"/></div>
        </div>
        <div class="table-row">
            <div class="table-row-header">Email</div>
            <div><input type="email" value="${email}" id="emailInput"/></div>
        </div>
        <button onclick="updateProfileInfo()" style="width: 25%;">Save</button>
        `;
        editTable.innerHTML = htmlContent;
    }) .catch ((error) => {
        console.log("error send api: " + error)
    })

}

loadCurrentProfile();

