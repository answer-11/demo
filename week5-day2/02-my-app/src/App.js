import logo from './logo.svg';
import './App.css';
// 在js语境直接编写HTML代码 没有进行使用的双引号 单引号反引号的包裹
// 传统的js代码是不可以的 但是在react项目可以 是因为react引入一种jsx的语法
//  然后底层调用webpack的babel做了转换
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <p>这是哥react</p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
