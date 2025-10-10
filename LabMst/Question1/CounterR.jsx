import React, { useState } from "react";

function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    if(count<10)
    {
      setCount(count + 1);
    }
    };
    
  const decrement = () => 
    {
      if(count>0)
        {setCount(count - 1);}
    };
  const reset = () => setCount(0);

  return (
    <div className="counter-container">
      <p className="count-dis">{count}</p>
      {count === 10 && <p className="max-limit-msg">Max limit reached</p>}

      <button className="counter-button" onClick={decrement}><b>Decrement</b></button>
      <button className="counter-button" onClick={reset}><b>Reset</b></button>
      <button className="counter-button" onClick={increment}><b>Increment</b></button>
    </div>
  );
}

export default Counter;
