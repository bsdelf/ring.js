# Ring.js

A circular queue use indexed collections as its backend.

## Syntax
```javascript
new Ring(capacity)
new Ring(capacity, Uint8Array)
```


## Properties

- `Ring.prototype.capacity`

    Reflects the capacity of the ring.
    
- `Ring.prototype.used`

    Reflects the number of used elements.
    
- `Ring.prototype.free`

    Reflects the number of free elements.
    
- `Ring.prototype.empty`

    Reflects whether the ring is empty.
    
- `Ring.prototype.full`

    Reflects whether the ring is full.
    
## Methods

    
- `Ring.prototype.pop()`

    Removes the last element from a ring and returns that element.
    
- `Ring.prototype.push()`

    Adds one element to the end of a ring.
    
- `Ring.prototype.shift()`

    Removes the first element from a ring and returns that element.
    
- `Ring.prototype.unshift()`

    Adds one element to the front of a ring.

- `Ring.prototype.clear()`

    Clears all elements of a ring.
    
- `Ring.prototype.toArray()`

    Returns a newly created array with all elements of a ring.

- `Ring.prototype.lowerBound(first, last, value[, comp])`

    Returns the first index at which a given element in the range [first, last) that is not less than (i.e. greater or equal to) value, or last if no such element is found.
