const assert = require('assert');

class Ring {
    constructor(data) {
        assert(data.length > 0);
        this._data = data;
        this._head = 0;
        this._tail = 0;
    }

    /////////////////////////////////////////////////////////////////

    push(val) {
        while (this.full) {
            let d = this.shift();
        }
        this._data[this._tail] = val;
        this._tail = (this._tail + 1) % this.length;
    }

    shift() {
        if (this.empty) {
            return;
        }
        let val = this._data[this._head];
        this._head = (this._head + 1) % this.length;
        return val;
    }

    unshift(val) {
    }

    pop() {
    }

    /////////////////////////////////////////////////////////////////

    get full() {
        return this._tail === ((this._head + this.length - 1) % this.length);
    }

    get empty() {
        return this._head === this._tail;
    }

    get used() {
        if (this._tail >= this._head) {
            return this._tail - this._head;
        } else {
            return this._tail + this.length - this._head;
        }
    }

    get free() {
        return this.length - this.used - 1;
    }

    get length() {
        return this._data.length;
    }

    /////////////////////////////////////////////////////////////////

    /*
    forEach() {
    }

    reduce() {
    }

    map() {
    }

    filter() {
    }
    */

    /////////////////////////////////////////////////////////////////

    toArray() {
        let data = new Array(this.used);
        for (let i = 0; i < this.used; ++i) {
            let pos = (this._head + i) % this.length;
            data[i] = this._data[pos];
        }
        return data;
    }
}

module.exports = Ring;
