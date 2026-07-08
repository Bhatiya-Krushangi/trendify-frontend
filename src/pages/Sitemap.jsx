import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/axios";

const staticLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Contact Us", path: "/contact" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "Terms & Conditions", path: "/terms" },
  { name: "Search", path: "/search" },
];

const Sitemap = () => {
  const [categories, setCategories] = useState([]);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    api.get("/categories").then(({ data }) => setCategories(data));
    api.get("/posts", { params: { limit: 50 } }).then(({ data }) => setPosts(data.posts));
  }, []);

  return (
    <div className="max-w-3xl mx-auto py-6">
      <h1 className="text-3xl font-display font-bold mb-8 text-ink dark:text-white">Sitemap</h1>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3 text-ink dark:text-white">Pages</h2>
        <ul className="grid grid-cols-2 gap-2 text-sm">
          {staticLinks.map((l) => (
            <li key={l.path}><Link to={l.path} className="text-brand-600 dark:text-brand-400 hover:underline">{l.name}</Link></li>
          ))}
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="text-lg font-bold mb-3 text-ink dark:text-white">Categories</h2>
        <ul className="grid grid-cols-2 gap-2 text-sm">
          {categories.map((c) => (
            <li key={c._id}><Link to={`/category/${c.slug}`} className="text-brand-600 dark:text-brand-400 hover:underline">{c.name}</Link></li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-lg font-bold mb-3 text-ink dark:text-white">Recent Articles</h2>
        <ul className="flex flex-col gap-2 text-sm">
          {posts.map((p) => (
            <li key={p._id}><Link to={`/post/${p.slug}`} className="text-brand-600 dark:text-brand-400 hover:underline">{p.title}</Link></li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Sitemap;
