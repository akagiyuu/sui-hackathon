import { Route, Routes } from 'react-router';
import { HomePage } from './pages/home';
import { MainLayout } from './layout';
import { UploadPage } from './pages/upload';
import WatchPage from './pages/watch';
import { LoginPage } from './pages/login';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/watch/:id" element={<WatchPage />} />
            </Route>
        </Routes>
    );
}

export default App;
