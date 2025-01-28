import { useState, useEffect } from 'react';
import { Entry, readEntries } from './data';
import { Link } from 'react-router-dom';

export function EntryList() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [error, setError] = useState<unknown>();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadEnt() {
      try {
        const ent = await readEntries();
        setEntries(ent);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }
    if (loading) {
      loadEnt();
    }
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Retrieving Entries :{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  return (
    <div className="container bg-gray-400 h-auto">
      <h1>Entries</h1>
      <Link
        className="absolute top-22 right-20 bg-indigo-700 text-white p-2 rounded"
        to={'details/new'}>
        New Entry
      </Link>
      <ul className="flex flex-col items-center">
        {entries.map((entry) => (
          <li
            key={entry.entryId}
            className="flex flex-col md:flex-row w-4/5 items-center justify-between my-4">
            <img
              className="w-full md:w-1/3 rounded mb-4 md:mb-0"
              src={entry.photoUrl}
              alt={entry.title}
            />
            <div className="w-full md:w-1/2 text-left">
              <h3 className="text-xl font-bold mb-2">{entry.title}</h3>
              <p className="text-gray-700 mb-4">{entry.notes}</p>
              <Link
                className="bg-indigo-700 text-white p-2 rounded hover:bg-indigo-800"
                to={`details/${entry.entryId}`}>
                Edit
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
