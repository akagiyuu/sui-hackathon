import { Route, Routes } from 'react-router';
import { Home } from './pages/home';
import { MainLayout } from './layout';

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Home />} />
            </Route>
        </Routes>
    );
}

export default App;
