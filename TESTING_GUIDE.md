# Guide de Test - Application Sans Authentification

## Points clés à tester

### 1. Accès à l'application
- [ ] Accès direct à `/app` sans authentification
- [ ] Accès à `/app/builder/new` directement (création d'un nouveau CV)
- [ ] Pas de redirection vers login

### 2. Fonctionnalité de création
- [ ] Cliquer sur "Créer un CV" depuis la page d'accueil
- [ ] Cliquer sur "Créer un CV" depuis le dashboard
- [ ] Vérifier qu'un nouvel onglet éditeur s'ouvre
- [ ] Vérifier que le CV est créé avec des valeurs par défaut

### 3. Fonctionnalité d'édition
- [ ] Ouvrir un CV existant
- [ ] Modifier le profil (nom, titre, etc.)
- [ ] Vérifier le sauvegarde automatique (vérifier "Dernière sauvegarde")
- [ ] Actualiser la page - les données doivent persister
- [ ] Changer le template et vérifier que l'aperçu se met à jour

### 4. Fonctionnalité de suppression
- [ ] Cliquer sur le menu "..." d'un CV
- [ ] Cliquer sur "Supprimer"
- [ ] Confirmer la suppression
- [ ] Vérifier que le CV disparaît de la liste

### 5. Partage public
- [ ] Ouvrir un CV et cliquer sur "Voir le lien public"
- [ ] Partager le lien `/cv/[shareId]`
- [ ] Accéder au lien dans un nouvel onglet/navigateur
- [ ] Vérifier que le CV s'affiche correctement

### 6. LocalStorage
- [ ] Ouvrir les DevTools (F12)
- [ ] Aller dans Application → LocalStorage
- [ ] Chercher la clé `cvs_data`
- [ ] Vérifier qu'elle contient un JSON avec les CVs

### 7. Persistance
- [ ] Créer un CV
- [ ] Actualiser la page
- [ ] Vérifier que le CV est toujours là
- [ ] Fermer et rouvrir l'onglet
- [ ] Vérifier que le CV persiste
- [ ] Vider le cache (Ctrl+Shift+Suppr) et vérifier que les données sont perdues

### 8. Multi-onglets
- [ ] Ouvrir le dashboard dans deux onglets
- [ ] Créer un CV dans l'onglet 1
- [ ] Aller sur l'onglet 2 et actualiser
- [ ] Vérifier que le nouveau CV n'apparaît pas (localStorage n'est pas partagé en temps réel)

### 9. Responsive Design
- [ ] Tester sur mobile
- [ ] Tester en tablet
- [ ] Vérifier que l'interface reste fonctionnelle

### 10. Edge Cases
- [ ] Créer plusieurs CVs avec différents templates
- [ ] Modifier les dates, expériences, éducation
- [ ] Supprimer et recréer des CVs
- [ ] Tester avec des caractères spéciaux dans le nom du CV

## Données de test

### Profil de test
```
Nom: Jean Dupont
Titre: Développeur Full-Stack
Email: jean@example.com
Téléphone: +33 6 12 34 56 78
Localisation: Paris, France
LinkedIn: linkedin.com/in/jeandupont
Résumé: Développeur passionné avec 5 ans d'expérience
```

### Expérience de test
```
Entreprise: Tech Corp
Poste: Développeur Senior
Lieu: Paris
Dates: 2020-01 à Présent
Description: Développement d'applications web
```

### Éducation de test
```
Institution: Université de Paris
Diplôme: Master
Domaine: Informatique
GPA: 3.8
Dates: 2018-01 à 2020-06
```

### Compétences de test
```
Catégorie: Backend
- Node.js
- PostgreSQL
- Docker

Catégorie: Frontend
- React
- TypeScript
- Tailwind CSS
```

## Environnement

### Navigateurs à tester
- Chrome (dernière version)
- Firefox (dernière version)
- Safari (si sur macOS)
- Edge (si disponible)

### Résolutions d'écran
- 1920x1080 (Desktop)
- 1366x768 (Laptop)
- 768x1024 (Tablet)
- 375x667 (Mobile)

## Problèmes connus / À ignorer

1. **Liens publics entre appareils**: Les liens `/cv/[shareId]` ne fonctionnent que sur le même navigateur/appareil

2. **Perte de données**: Si l'utilisateur vide le cache du navigateur, toutes les données sont perdues

3. **Pas de sync**: Les données ne se synchronisent pas entre onglets ouverts simultanément (problème localStorage natif)

## Checklist de déploiement

- [ ] Tous les tests ci-dessus sont passés
- [ ] Pas d'erreur console
- [ ] Pas de requête Supabase non désirée
- [ ] localStorage `cvs_data` se remplit correctement
- [ ] Performance acceptable (pas de lag lors de l'édition)
- [ ] Responsive design fonctionne
- [ ] Site déploie sans erreur de build
