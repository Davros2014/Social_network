// generator functions

function* genFunc() {
    console.log("hi!");
    return 10;
}

const iterator = generator();
console.log(it.next());

// use yield instead of return
function* genFunc() {
    console.log("hi!");
    yield: 10;
}
console.log(genFunc());
// returns {generator}
// to run function > call iterator object
// ie next()

setTimeout(
    () => console.log(
        it.next()
    ), 2500;
)

console.log(genFunc().next());
// will return log 'hi!'
// and object {value: 10, done: true}
