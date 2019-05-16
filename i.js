const { Parser } = require('./parser.js')
const { Visitor } = require('./visitor.js')
const { Evaluator } = require('./evaluator.js')

const log = console.log;
const str = `
    5+9
    3 + 3
    2 + 2 + 2;
    22*9 - 2*90
    66>=90
    90>1
    88==7
    3*250*360
`


const asts = Parser.getInst().parse(str)
new Evaluator(asts).evaluate()