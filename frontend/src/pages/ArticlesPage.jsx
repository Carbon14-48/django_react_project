import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import httpService from "../utils/httpService";

const ArticlesPage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    httpService
      .get("/api/accounts/articles/")
      .then((res) => {
        setArticles(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setArticles([]);
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading articles...</div>;

  return (
    <div style={{
      maxWidth: 700,
      margin: "60px auto",
      background: "#1e1e1e",
      borderRadius: 15,
      padding: "35px 30px",
      color: "#eee",
      boxShadow: "0 8px 20px rgba(0,0,0,0.7)"
    }}>
      <h1 style={{ color: "#a5d6a7", marginBottom: 30 }}>Articles</h1>
      {articles.length === 0 && <p>No articles found.</p>}
      {articles.map((a) => (
        <div key={a.id} style={{
          marginBottom: 32,
          padding: "18px 16px",
          background: "#232323",
          borderRadius: 10,
          boxShadow: "0 2px 8px rgba(76,175,80,0.08)"
        }}>
          <h2 style={{ color: "#81c784", marginBottom: 8 }}>
            <Link to={`/articles/${a.id}`} style={{ color: "#81c784", textDecoration: "none" }}>
              {a.title}
            </Link>
          </h2>
          <p style={{ color: "#ccc", marginBottom: 5 }}>{a.summary}</p>
          <Link to={`/articles/${a.id}`} style={{
            color: "#4caf50", fontWeight: 600, fontSize: "1rem", textDecoration: "underline"
          }}>Read more</Link>
        </div>
      ))}
    </div>
  );
};

export default ArticlesPage;