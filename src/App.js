import './App.scss';
import { ResultsPage } from '../src/Containers/ResultsPage/ResultsPage';
import { Route, Switch } from 'react-router-dom';
import { Results } from '../src/Components/Results/Results';
import { SearchPage } from '../src/Containers/SearchPage/SearchPage';

function App() {
  return (
    <main>
      <Switch>
        <Route path="/" component={SearchPage} exact />
        <Route path="/:city" component={ResultsPage} exact />
        <Route path="/:city/:listingNumber/" component={Results} />
      </Switch>
    </main>
  );
}

export default App;