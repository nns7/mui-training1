import './App.css';
import Grid from '@mui/material/Grid';
import Header from './Header';
import Content from './Content';
import { ThemeProvider} from '@mui/material/styles';
import theme from './theme';
import CssBaseLine from '@mui/material/CssBaseline';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseLine />
      <Grid container direction="column">
      <Header />
      <div style={{ padding: 30 }}>
        <Content />
      </div>
    </Grid>
    </ThemeProvider>
  );
}

export default App;
