function handleStringOrNumber(input) {
    if (typeof input === 'string') {
        console.log(" ".concat(input.toUpperCase()));
    }
    else if (typeof input === 'number') {
        console.log("".concat(input * input));
    }
    else {
        console.log('Unsupported type');
    }
}
handleStringOrNumber('abc');
handleStringOrNumber(42);
