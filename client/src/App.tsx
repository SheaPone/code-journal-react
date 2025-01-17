import { Header } from './Header';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { EntryForm } from './EntryForm';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route index element={<EntryForm />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
