//Select Elements from DOM
const footer = document.querySelector("footer");
const winnieSkillsSection = document.getElementById("winnieskills");
const winnieSkillsList = winnieSkillsSection.querySelector("ul");
const ageSection = document.getElementById("about");

//Create variables to work
const myName = "Winnie The Pooh";
const winnieDOB = new Date(2020, 8, 3);
const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth() + 1;
const thisDay = today.getDate();
let ageWinnie;
const winnieSkills = [
  "I can jump very high",
  `I always know what time it's especially if it's time to eat`,
  `And I know when it's time to go outside for a walk`,
  `I'm an experimenter: I'm always ready to try a new stuff`,
  `I train my Mom very well`,
  `Ok, I know how to lie down, sit and stay and I come when I'm called`,
];

//Creat <p> Elements
const copyright = document.createElement("p");
const ageparagraph = document.createElement("p");

//Calculate ageWinnie
if (winnieDOB.getMonth() > thisMonth && thisYear == "2021") {
  ageWinnie = 11 - winnieDOB.getMonth() + thisMonth;
} else {
  ageWinnie =
    (thisYear - winnieDOB.getFullYear()) * 12 +
    (thisMonth - winnieDOB.getMonth());
}

//Fill out a Skills Section with skills from the skills array
for (let i = 0; i < winnieSkills.length; i++) {
  let skill = document.createElement("li");
  skill.innerText = winnieSkills[i];
  winnieSkillsList.appendChild(skill);
}

//Fill out the paragraph and append it to the DOM
ageparagraph.innerText = `I was born on Sep 3, 2020 and today I'm ${ageWinnie} months old`;
ageSection.appendChild(ageparagraph);

//Fill out the copyright element and append it to the DOM
copyright.innerHTML = `&copy; ${myName} ${thisYear} `;
footer.appendChild(copyright);

//number of photos to show
const numOfPhotos = 5;

//select elements from the DOM
let slidesConteiner = document.getElementsByClassName("slideshow-container")[0];
let dots = document.getElementsByClassName("dots")[0];
dots.style.textAlign = "center";

//fill the array with photos
const winnieImg = [];
for (i = 1; i <= numOfPhotos; i++) {
  winnieImg[i] = new Image();
  winnieImg[i].src = `./img/winniePhoto/${i}.JPG`;
}

//fill out the DOM
const slidesDiv = createDivSlide();
const dotsDiv = createDots();
slidesConteiner.appendChild(addPrevArrow());
slidesConteiner.appendChild(addNextArrow());

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides((slideIndex = n));
}

function createDivSlide() {
  for (let i = 1; i <= numOfPhotos; i++) {
    let slides = document.createElement("div");
    let slideNum = document.createElement("div");
    let img = document.createElement("img");

    slides.className = "mySlides fade";
    slideNum.className = "numbertext";
    slideNum.innerHTML = `${i}/${numOfPhotos}`;

    img = winnieImg[i];
    img.style.width = "100%";

    slides.appendChild(slideNum);
    slides.appendChild(img);

    slidesConteiner.appendChild(slides);
  }
  return slidesConteiner;
}

function createDots() {
  for (let i = 1; i <= numOfPhotos; i++) {
    let dot = document.createElement("span");
    dot.className = "dot";
    dot.addEventListener("click", () => {
      currentSlide(i);
    });
    dots.appendChild(dot);
  }
  return dots;
}

function addNextArrow() {
  const arrow = document.createElement("a");
  arrow.className = "next";
  arrow.innerHTML = "&#10095;";
  arrow.addEventListener("click", () => {
    plusSlides(1);
  });
  return arrow;
}

function addPrevArrow() {
  const arrow = document.createElement("a");
  arrow.className = "prev";
  arrow.innerHTML = "&#10094;";
  arrow.addEventListener("click", () => {
    plusSlides(-1);
  });
  return arrow;
}

function showSlides(n) {
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}
