const log = console.log;
const str = `
    3+3
    2 + 2 + 2;
    23 * 89;
    45 + 3 - 56;
`
const operators = ['+', '-', '*', '/']

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

class Token {
    constructor() {
        this.inst = null
        this.tokens = []
    }
    static getInst() {
        if (!this.inst)
            this.inst = new Token()
        return this.inst
    }

    tokenize(str) {
        str = str.trim()
        var s = ''
        for (var index = 0; index < str.length; index++) {
            s += str[index];
            const peek = str[index + 1]
            if (peek == ' ' || peek == ';') {
                if (isNum(s.trim())) {
                    this.tokens.push({ type: 'NUM', value: s.trim() })
                }
                if (isOp(s.trim())) {
                    this.tokens.push({ type: 'OP', value: s.trim() })
                }
                s = ''
            }
            if (s == ';') {
                this.tokens.push({ type: 'EOL' })
                s = ''
            }
            if (index == (str.length - 1)) {
                this.tokens.push({ type: 'EOF' })
                s = ''
            }
        }
        return this.tokens
    }
}

/**
 * Using Recursive Descent algorithm
 * 
 */
class Parser {
    constructor() {
        this.inst
        this.index = 0
        this.tokens = null
        this.expr = []
    }
    static getInst() {
        if (!this.inst)
            this.inst = new Parser()
        return this.inst
    }

    advance() {
        this.index++
    }
    peep() { return this.tokens(this.index + 1) }
    current() { return this.tokens[this.index] }

    parse(str) {
        const tokenizer = Token.getInst()
        const tokens = tokenizer.tokenize(str)
            // log(tokens)
        this.tokens = tokens
        while (this.current().type != 'EOF') {
            // log(this.current())
            const expr = this.add()
            if (expr)
                this.expr.push(expr)
        }
        // log(this.expr)
        return this.expr
    }

    add() {
        const left = this.sub()
            // log('in add(): ', left)
            // log(': ', this.current())
        if (this.current().value == '+') {
            this.advance()
            return { left, type: 'ADD', right: this.add() }
        }
        return left
    }

    sub() {
        const left = this.mul()
        if (this.current().value == '-') {
            this.advance()
            return { left, type: 'SUB', right: this.add() }
        }
        return left
    }

    mul() {
        const left = this.primary()
        if (this.current().value == '*') {
            this.advance()
            return { left, type: 'MUL', right: this.add() }
        }
        return left
    }

    primary() {
        // log('in primary:', this.current())
        const curr = this.current()
        this.advance()
        if (curr.type == 'NUM')
            return curr
                // return null
    }
}

class Interpreter {
    constructor(asts) {
        this.asts = asts
    }

    interpret() {
        log('======================== RESULTS ========================')
        for (const ast of this.asts) {
            log(this.evaluate(ast))
        }
    }

    evaluate(expr) {
        const type = expr.type
        switch (type) {
            case 'ADD':
                return this.evaluate(expr.left) + this.evaluate(expr.right)
                break;
            case 'SUB':
                return this.evaluate(expr.left) - this.evaluate(expr.right)
                break;
            case 'MUL':
                return this.evaluate(expr.left) * this.evaluate(expr.right)
                break;
            case 'NUM':
                return Number(expr.value)
        }
    }
}

const asts = Parser.getInst().parse(str)
new Interpreter(asts).interpret()
