import React from 'react';
import './App.css';
import SignUp from './components/SignUp';
import SignUpFinished from './components/SingUpFinished';

function App() {
  const [registerFinishedText, setRegisterFinishedText] = React.useState("");

  return (
    <div className="global-wrap">
      {registerFinishedText !== "" ? <SignUpFinished text={registerFinishedText}/> : <SignUp setRegisterFinishedText={setRegisterFinishedText} />}

    </div>
  );
}

export default App;
