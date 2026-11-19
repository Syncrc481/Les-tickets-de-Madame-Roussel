// Sauvegarde du panier dans le navigateur, pour le retrouver à la visite suivante.

const CLE = "panier-roussel";
const VERSION = 2;

// Enregistre le panier et le code promo.
export function sauverPanier(lignes, codePromo) {
  const donnees = { version: VERSION, lignes, codePromo };
  localStorage.setItem(CLE, JSON.stringify(donnees));
}

// Relit le panier enregistré, ou un panier vide.
export function chargerPanier() {
  const brut = localStorage.getItem(CLE);
  if (!brut) {
    return { lignes: [], codePromo: "" };
  }
  let donnees;
  try {
    donnees = JSON.parse(brut);
  } catch {
    donnees = null;
  }
  if (!donnees || donnees.version !== VERSION || !Array.isArray(donnees.lignes)) {
    // Conserve les anciennes données avant que le panier v2 ne soit enregistré.
    let cleArchive = `${CLE}-archive`;
    let numero = 1;
    while (localStorage.getItem(cleArchive) !== null) {
      cleArchive = `${CLE}-archive-${numero++}`;
    }
    localStorage.setItem(cleArchive, brut);
    return { lignes: [], codePromo: "" };
  }
  return { lignes: donnees.lignes, codePromo: donnees.codePromo || "" };
}
