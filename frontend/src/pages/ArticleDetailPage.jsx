import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import httpService from "../utils/httpService";

const ArticleDetailPage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const auth = localStorage.getItem("access");

  useEffect(() => {
    // Fetch article
    const headers = auth
      ? { Authorization: `JWT ${auth}` }
      : undefined;
    httpService
      .get(`/api/accounts/articles/${id}/`, { headers })
      .then((res) => {
        setArticle(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    // Fetch user info if logged in
    if (auth) {
      httpService
        .get("/api/accounts/me/", { headers })
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, [id, auth]);

  const handleSubscribe = async () => {
    const headers = auth
      ? { Authorization: `JWT ${auth}` }
      : undefined;
    const res = await httpService.post("/api/accounts/create-checkout-session/", {}, { headers });
    if (res.data.url) {
      window.location.href = res.data.url;
    }
  };

  if (loading) return <div>Loading article...</div>;
  if (!article) return <div>Article not found.</div>;

  // Logic for what to show
  let paywall = null;
  if (!auth) {
    paywall = (
      <div style={{
        background: "#232323",
        color: "#e57373",
        padding: "18px 20px",
        borderRadius: 10,
        marginTop: 20,
        fontWeight: 600
      }}>
        Please <Link to="/login" style={{ color: "#4caf50" }}>login</Link> to read more.
      </div>
    );
  } else if (user && !user.is_subscriber) {
    paywall = (
      <div style={{
        background: "#232323",
        color: "#fbc02d",
        padding: "18px 20px",
        borderRadius: 10,
        marginTop: 20,
        fontWeight: 600
      }}>
        Subscribe to read the full article.
        <button
          onClick={handleSubscribe}
          style={{
            marginLeft: 20,
            background: "#4caf50",
            color: "#fff",
            border: "none",
            borderRadius: 7,
            padding: "8px 18px",
            fontWeight: 700,
            cursor: "pointer"
          }}
        >Subscribe with Stripe</button>
      </div>
    );
  }

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
      <Link to="/articles" style={{ color: "#4caf50", fontWeight: 600 }}>&larr; Back to Articles</Link>
      <h1 style={{ color: "#a5d6a7", marginTop: 16 }}>{article.title}</h1>
      <p style={{ color: "#ccc", fontStyle: "italic" }}>{article.summary}</p>
      <hr style={{ borderColor: "#333", margin: "18px 0" }} />
      <div style={{ whiteSpace: "pre-wrap" }}>{article.body}</div>
      {paywall}
    </div>
  );
};

export default ArticleDetailPage;