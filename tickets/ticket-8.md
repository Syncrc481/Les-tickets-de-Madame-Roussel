# Ticket 8 : livrée le matin au lieu de l’après-midi

Une cliente avait choisi l'après-midi, mais la confirmation indiquait le matin et le livreur est passé le matin.

## Prompt envoyé à l'IA

Tu m’aides à trouver la cause d’un bug sur la page de Madame Roussel. Propose trois hypothèses au plus, classées. Pour chacune, indique comment la vérifier dans le navigateur. Aucun correctif à ce stade.

<symptome>Une cliente choisit la livraison l’après-midi, mais la confirmation indique le matin.</symptome>
<attendu>La confirmation doit reprendre le moment de livraison choisi par la cliente.</attendu>

Complément ajouté après le diagnostic : étapes = choisir un jour et « Après-midi », puis valider une commande de test locale ; code concerné = `js/app.js`, `js/affichage.js`. Le prompt ci-dessus a été reconstitué, il n'a pas été envoyé mot pour mot.

## Diagnostic

La fonction `commander()` sélectionnait le premier bouton radio du groupe, qu'il soit coché ou non. Pour le vérifier dans le navigateur, choisir l'après-midi, puis inspecter le bouton radio sélectionné et comparer avec le moment figurant dans la confirmation après une commande de test locale.

## Étapes de reproduction avant correction

1. Ajouter un bouquet, saisir un code postal livré et choisir un jour disponible.
2. Choisir « Après-midi », puis valider une commande de test locale.
3. Comparer le choix à la confirmation, qui indiquait « matin » selon le ticket.

L'hypothèse du premier bouton lu au lieu du bouton coché a été retenue par lecture du sélecteur initial. Aucune transmission réelle à un livreur n'a été testée ; le projet examiné ne montre pas de serveur de commande.

## Correctif

La lecture utilise désormais `input[name=moment]:checked` pour récupérer le choix effectif. Si aucun moment n'est sélectionné, un message demande d'en choisir un.

## Vérification

Test relancé avec une page simulée : la confirmation reprend « matin » ou « après-midi » selon la sélection et demande un moment si aucun n'est coché. Aucun achat réel n'a été passé.

Un test JavaScript de la fonction de commande avec une page simulée confirme les libellés matin et après-midi, ainsi que le refus en l'absence de sélection. Le projet ne montre pas de transmission de commande à un serveur ; ce test porte sur la confirmation locale.

## Proposition de l'IA écartée ou modifiée

Aucune proposition distincte n'a été écartée ou modifiée dans les échanges disponibles. La correction lit le choix sélectionné et vérifie qu'il existe avant la confirmation.

## Réponse à la cliente proposée

Bonjour Madame, nous avons corrigé la confirmation afin qu'elle reprenne le moment choisi par la cliente. Les deux choix ont été testés sur la fonction. Nous sommes désolés pour ce déplacement inutile.
