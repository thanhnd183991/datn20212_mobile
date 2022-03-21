var GlobalData;
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

var userName = localStorage.getItem("username");

const chatBox = document.getElementById("chatBox");
const userBox = document.getElementById("listUserBox");
var activeUsers;
var stompClient;
var selectedUser;
var listFriendUser;
var currChatUser = "";

const connect = () => {
    
    fetch("/user-connect", {
        method: "POST",
        headers: {
            "Authorization": authen,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
    }) .then((response) => {
        if (!response.ok) {
            throw new Error("Can't load user");
        } 
        return response.text();
    }) .then((_userName) => {
        userName = _userName;
        var socket = new SockJS('/chat');
        stompClient = Stomp.over(socket);
        stompClient.connect(
            {username: userName}, () => {
                stompClient.subscribe('/topic/active', () => {
                    updateUsers(userName);
                })

                stompClient.subscribe('/user/' + userName + '/messages', function (output) {
                    console.log(output);
                    output = JSON.parse(output.body);
                    addMessage(output);
                });

                sendConnection(' connected to server');

            }
        )
        
    }) .catch((error) => {
        console.log(error);
    })
}

const sendConnection = (message) => {
    var text = userName + message;
    sendBroadCast({'sender': 'server', 'content': text});
    updateUsers(userName);
}

const sendBroadCast = (json) => {
    stompClient.send("/app/broadcast", {}, JSON.stringify(json));
}

const updateUsers = (userName) => {

    var url = '/active-friends-of/' + userName;
    fetch(url, {
        method: "GET",
        headers: {
            "Authorization": authen,
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    }) .then((response)  => {
        if (!response.ok) {
            throw new Error("Can't active user")
        }
        return response.json();
    }) .then((data) => {
        activeUsers = Array.from(data);
        getListFriend();
    }) .catch((error) => {
        console.log(error);
    })
}

connect();

const sendMessage = (receiver, event) => {
    const messTextInput = document.getElementById("messTextInput");
    if(messTextInput.value.trim() == ""){
        return;
    }
    // updateUsersByBtnClick(receiver);
    const text = messTextInput.value;
    console.log("message: " + text);
    stompClient.send("/app/chat", {'sender': userName},
            JSON.stringify({'sender': userName, 'content': text, 'receiver': receiver}));
    messTextInput.value = "";
}

const addMessage = (output) => {
    const {id, content, sender, receiver, time} = output;
    const chatContent = document.getElementById("chatContent");
    var state = "friend-message"
    if (sender == userName) state = "my-message";
    var htmlContent = 
    `
    <div>
        <div class="${state} message">${content}</div>
    </div>
    `
    chatContent.innerHTML += htmlContent;

    var element = document.getElementById("chatContent");
    element.scrollTop = element.scrollHeight;

}

const showMessageBox = (friendName, uri, status, name) => {
    var getAllMessageAPI = "http://localhost:8081/api/private/message/" + friendName;
    var htmlContent =
        `<div class="user-box" style="height: 7%;">
            <img src="http://localhost:8081${uri}" alt="thumbnail avatar" class="thumbnail-avatar">
            <div class="name-state">
                <h2>${name}</h2><br>
                <h3>${status}</h3>
            </div>
        </div>`;
    htmlContent += `<div class="chat-content" id="chatContent">`
    fetch(getAllMessageAPI, {
        headers: {
            "Authorization": authen,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "GET",
    }) .then((response) => {
        if (!response.ok){
            throw new Error("can't load message");
        }
        return response.json();
    }) .then((data) => {
        console.log(data);
        data.forEach((message) => {
            var {id, content, sender, receiver, time} = message;
            var state = "my-message";
            if (sender == friendName) state = "friend-message";
            htmlContent += 
            `
            <div>
                <div class="${state} message">${content}</div>
            </div>
            `
        })

        htmlContent += "</div>";
        htmlContent += 
        `
        <div class="send-message-box">
            <input type="text" class="mess-text-input" id="messTextInput">
            <button onclick="sendMessage('${friendName}')" id="submitButton">send</button>
        </div>
        `

        chatBox.innerHTML = htmlContent;
        var element = document.getElementById("chatContent");
        element.scrollTop = element.scrollHeight;
        document.getElementById("messTextInput").addEventListener("keyup",function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("submitButton").click();
            }
        })
    }) .catch((error) => {
        console.log(error);
    })
}

const loadUser = (listUser) => {
    var htmlContent = "";
    if (listUser.length <= 0) htmlContent = "<div style='margin-left: 10%; font-size: 20px;'>You must create friend to chat.</div>";
    listUser.forEach((user) => {
        var {id, name, username, profile_Image} = user;
            var status = "";
            if (activeUsers.includes(username)) {
                status = "Đang hoạt động";
            }
            htmlContent += 
            `
            <div class="user-box" onclick="showMessageBox('${username}', '${profile_Image.uri}', '${status}' ,'${name}')">
                <img src="http://localhost:8081${profile_Image.uri}" alt="thumbnail avatar" class="thumbnail-avatar">
                <div class="name-state" key=${id}>
                    <h2>${name}</h2><br>
                    <h3>${status}</h3>
                </div>
            </div>
            `
    })
    userBox.innerHTML = htmlContent;
}

const getListFriend = () => {
    var getListFriendAPI = "http://localhost:8081/api/private/friend/list";
    
    fetch(getListFriendAPI, {
        headers: {
            "Authorization": authen,
            "Accept": "application/json",
            "Content-Type": "application/json"
        },
        method: "GET"
    }) .then((response) => {
        if (!response.ok) {
            throw new Error("Can't get friend")
        }
        return response.json()
    }) .then((data) => {
        console.log(data);
        // data.forEach((user) => {
        //     var {id, name, username, profile_Image} = user;
        //     var status = "";
        //     if (activeUsers.includes(username)) {
        //         status = "Đang hoạt động";
        //     }
        //     htmlContent += 
        //     `
        //     <div class="user-box" onclick="showMessageBox('${username}', '${profile_Image.uri}', '${status}')">
        //         <img src="http://localhost:8081${profile_Image.uri}" alt="thumbnail avatar" class="thumbnail-avatar">
        //         <div class="name-state" key=${id}>
        //             <h2>${username}</h2><br>
        //             <h3>${status}</h3>
        //         </div>
        //     </div>
        //     `
        // })
        // userBox.innerHTML = htmlContent;
        listFriendUser = data;
        loadUser(data);
        var firstUser;
        var firstStatus = "";
        if (listFriendUser.length > 0) {
            firstUser = listFriendUser[0];
        }
        if (firstUser) {
            var {id, name, username, profile_Image} = firstUser;
            if (activeUsers.includes(username)) firstStatus = "Đang hoạt động";
            showMessageBox(username, profile_Image.uri, status);
        }
        
    }) .catch((error) => {
        console.log(error);
    })
}

//getListFriend();

document.getElementById("searchUserInput").addEventListener("keyup", (e) => {
    var searchKey = e.target.value;
    
    var resultResult = [];
    listFriendUser.forEach((user) => {
        var {id, name, username, profile_Image} = user;
        if (user.username.includes(searchKey)) {
            resultResult.push(user);
        }
    })

    loadUser(resultResult);
})

const updateUsersByBtnClick = (friendName) => {
    var firstUser;
    listFriendUser.forEach((user) => {
        if (user.username == friendName) firstUser = user;
    })
    var idx = listFriendUser.findIndex(x => x.username == friendName);
    listFriendUser.splice(idx, 1);

    listFriendUser = [firstUser, ...listFriendUser];
    loadUser(listFriendUser);
}
