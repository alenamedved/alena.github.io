const myName = 'Alena Miadzvedskaya';
const winnieDOB = new Date(2020, 8, 3);
const today = new Date();
const thisYear = today.getFullYear();
const thisMonth = today.getMonth() + 1;
const thisDay = today.getDate();
let ageWinnie;

const footer = document.querySelector('footer');
const copyright = document.createElement('p');

copyright.innerHTML = `&copy; ${myName} ${thisYear} `
footer.appendChild(copyright);

/* const winnieSkills = ['JavaScript', 'HTML', 'CSS', 'Data Analysys', 'Data Management','Analitical Skills', 'Engineering', 'Reserch', ];
const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');
for(let i = 0; i < skills.length; i++) {
    let skill = document.createElement('li');
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
} */
if(winnieDOB.getMonth() > thisMonth && thisYear == '2021') {
    ageWinnie = 11 - winnieDOB.getMonth() + thisMonth;
} else {
    ageWinnie = ((thisYear - winnieDOB.getFullYear()) * 12) + (thisMonth - winnieDOB.getMonth());
}

const agesection = document.getElementById('about');
let ageparagraph = document.createElement('p');
ageparagraph.innerText = `I was born on Sep 3, 2020 and today I'm ${ageWinnie} months old`;
agesection.appendChild(ageparagraph);


