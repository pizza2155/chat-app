import { useState, useEffect } from "react";
import menu from '../saizeriya/saizeriya.json'
import PageTitle from '../saizeriya/PageTitle.tsx';
import TypeSelectCheckbox from '../saizeriya/TypeSelectCheckbox.tsx';
import Limit from './Limit.tsx';

const page = () => {

  const fullItems = menu.menus;

  const [filteredItems, setDisplayItems] = useState(fullItems);

  const [language, setLanguage] = useState('japanese');

  const genreList = Array.from(new Set(menu.menus.map(menu => menu.genre)));
  genreList.unshift('all');

  const [genre, setGenre] = useState<string[]>([]);

  const changeGenre = (param: string, checked: boolean) => {
    setGenre(prev => {
      if (param === 'all') {
        if (checked) {
          return genreList.filter(g => g !== 'all');
        } else {
          return [];
        }
      }

      if (checked) {
        return prev.includes(param) ? prev : [...prev, param]
      } else {
        return prev.filter(g => g !== param);
      }
    })
  }

  useEffect(() => {
    setDisplayItems(fullItems.filter(item => genre.includes(item.genre)));
  }, [genre])

  const getMenuName = (menu: any, language: string) => {
    if (language == 'japanese') return menu.name ? menu.name : '(メニュー名なし)';
    if (language == 'english') return menu.name_en ? menu.name_en : '(no title)';
    if (language == 'chinese') return menu.name_zh ? menu.name_zh : '(匿名的)';
    return menu.name;
  }

  const getCurrency = (language: string) => {
    if (language == 'japanese') {
      return '円';
    } else if (language == 'chinese') {
      return '日元';
    } else {
      return 'yen';
    }
  }

  const [price, setPrice] = useState<number | null>(null);

  const onGacha = (price: number) => {
    setPrice(price);
    if (price === null) return;

    const result = fullItems.filter(item => genre.includes(item.genre));
    // 予算内（= を含む）で候補を作る
    let filteredByPriceList = result.filter(r => r.price <= price);

    let restPrice: number = price;
    const rslt2: any[] = [];

    while (true) {
      // 毎回「残り予算以下」の候補だけを作る
      const available = filteredByPriceList.filter(r => r.price <= restPrice);
      if (available.length === 0) break;
      const idx: number = Math.floor(Math.random() * available.length);
      const picked = available[idx];
      rslt2.push(picked);
      restPrice -= picked.price;
      // 同じアイテムを重複して選ばないよう元リストから削除
      filteredByPriceList = filteredByPriceList.filter(r => r.id !== picked.id);
    }

    setDisplayItems(rslt2);
  }

  return (
    <div>
      <PageTitle language={language} />
      <TypeSelectCheckbox genreList={genreList} setter={changeGenre} />
      <Limit price={price} onGacha={onGacha} />
      <select name="language-select" value={language} onChange={(e) => setLanguage(e.target.value)}>
        <option value="japanese">日本語</option>
        <option value="english">English</option>
        <option value="chinese">中文</option>
      </select>
      <ul>
        {filteredItems.map(menu => {
          return (
            <div>
              <li>
                <div key={menu.id}>
                  <h3>
                    <span>{menu.icon}</span>
                    {getMenuName(menu, language)} : {menu.price} {getCurrency(language)}</h3>
                </div>
              </li>
            </div>
          )
        })}
        {
          filteredItems.length !== 0 &&
          <p>
            合計金額: {filteredItems.reduce((sum, item) => sum + item.price, 0)} {getCurrency(language)}
          </p>
        }
      </ul>
      <div style={{ bottom: 0, right: 0, fontSize: '12px' }}>
        出典: <a href="https://github.com/ryohidaka/saizeriya-menus" target='_blank' >https://github.com/ryohidaka/saizeriya-menus</a>
      </div>
    </div>
  )
}

export default page;