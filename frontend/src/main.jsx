import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'

import {registerLicense} from "@syncfusion/ej2-base";
import { AuthProvider } from './root/AuthProvider.jsx'
registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY)

//Loading google maps for the explore page
const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
const loadGoogleMapsScript = () => {
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=${GOOGLE_MAPS_API_KEY}`;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);
};
loadGoogleMapsScript();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <AuthProvider>
        <App />
    </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
