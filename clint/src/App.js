import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Form from './Components/Form';
import View from './Components/View';


function App() {
  return (
    <div className="App">

      <BrowserRouter>
      <Routes>

        <Route path='/' element={ <Form />} />
        <Route path='/view' element={ <View />} />
       
        
      </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
