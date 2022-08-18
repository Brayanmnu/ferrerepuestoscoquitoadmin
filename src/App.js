import * as React from 'react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom'
import ProductDetails from './modules/ProductDetails'
import Login from './modules/Login'

export default function App() {
  const[isDetails, setIsDetails] = React.useState(true);
  return (
    <Router>
      <Routes>
        <Route path={'/products-details/:idProduct'} exact element={<ProductDetails setIsDetails={setIsDetails}/>} />
      </Routes>
        {isDetails? <Login/>:null}
    </Router>
  );
}
