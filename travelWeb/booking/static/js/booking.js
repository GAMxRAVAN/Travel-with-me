
let searchBtn = document.querySelector('#search-btn');
let searchBar = document.querySelector('.search-bar-container');
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

function generatePDF() {
    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();
    // Get the table element
    const table = document.getElementById('myTable');
    
    html2canvas(table).then(canvas => {
        const imgData = canvas.toDataURL('image/png');
        const imgProps = doc.getImageProperties(imgData);
        const pdfWidth = doc.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

        doc.addImage(imgData, 'PNG', 10, 10, pdfWidth - 20, pdfHeight);
        doc.save('booking.pdf');
    });
}


const handleOnLoad = () => {
   document.querySelector("#download_btn").addEventListener("click",generatePDF)
}



document.addEventListener('DOMContentLoaded', handleOnLoad, false);