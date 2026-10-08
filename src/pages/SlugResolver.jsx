import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axios";
import CategoryPage from "./CategoryPage";
import PostDetail from "./PostDetail";
import NotFound from "./NotFound";

const SlugResolver = () => {
  const { slug } = useParams();
  const [targetType, setTargetType] = useState(null); // 'category' | 'post' | 'notfound'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    setTargetType(null);

    api
      .get(`/resolve/${slug}`)
      .then(({ data }) => {
        if (isMounted) {
          setTargetType(data.type);
          setLoading(false);
        }
      })
      .catch(async () => {
        // Fallback: check categories first, then posts
        try {
          await api.get(`/categories/${slug}`);
          if (isMounted) {
            setTargetType("category");
            setLoading(false);
          }
        } catch {
          try {
            await api.get(`/posts/${slug}`);
            if (isMounted) {
              setTargetType("post");
              setLoading(false);
            }
          } catch {
            if (isMounted) {
              setTargetType("notfound");
              setLoading(false);
            }
          }
        }
      });

    return () => {
      isMounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24 text-center">
        <div className="inline-block w-8 h-8 border-3 border-brand-600 border-t-transparent rounded-full animate-spin mb-4" />
        <p className="text-slate-400 dark:text-slate-500 text-sm">Loading…</p>
      </div>
    );
  }

  if (targetType === "category") {
    return <CategoryPage />;
  }

  if (targetType === "post") {
    return <PostDetail />;
  }

  return <NotFound />;
};

export default SlugResolver;
