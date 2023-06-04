
let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
let formBtn = document.querySelector('#login-btn');
let loginForm = document.querySelector('.login-form-container');
let formClose = document.querySelector('#form-close');
let menu = document.querySelector('#menu-bar');
let navbar = document.querySelector('.navbar');
let videoBtn = document.querySelectorAll('.vid-btn');

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

window.onscroll = () =>{
     searchBtn.classList.remove('fa-times');
     searchBar.classList.remove('active');
     menu.classList.remove('fa-times');
     navbar.classList.remove('active');
     loginForm.classList.remove('active');
}

menu.addEventListener('click',()=>{
     menu.classList.toggle('fa-times');
     navbar.classList.toggle('active');
});

searchBtn.addEventListener('click',()=>{
      searchBtn.classList.toggle('fa-times');
      searchBar.classList.toggle('active');
});

formBtn.addEventListener('click',()=>{
    loginForm.classList.add('active');
});

formClose.addEventListener('click',()=>{
    loginForm.classList.remove('active');
});

videoBtn.forEach(btn =>{
    btn.addEventListener('click', () =>{
        document.querySelector('.controls .active').classList.remove('active');
        btn.classList.add('active');
        let src = btn.getAttribute('data-src');
        document.querySelector('#video-slider').src = src;
    });
}); 

var swiper = new Swiper(".mySwiper",{
    spaceBetween: 20,
    loop:true,});

const handleLogin = (data) => {
    if (data.status === 1) {
        window.location.href = "/"
    }
    else{
        window.alert(data.message)
    }
}

const handleSignup = (data) => {
    if (data.status === 1) {
        window.alert("Signup Successful , Please Login!")
        document.querySelector('#signup_form').style.display = 'none';
        document.querySelector('#login_form').style.display = 'block';
    }
    else{
        window.alert(data.message)
    }
}



const handleOnLoad = () => {
    
    document.querySelector('#signup_form').style.display = 'none';
    document.querySelectorAll('#login_now , #register_now').forEach(form => {
        form.addEventListener('click', (e) => {
            if (e.target.id === 'register_now') {
                document.querySelector('#signup_form').style.display = 'block';
                document.querySelector('#login_form').style.display = 'none';
            } else {
                document.querySelector('#signup_form').style.display = 'none';
                document.querySelector('#login_form').style.display = 'block';
            }
        })
    })

    document.querySelector('#login_btn').addEventListener('click', (e) => {
            var postData={}
            document.querySelectorAll("#login_form input").forEach(input => {
                postData[input.name] = input.value
            })
            console.log(postData)
            window.fetch(document.querySelector("#login_form").action, {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        handleLogin(data)
                })
                } else {
                    response.json().then(x => {
                        console.log(x.message)
                    });
                }
            }).catch((e) => {
                console.log(e)
            });
        });

        document.querySelector('#signup_btn').addEventListener('click', (e) => {
            var postData={}
            document.querySelectorAll("#signup_form input").forEach(input => {
                postData[input.name] = input.value
            })
            window.fetch(document.querySelector("#signup_form").action, {
                method: 'POST',
                body: JSON.stringify(postData),
                headers: {
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                },
            }).then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        handleSignup(data)
                })
                } else {
                    response.json().then(x => {
                        console.log(x.message)
                    });
                }
            }).catch((e) => {
                console.log(e)
            });
        });
}



document.addEventListener('DOMContentLoaded', handleOnLoad, false);