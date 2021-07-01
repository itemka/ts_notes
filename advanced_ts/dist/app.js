"use strict";
var btn = document.querySelector('#btn');
btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', function () {
    console.log('click');
});
function logInfo(data, _) {
    console.log(data);
}
logInfo('string');
//# sourceMappingURL=app.js.map