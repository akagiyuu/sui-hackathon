import { Route, Routes } from 'react-router';
import { HomePage } from './pages/home';
import { MainLayout } from './layout';
import { UploadPage } from './pages/upload';
import WatchPage from './pages/watch';
import { LoginPage } from './pages/login';
import { Profile } from './pages/profile';

function App() {
    return (
        <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route element={<MainLayout />}>
                <Route index element={<HomePage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/upload" element={<UploadPage />} />
                <Route path="/watch/:id" element={<WatchPage />} />
            </Route>
        </Routes>
    );
}

export default App;
