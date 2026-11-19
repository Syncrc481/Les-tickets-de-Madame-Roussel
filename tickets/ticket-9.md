# Ticket 9 : une livraison le dimanche

Madame Roussel ne livre pas le dimanche. Pourtant, un client commandant le samedi soir a vu un dimanche proposé et aucun samedi dans la liste.

## Diagnostic

Les dates locales étaient converties en UTC avec `toISOString()`. À Paris, minuit local peut correspondre à la veille en UTC : une date de lundi pouvait ainsi être enregistrée comme dimanche, et un samedi comme vendredi. Pour reproduire le problème dans le navigateur, ouvrir la boutique avec `?maintenant=2026-11-14T19:30`, puis comparer les dates proposées à un calendrier.

## Correctif

Les jours de livraison sont maintenant enregistrés à partir de leurs composantes locales, sans conversion UTC. Leur affichage construit également une date locale, afin que le libellé reste cohérent avec la valeur dans d'autres fuseaux horaires. Le dimanche reste exclu par les règles de livraison.

## Vérification

Des tests JavaScript exécutés avec les fuseaux Europe/Paris et America/New_York vérifient le premier jour après le samedi soir, l'exclusion du dimanche et la présence du samedi suivant avec le bon libellé. Le parcours complet reste à vérifier dans le navigateur.
