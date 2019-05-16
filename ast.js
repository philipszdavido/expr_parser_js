class Binary {
    constructor(left, operator, right) {
        this.left = left
        this.right = right
        this.operator = operator
    }

    visit(visitor) {
        return visitor.visitBinary(this)
    }
}

class Literal {
    constructor(value) {
        this.value = value
    }

    visit(visitor) {
        return visitor.visitLiteral(this)
    }
}

exports.Binary = Binary
exports.Literal = Literal