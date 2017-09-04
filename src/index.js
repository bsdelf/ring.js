class Ring {
    constructor(capacity, ctor) {
        if (capacity < 1) {
            throw new Error('capacity should > 0');
        }
        if (!ctor) {
            ctor = Array;
        }
        this._data = new ctor(capacity + 1);
        this._ctor = ctor;
        this._head = 0;
        this._tail = 0;
    }

    /////////////////////////////////////////////////////////////////

    push(val) {
        while (this.full) {
            this.shift();
        }
        this._data[this._tail] = val;
        this._tail = (this._tail + 1) % this._data.length;
    }

    shift() {
        if (this.empty) {
            return;
        }
        let val = this._data[this._head];
        this._head = (this._head + 1) % this._data.length;
        return val;
    }

    unshift(val) {
        while (this.full) {
            this.pop();
        }
        let head = (this._head + this._data.length - 1) % this._data.length;
        this._data[head] = val;
        this._head = head;
    }

    pop() {
        if (this.empty) {
            return;
        }
        let tail = (this._tail + this._data.length - 1) % this._data.length;
        let val = this._data[tail];
        this._tail = tail;
        return val;
    }

    clear() {
        this._head = this._tail = 0;
    }

    get(i) {
        let idx = (this._head + i) % this._data.length;
        return this._data[idx];
    }

    set(i, val) {
        let idx = (this._head + i) % this._data.length;
        this._data[idx] = val;
    }

    /////////////////////////////////////////////////////////////////

    get full() {
        return this._tail === ((this._head + this._data.length - 1) % this._data.length);
    }

    get empty() {
        return this._head === this._tail;
    }

    get used() {
        if (this._tail >= this._head) {
            return this._tail - this._head;
        } else {
            return this._tail + this._data.length - this._head;
        }
    }

    get free() {
        return this._data.length - this.used - 1;
    }

    get capacity() {
        return this._data.length - 1;
    }

    /////////////////////////////////////////////////////////////////

    lowerBound(first, last, value, comp = (a, b) => a - b <= 0) {
        let count = last - first;

        while (count > 0) {
            let step = count >> 1;
            let it = first + step;
            if (comp(this.get(it), value)) {
                first = it + 1;
                count -= step + 1;
            } else {
                count = step;
            }
        }

        return first;
    }

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
        let data = new this._ctor(this.used);
        for (let i = 0; i < this.used; ++i) {
            let pos = (this._head + i) % this._data.length;
            data[i] = this._data[pos];
        }
        return data;
    }
}

module.exports = Ring;
