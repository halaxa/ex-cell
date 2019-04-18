// todo attr originalhorizontalalignment=2 from imported files?
(function () {
    let isVerticalMode = false;
    let verticalCells = new Set();

    window.setInterval(makeSurePreviouslyVerticalizedCellsAreVertical, 300);
    document.addEventListener('click', toggleVerticalCell);
    chrome.runtime.onMessage.addListener(toggleVerticalMode);

    function toggleVerticalCell(event) {
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
            for (const verticalCell of verticalCells.values()) {
                verticalize(verticalCell)
            }
        }
    }

    function processElement(element) {
        console.log(element);
        let elements = Array.from(element.querySelectorAll('*'));
        if (elements.length > 10) {
            return;
        }
        elements.push(element);
        for (let len = elements.length, i = 0; i < len; i++) {
            if (elements[i].style.writingMode === 'vertical-lr') {
                elements[i].style.writingMode = 'initial';
                verticalCells.delete(elements[i]);
            } else {
                verticalize(elements[i]);
                verticalCells.add(elements[i]);
            }
        }
    }

    function verticalize(element) {
        element.style.writingMode = 'vertical-lr';
    }

    function toggleVerticalMode (request, sender, sendResponse) {
        if (request === 'toggleVerticalMode') {
            isVerticalMode = !isVerticalMode;
        }
        sendResponse({
            'isVerticalMode': isVerticalMode
        });
    }

})();
