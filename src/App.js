import "./App.css";
import { routes } from "./Router/routes";
function App() {
  return (
    <div className="App">
      {/* Khi bắt đầu vào trang web sẽ đi tới trang login theo cấu hình routes */}
      {routes}
    </div>
  );
}

export default App;
