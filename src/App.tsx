import './App.css'
import Routes from './routes/routes'
import { CategoryProvider } from './context/CategoryContext'
import { ArticleProvider } from './context/ArticleContext'

function App() {

  return (
    <ArticleProvider>
      <CategoryProvider>
        <Routes />
      </CategoryProvider>
    </ArticleProvider>
  )
}

export default App
