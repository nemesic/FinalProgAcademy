import { useState, useEffect } from "react";

export default function Journal() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modal, setModal] = useState(null); // {title, body, img}

  useEffect(() => {
    const seed = Math.random().toString(36).slice(2);
    fetch("https://jsonplaceholder.typicode.com/posts?_limit=7")
      .then((res) => {
        if (!res.ok) throw new Error("API error");
        return res.json();
      })
      .then((data) => {
        setPosts(
          data.map((post) => ({
            ...post,
            img: `https://picsum.photos/seed/journal${post.id}_${seed}/600/340`
          }))
        );
        setError(null);
      })
      .catch(() => setError("Не вдалося завантажити статті"))
      .finally(() => setLoading(false));
  }, []);

  function getJournalDelayClass(index) {
    return `journal-delay-${Math.min(index, 14)}`;
  }

  return (
    <div className="journal-page">
      <div className="journal-refresh-row">
        <button
          className="journal-refresh-btn"
          onClick={() => {
            setLoading(true);
            const seed = Math.random().toString(36).slice(2);
            fetch("https://jsonplaceholder.typicode.com/posts?_limit=15")
              .then((res) => {
                if (!res.ok) throw new Error("API error");
                return res.json();
              })
              .then((data) => {
                setPosts(
                  data.map((post) => ({
                    ...post,
                    img: `https://picsum.photos/seed/journal${post.id}_${seed}/600/340`
                  }))
                );
                setError(null);
              })
              .catch(() => setError("Не вдалося завантажити статті"))
              .finally(() => setLoading(false));
          }}
          disabled={loading}
        >
          {loading ? "Loading..." : "REFRESH"}
        </button>
      </div>
      {loading && <div className="journal-loading">Loading...</div>}
      {error && <div className="journal-error">{error}</div>}
      {!loading && !error && (
        <div className="journal-grid">
          {posts.map((post, idx) => (
            <div
              key={post.id}
              className={`journal-card animate-journal-fade-in ${getJournalDelayClass(idx)}`}
            >
              <div className="journal-card-img">
                <img
                  src={post.img}
                  alt={post.title}
                  loading="lazy"
                />
              </div>
              <div className="journal-card-content">
                <h2 className="journal-card-title">{post.title}</h2>
                <p className="journal-card-body">{post.body}</p>
                <button
                  className="journal-card-readmore"
                  onClick={() => setModal(post)}
                >
                  Read more
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {modal && (
        <div
          className="journal-modal-overlay"
          onClick={() => setModal(null)}
        >
          <div
            className="journal-modal animate-journal-modal-in"
            onClick={e => e.stopPropagation()}
          >
            <button
              className="journal-modal-close"
              onClick={() => setModal(null)}
              aria-label="Закрити"
            >
              ×
            </button>
            <img
              src={modal.img}
              alt={modal.title}
              className="journal-modal-img"
            />
            <h2 className="journal-modal-title">{modal.title}</h2>
            <p className="journal-modal-body">{modal.body}</p>
          </div>
        </div>
      )}
    </div>
  );
}