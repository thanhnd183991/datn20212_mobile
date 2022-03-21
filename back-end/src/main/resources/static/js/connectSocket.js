var GlobalData;
function getCookie(cookiename)
    {
    var re = new RegExp("=([^;]+)");
    var value = re.exec(document.cookie);
    return (value != null) ? unescape(value[1]) : null;
    }
var authen = getCookie("auth"); 
localStorage.setItem("authen", authen); 
var userName = localStorage.getItem("username");
var stompClient;
var selectedUser;

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
                    showMessage(createTextNode(JSON.parse(output.body)));
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
        let activeUsers = Array.from(data);
        console.log(activeUsers);
        localStorage.setItem("activeUsers", activeUsers);
    }) .catch((error) => {
        console.log(error);
    })
}

connect();