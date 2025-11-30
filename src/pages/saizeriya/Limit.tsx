import React from 'react';


type LimitProps = {
  onGacha: (param: number) => void;
}
const Limit: React.FC<LimitProps> = ({ onGacha: onGacha }) => {

  const [tempPrice, setTempPrice] = React.useState<number>(0);

  const changePrice = (param: number) => {
    setTempPrice(param);
  }

  return (
    <div style={{ marginTop: '20px', marginBottom: '20px' }}>
      <ul>
        <li style={{ marginBottom: '10px' }}>
          価格 :&nbsp;
          <input type="number" onChange={e => changePrice(Number(e.target.value))}/>
        </li>
      </ul>
      <button onClick={() => onGacha(Number(tempPrice) || 0)}>ガチャ</button>
    </div>
  )
};

export default Limit;