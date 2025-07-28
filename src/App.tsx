import './App.css';
import LoboxAutoComplete from './LoboxAutoComplete/index';

function App() {

  
  const items = [
    { label: 'Education 🎓', value: 'education' },
    { label: 'Yeeeah, science! 🧪', value: 'science' },
    { label: 'Art 🖼️🎻', value: 'art' },
    { label: 'Sport ⚽', value: 'sport' },
    { label: 'Games 🎮', value: 'games' },
    { label: 'Health 🏥', value: 'health' },
    { label: 'Music 🎵', value: 'music' },
    { label: 'Travel ✈️', value: 'travel' },
    { label: 'Technology 💻', value: 'technology' },
    { label: 'Food 🍕', value: 'food' },
    { label: 'Nature 🌳', value: 'nature' },
  ];


  return (
    <div className="app">
      <h1>Category Autocomplete</h1>
      <LoboxAutoComplete
        inputProps={{ placeholder: 'Select Category' }} 
        items={items}  />
    </div>
  );
}

export default App;