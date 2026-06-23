import pratoRaso from '../assets/items/prato-raso.png';
import garfo from '../assets/items/garfo.png';
import faca from '../assets/items/faca.png';
import colher from '../assets/items/colher.png';
import taca from '../assets/items/taca.png';

/** Mapeamento nome do item → imagem do produto */
export const ITEM_IMAGES = {
  'Prato Raso': pratoRaso,
  Garfo: garfo,
  Faca: faca,
  Colher: colher,
  Taça: taca,
};

export function getItemImage(nome) {
  return ITEM_IMAGES[nome] ?? null;
}
