# Ticket 6 : la livraison facturée à 60 €

Une cliente de Tours a commandé un Blanc pur moyen avec vase. Le sous-total affichait 60,00 €, mais 5,90 € de livraison ont été facturés alors que la livraison est offerte dès 60 €.

## Prompt de diagnostic reconstitué

Tu m’aides à trouver la cause d’un bug sur la page de Madame Roussel. Propose trois hypothèses au plus, classées. Pour chacune, indique comment la vérifier dans le navigateur. Aucun correctif à ce stade.

<symptome>Une cliente de Tours commande un Blanc pur moyen avec vase. Le sous-total affiché est de 60,00 €, mais la livraison coûte 5,90 €.</symptome>
<attendu>La livraison doit être offerte dès 60 € d’achat.</attendu>

## Diagnostic

Hypothèse retenue : les calculs décimaux JavaScript produisent un montant légèrement inférieur à 60 malgré l'affichage arrondi. Dans le navigateur, ajouter ce bouquet avec ces options, saisir 37000 et comparer le montant calculé dans un point d'arrêt à la valeur affichée. Tester aussi 59,99 €, 60 € et un montant supérieur au seuil.

## Cause et correctif

Les sommes de prix n'étaient pas arrondies au centime avant la comparaison avec le seuil. Les prix unitaires, les lignes, le sous-total et le total sont maintenant arrondis au centime dans `js/prix.js`.

## Vérification

Un test JavaScript confirme que le bouquet de la cliente vaut 60 € et que les frais sont nuls à 60 € et 60,01 €, facturés à 59,99 €, et que la zone non livrée reste refusée. La vérification du parcours complet dans le navigateur reste à effectuer.
