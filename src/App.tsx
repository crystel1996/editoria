import './App.css'
import Routes from './routes/routes'
import { CategoryProvider } from './context/CategoryContext'
import { ArticleProvider } from './context/ArticleContext'
import { NotificationProvider } from './context/NotificationContext'

function App() {

  return (
    <ArticleProvider>
      <CategoryProvider>
        <NotificationProvider>
          <Routes />
        </NotificationProvider>
      </CategoryProvider>
    </ArticleProvider>
  )
}

export default App
