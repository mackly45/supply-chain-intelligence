# Guide de contribution

Merci de votre intérêt pour contribuer à Supply Chain & Logistique Intelligente (SCLI) !

## Comment contribuer

1. Fork le dépôt
2. Créez une branche pour votre fonctionnalité (`git checkout -b feature/ma-fonctionnalité`)
3. Committez vos changements (`git commit -am 'Ajout d'une nouvelle fonctionnalité'`)
4. Poussez votre branche (`git push origin feature/ma-fonctionnalité`)
5. Ouvrez une Pull Request

## Structure du monorepo

```
/packages
  /frontend        # Applications React Native (Web & Mobile)
  /desktop         # Application Electron/Tauri
  /backend         # Services Node.js
  /ai              # Modèles IA/ML Python
  /database        # Scripts et migrations de base de données
  /docs            # Documentation
```

## Standards de codage

- Suivez les conventions de nommage du projet
- Écrivez des tests unitaires pour toute nouvelle fonctionnalité
- Documentez votre code
- Assurez-vous que tous les tests passent avant de soumettre une PR

## Signalement des bugs

Utilisez l'onglet Issues pour signaler des bugs avec une description détaillée du problème et les étapes pour le reproduire.

## Demande de nouvelles fonctionnalités

Ouvrez une issue avec le label "enhancement" en décrivant clairement la fonctionnalité proposée et son utilité.

## Code de conduite

Veuillez respecter notre Code de Conduite dans toutes les interactions liées au projet.