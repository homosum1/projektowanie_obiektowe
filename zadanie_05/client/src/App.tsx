import React, { useEffect, useState } from 'react';

import './App.scss';

import { Route, Routes } from 'react-router-dom';

import { MainPage } from './sites/MainPage/MainPage';
import { NotFound } from './sites/NotFound/NotFound';
import { Navbar } from './shared/Navbar/Navbar';
import { Payment } from './sites/Payment/Payment';

export interface Item {
  Name: string;
  ID: number;
  Price: number;
  Quantity: number;
  Icon: string;
}

export interface SelectedItem {
  item: Item;
  Quantity: number;
}

function App() {
  
  const [error, setError] = useState<string>();

  const [items, setItems] = useState<Item[]>([]);
  const [selectedItems, setSelectedItems] = useState<SelectedItem[]>([]);


  function loadGoogleFonts() {
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }

  useEffect(() => {
    fetch('http://localhost:3000/getAll')
      .then(response => response.json())
      .then(data => setItems(data))
      .catch(error => {
        console.error('Wystąpił błąd:', error);
        setError(error);
      });
  }, [selectedItems]);

  
  useEffect(() => {
    loadGoogleFonts();
  }, []);
  
  
  return (
    <div className='App'>
      <Navbar selectedItems={selectedItems}/>
      <Routes>
        <Route path="" element={ <MainPage items={items} selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>} />
        <Route path="/payment" element={ <Payment selectedItems={selectedItems} setSelectedItems={setSelectedItems}/>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
