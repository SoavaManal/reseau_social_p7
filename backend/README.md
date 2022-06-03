# SPECIFICATION DE L'API

## Environment de développement :

- NodeJs
- Express
- MySql (ORM Sequelize)
- MySql server(MAMP)

## Package utilisés :

- http: pour la creation du serveur
- nodemon: pour lancer le serveur
- dotenv: pour l'utilisation des varriable d'environement
- bcrypt: pour le cryptage des mots de passe
- jsonwebtoken: pour creer et verrifier les token d'authentification
- fs/multer: pour la gestion des fichiers
- sequelize cli: ORM pour communiquer avec la base de donnee

## Role de l'admin:

- Suppression d'un utilisateur
- Suppression du posts
- Suppression du commentaire

## Routes:

### USERS

![users action](/role-picture/Aspose.Words.ef4c928e-a0e2-4c14-a978-b76e32652d11.001.png)

### POSTS

![posts action](/role-picture/Aspose.Words.ef4c928e-a0e2-4c14-a978-b76e32652d11.002.png)

### COMMENTS

![comment action](/role-picture/Aspose.Words.ef4c928e-a0e2-4c14-a978-b76e32652d11.003.png)
