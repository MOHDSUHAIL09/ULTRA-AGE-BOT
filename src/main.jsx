
import { createRoot } from 'react-dom/client'  // ✅ "from" add kiya
import { BrowserRouter } from 'react-router-dom'
import { UserProvider } from './context/UserContext'


import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
      <UserProvider>
          <App />
      </UserProvider>
  </BrowserRouter>
)