import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from "react-redux"
import store from "./redux/store/index"
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Form from "./componentes/Form/Form"
import Landing from "./componentes/Landing/Landing"
import Detail from "./componentes/Detail/Detail"
import NavBar from "./componentes/NavBar/Navbar"
import Henry from "./componentes/Henry/Henry"
import About from "./componentes/About/About"
import Home from "./componentes/Home/Home"
import Error404 from "./componentes/Error404/Error404"
import Favorite from "./componentes/Favorite/Favorite"


ReactDOM.render(

  
    <Provider store={store}>
      <BrowserRouter>
          <React.StrictMode>
          <NavBar/>
                <Routes>
                
               
                <Route exact  path="/" element={<Landing/>}/>
                <Route exact  path="/home" element={<App />} />
                <Route exact  path="/character/:id" element={<Detail/>}/>
                <Route exact  path="/create" element={<Form/>} />
                <Route exact  path="/henry" element={<Henry/>} />
                <Route exact  path="/about" element={<About/>} />
                <Route exact  path="/favorites" element={<Home/>} />
                <Route exact  path="/save" element={<Form/>} />
                <Route exact  path="/upload" element={<Form/>} />
                <Route exact  path="/favorite" element={<Favorite/>} />
                <Route exact  path="*" element={<Error404/>} />
                </Routes>
           
          

          
          </React.StrictMode>
        </BrowserRouter>
    </Provider>
  
  
,
  document.getElementById('root')
);

