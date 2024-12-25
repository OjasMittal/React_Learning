import { useState } from 'react'

function App() {

  const [counter,setCounter] = useState(15);
  function decValue(){
    if(counter>0) setCounter(counter-1);
  }
  function incValue(){
    if(counter<20) setCounter(counter+1);
  }
  return (
   <>
   <h1>A React Counter</h1>
   <h2>Counter Value: {counter}</h2>
   <button onClick={incValue}> Increment value</button>
   <br/>
   <button onClick={decValue}> Decrement value</button>
   </>
  )
}

export default App
