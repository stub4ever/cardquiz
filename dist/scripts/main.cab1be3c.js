'use strict';

/*------------------------------------*\
    # classList helper functions
    see @ https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
\*------------------------------------*/

var hasClass, addClass, removeClass;

if ('classList' in document.documentElement) {
    hasClass = function hasClass(el, className) {
        return el.classList.contains(className);
    };
    addClass = function addClass(el, className) {
        el.classList.add(className);
    };
    removeClass = function removeClass(el, className) {
        el.classList.remove(className);
    };
} else {
    hasClass = function hasClass(el, className) {
        return new RegExp('\\b' + className + '\\b').test(el.className);
    };
    addClass = function addClass(el, className) {
        if (!hasClass(el, className)) {
            el.className += ' ' + className;
        }
    };
    removeClass = function removeClass(el, className) {
        el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
    };
}

/*------------------------------------*\
    # Return parent of elements - function helper
    see @ https://plainjs.com/javascript/attributes/adding-removing-and-testing-for-classes-9/
\*------------------------------------*/

function getAncestor(el, ancestorClass) {
    var parent = el.parentElement;
    if (!parent.classList.contains(ancestorClass)) {
        parent = getAncestor(parent, ancestorClass);
    }
    return parent;
}

(function () {
    /*------------------------------------*\
    # Modal Apply - open/close
    \*------------------------------------*/
    var modalTrigger = document.getElementsByClassName('modal__btn')[0];
    var modal = document.getElementById('modal-apply');
    var modalClose = document.getElementById('modal--close');

    // open the modal window
    modalTrigger.addEventListener('click', function (event) {
        event.preventDefault();
        if (hasClass(modalTrigger, 'modal__btn')) addClass(modal, 'is--visible');
    });

    // close modal window
    modalClose.addEventListener('click', function (event) {
        if (!hasClass(modalClose, 'modal--close')) removeClass(modal, 'is--visible');
    });

    document.addEventListener('keyup', function (event) {
        // if esc has been released (esc keycode = 27) - close the modal window
        if (event.keyCode == 27) {
            if (!hasClass(event.target, 'modal--close')) removeClass(modal, 'is--visible');
        }
    });

    /*------------------------------------*\
     # Apply name on the dom
    \*------------------------------------*/
    var createNewName = document.getElementById('create__name');
    var applyPlayerSection = getAncestor(createNewName, 'player-section');
    var modalApplyWrapper = applyPlayerSection.parentElement;
    // Allow to input name
    var applyNameInput = applyPlayerSection.querySelector('input[type="text');
    var btnSaveName = document.getElementById('btn__save-name');

    // Insert Player Name content
    var quizPlayWrapper = document.getElementsByClassName('quiz-play__wrapper')[0];
    var quizPlaceholderName = document.getElementsByClassName('quiz-question__display')[0];
    var quizQuestionInner = getAncestor(quizPlaceholderName, 'quiz-question__inner');
    var quizQuestionContent = quizQuestionInner.parentElement;

    function createName(event) {
        var insertClassName = document.createElement('div');
        insertClassName.setAttribute('class', 'quiz-player__name');

        // input name value
        var newName = applyNameInput.value;
        var newNameContent = '<span>' + newName + '</span>';
        insertClassName.innerHTML = newNameContent;
        // insert new name content
        quizQuestionContent.insertBefore(insertClassName, quizQuestionInner);
        // reset empty string
        applyNameInput.value = '';
    }

    // remove startWrapper to play quizgame
    function removeIndexWrapper() {
        var indexWrapper = document.getElementsByClassName('index__wrapper')[0];
        indexWrapper.parentNode.removeChild(indexWrapper);
        return false;
    }

    btnSaveName.addEventListener('click', function () {
        createName();
        if (!hasClass(quizQuestionContent, 'player__name')) {
            removeClass(modal, 'is--visible');
            removeIndexWrapper();
            addClass(quizPlayWrapper, 'is--visible');
            countPrepare();
        }
    });

    /*------------------------------------*\
     # 3s Count Preparation
    \*------------------------------------*/

    // remove startWrapper to play quizgame
    function countPrepare() {
        var counter = 3;
        var newElement = document.createElement("div");
        newElement.setAttribute('class', 'quiz-question__display-prepare');
        newElement.innerHTML = "Start in 3 seconds";
        var id;

        quizQuestionInner.parentNode.replaceChild(newElement, quizQuestionInner);

        id = setInterval(function () {
            counter--;
            if (counter < 0) {
                newElement.parentNode.replaceChild(quizQuestionInner, newElement);
                clearInterval(id);
                quizCounter.start();
            } else {
                newElement.innerHTML = counter.toString();
            }
        }, 1500);
    }

    /*------------------------------------*\
     # 5s Quiz Timer
    \*------------------------------------*/
    var quizCounter = new Timer({
        seconds: 5, // number of seconds to count down
        onUpdateStatus: function onUpdateStatus(sec) {
            console.log(sec);
        }, // callback for each second
        onCounterEnd: function onCounterEnd() {
            alert('Next question');
        } // final action
    });

    function Timer(options) {
        var timer,
            instance = this,
            seconds = options.seconds || 10,
            updateStatus = options.onUpdateStatus || function () {},
            counterEnd = options.onCounterEnd || function () {};

        function decrementCounter() {
            updateStatus(seconds);
            if (seconds === 0) {
                counterEnd();
                instance.stop();
            }
            seconds--;
        }

        this.start = function () {
            clearInterval(timer);
            timer = 0;
            seconds = options.seconds;
            timer = setInterval(decrementCounter, 1000);
        };

        this.stop = function () {
            clearInterval(timer);
        };
    }
})();
//# sourceMappingURL=main.js.map
