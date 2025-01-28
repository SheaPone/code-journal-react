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
    else setIsLoading(false);
  }, [entryId, isEditing]);

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
    <div className="container bg-gray-400 min-h-screen h-auto">
      <h1 className="text-black">Entry</h1>
      <form
        onSubmit={submitForm}
        className="flex flex-col sm:flex-row sm:items-start">
        <div className="img-container sm:w-1/2 sm:mr-8 mb-6 sm:mb-0 sm:ml-4 ml-6">
          <img
            src={formData.photoUrl || '/placeholder-image-square.jpg'}
            style={{ height: '300px', width: '300px' }}
          />
        </div>
        <div className="inputs sm:w-1/2">
          <div className="mb-4 mr-6 ml-6">
            <label htmlFor="title" className="mr-4 block">
              Title
            </label>
            <input
              type="text"
              value={formData.title}
              id="title"
              name="title"
              className="w-full"
              onChange={handleChange}
            />
          </div>
          <div className="mb-4 mr-6 ml-6">
            <label htmlFor="photo" className="mr-4 block">
              Photo Url
            </label>
            <input
              type="text"
              value={formData.photoUrl}
              id="photo"
              name="photoUrl"
              onChange={handleChange}
              className="w-full"
            />
          </div>
          <div className="entry-notes mb-4 mr-6 ml-6">
            <label htmlFor="notes" className="mr-4 block">
              Notes
            </label>
            <textarea
              id="notes"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full"></textarea>
          </div>
        </div>
        <div className="button-ctn mt-60 sm:mt-0">
          {isEditing && (
            <button
              type="button"
              onClick={handleDelete}
              className="absolute bottom-20 left-20  bg-red-500 text-white p-2 rounded">
              Delete
            </button>
          )}
          <button
            type="submit"
            className="absolute bottom-20 right-20 bg-indigo-700 text-white p-2 rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
