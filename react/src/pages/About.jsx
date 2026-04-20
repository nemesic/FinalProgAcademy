export default function About() {
  return (
    <div className="about-page">
      <div className="about-card animate-about-fade-in">
        <div className="about-svg">
          <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" className="align-middle">
            <circle cx="28" cy="28" r="28" fill="#fff"/>
            <path d="M28 16C22.48 16 18 20.48 18 26C18 31.52 22.48 36 28 36C33.52 36 38 31.52 38 26C38 20.48 33.52 16 28 16ZM28 34C23.59 34 20 30.41 20 26C20 21.59 23.59 18 28 18C32.41 18 36 21.59 36 26C36 30.41 32.41 34 28 34ZM28 22C26.34 22 25 23.34 25 25C25 26.66 26.34 28 28 28C29.66 28 31 26.66 31 25C31 23.34 29.66 22 28 22ZM28 26C27.45 26 27 25.55 27 25C27 24.45 27.45 24 28 24C28.55 24 29 24.45 29 25C29 25.55 28.55 26 28 26Z" fill="#7b8794"/>
          </svg>
        </div>
        <h1 className="about-title">ABOUT US</h1>
        <div className="about-desc">
          This project is the final assignment for the <b>Prog.Academy</b> course.  It focuses on building a modern, responsive web application using current technologies and best practices.
        </div>
        <div className="about-stack">
          <b>Tech Stack:</b> React, JavaScript (ES6+), Tailwind CSS, Vite, HTML5, CSS3.
        </div>
        <div className="about-info">
          The application is built with a component-based architecture, clean and maintainable code, and a strong focus on user experience and performance.
        </div>
        <a
          href="https://github.com/nemesic/FinalProgAcademy/tree/main/react"
          target="_blank"
          rel="noopener noreferrer"
          className="about-github-btn"
        >
          <svg width="28" height="28" viewBox="0 0 98 98" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="49" cy="49" r="49" fill="#fff"/>
            <path d="M49 20C34.64 20 22.5 32.14 22.5 46.5C22.5 57.98 30.36 67.7 40.98 70.7C42.23 70.92 42.7 70.18 42.7 69.54C42.7 68.96 42.68 67.36 42.67 65.36C35.1 66.98 33.22 62.36 33.22 62.36C32.1 59.62 30.48 58.92 30.48 58.92C28.22 57.46 30.65 57.5 30.65 57.5C33.14 57.68 34.46 60.04 34.46 60.04C36.7 63.74 40.36 62.7 41.7 62.18C41.92 60.6 42.54 59.48 43.24 58.82C36.98 58.06 30.42 55.54 30.42 45.94C30.42 43.14 31.44 40.82 33.14 39.02C32.88 38.36 32.02 35.98 33.34 32.98C33.34 32.98 35.5 32.26 42.66 36.36C44.74 35.8 46.92 35.52 49.1 35.5C51.28 35.52 53.46 35.8 55.54 36.36C62.7 32.26 64.86 32.98 64.86 32.98C66.18 35.98 65.32 38.36 65.06 39.02C66.76 40.82 67.78 43.14 67.78 45.94C67.78 55.58 61.2 58.06 54.94 58.82C55.82 59.62 56.54 61.08 56.54 63.18C56.54 66.18 56.5 68.7 56.5 69.54C56.5 70.18 56.97 70.92 58.22 70.7C68.84 67.7 76.7 57.98 76.7 46.5C76.7 32.14 64.56 20 49 20Z" fill="#222"/>
          </svg>
          <span>github/nemesic</span>
        </a>
      </div>
    </div>
  );
}