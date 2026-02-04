import './TechStack.css';

const techStacks = [
  { name: 'React', category: 'Frontend', color: '#61DAFB', logo: '⚛️' },
  { name: 'React Native', category: 'Mobile', color: '#61DAFB', logo: '📱' },
  { name: 'Swift', category: 'Mobile', color: '#FA7343', logo: '🍎' },
  { name: 'TypeScript', category: 'Language', color: '#3178C6', logo: 'TS' },
  { name: 'Tailwind', category: 'CSS', color: '#06B6D4', logo: '🎨' },
  { name: 'Shopify', category: 'E-commerce', color: '#96BF48', logo: '🛍️' },
  { name: 'Strapi', category: 'CMS', color: '#4945FF', logo: '📝' },
  { name: 'PHP', category: 'Backend', color: '#777BB4', logo: '🐘' },
  { name: 'Node.js', category: 'Backend', color: '#339933', logo: '🟢' },
  { name: 'Vite', category: 'Build', color: '#646CFF', logo: '⚡' }
];

export default function TechStack() {
  return (
    <section className="tech-section">
      <div className="tech-container">
        <h2 className="tech-title">
          Stack technique<br />
          <span className="highlight">moderne</span>
        </h2>

        <div className="tech-grid-modern">
          {techStacks.map((tech, index) => (
            <div 
              key={tech.name} 
              className="tech-card"
              style={{ 
                animationDelay: `${index * 0.1}s`,
                '--tech-color': tech.color 
              }}
            >
              <div className="tech-logo">{tech.logo}</div>
              <div className="tech-info">
                <div className="tech-name">{tech.name}</div>
                <div className="tech-category">{tech.category}</div>
              </div>
              <div className="tech-glow" style={{ background: tech.color }}></div>
            </div>
          ))}
        </div>

        <div className="tech-stats">
          <div className="tech-stat">
            <div className="stat-number">10+</div>
            <div className="stat-label">Technologies maîtrisées</div>
          </div>
          <div className="tech-stat">
            <div className="stat-number">5+</div>
            <div className="stat-label">Années d'expérience</div>
          </div>
          <div className="tech-stat">
            <div className="stat-number">100%</div>
            <div className="stat-label">Stack moderne</div>
          </div>
        </div>
      </div>
    </section>
  );
}
