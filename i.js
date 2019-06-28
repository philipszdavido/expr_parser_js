const { Parser } = require('./parser.js')
const { Visitor } = require('./visitor.js')
const { Evaluator } = require('./evaluator.js')
const repl = require('repl')

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
    (45*89)+90
    4-5+6
    4-(5+6)
    6*8+9
`

function executeExpr(cmd) {
    const asts = Parser.getInst().parse(cmd)

    //log(asts)
    new Evaluator(asts).evaluate()

}

repl.start({
    prompt: '>> ',
    eval: (cmd) => {
        executeExpr(cmd)
        log('\n')
    }
})