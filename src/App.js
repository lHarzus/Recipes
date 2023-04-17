import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Ingredient from "./components/filters/Ingredient";
import Area from "./components/filters/Area";
import None from "./components/filters/None";
import Name from "./components/filters/Name";
import Category from "./components/filters/Category";
import FullRecipe from "./components/recipes/FullRecipe";
import { NotFoundPage } from "./components/layout/NotFoundPage";
//Redux
import { Provider } from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <Navbar />
        <Routes>
          <Route path="/" element={<None />} />
          <Route path="/name" element={<Name />} />
          <Route path="/ingredient" element={<Ingredient />} />
          <Route path="/area" element={<Area />} />
          <Route path="/category" element={<Category />} />
          <Route path="/recipe/:param" element={<FullRecipe />} />
          <Route path="/*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
