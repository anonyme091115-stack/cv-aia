GUIDE DE VALIDATION - PROCESSUS DE CRÉATION CV
==============================================

## OBJECTIF
Valider que la création/édition/suppression de CVs fonctionne correctement après la migration localStorage.

---

## 1. PRÉPARATION DU TEST

### Environnement
```bash
# Clone/pull derniers changements
git pull origin deployment-error-analysis

# Install dépendances
pnpm install

# Start dev server
pnpm dev

# Accéder à http://localhost:3000
```

### Vérifications Préalables
```
✅ Pas d'erreurs TypeScript
✅ Pas de module not found errors
✅ DevTools accessible (F12)
✅ localStorage accessible (DevTools > Application)
```

---

## 2. TEST 1 - CRÉATION DE CV

### Scenario: Créer votre premier CV

**Steps:**

1. Naviguer à `http://localhost:3000/app`
   ```
   Expected: Dashboard vide, bouton "Créer un CV"
   ```

2. Cliquer "Créer un CV"
   ```
   Expected: Redirection vers /app/builder/[id]
   Verification: DevTools > Application > localStorage
   - Clé: "cvs_data"
   - Valeur: Array avec 1 élément
   - Structure:
     {
       "id": "xxxxx",
       "title": "Mon CV",
       "template": "minimal",
       "sections": { ... },
       "shareId": "xxxxx",
       "createdAt": "2026-03-24...",
       "updatedAt": "2026-03-24..."
     }
   ```

3. Vérifier le formulaire est affiché
   ```
   Expected: 
   - Sidebar avec sections
   - Formulaire de profil
   - Aperçu live à droite
   Status: ✅ VALIDATION
   ```

---

## 3. TEST 2 - REMPLIR PROFIL

### Scenario: Ajouter infos personnelles

**Steps:**

1. Dans la section "Profil", remplir:
   ```
   Nom: "Jean Dupont"
   Titre: "Développeur Full Stack"
   Email: "jean@example.com"
   Phone: "+33612345678"
   Location: "Paris, France"
   LinkedIn: "linkedin.com/in/jeandupont"
   Summary: "Passionné par le développement web..."
   ```

2. Attendre 1-2 secondes (auto-save)
   ```
   Expected: Données sauvegardées automatiquement
   Verification: DevTools Console
   - Pas d'erreurs
   - Pas d'API calls (Network tab)
   ```

3. Rafraîchir la page (F5)
   ```
   Expected: Données persistent
   - Tous les champs remplis retrouvent leurs valeurs
   ```

**Status:** ✅ VALIDATION SI PERSISTENT APRÈS F5

---

## 4. TEST 3 - AJOUTER EXPÉRIENCE

### Scenario: Ajouter une expérience professionnelle

**Steps:**

1. Cliquer "Expériences professionnelles" > "Ajouter"
   ```
   Expected: Nouvelle card expérience
   ```

2. Remplir les champs:
   ```
   Entreprise: "TechCorp"
   Poste: "Senior Developer"
   Location: "Paris, France"
   Date début: "2023-01"
   Date fin: "2025-02"
   ```

3. Tester le Switch "Poste actuel"
   ```
   Expected: 
   - Switch se toggle ✅ (c'est ce composant qu'on a créé)
   - Quand ON: champ "Date fin" disabled
   - localStorage mis à jour
   ```

4. Ajouter Description:
   ```
   "Développement d'applications React/Node.js,
    gestion de l'équipe, mentoring juniors"
   ```

5. Ajouter Points clés (3x):
   ```
   - "Augmentation perfs 40%"
   - "Lead architecture migration"
   - "Training framework React avancé"
   ```

6. Vérifier l'aperçu à droite se met à jour
   ```
   Expected: Les données apparaissent dans le CV preview
   ```

7. Rafraîchir (F5)
   ```
   Expected: Expérience persiste
   ```

**Status:** ✅ VALIDATION SI SWITCH + PERSISTENCE OK

---

## 5. TEST 4 - AUTO-SAVE DEBOUNCE

### Scenario: Vérifier que l'auto-save fonctionne correctement

**Steps:**

1. Dans "Profil", taper rapidement "Test typing speed..."
   ```
   Expected: Pas d'appel API à chaque caractère
   Verification: DevTools > Network tab
   - Voir 0 requêtes tandis qu'on tape
   ```

2. Taper 5 mots rapidement, puis arrêter
   ```
   Expected: 1-2 secondes après, localStorage mis à jour
   Verification: DevTools > Application > localStorage
   - Valeur changée après ~1s
   ```

3. Taper à nouveau 3 mots
   ```
   Expected: Le debounce reset, auto-save en 1s
   ```

**Status:** ✅ VALIDATION SI <3 APPELS POUR 20 CARACTÈRES

---

## 6. TEST 5 - AJOUTER ÉDUCATION

### Scenario: Ajouter une formation

**Steps:**

1. Cliquer "Éducation" > "Ajouter"

2. Remplir:
   ```
   Institution: "Université Paris Diderot"
   Diplôme: "Master Informatique"
   Domaine: "Développement logiciel"
   Location: "Paris, France"
   Date début: "2019-09"
   Date fin: "2021-09"
   Description: "Spécialisation IA et web technologies"
   ```

3. Vérifier persistance après F5
   ```
   Expected: Données persistent
   ```

**Status:** ✅ VALIDATION

---

## 7. TEST 6 - AJOUTER COMPÉTENCES

### Scenario: Ajouter des groupes de compétences

**Steps:**

1. Cliquer "Compétences" > "Ajouter une catégorie"

2. Créer catégorie "Frontend":
   ```
   - React
   - TypeScript
   - Tailwind CSS
   - Next.js
   ```

3. Créer catégorie "Backend":
   ```
   - Node.js
   - Express
   - PostgreSQL
   - Redis
   ```

4. Vérifier dans preview

**Status:** ✅ VALIDATION

---

## 8. TEST 7 - AJOUTER LANGUES

### Scenario: Ajouter langues parlées

**Steps:**

1. Cliquer "Langues" > "Ajouter"

2. Ajouter 3 langues:
   ```
   Français - Natif
   Anglais - Fluent
   Allemand - Intermediate
   ```

3. Tester dropdown "Level"
   ```
   Expected: Select fonctionne, options disponibles
   ```

**Status:** ✅ VALIDATION

---

## 9. TEST 8 - RETOUR AU DASHBOARD

### Scenario: Voir le CV dans la liste

**Steps:**

1. Naviguer à `/app`
   ```
   Expected: CV "Mon CV" dans la liste
   - Affiche template "Minimal"
   - Affiche date "Modifié il y a quelques secondes"
   - Bouton "Éditer"
   ```

2. Vérifier localStorage contient 1 CV
   ```
   Expected: "cvs_data" array avec 1 élément
   ```

3. Créer 2 CVs supplémentaires
   ```
   Expected:
   - 3 CVs dans /app
   - 3 éléments dans localStorage cvs_data
   ```

**Status:** ✅ VALIDATION SI 3 CVS AFFICHÉS

---

## 10. TEST 9 - SUPPRESSION

### Scenario: Supprimer un CV

**Steps:**

1. Sur le 2e CV, cliquer "..." > "Supprimer"

2. Confirmer suppression
   ```
   Expected: Dialog confirmation
   ```

3. Vérifier résultats:
   ```
   Expected:
   - CV disparu de /app (reste 2)
   - localStorage contient 2 CVs
   - localStorage ne contient plus l'ancien
   ```

4. Rafraîchir (F5)
   ```
   Expected: 2 CVs restent affichés
   ```

**Status:** ✅ VALIDATION SI SUPPRESSION OK

---

## 11. TEST 10 - PARTAGE PUBLIC

### Scenario: Obtenir URL publique et vérifier accès

**Steps:**

1. Sur un CV, cliquer "..." > "Voir le lien public"
   ```
   Expected: Redirection vers /cv/[shareId]
   ```

2. Vérifier l'affichage du CV public:
   ```
   Expected:
   - Template s'affiche correctement
   - Données du CV présentes
   - Header avec logo + CTA "Créer mon CV"
   - Footer avec crédit CV.AI
   - Pas d'options d'édition
   ```

3. Copier l'URL et ouvrir dans incognito
   ```
   Expected: CV s'affiche sans auth
   - Accessible publiquement ✅
   ```

4. Vérifier que changer le shareId 404
   ```
   URL: /cv/invalidshareid123
   Expected: 404 Not Found
   ```

**Status:** ✅ VALIDATION

---

## 12. TEST 11 - MULTIPLE CVCS WORKFLOW

### Scenario: Gérer plusieurs CVs différents

**Steps:**

1. Créer 3 CVs avec différents templates:
   ```
   CV1: "Minimal" - Développeur
   CV2: "Creative" - Designer
   CV3: "Corporate" - Manager
   ```

2. Pour chaque:
   - Ajouter infos profil
   - Ajouter 1-2 expériences
   - Changer template
   - Vérifier préview

3. Dashboard affiche tous 3

4. Modifier CV1, puis aller à CV2
   ```
   Expected:
   - CV1 garder ses modifications
   - CV2 indépendant
   - Aucun cross-talk
   ```

5. localStorage contient 3 éléments distincts

**Status:** ✅ VALIDATION SI MULTI-CV OK

---

## 13. TEST 12 - PERFORMANCE

### Scenario: Tester avec beaucoup de données

**Steps:**

1. Dans un CV:
   - Ajouter 10 expériences
   - Ajouter 20 compétences
   - Ajouter 10 langues
   - Ajouter 5 projets

2. Éditer/scroller rapide
   ```
   Expected:
   - UI responsive
   - Pas de lag
   - Pas de crash
   ```

3. Rafraîchir
   ```
   Expected: Toutes les données persistent
   ```

4. localStorage size:
   ```
   DevTools > Application > Storage > localStorage
   Expected: ~100KB pour ce CV
   (Acceptable - bien sous limite 5MB)
   ```

**Status:** ✅ VALIDATION

---

## 14. RÉSUMÉ DES VALIDATIONS

### Checklist Finale

```
[ ] Test 1: Création CV → localStorage
[ ] Test 2: Profil sauvegarde → persistence F5
[ ] Test 3: Switch "Poste actuel" fonctionne ⭐
[ ] Test 4: Auto-save debounce (1s)
[ ] Test 5: Éducation persistance
[ ] Test 6: Compétences affichage
[ ] Test 7: Langues dropdown
[ ] Test 8: Dashboard liste correctement
[ ] Test 9: Suppression CV OK
[ ] Test 10: Partage public /cv/[shareId]
[ ] Test 11: Multiple CVs indépendants
[ ] Test 12: Performance sous charge

⭐ Test 3 est le plus critique (c'est le composant qu'on a ajouté)
```

---

## 15. ACTIONS RECOMMANDÉES

### Si tous les tests passent:
✅ Pousser vers Git
✅ Déployer sur Vercel
✅ Tester en production

### Si un test échoue:
1. Vérifier la console (F12)
2. Vérifier localStorage (DevTools)
3. Checker le fichier concerné
4. Console.log pour déboguer

---

## RÉSOLUTION PROBLÈMES

### localStorage affiche vide?
```javascript
// DevTools Console
localStorage.getItem('cvs_data')  // Devrait retourner JSON
JSON.parse(localStorage.getItem('cvs_data')) // Devrait retourner array
```

### Auto-save ne fonctionne pas?
```
Vérifier:
1. useDebouncedCallback est appelé
2. Network tab pas d'erreurs
3. Console logs pas de red flags
4. localStorage clé "cvs_data" changée
```

### Switch toggle ne fonctionne pas?
```
C'est le composant qu'on vient de créer!
Vérifier:
1. @radix-ui/react-switch dans package.json ✅
2. Composant ui/switch.tsx présent ✅
3. Import corrects dans experience-section.tsx ✅
4. Pas d'erreur dans console ✅
```

### CV ne persist pas après F5?
```
Vérifier:
1. localStorage enabled (pas en mode incognito strict)
2. useEffect charge getStoredCVs()
3. Pas d'erreur JSON.parse
4. localStorage quote pas dépassée
```

---

## SUPPORT

**Questions?**
- Vérifier AUDIT_COMPLET.md pour architecture
- Vérifier DEPLOYMENT_FIXES.md pour fixes
- Vérifier code comments dans cv-utils.ts

**Bugs?**
- Créer issue avec:
  - Steps to reproduce
  - Expected vs actual
  - DevTools screenshots
  - localStorage content

---

**Document:** Guide de Validation CV Creation
**Version:** 1.0
**Date:** 2026-03-24
**Status:** ✅ COMPLET ET PRÊT
