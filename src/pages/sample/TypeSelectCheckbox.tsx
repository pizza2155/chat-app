import React from 'react';


type TypeSelectCheckboxProps = {
  genreList: string[];
  setter: (param: string, checked: boolean) => void;
}

const TypeSelectCheckbox: React.FC<TypeSelectCheckboxProps> = ({ genreList: genreList, setter: changeGenre }) => {

  const set = (param: string, checked: boolean) => {
    changeGenre(param, checked);
  }

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
      <h2>Select and Check Types</h2>
      <div>
        {genreList.map(genre => {
          return (
            <div className='checkbox' key={genre}>
              <input type="checkbox" value={genre} onChange={e => set(genre, e.target.checked)} />
              <label>
                {genre}
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
};

export default TypeSelectCheckbox;