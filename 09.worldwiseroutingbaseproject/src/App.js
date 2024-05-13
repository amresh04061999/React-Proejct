
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage'
import Product from './pages/Product'
import Pricing from './pages/Pricing'
import PageNotFound from './pages/PageNotFound'
import Login from './pages/Login'
import AppLayout from './pages/AppLayout'
import CityList from './component/CityList';
import CountryList from './component/CountryList';
import { useEffect, useState } from 'react';

const BASE_URL = "http://localhost:9000/"
function App() {

  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(function () {
    async function getCities() {
      setIsLoading(true);
      try {
        const res = await fetch(`${BASE_URL}cities`);
        const citiesData = await res.json();
        setCities(citiesData);
        console.log(citiesData)
      }
      catch (err) {
        alert("There was a error")
      } finally {
        setIsLoading(false)
      }
    }
    getCities()
  }, [])

  return <BrowserRouter>
    <Routes>
      <Route index element={<HomePage />}></Route>
      <Route path='/product' element={<Product />}></Route>
      <Route path='/pricing' element={<Pricing />}></Route>
      <Route path='app' element={<AppLayout />}>
        <Route index element={<CityList  cities={cities} isLoading={isLoading}/>}></Route>
        <Route path='cities' element={<CityList  cities={cities} isLoading={isLoading} />}></Route>
        <Route path='countries' element={<CountryList  cities={cities} isLoading={isLoading}/>}></Route>
        <Route path='Form' element={<p>Form Data</p>}></Route>
      </Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='*' element={<PageNotFound />}></Route>
    </Routes>
  </BrowserRouter>


}

export default App;
