# Ticket 2 : le bouton +

Bonjour, quand une cliente veut plusieurs bouquets identiques et clique sur le +, le panier en ajoute
plusieurs d’un coup, et c’est de pire en pire à chaque clic. Une cliente s’est retrouvée avec une quinzaine
de bouquets. Heureusement qu’elle a vu le total avant de commander !


- J'essaye de reproduire le bug, et effectivement il y a des soucis de comptage


## Prompt donner a l'IA 

Tu m’aides à trouver la cause d’un bug sur la page
de Madame Roussel.
Propose trois hypothèses au plus, classées.
Pour chacune : comment la vérifier dans
le navigateur.
Aucun correctif à ce stade.
<symptome> le bouton + ajoute plusieur bouquet d'un coupt
</symptome>
<attendu>Le bouton + ne dois ajoute un seul exemplaire par un seul</attendu>

Complément ajouté après le diagnostic : étapes = ajouter un bouquet puis cliquer plusieurs fois sur « + » ; code concerné = `js/affichage.js`, `js/app.js`, `js/panier.js`.

### Reponse de l'ia :

L’hypothèse principale est que plusieurs gestionnaires de clic s’accumulent sur le panier. Le code examiné soutient cette piste.

1. Les gestionnaires de clic s’accumulent à chaque réaffichage. Dans affichage.js (js/affichage.js), afficherPanier() ajoute un écouteur sur la liste du panier chaque fois qu’elle est appelée. Or, app.js (js/app.js) réaffiche le panier après chaque action. Un clic pourrait donc déclencher plusieurs fois l’ajout d’un exemplaire.
   Vérification : ouvre les outils de développement de Chrome, puis l’onglet Éléments. Sélectionne #panier-liste et regarde la section Écouteurs d’événements, sous click. Ajoute un bouquet, puis clique une fois sur « + » et observe si le nombre d’écouteurs augmente après le réaffichage.
2. Un seul clic déclenche plusieurs fois le calcul de quantité. C’est le mécanisme attendu si la première hypothèse est correcte, mais il faut le constater pendant l’exécution.
   Vérification : dans l’onglet Sources, ouvre js/panier.js et pose un point d’arrêt sur ligne.quantite += ecart. Clique une seule fois sur « + », puis reprends l’exécution à chaque arrêt. Si le navigateur s’arrête plusieurs fois pour ce clic, la fonction est appelée plusieurs fois.

Pour reproduire le symptôme visuellement, ajoute un seul bouquet, note sa quantité, puis clique une seule fois sur « + » et compare la nouvelle quantité. Répète le clic pour voir si l’écart augmente. Aucun correctif n’a été apporté.

- Je retiens l'hypothèse 1 : les écouteurs de clic s'accumulent. L'hypothèse 2 décrit la conséquence de cette accumulation plutôt qu'une cause indépendante.
- En lisant le code, je vois que `afficherPanier()` ajoute un écouteur à chaque affichage. Après chaque action, `rafraichir()` rappelle cette fonction : les anciens écouteurs restent sur la liste et réagissent aux clics suivants.

## Correctif

Pour reproduire avant correction : ajouter un bouquet, noter sa quantité, puis appuyer plusieurs fois sur « + » en relevant la quantité après chaque clic. L'augmentation pouvait dépasser un exemplaire et empirer.

Dans `js/affichage.js`, j'ai déplacé l'écouteur dans une fonction `preparerActionsPanier()`. Dans `js/app.js`, cette fonction est appelée une seule fois au démarrage. `afficherPanier()` continue de réafficher les lignes sans ajouter d'écouteur.

## Vérification

Test relancé sur le code corrigé avec des éléments de page simulés : les quantités évoluent de 1 à 2, 3 et 4 ; « − » ramène à 3, « Supprimer » retire la ligne et un seul écouteur reste enregistré. Ce test ne pilote pas un navigateur.

Un test JavaScript avec une liste de panier simulée vérifie que trois clics sur « + » font passer la quantité de 1 à 2, puis 3 et 4 ; un clic sur « − » la ramène à 3 et « Supprimer » retire la ligne. Le test vérifie aussi qu'un seul écouteur reste enregistré après les réaffichages.



## Proposition écartée et raison

La deuxième hypothèse a été écartée comme cause distincte : les appels répétés du calcul sont une conséquence possible de l'accumulation des écouteurs identifiée dans la première.

## Réponse à la cliente proposée

Bonjour Madame, nous avons corrigé le bouton qui ajoutait plusieurs bouquets à la fois. Chaque clic doit maintenant ajouter un seul exemplaire. nous sommes désolés pour la gêne occasionnée.
