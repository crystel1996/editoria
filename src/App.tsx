import './App.css'
import Routes from './routes/routes'
import { CategoryProvider } from './context/CategoryContext'
import { ArticleProvider } from './context/ArticleContext'
import { NotificationProvider } from './context/NotificationContext'
import { ImportProvider } from './context/ImportContext'

function App() {

  return (
    <ArticleProvider>
      <CategoryProvider>
        <NotificationProvider>
          <ImportProvider>
            <Routes />
          </ImportProvider>
        </NotificationProvider>
      </CategoryProvider>
    </ArticleProvider>
  )
}

export default App
