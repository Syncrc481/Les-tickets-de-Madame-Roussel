# Ticket 5 : la suppression vide le panier

Bonjour, une cliente avait mis trois bouquets différents dans son panier. Elle a voulu retirer le premier avec le bouton « Supprimer » : les trois ont disparu. Elle a cru à une panne et elle est partie sans commander.

## Prompt envoyé à l'IA

Tu m’aides à trouver la cause d’un bug sur la page de Madame Roussel.
1. Propose trois hypothèses au plus, classées.
2. Pour chacune : comment la vérifier dans le navigateur.
3. Aucun correctif à ce stade.

<symptome>Quand on supprime un bouquet, cela supprime tout le panier.</symptome>
<attendu>On doit pouvoir retirer un bouquet sans supprimer les autres.</attendu>

Complément ajouté après le diagnostic : étapes = ajouter trois bouquets différents et supprimer le premier ; code concerné = `js/panier.js`, `js/app.js`, `js/affichage.js`.

### Réponse de l'IA

L'hypothèse principale est que la fonction retire la ligne choisie et toutes celles qui la suivent. Dans `js/panier.js`, `lignes.splice(index)` supprime tous les éléments à partir de l'index fourni. Supprimer la première ligne retire donc toutes les lignes.

### Vérification proposée dans le navigateur

1. Ajouter trois bouquets différents A, B et C dans un panier vide.
2. Supprimer A et observer si les trois bouquets disparaissent.
3. Recréer le panier, puis supprimer B. Si B et C disparaissent mais que A reste, cela correspond au comportement de `splice(index)`.
4. Dans la console, tester `const bouquets = ["A", "B", "C"]; bouquets.splice(1); console.log(bouquets);` : seul A reste.

## Cause et correctif

Hypothèse retenue : suppression de toutes les lignes à partir de l'index, d'après l'appel initial à `splice(index)`. Aucune autre cause indépendante n'a été établie.

La fonction `supprimerLigne()` appelait `lignes.splice(index)` sans indiquer combien de lignes retirer. Elle utilise maintenant `lignes.splice(index, 1)` pour retirer uniquement la ligne choisie. Cette fonction sert également lorsque le bouton « − » ramène une quantité à zéro.

## Vérification

Test relancé sur le module corrigé : supprimer respectivement A, B puis C de paniers séparés de trois lignes conserve à chaque fois les deux autres ; diminuer A de 1 à 0 conserve B.

Un test JavaScript du module panier confirme que la suppression de la première, de la deuxième ou de la dernière ligne conserve les deux autres. Il vérifie aussi que « − » retire seulement la ligne dont la quantité atteint zéro et conserve une ligne dont la quantité reste positive.



## Proposition de l'IA écartée ou modifiée

Aucune proposition distincte n'a été écartée ou modifiée dans les échanges disponibles. La correction retenue limite la suppression à la ligne demandée.

## Réponse à la cliente proposée

Bonjour Madame, nous avons corrigé la suppression dans le panier : retirer un bouquet ne doit plus retirer les autres. Nous sommes désolés pour la gêne rencontrée par votre cliente.
