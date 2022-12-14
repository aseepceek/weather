import './App.css';
import Header from "./components/Header"

function Home() {
  return (
    <div className="App">
      <Header />
      <section className='section-hiw'>
        <div className='container'>
          <div className='section-title'>How it works</div>
          <div className='header-desc'>
            <h2>Understand & Release <br />
              the stress in 3 steps</h2>
            <p>Alivio offers as many journals it takes, tackling different areas such as anxiety, overwhelmedness, sadness, or anger, and a variety of personal causes, to help you become aware of your emotions, and guide you in how to manage stress.</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
