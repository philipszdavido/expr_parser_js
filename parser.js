const { Token } = require('./token.js')
const { Binary, Literal, Grouping } = require('./ast.js')
const log = console.log

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
            // return
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
            return new Binary(left, 'ADD', this.add())
                // return { left, type: 'ADD', right: this.add() }
        }
        return left
    }

    sub() {
        const left = this.mul()
        if (this.current().value == '-') {
            this.advance()
            return new Binary(left, 'SUB', this.add())
                // return { left, type: 'SUB', right: this.add() }
        }
        return left
    }

    mul() {
        const left = this.all()
        if (this.current().value == '*') {
            this.advance()
            return new Binary(left, 'MUL', this.add())
                // return { left, type: 'MUL', right: this.add() }
        }
        return left
    }

    all() {
        const left = this.primary()
        switch (this.current().value) {
            case '>=':
                this.advance()
                return new Binary(left, 'GREATER_EQUAL', this.add())
            case '<=':
                this.advance()
                return new Binary(left, 'LESS_EQUAL', this.add())
            case '==':
                this.advance()
                return new Binary(left, 'EQUAL_EQUAL', this.add())
            case '>':
                this.advance()
                return new Binary(left, 'GREATER_EQUAL', this.add())
            case '<':
                this.advance()
                return new Binary(left, 'LESS_THAN', this.add())
            case '!=':
                this.advance()
                return new Binary(left, 'BANG_EQUAL', this.add())
            default:
                break;
        }
        return left
    }

    primary() {
        // log('in primary:', this.current())
        const curr = this.current()
        this.advance()
        if (curr.type == 'NUM')
            return new Literal(curr.value)
        if (curr.type == 'LPAREN') {
            const expr = this.add()
            this.advance()
            return new Grouping(expr)
        }

        // return curr
        // return null
    }

}

exports.Parser = Parser