# Portfolio de Melvin Courroussé-Brou

Ce projet est un portfolio interactif développé avec **React**, **Vite** et **Tailwind CSS**. Il est structuré pour être facilement déployé sur **GitHub Pages**.

## 🚀 Structure du Projet

- `public/images/` : Contient toutes les ressources visuelles du site.
- `src/` : Contient le code source (React components, styles).
- `index.html` : Point d'entrée principal de l'application.
- `vite.config.ts` : Configuration de l'outil de build Vite.

## 🛠️ Installation Locale

Pour lancer le projet sur votre machine :

1.  **Cloner le dépôt** :
    ```bash
    git clone <url-du-depot>
    cd <nom-du-dossier>
    ```

2.  **Installer les dépendances** :
    ```bash
    npm install
    ```

3.  **Lancer le serveur de développement** :
    ```bash
    npm run dev
    ```
    Le site sera accessible sur `http://localhost:3000`.

## 📦 Déploiement sur GitHub Pages

### Option 1 : Déploiement Automatique (GitHub Actions)

Un workflow est inclus dans `.github/workflows/deploy.yml`. Il déploiera automatiquement votre site à chaque fois que vous pousserez des changements sur la branche `main`.

### Option 2 : Déploiement Manuel

1.  **Générer les fichiers de production** :
    ```bash
    npm run build
    ```
2.  Les fichiers seront générés dans le dossier `dist/`. Vous pouvez ensuite déployer le contenu de ce dossier sur n'importe quel hébergeur statique.

> **Note importante pour GitHub Pages** : Si vous déployez sur une URL de type `https://<votre-nom>.github.io/<nom-du-repo>/`, vous devez modifier la propriété `base` dans le fichier `vite.config.ts` :
> ```ts
> export default defineConfig({
>   base: '/<nom-du-repo>/',
>   // ...
> })
> ```

## ✨ Fonctionnalités

- Design moderne et épuré avec Tailwind CSS.
- Animations fluides avec Framer Motion.
- Navigation par sections.
- Entièrement responsive (adapté aux mobiles et tablettes).
