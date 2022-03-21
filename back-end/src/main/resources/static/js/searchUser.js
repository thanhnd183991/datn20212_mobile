function getCookie(cookiename)
    {
    var re = new RegExp("=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
    }
var authen = getCookie("auth");  
if(!authen || authen.length < 0x10){
    window.location.href = "index.html";
}
const searchKeyInput = document.getElementById("searchKey");
//const submitBtn = document.getElementById("submitBtn")
const resultSearch = document.getElementById("resultSearch");
const content = document.getElementsByClassName("content")[0];

const loadUser = (data) => {
    var htmlContent = "";
    
    data.forEach((user) => {
        htmlContent += 
        `<div class="user-box" onClick="handleLoadProfile('${user.username}')">
            
            <h4 class="username">${user.username}</h4>
            <img class="profile-image" src="http://localhost:8081${user.profile_Image.uri}" alt="Profile Image" />
        </div>`        

    })
    resultSearch.innerHTML = htmlContent;
    if (data.length <= 0) {
        resultSearch.innerHTML = "not results for search..."
    }
    resultSearch.style.height = '100%';
}

const redirect = (url) => {
    location.replace(url);
}

const requestFriend = (thisButton, userName) => {
    var requestFriendAPI = "http://localhost:8081/api/private/friend/request/" + userName;

    fetch(requestFriendAPI, 
        {
            method: 'POST',
            headers: {
                'Authorization' : authen,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }) .then((response) => {
            if(!response.ok){
                throw new Error(response.statusText)
            }
            thisButton.innerHTML = "Requested Friend"
            
        }) .catch ((error) => {
            console.log("error send api: " + error)
        })
}

const acceptFriend = (thisButton, userId) => {
    var acceptFriendAPI = "http://localhost:8081/api/private/friend/request/" + userId;
}

const loadUserProfile = (data) => {
    const {name, userName, postDTOs, profileImage, userId} = data;
    
    const imageId = profileImage.id;
    const profileName = profileImage.name;
    const profileUri = profileImage.uri;
    //sconst state = getFriendState(userId);
    var htmlContent = "";
    
    var getStateAPI = "http://localhost:8081/api/private/friend/state/" + userName;
    console.log("getstateAPI: " + getStateAPI);
    fetch(getStateAPI, {headers: {
        'Authorization' : authen,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }}) .then((response) => {
        if(!response.ok){
            throw new Error(response.statusText)
        }
        return response.json();
    }) .then((data) => {
        //console.log("state: " + data.state)
        htmlContent += 
            `
            <div class="profile-top" style="display: flex; flex-direction: row;">
                <img src="http://localhost:8081${profileImage.uri}" alt="Profile Name" class="profile-image-main"/>

                <div style="display: flex; flex-direction: column; padding: 40px;">
                    <h3 style="font-weight: bolder; font-size: 25px; padding-bottom: 30px;">${userName}</h3> 
            `;
        
        let state = data.state;
        switch (state) {
        case 0:
            htmlContent += `<button onClick="requestFriend(this, '${userName}')">Request Friend</button>`;
            break;
        case 1: 
            htmlContent += `<button>Friend</button>`;
            break;
        case 2: 
            htmlContent += `<button>Requested Friend</button>`;
            break;
        case 3: 
            htmlContent += `<button>Accept Friend</button>`;
            break;
        default: 
            htmlContent += `<button onClick="redirect('../profile.html')">Edit Profile</button>`;
            break;
        }
        
            htmlContent += 
            `   </div>
            </div>

            <h4 style="font-weight: bolder; font-size: 18px; padding-left: 40px; padding-top: 20px;">
                ${postDTOs.length + " "} psots
            </h4>
            <div class="posts__image">
            `;

        postDTOs.forEach((post) => {
            htmlContent += 
            `<div class="post__medias" style="width: 300px; height: 300px; background-color: white">`;
            post.images.forEach((image) => {
                htmlContent += 
                `<img class="post__media" src="http://localhost:8081${image.uri}" />`;
            })
            console.log(post);
            htmlContent += `</div>`;
        })

        htmlContent += `</div>`
        content.innerHTML = htmlContent;
        resultSearch.innerHTML = "";
    }) .catch ((error) => {
        console.log("error send api: " + error)
    })    
    
}


searchKeyInput.addEventListener("keyup", (e) => {
    var searchKey = e.target.value || "default";
    var url = "http://localhost:8081/api/private/search/user/" + searchKey;
    console.log(url);
    fetch(url, {headers: {
        'Authorization' : authen,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }}).then((response) => {
        if(!response.ok){
            throw new Error(response.statusText)
        }
        return response.json();
    }) .then((data) => {
        // data.forEach((user) => {
        //     console.log(user);
        // })
        loadUser(data);
    }) .catch ((error) => {
        console.log("error send api: " + error)
    })
})

const  handleLoadProfile = (username) => {
    
    var url = "http://localhost:8081/api/private/profile/" + username;
    console.log(url);
    fetch(url, {headers: {
        'Authorization' : authen,
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    }}) .then((response) => {
        if(!response.ok){
            throw new Error(response.statusText)
        }
        return response.json();
    }) .then((data) => {
        //console.log(data);
        loadUserProfile(data);
    }) .catch ((error) => {
        console.log("error send api: " + error)
    })
}