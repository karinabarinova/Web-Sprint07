var iconv = require('iconv-lite');
var windows1252 = require('windows-1252');

function changeStrUTF(string) {
    return Buffer.from(string, 'utf-8');
}
function changeStrISO(string) {
    return iconv.encode(string, "ISO-8859-1");
}
function changeStrWindows(string) {
    return  windows1252.encode(string);;
}
module.exports = {changeStrUTF, changeStrISO, changeStrWindows};
