class Ring {
    constructor(data) {
        if (data.length < 2) {
            throw new Error('length should >= 2');
        }
        this._data = data;
        this._head = 0;
        this._tail = 0;
    }

    /////////////////////////////////////////////////////////////////

    push(val) {
        while (this.full) {
            this.shift();
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
        while (this.full) {
            this.pop();
        }
        let head = (this._head + this.length - 1) % this.length;
        this._data[head] = val;
        this._head = head;
    }

    pop() {
        if (this.empty) {
            return;
        }
        let tail = (this._tail + this.length - 1) % this.length;
        let val = this._data[tail];
        this._tail = tail;
        return val;
    }

    clear() {
        this._head = this._tail = 0;
    }

    get(i) {
        let idx = (this._head + i) % this.length;
        return this._data[idx];
    }

    set(i, val) {
        let idx = (this._head + i) % this.length;
        this._data[idx] = val;
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
