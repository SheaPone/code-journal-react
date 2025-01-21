import { Header } from './Header';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import { EntryForm } from './EntryForm';
import { EntryList } from './EntryList';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Header />}>
          <Route path="details/:entryId" element={<EntryForm />} />
          <Route index element={<EntryList />} />
        </Route>
      </Routes>
    </>
  );
}
export default App;
