
//Storage. functiona to retreave messages from localstorage
function getDataFromLSorage() {
    const recentData = localStorage.getItem('items')
    if (recentData) {
        const data = JSON.parse(recentData)
        return data
    } else {
        const data = []
        return data
    }
}

//update  localStorage with new data/message
function updateStorage(item) {
    let data = getDataFromLSorage()
    data.unshift(item.innerHTML)
    localStorage['items'] = JSON.stringify(data)
}

//use this function to get index of the item that had an event
function getIndex(item) {
    const list = Array.from(document.querySelectorAll('#messages li'))
    const index = list.indexOf(item)
    return index
}

//update message list with messages from the local storage
function updateMessageList() {
    const recentMessageList = getDataFromLSorage()
    if(recentMessageList.length > 0) {
        const messageList = document.querySelector('#messages ul')

        for(let i = 0; i < recentMessageList.length; i++) {
            const newMessage = document.createElement('li')
            newMessage.innerHTML = recentMessageList[i]
            messageList.appendChild(newMessage)
        }
    }
}