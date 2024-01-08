import { Container } from "react-bootstrap";
import Header from "./components/Header";
import Footer from "./components/Footer";

export default function App() {
  return (
    <div className="App">
      <Header />
      <main>
        <Container></Container>
      </main>
      <Footer />
    </div>
  );
}
