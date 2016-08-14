/*! grunt-start-kit v1.0.0 | https://github.com/stub4ever/grunt-start-kit#readme */"use strict";/*------------------------------------*\
    # Return parent of elements - function helper
    see @ https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
\*------------------------------------*/
function getAncestor(el,ancestorClass){var parent=el.parentElement;return parent.classList.contains(ancestorClass)||(parent=getAncestor(parent,ancestorClass)),parent}/*------------------------------------*\
    # classList helper functions
    see @ https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
\*------------------------------------*/
var hasClass,addClass,removeClass;"classList"in document.documentElement?(hasClass=function(el,className){return el.classList.contains(className)},addClass=function(el,className){el.classList.add(className)},removeClass=function(el,className){el.classList.remove(className)}):(hasClass=function(el,className){return new RegExp("\\b"+className+"\\b").test(el.className)},addClass=function(el,className){hasClass(el,className)||(el.className+=" "+className)},removeClass=function(el,className){el.className=el.className.replace(new RegExp("\\b"+className+"\\b","g"),"")}),function(){function createName(event){var insertClassName=document.createElement("div");insertClassName.setAttribute("class","quiz-player__name");
// input name value
var newName=applyNameInput.value,newNameContent="<span>"+newName+"</span>";insertClassName.innerHTML=newNameContent,
// insert new name content
quizQuestionContent.insertBefore(insertClassName,quizQuestionInner),
// reset empty string
applyNameInput.value=""}
// remove startWrapper to play quizgame
function removeIndexWrapper(){var indexWrapper=document.getElementsByClassName("index__wrapper")[0];return indexWrapper.parentNode.removeChild(indexWrapper),!1}/*------------------------------------*\
     # 3s Count Preparation
    \*------------------------------------*/
// remove startWrapper to play quizgame
function countPrepare(){var counter=3,newElement=document.createElement("div");newElement.setAttribute("class","quiz-question__display-prepare"),newElement.innerHTML="Start in 3 seconds";var id;quizQuestionInner.parentNode.replaceChild(newElement,quizQuestionInner),id=setInterval(function(){counter--,counter<0?(newElement.parentNode.replaceChild(quizQuestionInner,newElement),clearInterval(id),quizCounter.start()):newElement.innerHTML=counter.toString()},1500)}function Timer(options){function decrementCounter(){updateStatus(seconds),0===seconds&&(counterEnd(),instance.stop()),seconds--}var timer,instance=this,seconds=options.seconds||10,updateStatus=options.onUpdateStatus||function(){},counterEnd=options.onCounterEnd||function(){};this.start=function(){clearInterval(timer),timer=0,seconds=options.seconds,timer=setInterval(decrementCounter,1e3)},this.stop=function(){clearInterval(timer)}}/*------------------------------------*\
    # Modal Apply - open/close
    \*------------------------------------*/
var modalTrigger=document.getElementsByClassName("modal__btn")[0],modal=document.getElementById("modal-apply"),modalClose=document.getElementById("modal--close");
// open the modal window
modalTrigger.addEventListener("click",function(event){event.preventDefault(),hasClass(modalTrigger,"modal__btn")&&addClass(modal,"is--visible")}),
// close modal window
modalClose.addEventListener("click",function(event){hasClass(modalClose,"modal--close")||removeClass(modal,"is--visible")}),document.addEventListener("keyup",function(event){
// if esc has been released (esc keycode = 27) - close the modal window
27==event.keyCode&&(hasClass(event.target,"modal--close")||removeClass(modal,"is--visible"))});/*------------------------------------*\
     # Apply name on the dom
    \*------------------------------------*/
var createNewName=document.getElementById("create__name"),applyPlayerSection=getAncestor(createNewName,"player-section"),applyNameInput=(applyPlayerSection.parentElement,applyPlayerSection.querySelector('input[type="text')),btnSaveName=document.getElementById("btn__save-name"),quizPlayWrapper=document.getElementsByClassName("quiz-play__wrapper")[0],quizPlaceholderName=document.getElementsByClassName("quiz-question__display")[0],quizQuestionInner=getAncestor(quizPlaceholderName,"quiz-question__inner"),quizQuestionContent=quizQuestionInner.parentElement;btnSaveName.addEventListener("click",function(){createName(),hasClass(quizQuestionContent,"player__name")||(removeClass(modal,"is--visible"),removeIndexWrapper(),addClass(quizPlayWrapper,"is--visible"),countPrepare())});/*------------------------------------*\
     # 5s Quiz Timer
    \*------------------------------------*/
var quizCounter=new Timer({seconds:5,// number of seconds to count down
onUpdateStatus:function(sec){console.log(sec)},// callback for each second
onCounterEnd:function(){alert("Next question")}})}();