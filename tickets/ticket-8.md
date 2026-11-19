# Ticket 8 : livrée le matin au lieu de l’après-midi

Une cliente avait choisi l'après-midi, mais la confirmation indiquait le matin et le livreur est passé le matin.

## Diagnostic

La fonction `commander()` sélectionnait le premier bouton radio du groupe, qu'il soit coché ou non. Pour le vérifier dans le navigateur, choisir l'après-midi, puis inspecter le bouton radio sélectionné et comparer avec le moment figurant dans la confirmation après une commande de test locale.

## Correctif

La lecture utilise désormais `input[name=moment]:checked` pour récupérer le choix effectif. Si aucun moment n'est sélectionné, un message demande d'en choisir un.

## Vérification

Un test JavaScript de la fonction de commande avec une page simulée confirme les libellés matin et après-midi, ainsi que le refus en l'absence de sélection. La vérification du parcours complet dans le navigateur reste à effectuer. Le projet ne montre pas de transmission de commande à un serveur ; ce test porte sur la confirmation locale.
