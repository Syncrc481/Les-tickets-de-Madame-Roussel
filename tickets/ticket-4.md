# Ticket 4 : les tailles des bouquets dans le panier

Bonjour, une cliente voulait offrir deux Pivoine poudrée : une petite pour sa sœur et une grande pour sa mère. Elle a composé la petite et l’a ajoutée au panier, puis elle a choisi « Grand » et a cliqué à nouveau sur « Ajouter au panier ». Dans son panier : deux grandes !

## Prompt envoyé à l'IA

Tu m’aides à trouver la cause d’un bug sur la page de Madame Roussel.
1. Propose trois hypothèses au plus, classées.
2. Pour chacune : comment la vérifier dans le navigateur.
3. Aucun correctif à ce stade.

<symptome>Quand on ajoute une petite Pivoine au panier, puis une grande du même type, le panier affiche deux grandes.</symptome>
<attendu>Le panier doit distinguer les bouquets petits, moyens et grands.</attendu>

Complément ajouté après le diagnostic : étapes = ajouter une petite Pivoine, puis une grande ; code concerné = `js/composition.js`, `js/panier.js`.

### Réponse de l'IA

L'hypothèse principale est que le formulaire et la première ligne du panier partagent le même objet d'options. Lorsque la taille change dans le formulaire, elle change également dans la ligne déjà ajoutée. Au deuxième ajout, le panier considère alors que les deux compositions sont identiques et augmente leur quantité.

### Vérification proposée dans le navigateur

1. Partir d'un panier vide et ajouter une Pivoine poudrée de taille Petit.
2. Sélectionner Grand sans ajouter le bouquet une deuxième fois.
3. Saisir un caractère dans le code postal pour provoquer le réaffichage du panier.
4. Vérifier si la ligne déjà présente est passée de Petit à Grand, puis ajouter le grand bouquet et observer la quantité.

## Cause et correctif

Hypothèse retenue : partage de l'objet d'options, établi par lecture du code initial. Aucun autre scénario n'a été retenu comme cause indépendante ; le parcours initial n'a pas été exécuté ici dans un navigateur.

Dans `js/panier.js`, une nouvelle ligne conservait directement l'objet `options` du formulaire. Cet objet étant modifié par les choix suivants, les options de la ligne changeaient également.

La création de la ligne copie maintenant les options avec `{ ...options }`. Chaque ligne conserve ainsi les choix faits au moment de l'ajout, tandis que les compositions identiques continuent à être regroupées.

## Vérification

Test relancé sur le module panier corrigé : l'ajout d'une petite puis de deux grandes Pivoines produit deux lignes, avec les quantités 1 et 2. La modification des options après le premier ajout ne transforme pas sa taille.

Un test JavaScript du module panier confirme qu'une petite et une grande Pivoine restent sur deux lignes, qu'un deuxième ajout de la grande augmente sa quantité, et que les choix vase, carte et message restent enregistrés après modification du formulaire.



## Proposition de l'IA écartée ou modifiée

Aucune proposition distincte n'a été écartée ou modifiée dans les échanges disponibles. La copie des options a été retenue pour préserver chaque composition.

## Réponse à la cliente proposée

Bonjour Madame, nous avons corrigé la conservation des tailles dans le panier. Une petite et une grande composition doivent maintenant apparaître séparément. 
