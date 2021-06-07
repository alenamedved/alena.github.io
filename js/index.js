//Select elements from DOM
const footer = document.querySelector('footer');
const copyright = document.createElement('p');
const messageForm = document.getElementsByName("leave_message")[0];
const messageSection = document.getElementById('messages');
const messageList = messageSection.querySelector('ul')
const skillsSection = document.getElementById('skills');
const skillsList = skillsSection.querySelector('ul');

//Create variables for use
const myName = 'Alena Miadzvedskaya';
const today = new Date;
const thisYear = today.getFullYear();
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


//Add the copyright with name and year to the footer
copyright.innerHTML = `&copy; ${myName} ${thisYear} `;
footer.appendChild(copyright);


//Fill out the Skill section with skills from the skills array. 
for(let i = 0; i < skills.length; i++) {
    let skill = document.createElement('li');
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
}


//Add  events to the Skill section using Bubbling and event Delegation
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


//Make message section invisible by default    
messageSection.style.display = 'none'


//Function to create a button
function createButton(nameButton) {
    const button = document.createElement('button')
    button.innerText = nameButton
    button.type = 'button'
    return button
}


//Working with Message Section: filling it in with messages from the users
messageForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    //Collect an input data from the user and store it in variables name, email, messageFromUser
    const name = event.target.name.value
    const email = event.target.email.value
    const messageFromUser = event.target.messageFromUser.value
    
    //Log to the console to check if it works
    console.log(`${name} ${email} wrote: ${messageFromUser}`)
    
    //Document creation of Elements
    const removeButton = createButton('Remove')
    const editButton = createButton('Edit')
    const doneButton = createButton('Done')
    const newMessage = document.createElement('li')
    
    //Make the Done button hidden by default
    doneButton.style.visibility = 'hidden'
    
    newMessage.innerHTML = (`<a href="mailto:${email}">${name}</a> wrote: <span>${messageFromUser}</span>`)
    
    
    //Event Listeners for Remove, Edit and Done buttons
    removeButton.addEventListener('click', (event) => {
        const entry = removeButton.parentNode
        entry.remove()
        //Make the message section gone when last item list removed
        if(messageList.querySelectorAll('li').length == 0) {
            messageSection.style.display = 'none' 
        }
    })
    
    
    editButton.addEventListener('click', (event) => { 
        const entry = editButton.parentNode
        entry.querySelector('span').contentEditable = true;
        entry.querySelector('span').style.background = 'lightgray'
        
        //Make the Done button appear when additing the content
        doneButton.style.visibility = 'initial'
    })
    
    
    doneButton.addEventListener('click', (event) => { 
        const entry = doneButton.parentNode
        entry.querySelector('span').contentEditable = false;
        entry.querySelector('span').style.background = 'none'
        
        //Make the Done button disappear when finished with additing
        doneButton.style.visibility = 'hidden'
    }) 
    
    //Final appendants to the DOM: add created elements to the newMessage and append the newMessage to  the list. 
    newMessage.appendChild(removeButton)
    newMessage.appendChild(editButton)
    newMessage.appendChild(doneButton)
    messageList.appendChild(newMessage)
    
    //As li element was added the message section can be visible
    messageSection.style.display = 'initial'

    //Resert messageForm to make it clean again and ready for new input
    event.target.reset()
    
}); 

 