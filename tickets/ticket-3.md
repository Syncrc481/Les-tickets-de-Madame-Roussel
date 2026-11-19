com# Ticket 3 : le bouquet absent du filtre Merci

Bonjour, quand on choisit l’occasion « Merci », le bouquet « Le petit mot » n’apparaît pas. C’est pourtant celui que je vends le plus pour dire merci ! Il est bien là quand on affiche tous les bouquets.

## Prompt envoyé à l'IA

Tu m’aides à trouver la cause d’un bug sur la page de Madame Roussel.
1. Propose trois hypothèses au plus, classées.
2. Pour chacune : comment la vérifier dans le navigateur.
3. Aucun correctif à ce stade.

<symptome>Quand on filtre en sélectionnant « Merci », le bouquet « Le petit mot » n'apparaît pas.</symptome>
<attendu>Le bouquet « Le petit mot » doit apparaître dans la liste des occasions « Merci ».</attendu>

### Réponse de l'IA

L'hypothèse principale est une différence de majuscule et de minuscule dans les données. L'occasion du bouquet était enregistrée sous `"Merci"`, tandis que l'identifiant du filtre est `"merci"`. Dans `js/affichage.js`, `includes()` compare ces valeurs exactement : elles ne sont donc pas considérées comme identiques.

### Vérification proposée dans le navigateur

1. Ouvrir les outils de développement avec F12, puis l'onglet Réseau.
2. Recharger la page, ouvrir la requête `catalogue.json` et consulter sa réponse.
3. Comparer l'occasion du bouquet `petit-mot` avec l'identifiant de l'occasion « Merci ».
4. Dans la console, essayer `["Merci", "plaisir"].includes("merci")` : le résultat attendu est `false`.

## Cause et changement constaté

L'examen initial du fichier confirmait la différence entre `"Merci"` et `"merci"`. Depuis, `data/catalogue.json` a été modifié : l'occasion du bouquet est désormais `"merci"`, comme l'identifiant du filtre. Ce changement existait déjà au moment de remplir cette fiche.

## Vérification à effectuer

Recharger la boutique dans le navigateur, sélectionner « Merci » et vérifier que « Le petit mot » apparaît. Tester aussi « Toutes » et « Pour le plaisir ». Le résultat de cette vérification n'a pas encore été constaté ici.
