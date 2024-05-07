import { useState } from "react";
import Button from "./Button";
const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
function App() {
  return <div>
    <Step />
  </div>
}

function Step(){
  const [step, setStep] = useState(1);
  const [isOpen, setOpen] = useState(true)

  function handlerPrevious() {
    if (step > 1) setStep(step - 1)
  }

  function handlerNext() {
    if (step < 3) setStep((step)=> step +1 )
  }

  return (
    <div>
      <button className="close" style={{ fontSize: "20px" }} onClick={() => setOpen((is)=>!is)}>X</button>
      {isOpen && <div className="steps">
        <div className="numbers">
          <div className={`${step >= 1 ? 'active' : ''}`}>1</div>
          <div className={`${step >= 2 ? 'active' : ''}`}>2</div>
          <div className={`${step >= 3 ? 'active' : ''}`}>3</div>
        </div>
      <StepMessage step={step}>
      {messages[step - 1]}
      </StepMessage>
        <div className="buttons">
          <Button textColor={'#fff'} bgColor={'#7950f2'} text={'Previous'} onClick={handlerPrevious} >Previous</Button>
          <Button textColor={'#fff'} bgColor={'#7950f2'}  onClick={handlerNext} >Next</Button>
          {/* <button style={{ backgroundColor: '#7950f2', color: '#fff' }} onClick={handlerPrevious}>Previous</button>
          <button style={{ backgroundColor: '#7950f2', color: '#fff' }} onClick={(handlerNext)}>Next</button> */}
        </div>
      </div>
      }
    </div>
  );
}

function StepMessage({step,children}){
return <div className="message">
{`Step ${step}: ${children}`}
</div>
}
export default App;
