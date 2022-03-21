
//const img = document.getElementsByClassName("post__media")[0];
var authen = localStorage.getItem("authen");
var username = localStorage.getItem("username");

function getProfile(){
    localStorage.setItem("getProfile",username);
}


var inputFile = document.getElementById("img");
var textArea2 = document.getElementById("content");


const div_post__medias = document.getElementsByClassName('post__medias')[0];
inputFile.onchange = (event) =>{
    if (event.target.files && event.target.files.length) {
        for(var i = 0; i < event.target.files.length; i++){
            var reader = new FileReader();
            reader.onload = function (e) {
                // console.log(img)
                // img.src = e.target.result;
                
         
                const img_post__media = document.createElement('img');
                img_post__media.classList.add('post__media');
                img_post__media.src = e.target.result;
                img_post__media.alt = "Post Content";
                div_post__medias.appendChild(img_post__media);


            };
            
            reader.readAsDataURL(event.target.files[i]);
        }
      }

      //<img class = "post__media" src="./resource/default_image.png" alt="Post Image">
}




const divAdd = document.getElementById("addPhoto");
divAdd.onclick = (event)=>{
    inputFile.click();
}



const div_submit = document.getElementById("btnSubmit");
const listImages = [];
var idxImages = 0;

div_submit.onclick = (event) => {
    //first upload images
    if(!div_post__medias.childElementCount){
        //if not sub image, return
        return;
    }
   
    for(var i = 0; i < div_post__medias.childElementCount; i++){
        var data = new FormData()
        data.append('file', inputFile.files[i])
        
        fetch('http://localhost:8081/api/public/image/upload', {
                method: 'POST',
                body : data
            }).then((response) => response.json())
            //Then with the data from the response in JSON...
            .then((data) => {
                console.log(data);
                listImages[idxImages++] = data;
                if(listImages.length == div_post__medias.childElementCount){
                    uploadPost(listImages);
                }
            });
    }
    
};

const postReq = {};
function uploadPost(listImages){
    console.log(listImages);
    
    postReq['content'] = textArea2.value;
    postReq['imageList'] = [];
    for(var i = 0; i < listImages.length; i++){
        postReq['imageList'][i] = listImages[i]
    }


    fetch('http://localhost:8081/api/private/post/submit', {
                method: 'POST',
                headers: {
                    'Authorization' : authen,
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(postReq),
            }).then((response) => {
                if(!response.ok){
                    console.log("post fail");   
                    return;
                }
                console.log("post OK");
                window.location.href = "home.html";
            })
            //Then with the data from the response in JSON...
    
}