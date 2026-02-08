import { BrowserRouter as Router } from 'react-router-dom';
import './App.css'
import Hero from './components/Hero';
import Contact from './components/Contact';
import Navbar from './components/Navbar'
import WorkGrid from './components/WorkGrid';
import About from './components/About';

function App() {
  

  return (
    <Router>
      <div className='min-h-screen'>
        <Navbar/>
        <main>
          <Hero />
          
          <WorkGrid/>
          <About/>
          <Contact/>
        </main>

        <footer className="py-8 text-center text-gray-600 text-xs tracking-widest uppercase">
          © 2026 Prncenium. All Rights Reserved.
        </footer>
      </div>
    </Router>
  )
}

export default App
