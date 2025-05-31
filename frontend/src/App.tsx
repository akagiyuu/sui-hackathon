import { Route, Routes } from 'react-router';
import { Home } from './pages/home';
import { MainLayout } from './layout';
import { UploadForm } from './pages/upload';

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/upload" element={<UploadForm />} />
            </Route>
        </Routes>
    );
}

export default App;
