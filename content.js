(function () {
    let isVerticalMode = false;
    let verticalCells = [];

    document.addEventListener('click', verticalizeCell);
    document.addEventListener('keyup', makeSurePreviouslyVerticalizedCellsAreVertical);

    function verticalizeCell(event) {
        console.log(event.target);
        if (isVerticalMode) {
            let cell = event.target.parentElement.querySelector(
                'div[originalhorizontalalignment], div[originalhorizontalalignment] div'
            );
            if (cell) {
                verticalize(cell);
                verticalCells.push(cell);
            }
        }
    }

    function makeSurePreviouslyVerticalizedCellsAreVertical() {
        window.setTimeout(
            function() {
                for (let i = 0, len = verticalCells.length; i < len; i++) {
                    verticalize(verticalCells[i]);
                }},
            20
        )
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
