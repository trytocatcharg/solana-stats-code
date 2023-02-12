import { useEffect, useReducer } from 'react';
import './App.css';
import SearchAppBar from './AppBar';
import Loading from './components/Loading';
import SolanaCollection from './components/SolanaCollection';
import SolanaEmpty from './components/SolanaEmpty';
import { useCollection } from './context/collectionContext';
import { collectionReducer } from './state/collectionReducer';

function App() {
  const dataCollection = useCollection();
  const [collection, dispatch] = useReducer(collectionReducer, {} as never);
  
  if (!dataCollection.list) return (<Loading></Loading>);

  return (
    <>
      <SearchAppBar dispatch={dispatch} />
      {
        (collection && dataCollection.list) && <SolanaCollection {...collection} />
      }
      {
        (!collection?.symbol && dataCollection.list) && <SolanaEmpty />
      }
    </>
  );
}

export default App;
