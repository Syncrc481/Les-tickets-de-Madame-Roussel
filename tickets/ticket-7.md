# Ticket 7 : le message de la carte coupé

Une cliente voulait écrire un long message pour un mariage, mais la saisie s'arrêtait au milieu de sa phrase. Madame Roussel souhaite retirer cette limite.

## Prompt envoyé à l'IA

Tu m’aides à trouver la cause d’un bug sur la page de Madame Roussel. Propose trois hypothèses au plus, classées. Pour chacune, indique comment la vérifier dans le navigateur. Aucun correctif à ce stade.

<symptome>Une cliente ne peut pas terminer un long message pour la carte : la saisie s'arrête au milieu de sa phrase.</symptome>
<attendu>La cliente doit pouvoir écrire son message complet sur la carte.</attendu>

Complément ajouté après le diagnostic : étapes = cocher la carte et saisir plus de 150 caractères ; code concerné = `js/composition.js`, `data/catalogue.json`. Le prompt ci-dessus a été reconstitué, il n'a pas été envoyé mot pour mot.

## Diagnostic

Le catalogue fixait une limite de 150 caractères ; `js/composition.js` l'appliquait à la fois au champ et au texte enregistré. Pour le vérifier dans le navigateur, sélectionner la carte et essayer de saisir ou coller un texte de plus de 150 caractères, puis examiner le message ajouté au panier.

## Étapes de reproduction avant correction

1. Choisir un bouquet et cocher l'option carte.
2. Saisir ou coller un message de plus de 150 caractères.
3. Constater que le champ limite la saisie ; vérifier aussi le message enregistré à l'ajout au panier.

L'hypothèse d'une limitation configurée a été retenue après lecture des données et du code. Le projet ne fournit pas ici de confirmation de la place physique sur la carte.

## Correctif

La limite a été retirée des données, du champ et de la lecture du formulaire, afin de conserver le message complet demandé par la cliente. Le message reste vide si l'option carte n'est pas choisie.

## Vérification

Test relancé avec un formulaire simulé et le module corrigé : un message de 480 caractères est transmis intégralement à l'ajout. Il ne s'agit pas d'un test de saisie dans le navigateur.

Un test JavaScript du formulaire simulé confirme qu'un message de 480 caractères est transmis intégralement et qu'il est effacé des options quand la carte est décochée. 

## Proposition de l'IA écartée ou modifiée

Aucune proposition distincte n'a été écartée ou modifiée dans les échanges disponibles. La suppression de la limite a été appliquée à la demande ; la capacité de la carte physique n'a pas été confirmée.

## Réponse à la cliente proposée

Bonjour Madame, nous avons retiré la limite qui coupait les messages sur le site. Un message long a été conservé lors d'un test. La capacité physique de la carte n'a pas été confirmée.
