// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

const pkg = require(__dirname + '/package.json')
const EventEmitter = require('events');
const fs = require('fs');
const path = require('path');

class MyEmitter extends EventEmitter {}
const emitter = new MyEmitter();




/* * *
  BODY DROP INIT
* * */

document.ondragover = document.ondrop = (ev) => {
  ev.preventDefault();
}
document.body.ondrop = (ev) => {
  ev.preventDefault()
  const file = ev.dataTransfer.files[0].path;
  emitter.emit('document-drop', {file})
}

emitter.on('background-color', (data) => {
  $("body").css({background: data.color})
});

emitter.on('foreground-color', (data) => {
  $("body").css({color: data.color})
});




/* * *
  JQUERY EXAMPLE
* * */

$(function(){
  $('title').text(pkg.productName||pkg.name);
});




/* * *
  INTERNAL API EXAMPLE
* * */

emitter.on('document-drop', (data) => {
  alert('Dropped ' + data.file);
});




/* * *
  INTERNAL API EXAMPLE
* * */

$(function(){


  $( "#emitter-example-form" ).submit(function( event ) {
    const eventName = $( "#event-name-select" ).val();
    const color = $( "#example-color-input" ).val();
    console.log((eventName, {color}))
    emitter.emit(eventName, {color})
    event.preventDefault();
  });


});
