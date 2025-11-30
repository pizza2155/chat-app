import React, { useState } from 'react';

type TypeSelectCheckboxProps = {
  genreList: string[];
  setter: (param: string, checked: boolean) => void;
}

const TypeSelectCheckbox: React.FC<TypeSelectCheckboxProps> = ({ genreList, setter: changeGenre }) => {
  const [allChecked, setAllChecked] = useState(false);

  const set = (param: string, checked: boolean) => {
    // "all"がチェックされている場合、チェックを外す
    if (allChecked) {
      setAllChecked(false);
    }
    changeGenre(param, checked);
  }

  const handleAllCheck = (checked: boolean) => {
    setAllChecked(checked);
    genreList.forEach(genre => {
      changeGenre(genre, checked);
    });
    // チェックボックスの状態を更新
    genreList.forEach(genre => {
      const el = document.getElementById(genre) as HTMLInputElement | null;
      if (el) {
        el.checked = checked;
      }
    })
  }

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
      <h2>Select and Check Types</h2>
      <div className='checkbox'>
        <input type="checkbox" checked={allChecked} onChange={e => handleAllCheck(e.target.checked)} />
        <label>All Genres</label>
      </div>
      <div>
        {genreList.map(genre => {
          return (
            <div className='checkbox' key={genre}>
              <input type="checkbox" value={genre} onChange={e => set(genre, e.target.checked)} id={genre} />
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