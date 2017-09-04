const assert = require('chai').assert;
const Ring = require('../src/');

describe('Ring', () => {
    describe('#constructor()', () => {
        it('should throw without length', () => {
            assert.throws(() => {
                new Ring();
            });
        });

        it('should throw when length < 1', () => {
            assert.throws(() => {
                new Ring(0);
            });
        });

        let ring = new Ring(1);

        it('should be empty', () => {
            assert.isTrue(ring.empty);
        });

        it('should not full', () => {
            assert.isFalse(ring.full);
        });

        it('should get free', () => {
            assert.equal(1, ring.free);
        });

        it('should get used', () => {
            assert.equal(0, ring.used);
        });
    });

    describe('#push()', () => {
        it('should push elements', () => {
            let ring = new Ring(1);
            ring.push(0);
            assert.equal(0, ring.get(0));
        });

        it('should push circular', () => {
            let n = 3;
            let ring = new Ring(n);

            for (let i = 0; i < n * 2; ++i) {
                ring.push(i);
                assert.equal(i, ring.get(ring.used - 1));
            }
        });
    });

    describe('#unshift()', () => {
        it('should unshift elements', () => {
            let ring = new Ring(1);
            ring.unshift(0);
            assert.equal(0, ring.get(0));
        });

        it('should unshift circular', () => {
            let n = 3;
            let ring = new Ring(n);

            for (let i = 0; i < n * 2; ++i) {
                ring.unshift(i);
                assert.equal(i, ring.get(0));
            }
        });
    });

    describe('#pop()', () => {
        let n = 10;
        let ring = new Ring(n);

        it('should pop elements', () => {
            for (let i = 0; i < n; ++i) {
                ring.push(i);
            }

            for (let i = 0; i < n; ++i) {
                assert.equal(n - i - 1, ring.pop());
            }
        });

        it('should pop undefined when empty', () => {
            assert.equal(undefined, ring.pop());
        });
    });

    describe('#shift()', () => {
        let n = 10;
        let ring = new Ring(n);

        it('should shift elements', () => {
            for (let i = 0; i < n; ++i) {
                ring.push(i);
            }

            for (let i = 0; i < n; ++i) {
                assert.equal(i, ring.shift());
            }
        });

        it('should shift undefined when empty', () => {
            assert.equal(undefined, ring.shift());
        });
    });

    describe('#clear()', () => {
        it('should clear elements', () => {
            let ring = new Ring(1);

            ring.push(0);
            assert.isFalse(ring.empty);
            assert.isTrue(ring.full);
            assert.equal(1, ring.used);
            assert.equal(0, ring.free);

            ring.clear();
            assert.isTrue(ring.empty);
            assert.isFalse(ring.full);
            assert.equal(0, ring.used);
            assert.equal(1, ring.free);
        });

        function rearm() {
            ring.clear();
            for (let i = 0; i < n; ++i) {
                ring.push(i);
            }
        };
    });

    describe('#lowerBound()', () => {
        it('should get lower bound', () => {
            let count = 10;
            let ring = new Ring(count);

            for (let i = 0; i < count * 2 - 5; ++i) {
                ring.push(i);
            }

            for (let i = 0; i < count; ++i) {
                assert.equal(i + 1, ring.lowerBound(0, count, i + 5));
            }

            assert.equal(count, ring.lowerBound(count));
        });
    });

    describe('#toArray()', () => {
        it('should to Array', () => {
            let vals = [1,2,3,4];
            let ring = new Ring(vals.length);
            vals.forEach(val => {
                ring.push(val);
            });
            assert.deepEqual(vals, ring.toArray());
        });

        it('should to Uint8Array', () => {
            let vals = new Uint8Array(4);
            vals[0] = 1;
            vals[1] = 2;
            vals[2] = 3;
            vals[3] = 4;

            let ring = new Ring(vals.length, Uint8Array);
            vals.forEach(val => {
                ring.push(val);
            });
            assert.deepEqual(vals, ring.toArray());
        });

        it('should be circular', () => {
            let vals = [1,2,3,4,5,6,7,8,9,10];
            let ring = new Ring(vals.length / 2);
            vals.forEach(val => {
                ring.push(val);
            });
            assert.deepEqual(vals.slice(vals.length / 2), ring.toArray());
        });
    });
});
