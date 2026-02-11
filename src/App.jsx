import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import { pagesConfig } from './pages.config'
import PageNotFound from './lib/PageNotFound'

const { Pages, Layout, mainPage } = pagesConfig
const mainPageKey = mainPage ?? Object.keys(Pages)[0]
const MainPage = mainPageKey ? Pages[mainPageKey] : <></>

const LayoutWrapper = ({ children, currentPageName }) =>
  Layout ? <Layout currentPageName={currentPageName}>{children}</Layout> : <>{children}</>

export default function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <LayoutWrapper currentPageName={mainPageKey}>
              <MainPage />
            </LayoutWrapper>
          }
        />
        {Object.entries(Pages).map(([path, Page]) => (
          <Route
            key={path}
            path={`/${path}`}
            element={
              <LayoutWrapper currentPageName={path}>
                <Page />
              </LayoutWrapper>
            }
          />
        ))}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  )
}
