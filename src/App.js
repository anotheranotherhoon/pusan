import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './theme/GlobalStyle';
import Router from './Router';
import Nav from './components/Nav';
import Title from './components/Title'
import ScrollToTop from './components/ScrollToTop';
import { darkTheme, lightTheme } from './theme/theme';
import { ThemeProvider } from 'styled-components';
import { CommonContainer } from './style';
import LoadingSpinner from'./components/LoadingSpinner';
function App() {
  const themeState = useSelector((state) => state.persistedReducer.themeReducer)
  const themeObject = themeState.theme === 'light' ? lightTheme : darkTheme;
  return (
    <BrowserRouter>
      <ThemeProvider theme={themeState}>
        <GlobalStyle theme={themeObject} />
        <Title />
        <Nav />
        <ScrollToTop />
        <Suspense fallback={<CommonContainer><LoadingSpinner/></CommonContainer>}>
          <Router />
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
