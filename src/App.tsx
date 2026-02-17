import './App.css'
import Routes from './routes/routes'
import { CategoryProvider } from './context/CategoryContext'

function App() {

  return (
    <CategoryProvider>
      <Routes />
    </CategoryProvider>
  )
}

export default App
