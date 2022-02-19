const React = require('react');
const ReactDOM = require('react-dom');

import Background from './components/Background';

ReactDOM.render(<Background/>, document.getElementById('main'));

setTimeout(()=>{
    //show the register portal only if user has not registered before
    const username = localStorage.getItem("username");
  
    //here we only change the name of the register button to register or update, we want to avoid creating duplicates 
    document.querySelector("#registerUserButton").innerHTML = "register";
  
    if(!username){
      window.$('.ui.modal').modal('show');
    }else{
      console.log(`Welcome back ${username}`)
    }
  }, 2000);

console.log("%cYUHub!", "font-size:5em; color: blue");