import { BrowserRouter, Routes, Route, Navigate, useParams } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { UserAuthProvider } from "./context/UserAuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import { LanguageProvider } from "./context/LanguageContext";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicLayout from "./components/PublicLayout";
import AdminLayout from "./components/admin/AdminLayout";

import Home from "./pages/Home";
import CategoryPage from "./pages/CategoryPage";
import PostDetail from "./pages/PostDetail";
import SearchResults from "./pages/SearchResults";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import Sitemap from "./pages/Sitemap";
import NotFound from "./pages/NotFound";
import SlugResolver from "./pages/SlugResolver";

import Login from "./pages/admin/Login";
import Dashboard from "./pages/admin/Dashboard";
import Posts from "./pages/admin/Posts";
import AddEditPost from "./pages/admin/AddEditPost";
import Categories from "./pages/admin/Categories";
import Comments from "./pages/admin/Comments";
import Messages from "./pages/admin/Messages";
import AdminUsers from "./pages/admin/Users";
import Settings from "./pages/admin/Settings";

function CategoryRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/${slug}`} replace />;
}

function PostRedirect() {
  const { slug } = useParams();
  return <Navigate to={`/${slug}`} replace />;
}

function App() {
  return (
    <BrowserRouter>
      <LanguageProvider>
      <ThemeProvider>
      <UserAuthProvider>
      <AuthProvider>
        <Routes>
          {/* Public site */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy-policy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/sitemap" element={<Sitemap />} />
            <Route path="/category/:slug" element={<CategoryRedirect />} />
            <Route path="/post/:slug" element={<PostRedirect />} />
            <Route path="/:slug" element={<SlugResolver />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          {/* Admin */}
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="posts" element={<Posts />} />
            <Route path="posts/new" element={<AddEditPost />} />
            <Route path="posts/:id/edit" element={<AddEditPost />} />
            <Route path="categories" element={<Categories />} />
            <Route path="comments" element={<Comments />} />
            <Route path="messages" element={<Messages />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="settings" element={<Settings />} />
          </Route>
        </Routes>
      </AuthProvider>
      </UserAuthProvider>
      </ThemeProvider>
      </LanguageProvider>
    </BrowserRouter>
  );
}

export default App;
