const { Parser } = require('./parser.js')
const { Visitor } = require('./visitor.js')
const log = console.log;

class Evaluator {
    constructor(asts) {
        this.asts = asts
        this.visitor = new Visitor()
    }

    evaluate() {
        log('======================== RESULTS ========================')
        this.visitor.visitExpressions(this.asts)

        /*for (const ast of this.asts) {
            log(this.evaluate(ast))
        }*/
    }

    /**
     * Not in use anymore
     * @param {*} expr 
     */
    _evaluate(expr) {
        const type = expr.type
        switch (type) {
            case 'ADD':
                return this.evaluate(expr.left) + this.evaluate(expr.right)
            case 'SUB':
                return this.evaluate(expr.left) - this.evaluate(expr.right)
            case 'MUL':
                return this.evaluate(expr.left) * this.evaluate(expr.right)
            case 'NUM':
                return Number(expr.value)
        }
    }
}

exports.Evaluator = Evaluator