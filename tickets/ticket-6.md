# Ticket 6 : la livraison facturée à 60 €

Une cliente de Tours a commandé un Blanc pur moyen avec vase. Le sous-total affichait 60,00 €, mais 5,90 € de livraison ont été facturés alors que la livraison est offerte dès 60 €.

## Prompt envoyé à l'IA

Tu m’aides à trouver la cause d’un bug sur la page de Madame Roussel. Propose trois hypothèses au plus, classées. Pour chacune, indique comment la vérifier dans le navigateur. Aucun correctif à ce stade.

<symptome>Une cliente de Tours commande un Blanc pur moyen avec vase. Le sous-total affiché est de 60,00 €, mais la livraison coûte 5,90 €.</symptome>
<attendu>La livraison doit être offerte dès 60 € d’achat.</attendu>

Complément ajouté après le diagnostic : étapes = composer un Blanc pur moyen avec vase, puis saisir 37000 ; code concerné = `js/prix.js`, `js/livraison.js`, `data/livraison.json`. Le prompt ci-dessus a été reconstitué, il n'a pas été envoyé mot pour mot.

## Diagnostic

Hypothèse retenue : les calculs décimaux JavaScript produisent un montant légèrement inférieur à 60 malgré l'affichage arrondi. Dans le navigateur, ajouter ce bouquet avec ces options, saisir 37000 et comparer le montant calculé dans un point d'arrêt à la valeur affichée. Tester aussi 59,99 €, 60 € et un montant supérieur au seuil.

## Étapes de reproduction avant correction

1. Ajouter un Blanc pur, taille Moyen, avec vase.
2. Saisir le code postal 37000.
3. Comparer le sous-total affiché de 60,00 € aux frais de livraison affichés. La fiche de la cliente signale 5,90 € au lieu de la gratuité.

L'hypothèse d'un seuil mal configuré n'a pas été retenue : `data/livraison.json` fixe bien le seuil à 60 et le calcul utilise `>=`. La comparaison numérique est issue de la lecture du code ; la reproduction avant correction dans le navigateur n'a pas été constatée ici.

## Cause et correctif

Les sommes de prix n'étaient pas arrondies au centime avant la comparaison avec le seuil. Les prix unitaires, les lignes, le sous-total et le total sont maintenant arrondis au centime dans `js/prix.js`.

## Vérification

Test relancé sur les modules corrigés : le Blanc pur moyen avec vase calcule 60 € ; les frais pour 37000 valent 5,90 € à 59,99 €, puis 0 € à 60 € et 60,01 €. Ce test s'exécute dans Node.js.

Un test JavaScript confirme que le bouquet de la cliente vaut 60 € et que les frais sont nuls à 60 € et 60,01 €, facturés à 59,99 €, et que la zone non livrée reste refusée. 

## Proposition de l'IA écartée ou modifiée

Aucune proposition distincte n'a été écartée ou modifiée dans les échanges disponibles. Le seuil a été conservé à 60 €, car les données le fixaient déjà correctement.

## Réponse à la cliente proposée

Bonjour Madame, nous avons corrigé le calcul qui pouvait facturer la livraison alors que le montant affiché atteignait 60 €. Les tests du calcul sont satisfaisants ; 
