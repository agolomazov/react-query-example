import { Posts } from './components/Posts';
import { InfinitePeople } from './components/sw/people/InfinitePeople';

function App() {
  return (
    <div className="App">
      <h1>Star Wars Peoples</h1>
      {/* <Posts /> */}
      <InfinitePeople />
    </div>
  );
}

export default App;
