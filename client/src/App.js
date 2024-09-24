import React from 'react';
import './App.css';
import SignUp from './components/SignUp';
import SignUpFinished from './components/SingUpFinished';

function App() {
  const [registerFinished, setRegisterFinished] = React.useState(false);

  return (
    <div className="global-wrap">
      {registerFinished ? <SignUpFinished /> : <SignUp setRegisterFinished={setRegisterFinished} />}

    </div>
  );
}

export default App;
