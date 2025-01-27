import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from '../src/Redux/Store/store.jsx';
import { HelmetProvider } from "react-helmet-async";
import './index.css'
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
ReactDOM.createRoot(document.getElementById('root')).render(
    <HelmetProvider>
    <Provider store={store}>
    <GoogleOAuthProvider clientId={clientId}>
    <App />
    </GoogleOAuthProvider>
    </Provider>
    </HelmetProvider>
)
