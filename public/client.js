const socket= io()

let user;

let textarea=document.querySelector('#textarea')
let messagearea=document.querySelector('.message_area')

do{
    user = prompt('Please Enter your Name : ')
}while(!user)

textarea.addEventListener('keyup',(e)=>{
    if(e.key === 'Enter'){
        sendMessage(e.target.value)
    }
})

function sendMessage(mess){
    let msg={
        person: user,
        message:mess.trim()
    }

    //append
    appendmessage(msg,'out')
    textarea.value=''
    scrollTobottom()

    //send to server 

        socket.emit('message',msg)
}

function appendmessage(msg,type){
    let mainDiv=document.createElement('div')
    let className=type
    mainDiv.classList.add( className,'message')


    let markup=`
    <h4>${msg.person}</h4>
    <p>${msg.message}</p>
    `

    mainDiv.innerHTML=markup

    messagearea.appendChild(mainDiv)
}   

//recive message

socket.on('message',(msg)=>{
    // console.log(msg)
    appendmessage(msg,'in')
    scrollTobottom()
})

function scrollTobottom(){
    messagearea.scrollTop=messagearea.scrollHeight
}