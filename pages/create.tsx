import React from "react";

export default function create(this:any) {
  const [buffer,setBuffer] = React.useState<any>()

  function onSubmit (){
    console.log("Submit ...");
  }
  
  const captureFile =(event :any)=> {
    const file = event.target.files[0]
    const reader = new window.FileReader()
    reader.readAsArrayBuffer(file)
    reader.onloadend = ()=>{
      setBuffer(reader.result)
      console.log(reader.result)
    }
  }

  return (
    <>
      <div className="main">
          <h1 >BO HINH VO DI MAY EM</h1>
          <form >
            <input type = "file" onChange={ event => captureFile(event)}/>
          </form>
          <button onClick ={onSubmit}>Submit</button>  
        <div >
          <h1> Image will appear here</h1>
        </div>
        </div>
    </>
  );
};