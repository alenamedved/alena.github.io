document.addEventListener("DOMContentLoaded", () => {
  //Select elements from DOM
  const footer = document.querySelector("footer");
  const copyright = document.createElement("p");
  const messageForm = document.getElementsByName("leave_message")[0];
  const messageSection = document.getElementById("messages");
  const messageList = messageSection.querySelector("ul");
  const skillsSection = document.getElementById("skills");
  const skillsList = skillsSection.querySelector("ul");
  const educationalSecCodeTheDream = document.getElementsByClassName("education_item2")[0];
  const certificate = document.getElementsByClassName("certificate")[0];
  const educSectAll = document.getElementsByClassName("education_container")[0];

  //Create variables to use
  const myName = "Alena Miadzvedskaya";
  const today = new Date();
  const thisYear = today.getFullYear();
  const skills = [
    "JavaScript",
    "React",
    "HTML",
    "CSS",
    "Git",
    "Data Analysys",
    "Data Management",
    "Analitical Skills",
    "Engineering",
    "Reserch",
  ];

  //add a label to the users message if user checked out 'friend' of 'emploeyr' radio button
  const arrImg = [];
  arrImg[0] = new Image();
  arrImg[1] = new Image();
  arrImg[0].src = "img/star_logo.png";
  arrImg[1].src = "img/heart_logo.jpg";
  arrImg[0].width = 16;
  arrImg[1].width = 16;

  //check if radio button is checked or not
  function checkRadioButton() {
    const radio = document.getElementsByName("radio");
    let pin = document.createElement("span");

    for (let i = 0; i < radio.length; i++) {
      if (radio[i].checked) {
        pin =
          radio[i].id === "employer"
            ? pin.appendChild(arrImg[i])
            : pin.appendChild(arrImg[i]);
      }
    }
    return pin;
  }

  //update messageList with messages from local storage
  updateMessageList();

  //Make message section invisible by default  if it is empty
  if (
    localStorage["items"] === undefined ||
    localStorage["items"].length <= 2
  ) {
    messageSection.style.display = "none";
  } else if (localStorage["items"].length > 2) {
    messageSection.style.display = "initial";
  }

  //Function to get a current time
  function getTime() {
    const today = new Date();
    const options = {
      weekday: "short",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    //to get rid of ',' use split and join methods
    return today.toLocaleString(undefined, options).split(",").join(" ");
  }

  //Function to create a button
  function createButton(nameButton) {
    const button = document.createElement("button");
    button.innerText = nameButton;
    button.type = "button";
    button.className = nameButton.toLowerCase();
    return button;
  }

  //Add the copyright with name and year to the footer
  copyright.innerHTML = ` &copy; ${myName} ${thisYear}`;
  footer.appendChild(copyright);

  //Fill out the Skill section with skills from the skills array.
  for (let i = 0; i < skills.length; i++) {
    const skill = document.createElement("li");
    skill.innerText = skills[i];
    skillsList.appendChild(skill);
  }

  //Add  events to the Skill section using Bubbling and event Delegation
  skillsSection.addEventListener("mouseover", (event) => {
    if (event.target.tagName == "LI") {
      event.target.textContent = event.target.textContent.toUpperCase();
      event.target.style.opacity = 0.7;
    }
  });

  skillsSection.addEventListener("mouseout", (event) => {
    if (event.target.tagName == "LI") {
      for (let i = 0; i < skills.length; i++) {
        if (event.target.textContent == skills[i].toUpperCase()) {
          event.target.textContent = skills[i];
        }
      }
      event.target.style.opacity = 1;
    }
  });
  
  //add certificat in place of CTD container
  educationalSecCodeTheDream.addEventListener("mouseenter", (event) => {
    educationalSecCodeTheDream.style.display = "none";
    educationalSecCodeTheDream.parentNode.style.backgroundImage = "url('img/certificate.png')"
    educationalSecCodeTheDream.parentNode.style.backgroundPosition = 'center'
    educationalSecCodeTheDream.parentNode.style.backgroundSize = 'contain'
    educationalSecCodeTheDream.parentNode.style.backgroundRepeat = 'no-repeat'
    
    /* certificate.style.display = "block"; */
  });
  educSectAll.addEventListener("mouseleave", (event) => {
    educationalSecCodeTheDream.parentNode.style.backgroundImage = "none"
    educationalSecCodeTheDream.style.display = "block";
   /*  certificate.style.display = "none"; */
  });

  //Working with Message Section: filling it in with messages from the users
  messageForm.addEventListener("submit", (event) => {
    event.preventDefault();

    //Collect an input data from the user and store it in variables name, email, messageFromUser
    const name = event.target.name.value;
    const email = event.target.email.value;
    const messageFromUser = event.target.messageFromUser.value;

    //Log to the console to check if it works
    console.log(`${name} ${email} wrote: ${messageFromUser}`);

    //Document creation of Elements
    const removeButton = createButton("Remove");
    const editButton = createButton("Edit");
    const doneButton = createButton("Done");
    const newMessage = document.createElement("li");

    //Make the Done button hidden by default
    doneButton.style.visibility = "hidden";

    newMessage.innerHTML = `<span>${messageFromUser}</span><br> <span>${getTime()}</span> from: <a href="mailto:${email}">${name}</a>&nbsp`;

    //Final appendants to the DOM: add created elements to the newMessage and append the newMessage to  the list.
    newMessage.appendChild(checkRadioButton());
    newMessage.appendChild(removeButton);
    newMessage.appendChild(editButton);
    newMessage.appendChild(doneButton);

    messageList.insertBefore(newMessage, messageList.firstChild);

    //As li element was added the message section can be visible
    messageSection.style.display = "inline-block";

    //update the storage with a newMessage
    updateStorage(newMessage);

    //Resert messageForm to make it clean again and ready for new input
    event.target.reset();
  }); //end of messageForm eventListener

  //add onclick event to the messageList to make the buttons interactive
  messageList.onclick = (event) => {
    if (event.target.tagName == "BUTTON") {
      const button = event.target;
      const action = button.innerText.toLowerCase();
      const entry = button.parentNode;

      //put the functions inside the Object
      const actions = {
        remove: () => {
          //make the message section gone using traversal approach
          if (entry.parentNode.children.length <= 1) {
            console.log(entry.parentNode.children.length);
            messageSection.style.display = "none";
          }

          const index = getIndex(entry);

          storage = getDataFromLSorage();
          storage.splice(index, 1);

          localStorage.removeItem("items");
          localStorage.setItem("items", JSON.stringify(storage));

          entry.remove();
        }, //end of remove function

        edit: () => {
          entry.querySelector("span").contentEditable = true;
          entry.querySelector("span").style.background = "lightgray";

          //Add the option to edit the name line too
          entry.querySelector("a").contentEditable = true;
          entry.querySelector("a").style.background = "lightgray";

          //Make the Done button appear when additing the content
          button.nextSibling.style.visibility = "initial";
        }, //end of edit function

        done: () => {
          const list = Array.from(messageList.querySelectorAll("li"));
          const index = getIndex(entry);

          const editedMessage = list[index];

          entry.querySelector("span").contentEditable = false;
          entry.querySelector("span").style.background = "none";

          entry.querySelector("a").contentEditable = false;
          entry.querySelector("a").style.background = "none";

          //Make the Done button disappear when finished with additing
          button.style.visibility = "hidden";

          storage = getDataFromLSorage();
          storage.splice(index, 1, editedMessage.innerHTML);

          localStorage.removeItem("items");
          localStorage.setItem("items", JSON.stringify(storage));
        }, //end of done function
      };
      //call the function from the object actions
      actions[action]();
    } //end of if statement
  }; //end of onclick event for messageList
});

/* create and send a fetch request */
const GITHUB_USERNAME = "alenamedved";

//Helper functions
function handleRepoData(repositories) {
  const projectSection = document.getElementById("projects");
  const projectList = projectSection.querySelector("ul");
  projectList.className = "projectUl";

  repositories.forEach((repo, i) => {
    const project = document.createElement("li");
    const aTag = document.createElement("a");
    const descr = document.createElement("p");

    descr.className = "repoDescr";
    aTag.href = repo.html_url;
    aTag.target = "_blank";
    aTag.innerText = repo.name.split("-").join(" ");
    descr.innerText = `Description: ${repo.description}.`;
    project.className = `item${i}`;
    i = i + 1;

    project.appendChild(aTag);
    project.appendChild(descr);
    projectList.appendChild(project);
  });
}

function fetchData(url, functToDo) {
  return fetch(url)
    .then(checkStatus)
    .then((resp) => resp.json()) //return the json data
    .catch((error) => alert("Looks like there was a problem", error))
    .then((result) => functToDo(result));
}

function checkStatus(response) {
  if (response.ok) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
}
//call fetch data
fetchData(
  `https://api.github.com/users/${GITHUB_USERNAME}/repos`,
  handleRepoData
);
