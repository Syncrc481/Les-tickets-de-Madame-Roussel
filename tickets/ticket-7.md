# Ticket 7 : le message de la carte coupé

Une cliente voulait écrire un long message pour un mariage, mais la saisie s'arrêtait au milieu de sa phrase. Madame Roussel souhaite retirer cette limite.

## Prompt de diagnostic reconstitué

Tu m’aides à trouver la cause d’un bug sur la page de Madame Roussel. Propose trois hypothèses au plus, classées. Pour chacune, indique comment la vérifier dans le navigateur. Aucun correctif à ce stade.

<symptome>Une cliente ne peut pas terminer un long message pour la carte : la saisie s'arrête au milieu de sa phrase.</symptome>
<attendu>La cliente doit pouvoir écrire son message complet sur la carte.</attendu>

## Diagnostic

Le catalogue fixait une limite de 150 caractères ; `js/composition.js` l'appliquait à la fois au champ et au texte enregistré. Pour le vérifier dans le navigateur, sélectionner la carte et essayer de saisir ou coller un texte de plus de 150 caractères, puis examiner le message ajouté au panier.

## Correctif

La limite a été retirée des données, du champ et de la lecture du formulaire, afin de conserver le message complet demandé par la cliente. Le message reste vide si l'option carte n'est pas choisie.

## Vérification

Un test JavaScript du formulaire simulé confirme qu'un message de 480 caractères est transmis intégralement et qu'il est effacé des options quand la carte est décochée. Le parcours complet reste à vérifier dans le navigateur. La capacité physique de la carte n'a pas été vérifiée.
