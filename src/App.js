import React from 'react'
import './App.css';
import { useLocalObservable, Observer } from "mobx-react-lite"

const StoreContext = React.createContext();

const StoreProvider = ({ children }) => {
  const store = useLocalObservable(() => ({
    bugs: ["Centipede"],
    addBug: (bug) => {
      store.bugs.push(bug);
    },
    get bugsCount() {
      return store.bugs.length;
    }
  }));
  return (
    <StoreContext.Provider value={store}>
      {children}
    </StoreContext.Provider>
  )
}

const BugsHeader = () => {
  const store = React.useContext(StoreContext);
  return (
    <Observer>
      {() => (
        <h1>
          {store.bugsCount} Bugs!
        </h1>
      )}
    </Observer>


  )
}


const BugsList = () => {
  const store = React.useContext(StoreContext);

  return (
    <Observer>
      {() => (
        <ul>
          {store.bugs.map(bug => (
            <li key={bug}>
              {bug}
            </li>))}
        </ul>
      )}
    </Observer>
  )

}

const BugsForm = () => {
  const store = React.useContext(StoreContext);
  const [bug, setBug] = React.useState("")
  return (
    <form onSubmit={e => {
      store.addBug(bug);
      setBug("");
      e.preventDefault();
    }}>
      <input type="text" value={bug} onChange={e => { setBug(e.target.value) }} />
      <button type="submit">Add</button>
    </form>
  )
}

function App() {
  return (
    <StoreProvider>
      <main>
        <BugsHeader />
        <BugsList />
        <BugsForm />
      </main>
    </StoreProvider>
  );
}

export default App;
