(function(){
    let verticalModeEnableText = 'Start vertical mode';
    let verticalModeDisableText = 'Stop vertical mode';

    getVerticalMode();

    document.addEventListener('DOMContentLoaded', function () {
        toggleVerticalModeButton().addEventListener('click', toggleVerticalMode);
        toggleVerticalModeButton().innerText = verticalModeEnableText;
    });

    function getVerticalMode() {
        sendVerticalModeMessage('getVerticalMode');
    }

    function toggleVerticalMode() {
        sendVerticalModeMessage('toggleVerticalMode');
    }

    function sendVerticalModeMessage(message) {
        chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
            chrome.tabs.sendMessage(tabs[0].id, message, function(response) {
                let isVerticalMode = response.isVerticalMode;
                removeClass(toggleVerticalModeButton(), isVerticalMode ? 'btn-success' : 'btn-danger');
                addClass(toggleVerticalModeButton(), isVerticalMode ? 'btn-danger' : 'btn-success');
                toggleVerticalModeButton().innerText = isVerticalMode ? verticalModeDisableText : verticalModeEnableText;
            });
        });
    }

})();

/**
 * @returns {HTMLInputElement}
 */
function toggleVerticalModeButton() {
    return document.querySelector('.toggleVerticalMode');
}

// Thanks https://jaketrent.com/post/addremove-classes-raw-javascript/

function hasClass(ele,cls) {
    return !!ele.className.match(new RegExp('(\\s|^)'+cls+'(\\s|$)'));
}

function addClass(ele,cls) {
    if (!hasClass(ele,cls)) {
        ele.className += " "+cls;
    }
}

function removeClass(ele,cls) {
    if (hasClass(ele,cls)) {
        var reg = new RegExp('(\\s|^)'+cls+'(\\s|$)');
        ele.className = ele.className.replace(reg,' ');
    }
}
