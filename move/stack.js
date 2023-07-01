class Movestack {
    constructor() {
        this.stack = [];
    }

    push(move) {
        this.stack.push(move);
    }

    pop() {
        return this.stack.pop();
    }

    isEmpty() {
        return this.stack.length == 0;
    }

    size() {
        return this.stack.length;
    }

    peek() {
        if (this.isEmpty()) {
            return null;
        }
        return this.values[this.values.length - 1];
    }

}

module.exports = Movestack;
