import './App.css'

import { LanguageProvider } from './context/LanguageContext'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

// == Imports Paginas ==========
import Home from './pages/home/home'
import Contato from './pages/contato/contato';
import Interno from './pages/interno/interno';
import Trabalhos from './pages/trabalheComigo/trabalheComigo';

import Auth from './pages/auth/auth';
import ProtectedRoute from './components/protectedRoute';

// Componente auxiliar para checar a rota atual e mudar a classe do main
function MainLayout() {
  const location = useLocation();

  // Defina aqui quais rotas NÃO devem ter a borda e o comportamento de "caixinha"
  const isLandingPage = location.pathname === '/' || 
                        location.pathname === '/quem-sou-eu';

  return (
    <main className={isLandingPage ? 'landing-page' : ''}>
      <div className='container-app'>
        <Routes>
          <Route path='/' element={<Trabalhos/>}/>
          <Route path='/menu' element={<Home/>}/>
          <Route path='/auth' element={<Auth/>}/>
          <Route path='/contato' element={<Contato/>}/>
          
          {/* --- Rotas Protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin" element={<Interno/>} />
          </Route>
        </Routes>
      </div>
    </main>
  );
}

function App() {
  return (
    <>
      <title>Gabriel Motta Rossetto</title>
      <LanguageProvider>
        <BrowserRouter>
          <MainLayout />
        </BrowserRouter>
      </LanguageProvider>
    </>
  )
}

export default App