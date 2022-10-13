import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "./components/Navbar";
import Card from "./components/Card";
import Footer from "./components/Footer";
import { LoadingProvider } from "./context/SpinnerContextProvider";

function App() {
  return (
    <>
      <LoadingProvider>
        <Navbar />
        <Card />
        <Footer />
      </LoadingProvider>
    </>
  );
}

export default App;
