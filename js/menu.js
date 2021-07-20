
const widthMatch = window.matchMedia("(max-width: 480px)")
const listNav = document.querySelectorAll(".menu__box a")
const span = document.querySelectorAll("#menu__toggle")[0]

function menuItemHandle() {
    document.querySelector('.menu__box').style.visibility = 'hidden'
    span.checked = false
}

function spanEventFunction() {
    if (span.checked) {
        document.querySelector('.menu__box').style.visibility = 'initial'
    }
}

function addFuncToListItem(list, funcToAdd) {
    list.forEach(i => {
        i.onclick = function () { funcToAdd() }
    })
}

//when width of the page beeing changed we add an event to check the width to add or remove events from <a> tags
function handleWidthChange() {
    //for small screen we add events
    if (window.screen.width <= 480) {
        addFuncToListItem(listNav, menuItemHandle)
        span.addEventListener('click', spanEventFunction)
    } else if (window.screen.width >= 481) {  //for screen > 481 we disable events 
        listNav.forEach(i => {
            i.onclick = 'false'
        })
        span.removeEventListener('click', spanEventFunction) //removeEvent works in this case
        document.querySelector('.menu__box').style.visibility = 'initial'
    }
}

//to add onclick events to all <a> tags inside menu__box if we load the page less then 481px
handleWidthChange()


widthMatch.addEventListener('change', handleWidthChange)


