import { Route, HashRouter as Router, Routes } from 'react-router-dom';
import Novemberchallenge from './Novemberchallenge';
import User from './User';
import NewSession from './NewSession';
import Table from './Table';
import Stats from './Stats';
import NotFound from './NotFound';

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Novemberchallenge />}>
          <Route path="/" element={<Table />} />
          <Route path="/:name/:userId" element={<User />} />
          <Route path="newsession" element={<NewSession />} />
          <Route path="stats" element={<Stats />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
