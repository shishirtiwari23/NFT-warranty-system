import { CurrentContextProvider } from "./utils";
import { Home } from "./pages/";

function App() {
  return (
    <CurrentContextProvider>
      <Home />
    </CurrentContextProvider>
  );
}

export default App;
