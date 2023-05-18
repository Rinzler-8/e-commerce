import "./App.css";
import { routes } from "./Router/routes";
function App() {
  if (!localStorage.getItem("id")) {
    localStorage.setItem("id", Math.floor(Math.random() * 3000) + 1);
  }
  return (
    <div className="App">
      {/* Khi bắt đầu vào trang web sẽ đi tới trang login theo cấu hình routes */}
      {routes}
    </div>
  );
}

export default App;
