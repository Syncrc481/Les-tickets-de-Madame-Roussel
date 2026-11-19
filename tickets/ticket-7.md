# Ticket 7 : le message de la carte coupé

Une cliente voulait écrire un long message pour un mariage, mais la saisie s'arrêtait au milieu de sa phrase. Madame Roussel souhaite retirer cette limite.

## Diagnostic

Le catalogue fixait une limite de 150 caractères ; `js/composition.js` l'appliquait à la fois au champ et au texte enregistré. Pour le vérifier dans le navigateur, sélectionner la carte et essayer de saisir ou coller un texte de plus de 150 caractères, puis examiner le message ajouté au panier.

## Correctif

La limite a été retirée des données, du champ et de la lecture du formulaire, afin de conserver le message complet demandé par la cliente. Le message reste vide si l'option carte n'est pas choisie.

## Vérification

Un test JavaScript du formulaire simulé confirme qu'un message de 480 caractères est transmis intégralement et qu'il est effacé des options quand la carte est décochée. Le parcours complet reste à vérifier dans le navigateur. La capacité physique de la carte n'a pas été vérifiée.
