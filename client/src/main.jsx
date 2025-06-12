// Importing Modules/Packages
import PasswordGeneratorProjectPage from './Pages/PasswordGeneratorProjectPage.jsx';
import DigitalCalculatorProjectPage from './Pages/DigitalCalculatorProjectPage.jsx';
import NewYearsCountdownProjectPage from './Pages/NewYearsCountdownProjectPage.jsx';
import TalkingComputerProjectPage from './Pages/TalkingComputerProjectPage.jsx';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import QRCodeGeneratorPage from './Pages/QR-Code-Generator-Page.jsx';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './assets/output/main.min.css';


// Creating React Routes
const router = createBrowserRouter([{
  path: '/',
  element: <App />,
  children: [
    {
      index: true,
      element: <TalkingComputerProjectPage />
    },
    {
      path: '/PasswordGenerator',
      element: <PasswordGeneratorProjectPage />
    },
    {
      path: '/DigitalCalculator',
      element: <DigitalCalculatorProjectPage />
    },
    {
      path: '/QR-Code-Generator',
      element: <QRCodeGeneratorPage />
    },
    {
      path: '/New-Year-Countdown-Timer',
      element: <NewYearsCountdownProjectPage />
    },
    // {
    //   path: '/CurrencyConverter',
    //   element: <CurrencyConverterProjectPage />
    // },
    // {
    //   path: '/ImageSearch',
    //   element: <ImageSearchProjectPage />
    // }
  ]
}]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
);