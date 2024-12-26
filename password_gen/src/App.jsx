import { useCallback, useState,useEffect,useRef } from "react";

//Notes:
// UseCallback is basically memoization technique
// UseEffect runs the inner content on page reload and if any of the specified parameters mentioned gets changed.
// UseRef creates a reference, used to selct the content while copying it.

function App() {
  const [length, setLength] = useState(8);
  const [character, setCharacter] = useState(false);
  const [number, setNumber] = useState(false);
  const [password, setPassword] = useState("");

  const passwordReference = useRef(null)

  const copyPassword = useCallback(()=>{
    passwordReference.current?.select()
    window.navigator.clipboard.writeText(password)
  },[password])


  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (character) str += "!@#$%^&*(){}[]";
    if (number) str += "1234567890";
    for (let index = 0; index < length; index++) {
      const element = str[Math.floor(Math.random() * str.length)];
      pass += element;
    }
    setPassword(pass);
  }, [length, number, character,setPassword]);

  useEffect(() => {
    passwordGenerator()
  }, [length, number, character, passwordGenerator])

  return (
    <div>
      <div style={{margin: "0 auto",textAlign: "center"}}>
      <h1 className="text-3xl text-center font-bold underline">
        Password Generator
      </h1>
      </div>

      <div>
        <input
          type="text"
          value={password}
          placeholder="Password"
          readOnly
          ref= {passwordReference}
          style={{
            width: `${Math.max(password.length * 10, 150)}px`,
          }}
        />
        <button onClick={copyPassword}>Copy</button>
      </div>

      <div>
        <input
          type="range"
          min={5}
          max={100}
          value={length}
          onChange={(e) => setLength(parseInt(e.target.value))}
        />
        <label>Length: {length}</label>
      </div>

      <div>
        <input
          type="checkbox"
          checked={number}
          id="numberInput"
          onChange={() => setNumber((prev) => !prev)}
        />
        <label htmlFor="numberInput">Include Numbers</label>
      </div>

      <div>
        <input
          type="checkbox"
          checked={character}
          id="characterInput"
          onChange={() => setCharacter((prev) => !prev)}
        />
        <label htmlFor="characterInput">Include Special Characters</label>
      </div>
    </div>
  );
}

export default App;
