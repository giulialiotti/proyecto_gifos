const APIKEY = "gUd0zCdNEkv06vVTL5GpSGw4arqlSool";

// ---- ---- ---- ---- ---- HAMBURGER MENU ---- ---- ---- ---- ----

const hamburger = document.getElementById('hamburger');
const navUl = document.getElementById('navUl');

// ---- ---- ---- ---- ---- DARK MODE ---- ---- ---- ---- ----

const darkMode = document.getElementById('darkMode');

// ---- ---- ---- ---- ---- SEARCH GIFOS RESULTS ---- ---- ---- ---- ----

const btnSeeMore = document.getElementById('btn-see-more');
const divider = document.querySelector('.divider');
const titleSearchResult = document.getElementById('titleSearchResult');
const btnSearch = document.getElementById('btnSearch'); // NO CAMBIAR

// ---- ---- ---- ---- ---- SEARCH RESULTS GIFS FOR LOOP ---- ---- ---- ---- ----

const searchResultsGifs = document.getElementById("searchResultsGifs");

// ---- ---- ---- ---- TRENDING TEXT IN SEARCH BAR SECTION ---- ---- ---- ----

const trendingTitle = document.getElementById('trendingTitle');
let trendingText = document.getElementById('trendingText');

// ---- ---- ---- ---- ---- GIFS GALLERY EXPANDED ---- ---- ---- ---- ----

let gifsGallery = document.getElementById('gifsGallery');
let closeGallery = document.getElementById('closeGallery');
let btnLeft = document.querySelector('.btn-left');
let btnRight = document.querySelector('.btn-right');
let expandedGif = document.getElementById('expandedGif');
let galleryUser = document.getElementById('galleryUser');
let galleryGifTitle = document.getElementById('galleryGifTitle');
let gifIndex;

// ---- ---- ---- ---- ---- FAVORITES SECTION ---- ---- ---- ---- ----

const favoritesGifsContainer = document.getElementById('favoritesGifsContainer');
const favoritesLink = document.getElementById('favoritesLink');
const iconFav = document.querySelector('.icon-fav');
const favoritesText = document.querySelector('.favorites-text');