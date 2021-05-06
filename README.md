# Test Malou Nathan Hoarau
### Application Angular 11 / NodeJs

## Contexte
Créer un outil connecté à l'API Product Hunt permettant de récupérer les produits sortis à une certaine date et d'en faire une visualisation.

## Etape lancement du projet sur environnement de dev

- Copie du projet en local: `git clone`

Ouvrir le cmd sur le project FRONT
- Installation des packages: `npm i`
- Lancement du projet en local: `ng serve`

Ouvrir le cmd sur le project BACK
- Installation des packages: `npm i`
- Lancement du projet en local: `npm start`

## Contenu de l'application
L'application dispose d'une simple page connecté à product hunt, via le profil prodcut hunt de l'utilisateur connecté.
En cas de non connection de l'utilisateur une redirection vers l'api de product hunt est prévue.
Elle charge les posts product hunt en fonction de la date sélectionnée. Par défaut, elle charge les post du jour.

![image](https://user-images.githubusercontent.com/33753731/117365098-1937b580-aebf-11eb-89ac-da70ab3a2a92.png)

