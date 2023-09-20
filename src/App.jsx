import "./styles/App.css";
import Navbar from "./components/Navbar";
import SearchBar from "./components/SearchBar";
import CategoryBar from "./components/CategoryBar";
import SignInPage from "./components/SignInPage";

function App() {
  return (
    <>
      <div className="homepage-first-screen">
        <Navbar />
        <SearchBar />
        <CategoryBar />
      </div>
      {/* <SignInPage /> */}
    </>
  );
}

export default App;
