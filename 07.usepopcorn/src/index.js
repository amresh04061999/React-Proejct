import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import StarRating from './StarRating'
import App from './App';

function Rating() {
  const [externalRating,setExternalRating]=useState(0)
  return <div>
    <StarRating m color='blue' onSetRating={setExternalRating}/>
    <span> This movie was rated {externalRating} star</span>
  </div>
}
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    {/* <StarRating maxRating={1} message={["terrible", "bad", "ok", "good", "amazing"]} />
    <StarRating maxRating={10} size={24} color='red' defaultRating={2} />
    <Rating /> */}
  </React.StrictMode>
);
