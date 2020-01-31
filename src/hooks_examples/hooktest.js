// example of using HOOKS

import React from "react";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";

console.log(useState + "");

// USESTATE //////////////////////////////
// import use state at the top

// USEEFFECT //////////////////////////////
// import use effect at the top

function Hello() {
    const [greetee, setGreetee] = useState("kitty");
    const [punctuation, setPunctuation] = useState("!");

    useEffect(() => )
        if (greetee = function(e) {
            console.log(greetee);
        }, [greetee]);


    return (
        <div>
            Hello!, {greetee} {punctuation}!/>
            <input onChange={e => setGreetee(e.target.value)} />
        </div>
    );
}

ReactDOM.render(<Helloworld />, document.querySelector("main"));

// const handleChange = e => {
//     setGreetee(e.target.value);
//     setTimeout(function () {
//         console.log(greetee);
//     }, 2000)
// }
//
// return (
//     <div>
//         Hello!, {greetee} {punctuation}!/>
//         <input onChange={handleChange)} />
//     </div>
// );


// FOR PART 6

return (
    <div>
        {users.map(
            user => (
                <div key={user.id}>
                    <Link to={`/user/${user.id}`}>{user.first} {user.last}</Link>
                </div>
                    )
        )}
    </div>
    )
