let widthMatch = window.matchMedia("(max-width: 480px)")
const list = document.querySelectorAll(".menu__box > li > a")
const span = document.querySelectorAll("#menu__toggle")[0]

function menuItemHandle() {
    document.querySelector('.menu__box').style.visibility = 'hidden'
    span.checked = false
    console.log('click') 
}
function spanEventFunction() {
    if (span.checked) {
        document.querySelector('.menu__box').style.visibility = 'initial'
        console.log('inside of span element')
    }
}
//to add onclick events to all <a> tags inside menu__box if we load the page wider then 481px
if(window.screen.width <= 480) {
    console.log('less 480px first')

    list.forEach(i => {
        console.log('inside mm.matches')
        i.onclick = function(){menuItemHandle()}
    })

    span.addEventListener('click', () => {
        if (span.checked) {
            document.querySelector('.menu__box').style.visibility = 'initial'

        }
    })
}
//when width of the page beeing changed we add an event to check the width to add or remove events from <a> tags
widthMatch.addEventListener('change', () => {

    console.log('outside of ifs')
    //for small screen we add events
    if(window.screen.width <= 480) {
        console.log('less 480px')

        list.forEach(i => {
            console.log('inside mm.matches')
            i.onclick = function(){menuItemHandle()}
        })

        span.addEventListener('click', spanEventFunction)
    } 
    //for screen > 481 we disable events 
    if(window.screen.width >= 481) {
        list.forEach(i => {
            console.log('im here')
            i.onclick = 'false'
        })
        span.removeEventListener('click', spanEventFunction) //removeEvent works in this case
        document.querySelector('.menu__box').style.visibility = 'initial'
        console.log('screeen wider then 480px') 
     }  
})


/* let widthMatch = window.matchMedia("(max-width: 480px)") */

/* widthMatch.addEventListener('change', (mm) => { */
    /* const list = document.querySelectorAll(".menu__box > li > a")
    const span = document.querySelectorAll("#menu__toggle")[0] */

    /* function menuItem() {
        /*  e.preventDefault(); */
       /*  document.querySelector('.menu__box').style.visibility = 'hidden'
        span.checked = false
        console.log('click') */
    /* } */ 

    /* if (mm.matches) {
        console.log('less 480px')

        list.forEach(i => {
            console.log('inside mm.matches')
            i.addEventListener('click', menuItem)
        })

        span.addEventListener('click', () => {
            if (span.checked) {
                document.querySelector('.menu__box').style.visibility = 'initial'

            }
        })
    } else {
        list.forEach(i => {
            console.log('im here')
            
            i.removeEventListener('click', menuItem)   //don't remove events ???
            /* i.style.visibility = 'initial' */
       /*  }) */
        /* document.querySelector('.menu__box').style.visibility = 'initial'
        console.log('screeen wider then 480px') */
   /*  } */ 
/* })  */