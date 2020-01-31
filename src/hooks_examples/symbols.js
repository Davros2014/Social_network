//symbols

const s = Symbol("funky chicken");
console.log(
    s == Symbol("funky chicken"); // not equal - different symbols
);

const leo = {
    name:"leo",
    age: "44",
    [s]: 'adorable'
}

// since no two symbols eaul each other no data can be added therefore they cannot be overwritten
console.log(Object.getOwnPropertySymbols(leo));
