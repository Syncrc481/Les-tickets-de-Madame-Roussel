# Ticket 9 : une livraison le dimanche

Madame Roussel ne livre pas le dimanche. Pourtant, un client commandant le samedi soir a vu un dimanche proposé et aucun samedi dans la liste.

## Prompt envoyé à l'IA

Tu m’aides à trouver la cause d’un bug sur la page de Madame Roussel. Propose trois hypothèses au plus, classées. Pour chacune, indique comment la vérifier dans le navigateur. Aucun correctif à ce stade.

<symptome>Une commande passée le samedi soir propose une livraison le dimanche et aucun samedi.</symptome>
<attendu>Les jours proposés doivent correspondre aux dates disponibles et exclure le dimanche, jour de fermeture.</attendu>

Complément ajouté après le diagnostic : étapes = ouvrir la page avec `?maintenant=2026-11-14T19:30` et examiner les jours ; code concerné = `js/livraison.js`, `js/affichage.js`, `data/livraison.json`. Le prompt ci-dessus a été reconstitué, il n'a pas été envoyé mot pour mot.

## Diagnostic

Les dates locales étaient converties en UTC avec `toISOString()`. À Paris, minuit local peut correspondre à la veille en UTC : une date de lundi pouvait ainsi être enregistrée comme dimanche, et un samedi comme vendredi. Pour reproduire le problème dans le navigateur, ouvrir la boutique avec `?maintenant=2026-11-14T19:30`, puis comparer les dates proposées à un calendrier.

## Étapes de reproduction avant correction

1. Régler le fuseau du navigateur sur Europe/Paris et ouvrir `/?maintenant=2026-11-14T19:30`.
2. Ouvrir la liste des jours de livraison et relever les dates affichées.
3. Vérifier l'apparition d'un dimanche et l'absence du samedi attendu, puis comparer les valeurs de date aux dates locales dans les outils de développement.

L'hypothèse du décalage UTC a été retenue d'après la conversion initiale. Une mauvaise configuration du jour fermé n'a pas été retenue : les données indiquent bien dimanche avec `0`. La reproduction avant correction dans le navigateur n'a pas été constatée ici.

## Correctif

Les jours de livraison sont maintenant enregistrés à partir de leurs composantes locales, sans conversion UTC. Leur affichage construit également une date locale, afin que le libellé reste cohérent avec la valeur dans d'autres fuseaux horaires. Le dimanche reste exclu par les règles de livraison.

## Vérification

Test relancé sur le module de livraison : après le samedi 14 novembre à 19 h 30, le premier jour est le lundi 16 et la liste comprend le samedi 21 ; les dates produites ne tombent pas un dimanche. Ce test ne remplace pas le parcours navigateur.

Des tests JavaScript exécutés avec les fuseaux Europe/Paris et America/New_York vérifient le premier jour après le samedi soir, l'exclusion du dimanche et la présence du samedi suivant avec le bon libellé. 

## Proposition de l'IA écartée ou modifiée

Aucune proposition distincte n'a été écartée ou modifiée dans les échanges disponibles. La règle de fermeture le dimanche a été conservée : elle était déjà configurée correctement.

## Réponse à la cliente proposée

Bonjour Madame, nous avons corrigé le décalage qui pouvait afficher un dimanche au lieu du jour disponible. Les calculs de dates ont été testés. Merci de nous avoir prévenus.
