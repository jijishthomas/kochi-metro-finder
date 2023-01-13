import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'leaflet/dist/leaflet.css'
import { BrowserRouter } from "react-router-dom";
import MapRoutes from './Routes'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      <MapRoutes />
    </BrowserRouter>,
  </React.StrictMode>
)
