import { Route, Routes } from 'react-router';
import { Home } from './pages/home';
import { MainLayout } from './layout';
import { UploadForm } from './pages/upload';
import Watch from './pages/watch';

function App() {
    return (
        <Routes>
            <Route element={<MainLayout />}>
                <Route index element={<Home />} />
                <Route path="/upload" element={<UploadForm />} />
                <Route path="/watch/:id" element={<Watch />} />
            </Route>
        </Routes>
    );
}

export default App;
