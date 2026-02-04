# Studio Website - React + Vite

Site vitrine moderne développé avec React, Vite et React Router. Design inspiré de Crafto avec typographie bold et palette audacieuse.

## 🚀 Démarrage rapide

### Prérequis
- Node.js 18+ ([télécharger](https://nodejs.org/))
- npm ou yarn

### Installation

```bash
# 1. Extraire l'archive et naviguer dans le dossier
cd studio-react

# 2. Installer les dépendances
npm install

# 3. Lancer le serveur de développement
npm run dev
```

Le site s'ouvrira automatiquement sur **http://localhost:3000**

## 📦 Structure du projet

```
studio-react/
├── public/                 # Fichiers statiques
├── src/
│   ├── components/        # Composants réutilisables
│   │   ├── Header.jsx
│   │   ├── Header.css
│   │   ├── Footer.jsx
│   │   └── Footer.css
│   ├── pages/            # Pages de l'application
│   │   ├── Home.jsx
│   │   ├── Home.css
│   │   ├── Portfolio.jsx
│   │   └── Portfolio.css
│   ├── data/             # Données (projets, etc.)
│   │   └── projects.js
│   ├── styles/           # Styles globaux
│   │   └── global.css
│   ├── App.jsx           # Composant principal + routing
│   └── main.jsx          # Point d'entrée
├── index.html            # Template HTML
├── vite.config.js        # Configuration Vite
└── package.json          # Dépendances
```

## 🎨 Technologies utilisées

- **React 18** - Bibliothèque UI
- **React Router 6** - Routing côté client
- **Vite** - Build tool ultra-rapide
- **CSS Modules** - Styles scopés par composant

## 🛠️ Scripts disponibles

```bash
# Développement (hot reload)
npm run dev

# Build pour production
npm run build

# Preview du build production
npm run preview

# Lint (si configuré)
npm run lint
```

## ✏️ Personnalisation

### 1. Changer les couleurs

Dans `src/styles/global.css` :

```css
:root {
  --lime: #CDFE00;        /* Couleur accent */
  --black: #0A0A0A;       /* Noir principal */
  --white: #FFFFFF;       /* Blanc */
  --gray: #F5F5F5;        /* Gris clair */
  --gray-dark: #6B6B6B;   /* Gris foncé */
}
```

### 2. Modifier le nom/logo

Dans `src/components/Header.jsx` :

```jsx
<Link to="/" className="logo">VOTRE_NOM</Link>
```

Faites de même dans `Footer.jsx`.

### 3. Ajouter/modifier des projets

Éditez `src/data/projects.js` :

```javascript
export const projectsData = {
  'votre-projet-id': {
    id: 'votre-projet-id',
    category: 'website',      // ecommerce, mobile, automation, website, studio
    badge: 'Site Web',
    title: 'Votre Projet',
    subtitle: 'Description courte...',
    meta: {
      client: 'Nom du client',
      durée: '2 mois',
      année: '2026',
      industry: '🏢 Secteur'
    },
    tags: ['React', 'Vite', 'Tailwind'],
    overview: 'Description détaillée...',
    // ... autres propriétés
  }
};
```

### 4. Ajouter une nouvelle page

1. Créer le composant dans `src/pages/` :

```jsx
// src/pages/Contact.jsx
export default function Contact() {
  return (
    <div className="contact">
      <h1>Contact</h1>
      {/* Votre contenu */}
    </div>
  );
}
```

2. Ajouter la route dans `src/App.jsx` :

```jsx
import Contact from './pages/Contact';

<Routes>
  <Route path="/" element={<Home />} />
  <Route path="/portfolio" element={<Portfolio />} />
  <Route path="/contact" element={<Contact />} />  {/* Nouvelle route */}
</Routes>
```

3. Ajouter le lien dans `Header.jsx` :

```jsx
<Link to="/contact">Contact</Link>
```

### 5. Ajouter des images

1. Créer un dossier `public/images/`
2. Ajouter vos images
3. Les utiliser dans vos composants :

```jsx
<div 
  className="project-image" 
  style={{ 
    backgroundImage: 'url(/images/projet-1.jpg)',
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  }}
/>
```

## 🎯 Fonctionnalités actuelles

✅ Page d'accueil avec hero animé
✅ Section stats dynamiques
✅ Section à propos avec services
✅ Aperçu des projets récents
✅ Stack technique
✅ Page portfolio avec filtres dynamiques
✅ Grille de projets responsive
✅ Routing React Router
✅ Header sticky avec effet scroll
✅ Footer avec navigation

## 🔜 À implémenter (suggestions)

- [ ] Page détail projet (dynamique avec `useParams`)
- [ ] Page contact avec formulaire
- [ ] Animations au scroll (Framer Motion, AOS)
- [ ] Mode sombre / clair
- [ ] Formulaire de contact fonctionnel
- [ ] SEO avec React Helmet
- [ ] Lazy loading des images
- [ ] PWA (Progressive Web App)

## 📱 Responsive

Le site est entièrement responsive :
- **Mobile** : < 768px (1 colonne)
- **Tablet** : 768px - 1199px (2 colonnes)
- **Desktop** : 1200px+ (3 colonnes max)

## 🚀 Déploiement

### Netlify

```bash
# 1. Build
npm run build

# 2. Installer Netlify CLI
npm install -g netlify-cli

# 3. Déployer
netlify deploy --prod --dir=dist
```

Ou glissez-déposez le dossier `dist/` sur [netlify.com](https://netlify.com)

### Vercel

```bash
# 1. Installer Vercel CLI
npm install -g vercel

# 2. Déployer
vercel
```

### Configuration Netlify

Créer un fichier `netlify.toml` :

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## 🐛 Troubleshooting

### Le serveur ne démarre pas

```bash
# Supprimer node_modules et réinstaller
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Erreur de routing en production

Assurez-vous que votre hébergeur redirige toutes les routes vers `index.html` (voir config Netlify ci-dessus).

### Les styles ne s'appliquent pas

1. Vérifiez que les imports CSS sont présents dans vos composants
2. Videz le cache du navigateur (Ctrl+F5)
3. Relancez le serveur de dev

### Hot reload ne fonctionne pas

```bash
# Augmenter la limite de fichiers surveillés (Linux/Mac)
echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf
sudo sysctl -p
```

## 📚 Ressources

- [React Docs](https://react.dev)
- [Vite Docs](https://vitejs.dev)
- [React Router](https://reactrouter.com)
- [CSS Tricks](https://css-tricks.com)

## 💡 Conseils de développement

1. **Composants réutilisables** : Créez des composants pour les éléments répétés (boutons, cards, etc.)
2. **State management** : Pour une app plus complexe, considérez Context API ou Zustand
3. **Performance** : Utilisez `React.memo()` pour les composants qui re-render souvent
4. **SEO** : Ajoutez des meta tags avec `react-helmet-async`
5. **Tests** : Ajoutez Vitest + React Testing Library

## 🎨 Inspirations design

- [Crafto](https://crafto.themezaa.com/)
- [Awwwards](https://www.awwwards.com/)
- [Dribbble](https://dribbble.com/)

## 📄 Licence

Libre d'utilisation pour votre portfolio personnel.

---

**Bon développement ! 🚀**

Pour toute question, consultez la documentation officielle de React et Vite.
