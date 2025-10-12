import { BrowserRouter, Routes, Route } from 'react-router-dom';
import FormComponent from './pages/formComponent/formComponent';
import Personal from './pages/personal/personal';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Главная страница</div>} />
        <Route path="/form" element={<FormComponent />} />
        <Route path="/personal" element={<Personal />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
