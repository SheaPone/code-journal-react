import { FormEvent, useState } from 'react';
import { addEntry, UnsavedEntry } from './data';

/* type FormProps = {
  img: string;
} */

export function EntryForm() {
  const [formData, setFormData] = useState({
    title: '',
    photoURL: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    console.log(name, value);
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  function submitForm(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const inputs = structuredClone(formData) as unknown as UnsavedEntry;
    addEntry(inputs);
    console.log('form submitted');
    setFormData({
      title: '',
      photoURL: '',
      notes: '',
    });
  }

  return (
    <div className="container bg-gray-400 h-auto">
      <h1>Code Journal</h1>
      <form onSubmit={submitForm}>
        <div className="img-container">
          <img
            src={formData.photoURL || '/placeholder-image-square.jpg'}
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
              value={formData.photoURL}
              id="photo"
              name="photoURL"
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
            // onChange={handleChange}
          ></textarea>
        </div>
        <div className="button-ctn">
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
