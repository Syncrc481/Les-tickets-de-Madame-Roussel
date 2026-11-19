# Ticket 10 : « NaN € » dans le panier

Une cliente qui utilisait l'ancienne version voit « NaN € » dans son panier et ne peut plus commander. Les autres clientes ne semblent pas touchées.

## Prompt envoyé à l'IA

Tu m’aides à trouver la cause d’un bug sur la page de Madame Roussel. Propose trois hypothèses au plus, classées. Pour chacune, indique comment la vérifier dans le navigateur. Aucun correctif à ce stade.

<symptome>Une cliente qui commandait avant la nouvelle version voit « NaN € » dans son panier et ne peut plus commander ; les autres clientes ne semblent pas concernées.</symptome>
<attendu>Le panier doit afficher des prix valides et permettre de commander. Les paniers de la version 1 ne sont pas repris en version 2.</attendu>

Complément ajouté après le diagnostic : étapes = utiliser une copie de test d'un ancien panier, puis recharger la page ; code concerné = `js/stockage.js`, `js/prix.js`. Le prompt ci-dessus a été reconstitué après réception de la règle sur les paniers v1, il n'a pas été envoyé mot pour mot.

## Diagnostic

L'hypothèse principale concerne le panier sauvegardé dans le navigateur : `chargerPanier()` relit les anciennes données sans vérifier leur version ni le contenu des lignes. Par exemple, une ligne sans quantité numérique entraîne un calcul invalide dans `prixLigne()`. Cela reste une hypothèse : la capture ne montre pas les données enregistrées de la cliente.

## Vérification proposée

Dans le navigateur concerné, ouvrir les outils de développement, puis Application > Stockage local, et inspecter la valeur associée à `panier-roussel`. Comparer la structure de ses lignes avec le format actuel : identifiant du bouquet, options et quantité. Reproduire ensuite le problème sur une copie locale de ces données, sans écraser le panier d'origine.

## Étapes de reproduction avant correction

1. Sur une copie locale de test uniquement, sauvegarder le contenu actuel de `panier-roussel`.
2. Remplacer cette valeur par une copie du panier de l'ancienne version, puis recharger la boutique.
3. Observer le panier et les prix ; restaurer ensuite la valeur d'origine. Le format réel de la cliente n'est pas disponible ici, donc ce scénario précis n'a pas été reproduit.

L'hypothèse d'un ancien panier incompatible est retenue comme explication plausible et le non-chargement de la version 1 est confirmé par le cahier des charges. Une quantité absente est un exemple possible, pas un fait observé chez la cliente ; les autres causes restent non vérifiées.

## Cause et correctif

Le cahier des charges précise que les paniers de la version 1 ne sont pas repris en version 2. Le chargement acceptait pourtant les anciennes données sans contrôler leur version. Il accepte désormais uniquement un panier version 2 avec une liste de lignes ; les données anciennes ou illisibles sont archivées dans le stockage local avant de repartir d'un panier vide. Les codes promo des anciens paniers ne sont pas repris non plus.

## Vérification

Test relancé avec un stockage local simulé : un tableau ancien est archivé puis ne fournit aucune ligne au panier v2 ; un panier v2 avec deux exemplaires et un code promo est relu sans modification. Le format simulé n'est pas présenté comme celui de la cliente.

Un test JavaScript simule un ancien panier et vérifie qu'il est archivé et que le panier affiché repart vide. Il vérifie aussi qu'un panier version 2 et son code promo sont conservés, et que des données illisibles sont archivées sans écraser une archive existante.

## Proposition modifiée et raison

La piste initiale consistait à chercher comment reprendre le panier ancien. Elle a été abandonnée après lecture de la règle indiquant que les paniers v1 ne sont pas repris. Le code repart donc d'un panier vide tout en archivant les anciennes données.

## Réponse à la cliente proposée

Bonjour Madame, les anciens paniers ne sont pas repris dans la nouvelle boutique. Nous avons adapté le chargement pour repartir d'un panier vide lorsque des anciennes données sont détectées, tout en les conservant localement.
