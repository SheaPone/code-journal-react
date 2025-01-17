/* type FormProps = {
  img: string;
} */

export function EntryForm() {
  return (
    <div className="container bg-gray-400">
      <h1>Code Journal</h1>
      <form>
        <div className="img-container">
          <img
            src="./public/placeholder-image-square.jpg"
            style={{ height: '100px', width: '100px' }}
          />
        </div>
        <div className="inputs">
          <div>
            <label>Title</label>
            <input type="text" className="" />
          </div>
          <div>
            <label>Photo Url</label>
            <input />
          </div>
        </div>
        <div className="entry-notes">
          <label>Notes</label>
          <textarea></textarea>
        </div>
        <div className="button-ctn">
          <button type="submit">Save</button>
        </div>
      </form>
    </div>
  );
}
