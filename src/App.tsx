import { useState, useMemo } from 'react'
//import reactLogo from './assets/react.svg'
// импорт удалён — demo-asset удалён из проекта
import viteLogo from '/vite.svg'
import './App.css'
import { SearchBar } from './shared/ui/SearchBar/SearchBar'
import { useDebounce } from './shared/hooks/useDebounce'
import { users } from './api/mockData.json'


function App() {
  const [count, setCount] = useState(0)

  // для поисковой строки
  const [searchText, setSearchText] = useState('');
  const debouncesSearchText = useDebounce(searchText, 300);

  // TODO: filteredCards нужно будет подставить в компонент отображающий карточки на странице (будет добавлен позже)
  const filteredCards = useMemo(() => {
    if (!debouncesSearchText.trim()) {
      return users
    };
    const lowercasedSearchText = debouncesSearchText.toLowerCase();

    return users.filter((user) => 
      user.name.toLowerCase().includes(lowercasedSearchText) ||
      user.city.toLowerCase().includes(lowercasedSearchText) ||
      user.skillsCanTeach.some(skill => 
        skill.title.toLowerCase().includes(lowercasedSearchText)
      ) ||
      user.skillsWantsToLearn.some(skill => 
        skill.title.toLowerCase().includes(lowercasedSearchText)
      )
    );
  }, [debouncesSearchText]);


  return (
    <>
      <div>
        <SearchBar
          searchText={searchText}
          onSearchChange={setSearchText}
        />
      </div>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
         
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
