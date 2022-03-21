var authen = localStorage.getItem("authen");
var username = localStorage.getItem("username");
if(!authen || authen.length < 0x10){
    window.location.href = "index.html";
}
function getProfile(){
    localStorage.setItem("getProfile",username);
}

const avatarURL = localStorage.getItem("avatarURL");
document.getElementById("search_input").addEventListener("keyup",function(event){
    event.preventDefault();
    if (event.keyCode === 13) {
        if(event.target.value.length != 0){
            console.log("SEARCH "); 
            document.getElementsByClassName("btn_search")[0].click();
            //event.target.value = "";
        }

    }
})

function processSearch(){
    const div_posts = document.getElementsByClassName('posts')[0];
    div_posts.innerHTML = "";
    var keyword = document.getElementById("search_input").value;
    const div_notfound = document.getElementById("notFound");
    var url = 'http://localhost:8081/api/private/search/post/' + keyword;
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
        if(data.length){
            //render 
            div_notfound.style.display = "none";
            console.log("data");
            loadContent(data)
        }else{
            div_notfound.style.display = "block";
        }
    });

}





function loadContent(data){
    
    GlobalData = data;
    const div_posts = document.getElementsByClassName('posts')[0];
    for(var i = 0; i < data.length; i++){
        console.log(data[i]);
        const article = document.createElement('div');
        article.classList.add('post');
        article.id = "p"+data[i].id.toString();
        const div_post__top = document.createElement('div');
        div_post__top.classList.add('post__top');

        const img_user__avatar = document.createElement('img');
        img_user__avatar.classList.add("user__avatar");
        img_user__avatar.classList.add("post__avatar");
        img_user__avatar.src = "http://localhost:8081" + data[i].user.profile_Image.uri;
        img_user__avatar.style.width = "40px";
        img_user__avatar.style.height = "40px";
        img_user__avatar.alt = "User Picture";
        

        div_post__top.appendChild(img_user__avatar);
        
        const div_post__topInfo = document.createElement('div');
        div_post__topInfo.classList.add('post__topInfo');

        const h3_post__topInfo = document.createElement('h3');
        h3_post__topInfo.innerText = data[i].user.name;

        const p_post__topInfo = document.createElement('p');
        p_post__topInfo.innerText = data[i].postingDate.substring(0, 10);

        div_post__topInfo.appendChild(h3_post__topInfo);
        div_post__topInfo.appendChild(p_post__topInfo);

        div_post__top.appendChild(div_post__topInfo);



        const div_post__bottom = document.createElement('div');
        div_post__bottom.classList.add('post__bottom');
        //div_post__bottom.style.marginBottom = "30px";
        //div_post__bottom.style.paddingLeft = "20px";

        const p_post__bottom = document.createElement('p');
        p_post__bottom.innerText = data[i].content;

        div_post__bottom.appendChild(p_post__bottom);

        
        const div_post__content = document.createElement('div');
        div_post__content.classList.add('post__content');

        const div_post__medias = document.createElement('div');
        div_post__medias.classList.add('post__medias');

        for(var j = 0; j < data[i].images.length ; j++){
            const img_post__media = document.createElement('img');
            img_post__media.classList.add('post__media');
            img_post__media.src = "http://localhost:8081" + data[i].images[j].uri;
            img_post__media.alt = "Post Content";
            div_post__medias.appendChild(img_post__media);
            console.log(data[i].images[j].name);
        }
        div_post__content.appendChild(div_post__medias);

        const div_post__options = document.createElement('div');
        div_post__options.classList.add("post__options");
        
        
       

        const div_post__option_like = document.createElement('div');
        div_post__option_like.classList.add('post__option');
        div_post__option_like.innerHTML = `<span class="material-icons"> thumb_up </span>`;
//        <p>Like</p>`;
        const numberLike = document.createElement('p');
        numberLike.id = "post"+data[i].id.toString();
        numberLike.innerText = data[i].reactionUsers.length;
        div_post__option_like.appendChild(numberLike);
        div_post__option_like.innerHTML += "<p>Like</p>";
        for(var j = 0; j < data[i].reactionUsers.length; j++){
            if(data[i].reactionUsers[j].username == username){
                div_post__option_like.style.color = "blue";
            }
        }

        div_post__option_like.addEventListener("click",function(event){
            event.preventDefault();
            if(event.target.childElementCount == 3){
                const post = event.target.parentNode.parentNode;
                testObj = post;
                
                const pLike = document.getElementById("post" + post.id[1]);
                if(event.target.style.color === "blue"){
                    
                    event.target.style.color = "gray";
                    reactPost(event.target.parentNode.parentNode.getElementsByTagName("input")[0].id.toString());
                    
                    
                    
                    pLike.innerText = (parseInt(pLike.innerText) - 1).toString();
                    
                }else{
                    event.target.style.color = "blue";
                    //reactPost(id);
                    pLike.innerText = (parseInt(pLike.innerText) + 1).toString();
                    reactPost(event.target.parentNode.parentNode.getElementsByTagName("input")[0].id.toString());
                    console.log(event.target);
                }
            }
            else{
                const parrent = event.target.parentNode;
                const post = parrent.parentNode.parentNode;
                const pLike = document.getElementById("post" + post.id[1]);
                if(parrent.style.color === "blue"){
                    parrent.style.color = "gray";
                    pLike.innerText = (parseInt(pLike.innerText) - 1).toString();
                    reactPost(parrent.parentNode.parentNode.getElementsByTagName("input")[0].id.toString());
                }else{
                    parrent.style.color = "blue";     
                    pLike.innerText = (parseInt(pLike.innerText) + 1).toString();
                    reactPost(parrent.parentNode.parentNode.getElementsByTagName("input")[0].id.toString());
                }
            }
        })

       


        const div_post__option_com = document.createElement('div');
        div_post__option_com.classList.add('post__option');
        div_post__option_com.innerHTML = `<span class="material-icons"> chat_bubble_outline </span>
        <p>Comment</p>`;
        const div_post__indicators = document.createElement('div');
        div_post__indicators.classList.add('post__indicators');
        div_post__options.appendChild(div_post__option_like);
        div_post__options.appendChild(div_post__option_com);
        div_post__options.appendChild(div_post__indicators);

        const div_messageSender = document.createElement('div');
        div_messageSender.classList.add("messageSender");
        
        const div_comment = document.createElement('div');
        div_comment.classList.add("div_comment");
        div_messageSender.appendChild(div_comment);
        for(var k = 0; k < data[i].comments.length; k++){
            const div_messageSender__bottom_1 = document.createElement('div');
            div_messageSender__bottom_1.classList.add("messageSender__bottom");

            const img_user__avatar_mess_1 = document.createElement('img');
            img_user__avatar_mess_1.classList.add('user__avatar_mess');
            img_user__avatar_mess_1.src = "http://localhost:8081" + data[i].comments[k].user.profile_Image.uri ;

            const div_messageSender_comm = document.createElement('div');
            div_messageSender_comm.classList.add('messageSender_comm');
            
            const h3_messageSender_comm = document.createElement('h3');
            h3_messageSender_comm.innerText = data[i].comments[k].user.name;

            const p_messageSender = document.createElement('p');
            p_messageSender.classList.add('messageSender__p');
            p_messageSender.innerText = data[i].comments[k].content;

            div_messageSender_comm.appendChild(h3_messageSender_comm);
            div_messageSender_comm.appendChild(p_messageSender);
            
            div_messageSender__bottom_1.appendChild(img_user__avatar_mess_1);
            div_messageSender__bottom_1.appendChild(div_messageSender_comm);
            div_comment.appendChild(div_messageSender__bottom_1);

        }


        const div_messageSender__bottom = document.createElement('div');
        div_messageSender__bottom.classList.add("messageSender__bottom");

        const img_user__avatar_mess = document.createElement('img');
        img_user__avatar_mess.classList.add('user__avatar_mess');
        img_user__avatar_mess.src = "http://localhost:8081" + avatarURL;

        
        const input_messageSender__input = document.createElement('input');
        input_messageSender__input.classList.add('messageSender__input');
        
        input_messageSender__input.placeholder = "What's on your mind?";
        input_messageSender__input.type = "text";
        input_messageSender__input.id = data[i].id.toString();
        input_messageSender__input.addEventListener("keyup",function(event){
            event.preventDefault();
            if (event.keyCode === 13) {
                if(event.target.value.length != 0){
                    console.log("send MSG " + event.target.value); 

                    
                    sendmsg(event.target);
                    event.target.value = "";
                }

            }
        })
        
    

        div_messageSender__bottom.appendChild(img_user__avatar_mess);
        div_messageSender__bottom.appendChild(input_messageSender__input);


        

        div_messageSender.appendChild(div_messageSender__bottom);


        /*
        document.getElementById("id_of_textbox")
            .addEventListener("keyup", function(event) {
            event.preventDefault();
            if (event.keyCode === 13) {
                document.getElementById("id_of_button").click();
            }
        });
        */

        article.appendChild(div_post__top);
        article.appendChild(div_post__bottom);
        article.appendChild(div_post__content);
        article.appendChild(div_post__options);
        article.appendChild(div_messageSender);
        article.style.paddingBottom = "30px";
        div_posts.appendChild(article);
    }

    addMedia();
}

function addMedia(){
    // Elements
    const posts = document.querySelectorAll('.post');
    const postsContent = document.querySelectorAll('.post__content');


    // ===================================
    // POST MULTIPLE MEDIAS
    // Creating scroll buttons and indicators when post has more than one media
    posts.forEach(post => {
        if(post.querySelectorAll('.post__media').length > 1) {
            const leftButtonElement = document.createElement('button');
            leftButtonElement.classList.add('post__left-button');
            leftButtonElement.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="var(--primary)" d="M256 504C119 504 8 393 8 256S119 8 256 8s248 111 248 248-111 248-248 248zM142.1 273l135.5 135.5c9.4 9.4 24.6 9.4 33.9 0l17-17c9.4-9.4 9.4-24.6 0-33.9L226.9 256l101.6-101.6c9.4-9.4 9.4-24.6 0-33.9l-17-17c-9.4-9.4-24.6-9.4-33.9 0L142.1 239c-9.4 9.4-9.4 24.6 0 34z"></path>
                </svg>
            `;

            const rightButtonElement = document.createElement('button');
            rightButtonElement.classList.add('post__right-button');
            rightButtonElement.innerHTML = `
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path fill="var(--primary)" d="M256 8c137 0 248 111 248 248S393 504 256 504 8 393 8 256 119 8 256 8zm113.9 231L234.4 103.5c-9.4-9.4-24.6-9.4-33.9 0l-17 17c-9.4 9.4-9.4 24.6 0 33.9L285.1 256 183.5 357.6c-9.4 9.4-9.4 24.6 0 33.9l17 17c9.4 9.4 24.6 9.4 33.9 0L369.9 273c9.4-9.4 9.4-24.6 0-34z"></path>
                </svg>
            `;

            post.querySelector('.post__content').appendChild(leftButtonElement);
            post.querySelector('.post__content').appendChild(rightButtonElement);

            post.querySelectorAll('.post__media').forEach(function() {
                const postMediaIndicatorElement = document.createElement('div');
                postMediaIndicatorElement.classList.add('post__indicator');

                post.querySelector('.post__indicators').appendChild(postMediaIndicatorElement);
            });

            // Observer to change the actual media indicator
            const postMediasContainer = post.querySelector('.post__medias');
            const postMediaIndicators = post.querySelectorAll('.post__indicator');
            const postIndicatorObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if(entry.isIntersecting) {
                        // Removing all the indicators
                        postMediaIndicators.forEach(indicator => indicator.classList.remove('post__indicator--active'));
                        // Adding the indicator that matches the current post media
                        postMediaIndicators[Array.from(postMedias).indexOf(entry.target)].classList.add('post__indicator--active');
                    }
                });
            }, { root: postMediasContainer, threshold: 0.5 });

            // Calling the observer for every post media
            const postMedias = post.querySelectorAll('.post__media');
            postMedias.forEach(media => {
                postIndicatorObserver.observe(media);
            });
        }
    });

    // Adding buttons features on every post with multiple medias
    postsContent.forEach(post => {
        if(post.querySelectorAll('.post__media').length > 1) {
            const leftButton = post.querySelector('.post__left-button');
            const rightButton = post.querySelector('.post__right-button');
            const postMediasContainer = post.querySelector('.post__medias');

            // Functions for left and right buttons
            leftButton.addEventListener('click', () => {
                postMediasContainer.scrollLeft -= 400;
            });
            rightButton.addEventListener('click', () => {
                postMediasContainer.scrollLeft += 400;
            });

            // Observer to hide button if necessary
            const postButtonObserver = new IntersectionObserver(function(entries) {
                entries.forEach(entry => {
                    if(entry.target === post.querySelector('.post__media:first-child')) {
                        leftButton.style.display = (entry.isIntersecting) ? 'none' : 'unset';
                    }
                    else if(entry.target === post.querySelector('.post__media:last-child')) {
                        rightButton.style.display = (entry.isIntersecting) ? 'none' : 'unset';
                    }
                });
            }, { root: postMediasContainer, threshold: 0.5 });

            // if(window.matchMedia('(min-width: 1024px)').matches) {
            //     postButtonObserver.observe(post.querySelector('.post__media:first-child'));
            //     postButtonObserver.observe(post.querySelector('.post__media:last-child'));
            // }

            postButtonObserver.observe(post.querySelector('.post__media:first-child'));
            postButtonObserver.observe(post.querySelector('.post__media:last-child'));
            // if(post.querySelectorAll('.post__media').length == 2){
            //     leftButton.style.display = 'unset';
            //     rightButton.style.display = 'unset';
            // }

        }
    });
}



function reactPost(id){
    url = 'http://localhost:8081/api/private/post/react?postId='+id;
    console.log(url);
    fetch(url, {
            method: 'POST',
            headers: {
            'Authorization' : authen,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        }).then((response) => {
            if(!response.ok){
                throw new Error(response.statusText)
            }
            response.ok;
        })
    //Then with the data from the response in JSON...
    .then((code) => {
        console.log('Success react:', code);
                
    }).catch((error)=>{
        console.log(error);
    }) 
}

function updateComment(target,data){
    var url = 'http://localhost:8081/api/public/user/' + username;
    fetch(url, {
        method: 'GET',
        headers: {
        'Authorization' : authen,
        'Accept': 'application/json',
        'Content-Type': 'application/json'
        }
    }).then((response) => response.json())
    //Then with the data from the response in JSON...
    .then((user) => {
        console.log('Success:', user);
        if(user){
            //register OK
            const div_messageSender__bottom_1 = document.createElement('div');
            div_messageSender__bottom_1.classList.add("messageSender__bottom");

            const img_user__avatar_mess_1 = document.createElement('img');
            img_user__avatar_mess_1.classList.add('user__avatar_mess');
            img_user__avatar_mess_1.src = "http://localhost:8081" + user.profile_Image.uri ;

            const div_messageSender_comm = document.createElement('div');
            div_messageSender_comm.classList.add('messageSender_comm');
            
            const h3_messageSender_comm = document.createElement('h3');
            h3_messageSender_comm.innerText = user.name;

            const p_messageSender = document.createElement('p');
            p_messageSender.classList.add('messageSender__p');
            p_messageSender.innerText = data;

            div_messageSender_comm.appendChild(h3_messageSender_comm);
            div_messageSender_comm.appendChild(p_messageSender);
            
            div_messageSender__bottom_1.appendChild(img_user__avatar_mess_1);
            div_messageSender__bottom_1.appendChild(div_messageSender_comm);
            target.appendChild(div_messageSender__bottom_1);

        }
        else{
            console.log("comment ERR");
        }
        
    }) 

    /*
            const div_messageSender__bottom_1 = document.createElement('div');
            div_messageSender__bottom_1.classList.add("messageSender__bottom");

            const img_user__avatar_mess_1 = document.createElement('img');
            img_user__avatar_mess_1.classList.add('user__avatar_mess');
            img_user__avatar_mess_1.src = "/resource/" + data[i].comments[k].user.profile_Image.name ;

            const div_messageSender_comm = document.createElement('div');
            div_messageSender_comm.classList.add('messageSender_comm');
            
            const h3_messageSender_comm = document.createElement('h3');
            h3_messageSender_comm.innerText = data[i].comments[k].user.name;

            const p_messageSender = document.createElement('p');
            p_messageSender.classList.add('messageSender__p');
            p_messageSender.innerText = data[i].comments[k].content;

            div_messageSender_comm.appendChild(h3_messageSender_comm);
            div_messageSender_comm.appendChild(p_messageSender);
            
            div_messageSender__bottom_1.appendChild(img_user__avatar_mess_1);
            div_messageSender__bottom_1.appendChild(div_messageSender_comm);
            div_comment.appendChild(div_messageSender__bottom_1);
    */
    console.log("UPDATE data " + data);
    console.log(target);
    //target.parentNode.parentNode.children[0].appendChild();
   // window.location.href = "home.html";
}

function sendmsg(target){
    console.log(authen);
    var data = target.value;
    fetch('http://localhost:8081/api/private/post/comment', {
            method: 'POST',
            headers: {
            'Authorization' : authen,
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
            body: JSON.stringify({content: data, postId: target.id}),
        }).then((response) => {
            if(!response.ok){
                throw new Error(response.statusText)
            }
            response.ok;
        })
    //Then with the data from the response in JSON...
    .then((code) => {
        console.log('Success:', code);
        //testObj = target;
        updateComment(target.parentNode.parentNode.children[0],data);
        
       
        
    }).catch((error)=>{
        console.log(error);
    }) 
}
