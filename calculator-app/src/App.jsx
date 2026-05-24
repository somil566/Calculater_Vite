import React from 'react';
import Calculator from './components/Calculator';

/**
 * App Component
 * Root component of the application. Renders the main title header, 
 * the Calculator component, and a educational footer.
 */
function App() {
  return (
    <main style={styles.appMain}>
      <header style={styles.appHeader}>
        <h1 style={styles.title}>Simple Calculator App</h1>
        <p style={styles.subtitle}>
          Learn React components, props, state, and event handling
        </p>
      </header>
      
      {/* Renders the full Calculator component */}
      <Calculator />
      
      <footer style={styles.appFooter}>
        <p>Built with ❤️ as a beginner React project</p>
      </footer>
    </main>
  );
}

// In-line styles for app layout to keep index.css clean and demonstration easy
const styles = {
  appMain: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100vh',
    width: '100%',
    padding: '40px 20px',
    boxSizing: 'border-box',
    gap: '30px',
  },
  appHeader: {
    textAlign: 'center',
    maxWidth: '450px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '700',
    background: 'linear-gradient(135deg, #ffffff 0%, #a3a3a3 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    marginBottom: '8px',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    fontSize: '1rem',
    color: '#8a8d9b',
    fontWeight: '400',
    lineHeight: '1.4',
  },
  appFooter: {
    fontSize: '0.9rem',
    color: '#52525b',
    marginTop: '10px',
  }
};

export default App;
