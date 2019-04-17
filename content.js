// todo attr originalhorizontalalignment=2 from imported files?
// todo un/verticalize on consequent clicks
(function () {
    let isVerticalMode = false;
    let verticalCells = [];

    window.setInterval(makeSurePreviouslyVerticalizedCellsAreVertical, 300);
    document.addEventListener('click', verticalizeCell);

    function verticalizeCell(event) {
        if (isVerticalMode) {
            if (event.target.innerText !== '') {
                processElement(event.target);
            } else if (event.target.parentElement.innerText !== '') {
                processElement(event.target.parentElement)
            }
        }
    }

    function makeSurePreviouslyVerticalizedCellsAreVertical() {
        if ( ! isVerticalMode) {
            for (let i = 0, len = verticalCells.length; i < len; i++) {
                verticalize(verticalCells[i]);
            }
        }
    }

    function processElement(element) {
        let elements = Array.from(element.querySelectorAll('*'));
        if (elements.length > 10) {
            return;
        }
        elements.push(element);
        for (let len = elements.length, i = 0; i < len; i++) {
            verticalize(element);
            verticalCells.push(element);
        }
    }

    function verticalize(element) {
        element.style.writingMode = 'vertical-lr';
    }

    chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
        if (request === 'toggleVerticalMode') {
            isVerticalMode = !isVerticalMode;
        }
        sendResponse({
            'isVerticalMode': isVerticalMode
        });
    });
})();
