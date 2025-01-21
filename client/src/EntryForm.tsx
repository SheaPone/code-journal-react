import { FormEvent, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  addEntry,
  readEntry,
  UnsavedEntry,
  Entry,
  updateEntry,
  removeEntry,
} from './data';

export function EntryForm() {
  const { entryId } = useParams();
  const navigate = useNavigate();
  const isEditing = entryId && entryId !== 'new';
  const [error, setError] = useState<unknown>();
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Entry | UnsavedEntry>({
    title: '',
    photoUrl: '',
    notes: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  function submitForm(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log('form submitted');
    const inputs = structuredClone(
      formData
    ) as unknown as UnsavedEntry as Entry;
    if (isEditing) {
      updateEntry(inputs);
    } else {
      addEntry(inputs);
    }
    navigate('/');
  }

  useEffect(() => {
    async function loadEntry(entryId: number) {
      try {
        const data = await readEntry(+entryId);
        console.log(data);
        if (data) setFormData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }
    if (isEditing) loadEntry(+entryId);
  }, []);

  function handleDelete() {
    if (entryId) removeEntry(+entryId);
    console.log('deleted entry');
    navigate('/');
  }

  if (isLoading) return <div>Loading...</div>;
  if (error) {
    return (
      <div>
        Error Retrieving Entry :{' '}
        {error instanceof Error ? error.message : 'Unknown Error'}
      </div>
    );
  }

  return (
    <div className="container bg-gray-400 h-auto">
      <h1>Code Journal</h1>
      <form onSubmit={submitForm}>
        <div className="img-container">
          <img
            src={formData.photoUrl || '/placeholder-image-square.jpg'}
            style={{ height: '300px', width: '300px', marginLeft: 50 }}
          />
        </div>
        <div className="inputs">
          <div className="mb-4">
            <label htmlFor="title" className="mr-4">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              id="title"
              name="title"
              className=""
              onChange={handleChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="photo" className="mr-4">
              Photo Url
            </label>
            <input
              type="text"
              value={formData.photoUrl}
              id="photo"
              name="photoUrl"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="entry-notes">
          <label htmlFor="notes" className="mr-4">
            Notes
          </label>
          <textarea
            id="notes"
            name="notes"
            value={formData.notes}
            onChange={handleChange}></textarea>
        </div>
        <div className="button-ctn">
          {isEditing && (
            <button type="button" onClick={handleDelete}>
              Delete
            </button>
          )}
          <button
            type="submit"
            className="float-right bg-indigo-700 text-white">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
