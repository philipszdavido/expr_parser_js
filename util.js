const operators = ['=', '+', '-', '*', '/', '>', '<', '>=', '<=', '==', '!=']

function isOp(v) {
    for (var i = 0; i < operators.length; i++) {
        if (operators[i] == v) return true
    }
    return false
}

function isNum(v) {
    return !isNaN(parseFloat(v)) && isFinite(v)
}

function isAlpha(v) {
    const regExp = new RegExp(/^[a-z0-9]+$/i)
    return regExp.test(v)
}

exports.isOp = isOp
exports.isNum = isNum
exports.isAlpha = isAlpha