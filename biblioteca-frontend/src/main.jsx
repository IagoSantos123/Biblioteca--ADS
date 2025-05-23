import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import 'primereact/resources/themes/lara-light-indigo/theme.css';  // tema do PrimeReact
import 'primereact/resources/primereact.min.css';                  // estilos do PrimeReact
import 'primeicons/primeicons.css';                                // ícones PrimeIcons
import 'primeflex/primeflex.css';                                  // utilitários flex do PrimeFlex
import './index.css';                                              // seus estilos globais

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
