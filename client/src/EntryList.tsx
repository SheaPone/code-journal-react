import { useState, useEffect } from 'react';
import { Entry, readEntries } from './data';

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
      <ul>
        {entries.map((entry) => (
          <li key={entry.entryId}>
            <div>
              <h3>{entry.title}</h3>
              <img src={entry.photoUrl} />
              <p>{entry.notes}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
