import * as React from 'react';
import { BrowserRouter as Router, Route , Routes} from 'react-router-dom'
import ProductDetails from './modules/ProductDetails'
import Dashboard from './modules/Dashboard'

export default function App() {
  const[isDetails, setIsDetails] = React.useState(true);
  return (
    <Router>
      <Routes>
        <Route path={'/products-details/:idProduct'} exact element={<ProductDetails setIsDetails={setIsDetails}/>} />
      </Routes>
        {isDetails? <Dashboard/>:null}
    </Router>
  );
}
