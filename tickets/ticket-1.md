# Ticket 1 : le code promo refusé

Bonjour, une cliente m’a appelée hier. Elle a voulu utiliser le code NOEL10 de ma lettre d’information depuis son téléphone, et le site lui a répondu que ce code n’existe pas. Sur mon ordinateur, le code marche très bien. Elle a fini par commander sans la réduction et elle n’était pas contente. Pouvez-vous regarder ?

## Prompt envoyé à l'IA

Tu m’aides à trouver la cause d’un bug sur la page de Madame Roussel.
1. Propose trois hypothèses au plus, classées.
2. Pour chacune : comment la vérifier dans le navigateur.
3. Aucun correctif à ce stade.

<symptome>Le code promo ne fonctionne pas sur téléphone d'après la cliente.</symptome>
<attendu>Le code de promotion doit fonctionner partout.</attendu>

Complément ajouté après le diagnostic : étapes = ajouter un bouquet puis comparer `NOEL10` et `noel10` ; code concerné = `js/promo.js`, `js/app.js`, `data/promos.json`.

### Réponse de l'IA

L'hypothèse principale est une différence de saisie : la comparaison distinguait les majuscules des minuscules. Un espace ajouté au début ou à la fin du code pouvait également provoquer le refus. Une version différente du site chargée depuis le cache du téléphone était une troisième piste, moins probable.

### Vérification proposée dans le navigateur

1. Ajouter un bouquet au panier et saisir `NOEL10`, puis vérifier que la remise apparaît.
2. Essayer `Noel10` et `noel10` pour vérifier si les minuscules sont acceptées.
3. Essayer le code avec un espace avant ou après, puis reproduire le copier-coller depuis la lettre d'information.
4. Si le code exact échoue aussi, recharger la page et comparer avec un autre navigateur, puis vérifier les fichiers et leur provenance dans l'onglet Réseau.

## Cause et correctif

Hypothèses retenues : différence de casse et espaces, car le test de l'ancienne fonction refusait ces variantes. Le cache reste une piste non vérifiée, et non une cause confirmée.

Dans `js/promo.js`, le code était comparé exactement à la saisie. La recherche utilise maintenant `saisie.trim().toUpperCase()` : les espaces au début et à la fin sont retirés et les lettres sont converties en majuscules avant la comparaison.

## Vérification

Test relancé sur le code corrigé : appels de `appliquerPromo()` avec un montant de 50 € et les saisies `NOEL10`, `Noel10`, `noel10` et ` NOEL10 ` ; chacune renvoie une remise de 5 €. Il s'agit d'un test du module JavaScript, pas d'un test du clavier mobile.

Avant la correction, un test direct du JavaScript a montré que `NOEL10` était accepté, tandis que `Noel10`, `noel10` et `NOEL10` suivi d'un espace étaient refusés. Le code exact a aussi été observé comme accepté dans Chrome, avec un panier vide. La fiche initiale indique qu'une nouvelle vérification a été effectuée après modification.

La saisie exacte de la cliente n'est pas connue.

## Proposition modifiée et raison

La première proposition de correction ne convertissait que les minuscules. Elle a été complétée avec `trim()` après constat que les espaces provoquaient aussi un refus.

## Réponse à la cliente proposée

Bonjour Madame, le code pouvait être refusé si une lettre était en minuscule ou si un espace s'était ajouté. La correction accepte désormais ces deux situations. Nous devons encore vérifier le parcours complet sur téléphone. Merci de nous avoir signalé ce problème.
