import React from 'react';
import logo from './logo.svg';
import './App.css';
import Product from './demo/Components/Product'



function Productlist() {

  return(
    <div>
      <Product
      name = 'banana'
      price = '1$'
      description = 'Fresh bananas from Equador'
      />
    </div>
  );
}

export default Productlist


// function Hello(){
//   let name = 'World'
//   return(
//     <div>
//        <h1>Hello {name}</h1>
//        <p>I'm a new Programmer</p>
//        <p>Nice to meet you, ``)</p>
//     </div>
//   );
// }
//  function Person(props){
//    return(
//      <p>I am {props.age}</p>
//    )

//  }





// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <Hello/>
//         <Person age = '25' /> 
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// export default App;
