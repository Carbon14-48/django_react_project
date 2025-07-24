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
    const headers = auth ? { Authorization: `JWT ${auth}` } : undefined;
    httpService
      .get(`/api/accounts/articles/${id}/`, { headers })
      .then((res) => {
        setArticle(res.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
    if (auth) {
      httpService
        .get("/api/accounts/me/", { headers })
        .then((res) => setUser(res.data))
        .catch(() => setUser(null));
    }
  }, [id, auth]);

  const handleSubscribe = async () => {
    const headers = auth ? { Authorization: `JWT ${auth}` } : undefined;
    const res = await httpService.post("/api/accounts/create-checkout-session/", {}, { headers });
    if (res.data.url) {
      window.location.href = res.data.url;
    }
  };

  if (loading) return <div>Loading article...</div>;
  if (!article) return <div>Article not found.</div>;

  let paywall = null;
  if (!auth) {
    paywall = (
      <div
        style={{
          marginTop: 30,
          padding: "20px 24px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #1f1f1f, #2c2c2c)",
          border: "1px solid #333",
          boxShadow: "0 0 18px rgba(0, 255, 120, 0.08)",
          color: "#ccc",
          fontSize: "1.05rem",
          lineHeight: 1.6,
          textAlign: "center",
        }}
      >
        <span style={{ color: "#81c784", fontSize: "1.4rem", filter: "drop-shadow(0 0 6px #00ff7f88)" }}>
          🔒
        </span>{" "}
        Please{" "}
        <Link
          to="/login"
          style={{
            color: "#4caf50",
            fontWeight: "bold",
            textDecoration: "underline",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.color = "#81c784")}
          onMouseOut={(e) => (e.target.style.color = "#4caf50")}
        >
          login
        </Link>{" "}
        to read more.
      </div>
    );
  } else if (user && !user.is_subscriber) {
    paywall = (
      <div
        style={{
          marginTop: 30,
          padding: "20px 24px",
          borderRadius: "12px",
          background: "linear-gradient(135deg, #2a2a2a, #3a3a3a)",
          border: "1px solid #444",
          boxShadow: "0 0 18px rgba(255, 193, 7, 0.1)",
          color: "#fdd835",
          fontSize: "1.05rem",
          lineHeight: 1.6,
          textAlign: "center",
        }}
      >
        <span style={{ color: "#fdd835", fontSize: "1.4rem", filter: "drop-shadow(0 0 6px #fdd83580)" }}>
          🔔
        </span>{" "}
        Subscribe to read the full article.
        <br />
        <button
          onClick={handleSubscribe}
          style={{
            marginTop: 14,
            background: "linear-gradient(145deg, #43a047, #388e3c)",
            color: "#fff",
            border: "none",
            padding: "12px 26px",
            fontSize: "1rem",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
            boxShadow: "0 6px 16px rgba(0, 255, 120, 0.3)",
            transition: "background 0.3s, transform 0.2s",
          }}
          onMouseOver={(e) => (e.target.style.background = "linear-gradient(145deg, #66bb6a, #43a047)")}
          onMouseOut={(e) => (e.target.style.background = "linear-gradient(145deg, #43a047, #388e3c)")}
          onMouseDown={(e) => (e.target.style.transform = "scale(0.98)")}
          onMouseUp={(e) => (e.target.style.transform = "scale(1)")}
        >
          Subscribe with Stripe
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 700,
        margin: "60px auto",
        background: "#1e1e1e",
        borderRadius: 15,
        padding: "35px 30px",
        color: "#eee",
        boxShadow: "0 8px 20px rgba(0,0,0,0.7)",
      }}
    >
      <Link to="/articles" style={{ color: "#4caf50", fontWeight: 600 }}>
        &larr; Back to Articles
      </Link>
      <h1 style={{ color: "#a5d6a7", marginTop: 16 }}>{article.title}</h1>
      <p style={{ color: "#ccc", fontStyle: "italic" }}>{article.summary}</p>
      <hr style={{ borderColor: "#333", margin: "18px 0" }} />
      <div style={{ whiteSpace: "pre-wrap" }}>{article.body}</div>
      {paywall}
    </div>
  );
};

export default ArticleDetailPage;




