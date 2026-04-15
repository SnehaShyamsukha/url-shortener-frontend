import React, { useEffect, useState } from "react";
import { shortenUrl } from "../services/api";
import QRCode from "react-qr-code";

export default function Dashboard() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("urlHistory") || "[]");
    const theme = localStorage.getItem("theme");

    setHistory(saved);
    if (theme === "dark") setDark(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  const saveHistory = (item) => {
    const updated = [item, ...history].slice(0, 5);
    setHistory(updated);
    localStorage.setItem("urlHistory", JSON.stringify(updated));
  };

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!url) return showToast("Enter a URL");

    try {
      setLoading(true);
      const res = await shortenUrl({ originalUrl: url });

      setShortUrl(res.data.shortUrl);

      saveHistory({
        original: url,
        short: res.data.shortUrl,
        clicks: 0,
      });

      setUrl("");
      showToast("URL shortened 🎉");
    } catch (err) {
      console.log(err);
      showToast("Error ❌");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    showToast("Copied 📋");
  };

  return (
    <div className={dark ? "dashboard-container dark" : "dashboard-container"}>

      {toast && <div className="toast">{toast}</div>}

      <div className="card page">

        {/* HEADER */}
        <div className="header">
          <h1 style={{ color: dark ? "#fff" : "#1e3a8a" }}>
            🔗 URL Shortener
          </h1>

          <button className="toggle-btn" onClick={() => setDark(!dark)}>
            {dark ? "☀️" : "🌙"}
          </button>
        </div>

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Paste your long URL..."
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />

          <button type="submit">
            {loading ? "Shortening..." : "Shorten URL"}
          </button>
        </form>

        {/* RESULT */}
        {shortUrl && (
          <div className="result">

            <p>Your Short URL:</p>

            <div className="link-box">
              <a href={shortUrl} target="_blank" rel="noreferrer">
                {shortUrl}
              </a>

              <button onClick={() => copyToClipboard(shortUrl)}>
                Copy
              </button>
            </div>

            {/* QR CODE */}
            <div style={{ marginTop: "20px" }}>
              <p>Scan QR:</p>
              <QRCode value={shortUrl} size={120} />
            </div>

            {/* TEAM SHARE */}
            <div style={{ marginTop: "15px" }}>
              <button onClick={() => copyToClipboard(shortUrl)}>
                Share with Team 👥
              </button>
            </div>

          </div>
        )}

        {/* HISTORY */}
        {history.length > 0 && (
          <div className="history">
            <h3>Recent URLs</h3>

            {history.map((item, i) => (
              <div key={i} className="history-item">

                <a href={item.short} target="_blank" rel="noreferrer">
                  {item.short}
                </a>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => copyToClipboard(item.short)}>
                    Copy
                  </button>

                  <button onClick={() => copyToClipboard(item.short)}>
                    Share
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}