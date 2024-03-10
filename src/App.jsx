 


import { useState, useCallback,  useRef } from 'react'



function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [lowerCharAllowed, setlowerCharAllowed] = useState(false)
  const [uperCharAllowed, setuperCharAllowed] = useState(false)
  const [symboleAllowed, setsymboleAllowed] = useState(false)
  const [password, setPassword] = useState("")

  //useRef hook
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ""
    let str = ""
    if (numberAllowed) str += "0123456789"
    if (symboleAllowed) str += "!@#$%^&*-_+=[]{}~`"
    if(lowerCharAllowed) str +="abcdefghijklmnopqrstuvwxyz"
    if(uperCharAllowed) str +="ABCDEFGHIJKLMNOPQRSTUVWXYZ"
     
    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
      
    }

    if(str =="") alert("-----All Checks Are Empty-----")
    

    setPassword(pass)


  }, [length, numberAllowed, lowerCharAllowed,uperCharAllowed,  symboleAllowed, setPassword])

  const copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 999);
    window.navigator.clipboard.writeText(password)
  }, [password])

  // useEffect(() => {
  //   passwordGenerator()
  // }, [length, numberAllowed, lowerCharAllowed, uperCharAllowed,  symboleAllowed, passwordGenerator])
  return (
   
    <div className=" w-2/3 mx-auto shadow-md rounded-lg px-4 py-8 my-12 bg-gray-600 text-red-500">
       <h1 className='text-white text-center my-3'>Password Generator</h1>
    <div className="flex shadow rounded-lg overflow-hidden mb-4">
        <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
        />
        <button
        onClick={copyPasswordToClipboard}
        className='outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0'
        >copy</button>
        
    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
        <input 
        type="range"
        min={8}
        max={50}
        value={length}
         className='cursor-pointer'
         onChange={(e) => {setLength(e.target.value)}}
          />
          <label>Length: {length}</label>
      </div>
      <div className="flex items-center gap-x-1">
      <input
          type="checkbox"
          defaultChecked={numberAllowed}
          id="numberInput"
          onChange={() => {
              setNumberAllowed((prev) => !prev );
          }}
      />
      <label htmlFor="numberInput">Numbers</label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={lowerCharAllowed}
              id="characterInput"
              onChange={() => {
                  setlowerCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Lower Case  </label>
      </div>

      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              defaultChecked={uperCharAllowed}
              id="characterInput"
              onChange={() => {
                  setuperCharAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Uper Case  </label>
      </div>
      <div className="flex items-center gap-x-1">
          <input
              type="checkbox"
              // defaultChecked={symboleAllowed}
              id="characterInput"
              onChange={() => {
                  setsymboleAllowed((prev) => !prev )
              }}
          />
          <label htmlFor="characterInput">Symbols</label>
      </div>
    </div>

    <div className=' pt-10'>
    <button className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
      
       onClick={()=>{
        passwordGenerator();
       }}
    >Generate PAssword</button>
    </div>
</div>


    
  )
}

export default App