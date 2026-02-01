# Setter IA Dashboard - Charles

Dashboard de suivi des leads pour le projet Setter IA.

## Installation

```bash
npm install
```

## Configuration

1. Copier `.env.example` vers `.env.local`
2. Remplir les variables d'environnement :

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your-anon-key-here
```

## Développement

```bash
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000)

## Déploiement sur Vercel

1. Configurer les variables d'environnement sur Vercel
2. Déployer avec :

```bash
npx vercel --prod
```

## Sécurité

- Les clés API sont stockées uniquement côté serveur
- Le fichier `.env.local` est ignoré par Git
- Les appels Supabase passent par `/api/leads`
