import { Button } from "./components/atoms/Button/Button";
import { Input } from "./components/atoms/Input/Input";
import { Heading } from "./components/atoms/Heading/Heading";

function App() {
  return (
    <div style={{ padding: 20 }}>
      <Heading title="Clothing Store" subtitle="Welcome" />

      <Input placeholder="Search product..." />

      <br />
      <br />

      <Button>Buy Now</Button>
    </div>
  );
}

export default App;
