var authen = localStorage.getItem("authen");
if(!authen || authen.length < 0x10){
    window.location.href = "index.html";
}
var username = localStorage.getItem("username");

function getProfile(){
    localStorage.setItem("getProfile",username);
}
const div_notfound = document.getElementById("notFound");
const div_profile = document.getElementById("profile");
var testObj;
var listFriend;

url = "/api/private/friend/request-list"
fetch(url, {
    method: 'GET',
    headers: {
    'Authorization' : authen,
    'Accept': 'application/json',
    'Content-Type': 'application/json'
    }
}).then((response) => response.json())
.then((data) => {
    console.log(data);
    listFriend = data;
    if(data.length){
        //render 
        div_notfound.style.display = "none";
        updateRequestFriend(data);
    }else{
        div_notfound.style.display = "block";
    }
});


function updateRequestFriend(data){
    for(var i = 0; i < data.length; i++){
        const profile_child = document.createElement('div');
        profile_child.classList.add('profile_child');

        const img_user__avatar_mess_1 = document.createElement('img');
        img_user__avatar_mess_1.classList.add('user__avatar_mess');
        img_user__avatar_mess_1.src = data[i].sender.profile_Image.uri ;

        const div_profile_content = document.createElement('div');
        div_profile_content.classList.add('div_profile_content');

        const h3_div_profile_content = document.createElement('h3');
        h3_div_profile_content.innerText = data[i].sender.name;

        const p_div_profile_content = document.createElement('p');
        p_div_profile_content.classList.add('div_profile_content__p');
        
        const span_friend = document.createElement('span');
       
        span_friend.innerText = "unknow";

        const span_ = document.createElement('span');
        span_.innerText = " friend";
        p_div_profile_content.appendChild(span_friend);
        p_div_profile_content.appendChild(span_);

        div_profile_options = document.createElement('div');
        div_profile_options.classList.add('div_profile_options');

        
        div_profile_options.innerHTML = `<span class="material-icons"> done </span>
        <p>Accept</p>`;
        div_profile_options.id = data[i].id.toString();
        //btn edit info

        div_profile_options2 = document.createElement('div');
        div_profile_options2.classList.add('div_profile_options');

        div_profile_options2.innerHTML = `<span class="material-icons"> close </span>
        <p>Deny</p>`;
        div_profile_options2.id = data[i].id.toString() + "deny";
        //btn edit info

        div_profile_options.onclick = (event)=>{
            processAccept(event);
        }
        
        div_profile_options2.onclick = (event)=>{
            processDeny(event);
        }
    

        div_profile_content.appendChild(h3_div_profile_content);
        div_profile_content.appendChild(p_div_profile_content);
        div_profile_content.appendChild(div_profile_options);
        div_profile_content.appendChild(div_profile_options2);
        profile_child.appendChild(img_user__avatar_mess_1);
        profile_child.appendChild(div_profile_content);

        div_profile.appendChild(profile_child);
   
    }   
}



function processAccept(event){
    //console.log(event.target);
    //testObj = event.target;
    var id;
    if(!event.target.childElementCount){
        const parrent = event.target.parentNode;
        parrent.innerHTML = `<span class="material-icons"> check_circle </span>
        <p>Accepted</p>`;
        parrent.onclick = null;
        id = parseInt(parrent.id);
        
    }else{
        event.target.innerHTML = `<span class="material-icons"> check_circle </span>
        <p>Accepted</p>`;
        event.target.onclick = null;
        id = parseInt(event.target.id);

    }
    document.getElementById(id.toString() + "deny").onclick = null;
    
    //console.log("send req");
    //console.log(id);
    for(var i = 0; i < listFriend.length; i++){
        if(listFriend[i].id == id){
            //call api with this
            var postReq = {};
            postReq['accepted'] = true;
            postReq['id'] = id;
            fetch('http://localhost:8081/api/private/friend/request', {
                method: 'PUT',
                headers: {
                    'Authorization' : authen,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postReq),
            }).then((response) => {
                if(!response.ok){
                    console.log("accept fail");   
                    return;
                }
                console.log("aceept OK");
                
            })
            //Then with the data from the response in JSON...
        }
    }
}


var Test = null;

function processDeny(event){
    //console.log(event.target);
    //testObj = event.target;
    var id;
    Test = event.target;
    console.log(event.target);
    if(!event.target.childElementCount){
        const parrent = event.target.parentNode;
        parrent.innerHTML = `<span class="material-icons"> check_circle </span>
        <p>Denied</p>`;
        parrent.onclick = null;
        id = parseInt(parrent.id);
    }else{
        event.target.innerHTML = `<span class="material-icons"> check_circle </span>
        <p>Denied</p>`;
        event.target.onclick = null;
        id = parseInt(event.target.id);
        
    }

    document.getElementById(id.toString()).onclick = null;


    
    //console.log("send req");
    //console.log(id);
    for(var i = 0; i < listFriend.length; i++){
        if(listFriend[i].id == id){
            //call api with this
            var postReq = {};
            postReq['accepted'] = false;
            postReq['id'] = id;
            fetch('http://localhost:8081/api/private/friend/request', {
                method: 'PUT',
                headers: {
                    'Authorization' : authen,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postReq),
            }).then((response) => {
                if(!response.ok){
                    console.log("deny fail");   
                    return;
                }
                console.log("deny OK");
                
            })
            //Then with the data from the response in JSON...
        }
    }
}