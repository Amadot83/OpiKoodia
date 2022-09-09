import ContactCard from './components/ContactCard';
import './App.css';
import NameChildren from './components/NameChildren';

function App() {
  return (
    <div className="App">
      <ContactCard>
      <h3>SImple Contact Card</h3>
      </ContactCard>
      <ContactCard>
        My Card
      </ContactCard>
      <NameChildren
        header={<h2>Complex Contact</h2>}
        media={<h3>Media content here</h3>}
        content={<h3>Actual content here</h3>}/>
      <NameChildren
        header={<h2>No media Card</h2>}
        content={<h3>Content here</h3>}/>
    </div>
  );
}

export default App;
