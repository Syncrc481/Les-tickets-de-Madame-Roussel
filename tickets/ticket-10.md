# Ticket 10 : « NaN € » dans le panier

Une cliente qui utilisait l'ancienne version voit « NaN € » dans son panier et ne peut plus commander. Les autres clientes ne semblent pas touchées.

## Diagnostic

L'hypothèse principale concerne le panier sauvegardé dans le navigateur : `chargerPanier()` relit les anciennes données sans vérifier leur version ni le contenu des lignes. Par exemple, une ligne sans quantité numérique entraîne un calcul invalide dans `prixLigne()`. Cela reste une hypothèse : la capture ne montre pas les données enregistrées de la cliente.

## Vérification proposée

Dans le navigateur concerné, ouvrir les outils de développement, puis Application > Stockage local, et inspecter la valeur associée à `panier-roussel`. Comparer la structure de ses lignes avec le format actuel : identifiant du bouquet, options et quantité. Reproduire ensuite le problème sur une copie locale de ces données, sans écraser le panier d'origine.

## Cause et correctif

Le cahier des charges précise que les paniers de la version 1 ne sont pas repris en version 2. Le chargement acceptait pourtant les anciennes données sans contrôler leur version. Il accepte désormais uniquement un panier version 2 avec une liste de lignes ; les données anciennes ou illisibles sont archivées dans le stockage local avant de repartir d'un panier vide. Les codes promo des anciens paniers ne sont pas repris non plus.

## Vérification

Un test JavaScript simule un ancien panier et vérifie qu'il est archivé et que le panier affiché repart vide. Il vérifie aussi qu'un panier version 2 et son code promo sont conservés, et que des données illisibles sont archivées sans écraser une archive existante. Le parcours complet et le panier réel de la cliente restent à vérifier dans le navigateur.
