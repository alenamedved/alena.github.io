document.addEventListener('DOMContentLoaded', () => {
    //Select elements from DOM
    const footer = document.querySelector('footer');
    const copyright = document.createElement('p');
    const messageForm = document.getElementsByName("leave_message")[0];
    const messageSection = document.getElementById('messages');
    const messageList = messageSection.querySelector('ul')
    const skillsSection = document.getElementById('skills');
    const skillsList = skillsSection.querySelector('ul');
    
    
    //Make message section invisible by default    
    messageSection.style.display = 'none'
    
    //Create variables for use
    const myName = 'Alena Miadzvedskaya';
    const today = new Date;
    const thisYear = today.getFullYear();
    const skills = [
        'JavaScript', 
        'HTML', 
        'CSS', 
        'Git',
        'Data Analysys', 
        'Data Management',
        'Analitical Skills', 
        'Engineering', 
        'Reserch'
    ];
    
    
    //Function to create a button
    function createButton(nameButton) {
        const button = document.createElement('button')
        button.innerText = nameButton
        button.type = 'button'
        return button
    }
    
    
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
    skillsSection.addEventListener('mouseover', (event) => {
        if (event.target.tagName == 'LI') {
            event.target.textContent = event.target.textContent.toUpperCase();
        }
    });

    skillsSection.addEventListener('mouseout', (event) => {
        if(event.target.tagName == 'LI') {
            for(let i = 0; i < skills.length; i++) {
                if(event.target.textContent == skills[i].toUpperCase()) {
                event.target.textContent = skills[i]
                }
            }
        }
    });


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
        
        newMessage.innerHTML = (`<a href="mailto:${email}">${name}</a> wrote: <span><em>${messageFromUser}</em></span> &nbsp`)
        
        //Final appendants to the DOM: add created elements to the newMessage and append the newMessage to  the list. 
        newMessage.appendChild(removeButton)
        newMessage.appendChild(editButton)
        newMessage.appendChild(doneButton)
        messageList.appendChild(newMessage)
        
        //As li element was added the message section can be visible
        messageSection.style.display = 'inline-block'

        //Resert messageForm to make it clean again and ready for new input
        event.target.reset()

    })//end of messageForm eventListener

    //add onclick event to the messageList to make the buttons interactive
    messageList.onclick = (event) => {
        if(event.target.tagName == "BUTTON") {
            const button = event.target
            const action = button.innerText.toLowerCase()
            const entry = button.parentNode
            
            //put the functions inside the Object
            const actions = {

                remove: () => {
                    //make the message section gone using traversal approach
                    if(entry.parentNode.children.length <= 1) {
                        messageSection.style.display = 'none'
                    }
                    entry.remove()
                },//end of remove function 
                
                edit: () => {
                    entry.querySelector('span').contentEditable = true;
                    entry.querySelector('span').style.background = 'lightgray'
                    
                    //Add the option to edit the name line too
                    entry.querySelector('a').contentEditable = true;
                    entry.querySelector('a').style.background = 'lightgray'
                    
                    //Make the Done button appear when additing the content
                    button.nextSibling.style.visibility = 'initial'
                },//end of edit function

                done: () => {
                    entry.querySelector('span').contentEditable = false;
                    entry.querySelector('span').style.background = 'none'
                    
                    entry.querySelector('a').contentEditable = false;
                    entry.querySelector('a').style.background = 'none'

                    //Make the Done button disappear when finished with additing
                    button.style.visibility = 'hidden'
                }//end of done function
            }
            //call the function from the object actions
            actions[action]()
            
        }//end of if statement
    }//end of onclick event for messageList

})
 