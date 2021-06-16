//Select Elements from DOM
const footer = document.querySelector('footer');
const winnieSkillsSection = document.getElementById('winnieskills');
const winnieSkillsList = winnieSkillsSection.querySelector('ul');
const ageSection = document.getElementById('about');

//Create variables to work 
const myName = 'Alena Miadzvedskaya';
const winnieDOB = new Date(2020, 8, 3);
const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth() + 1;
const thisDay = today.getDate();
let ageWinnie;
const winnieSkills = [
    'I can jump very high', 
    `I always know what time it's especially if it's time to eat`, 
    `And I know when it's time to go outside for a walk`, 
    `I'm an experimenter: I'm always ready to try a new stuff`, 
    `I train my Mom very well`, 
    `Ok, I know how to lie down, sit and stay and I come when I'm called` 
];

//Creat <p> Elements
const copyright = document.createElement('p');
let ageparagraph = document.createElement('p');

//Calculate ageWinnie
if(winnieDOB.getMonth() > thisMonth && thisYear == '2021') {
    ageWinnie = 11 - winnieDOB.getMonth() + thisMonth;
} else {
    ageWinnie = ((thisYear - winnieDOB.getFullYear()) * 12) + (thisMonth - winnieDOB.getMonth());
}

//Fill out a Skills Section with skills from the skills array
for(let i = 0; i < winnieSkills.length; i++) {
    let skill = document.createElement('li');
    skill.innerText = winnieSkills[i];
    winnieSkillsList.appendChild(skill);
}

//Fill out the paragraph and append it to the DOM
ageparagraph.innerText = `I was born on Sep 3, 2020 and today I'm ${ageWinnie} months old`;
ageSection.appendChild(ageparagraph);

//Fill out the copyright element and append it to the DOM
copyright.innerHTML = `&copy; ${myName} ${thisYear} `
footer.appendChild(copyright);