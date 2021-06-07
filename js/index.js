const myName = 'Alena Miadzvedskaya';
const today = new Date;
const thisYear = today.getFullYear();
const footer = document.querySelector('footer');
const copyright = document.createElement('p');

const messageForm = document.getElementsByName("leave_message")[0];
const messageSection = document.getElementById('messages');
const messageList = messageSection.querySelector('ul')
//add the copyright with name and year to the footer
copyright.innerHTML = `&copy; ${myName} ${thisYear} `;
footer.appendChild(copyright);
//create a skills array
const skills = [
    'JavaScript', 
    'HTML', 
    'CSS', 
    'Data Analysys', 
    'Data Management',
    'Analitical Skills', 
    'Engineering', 
    'Reserch'
];
//Fill out a Skill section with skills from the skills array. 
const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');
for(let i = 0; i < skills.length; i++) {
    let skill = document.createElement('li');
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}
//Add an event to the Skill section
/* const listItems = skillsSection.getElementsByTagName('li');
for(let i = 0; i < listItems.length; i++) {
    listItems[i].addEventListener('mouseover', () => {
       listItems[i].textContent = listItems[i].textContent.toUpperCase()
    })
    listItems[i].addEventListener('mouseout', () => {
       listItems[i].textContent = skills[i];
    })
} */

//Add an event to the Skill section using Bubbling and event Delegation
skillsList.addEventListener('mouseover', (event) => {
    if (event.target.tagName == 'LI') {
        event.target.textContent = event.target.textContent.toUpperCase();
  }
});
skillsList.addEventListener('mouseout', (event) => {
    if(event.target.tagName == 'LI') {
      for(let i = 0; i < skills.length; i++) {
          if(event.target.textContent == skills[i].toUpperCase()) {
            event.target.textContent = skills[i]
          }
        }
    }
});
//make message section invisible by default    
messageSection.style.display = 'none'
//function to create a button
function createButton(nameButton) {
    const button = document.createElement('button')
    button.innerText = nameButton
    button.type = 'button'
    return button
}
//Working with Message Section: filling it in with messages from th users
messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    //colect an input date from the user and store it in variables name, email, messageFromUser
    const name = event.target.name.value
    const email = event.target.email.value
    const messageFromUser = event.target.messageFromUser.value
    console.log(`${name} ${email} wrote: ${messageFromUser}`)
    //create a list element and fill it innerHTML 
    const newMessage = document.createElement('li')
    newMessage.innerHTML = (`<a href="mailto:${email}">${name}</a> wrote: <span>${messageFromUser}</span>`)
    //create remove button with event handler that removes the list element when clicked
    const removeButton = createButton('Remove')
    removeButton.addEventListener('click', (event) => {
        const entry = removeButton.parentNode
        entry.remove()
        if(messageList.querySelectorAll('li').length == 0) {
            messageSection.style.display = 'none' 
        }
    })
    //adding a Edit button to update a message content
    const editButton = createButton('Edit')
    editButton.addEventListener('click', (event) => { 
        const entry = editButton.parentNode
        entry.querySelector('span').contentEditable = true;
        entry.querySelector('span').style.background = 'lightgray'
        doneButton.style.visibility = 'initial'
    })
    //adding a Done button to finish editing of a message content. Button is hidden when inactive
    const doneButton = createButton('Done')
    doneButton.style.visibility = 'hidden'
    doneButton.addEventListener('click', (event) => { 
        const entry = doneButton.parentNode
        entry.querySelector('span').contentEditable = false;
        entry.querySelector('span').style.background = 'none'
        doneButton.style.visibility = 'hidden'
    }) 

    messageFromUser.placeholder = ""
    newMessage.appendChild(removeButton)
    newMessage.appendChild(editButton)
    newMessage.appendChild(doneButton)
    messageList.appendChild(newMessage)
    messageSection.style.display = 'initial'
    event.target.reset()
    
}); 

 