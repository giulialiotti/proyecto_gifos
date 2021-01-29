// ---- ---- ---- ---- ---- HAMBURGER MENU ---- ---- ---- ---- ----

const hamburger = document.getElementById('hamburger');
const navUl = document.getElementById('navUl');
const closeHamburger = document.getElementById('closeHamburger');

hamburger.addEventListener('click', () => {
    navUl.classList.toggle('show');
});

