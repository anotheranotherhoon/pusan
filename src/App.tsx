import { useSelector } from 'react-redux';
import { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { GlobalStyle } from './theme/GlobalStyle';
import Router from './Router';
import Nav from './components/Common/Nav';
import Title from './components/Common/Title'
import ScrollToTop from './components/Common/ScrollToTop';
import { darkTheme, lightTheme } from './theme/theme';
import { DefaultTheme, ThemeProvider } from 'styled-components';
import { CommonContainer } from './style';
import LoadingSpinner from'./components/Common/LoadingSpinner';
import { RootState } from './store';
function App() {
  const themeState = useSelector((state : RootState) => state.persistedReducer.themeReducer)
  const themeObject = themeState.theme === 'light' ? lightTheme : darkTheme;
  return (
    <BrowserRouter>
      <ThemeProvider theme={themeState as DefaultTheme}>
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
