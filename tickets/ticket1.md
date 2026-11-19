# Ticket 1 : le code promo refusé

Bonjour, une cliente m’a appelée hier. Elle a voulu utiliser le code NOEL10 de ma lettre d’information
depuis son téléphone, et le site lui a répondu que ce code n’existe pas. Sur mon ordinateur, le code
marche très bien. Elle a fini par commander sans la réduction et elle n’était pas contente. Pouvez-vous
regarder ?

- J'essaye de reproduire le bug, mais je n'arrive pas a le reproduire 
- Je demande a l'IA d'essayer de reproduire le bug

## Prompt envoyer a l'IA

Tu m’aides à trouver la cause d’un bug sur la page
de Madame Roussel.
Propose trois hypothèses au plus, classées.
Pour chacune : comment la vérifier dans
le navigateur.
Aucun correctif à ce stade.
<symptome>Le code promo ne fonctionne pas sur telephone d'apres la cliente
</symptome>
<attendu>que le code de promotion fonctionne partout</attendu> 

### Reponse de l'ia :

La cause la plus probable est une différence de saisie. Le site compare le code exactement : il distingue les majuscules et prend en compte les espaces. Les hypothèses suivantes sont classées selon les tests déjà effectués sur le JavaScript.

1. Le clavier du téléphone saisit des minuscules.
   Dans le navigateur sur téléphone, ajoutez un bouquet au panier, puis essayez NOEL10 et Noel10. Si le premier est accepté et le second refusé, la différence de casse explique ce refus.

2. Un espace est ajouté au code, par exemple lors du copier-coller depuis la lettre d’information.
   Dans le navigateur, comparez NOEL10 avec le même code suivi d’un espace. Essayez aussi de copier le code directement depuis la lettre. Si seule la saisie avec espace est refusée, cette hypothèse est confirmée pour ce test.

3. Le téléphone charge une version différente du site, par exemple depuis son cache.
   Si NOEL10 saisi exactement échoue aussi, rechargez la page et réessayez, puis comparez avec un autre navigateur sur le téléphone. Si le résultat change, examinez dans les outils de développement l’onglet Réseau pour voir quels fichiers sont chargés et s’ils viennent du cache.

Les deux premières situations ont été reproduites en testant directement le JavaScript, mais pas encore dans un navigateur mobile. Elles restent compatibles avec le témoignage de la cliente, sans prouver ce qu’elle a saisi. Aucun correctif n’a été appliqué.


- je garde l'hypothese 1 et je regarde comment regler le probleme
Il suffis de remplacer dans promo.js cette ligne de commande 
```  
const regle = promos.find((promo) => promo.code === saisie);
```

par 

```
const regle = promos.find((promo) => promo.code === saisie .trim() .toUpperCase())
```

apres avoir changer cette ligne de commande et apres reverification tout fonctionne correctement