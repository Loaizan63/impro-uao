export const PARTICIPANTES = [
  { id: 1, nombre: "Alejandro", foto: "/Alejandro.jpeg" },
  { id: 2, nombre: "Aleja", foto: "/Aleja.jpeg" },
  { id: 3, nombre: "Dennis", foto: "/Dennis.jpeg" },
  { id: 4, nombre: "Frank", foto: "/frank.jpeg" },
  { id: 5, nombre: "Juan David", foto: "/juandavid.jpeg" },
  { id: 6, nombre: "Mariana", foto: "/mariana.jpeg" },
  { id: 7, nombre: "Sebastian", foto: "/sebastian.jpeg" },
  { id: 8, nombre: "Santiago", foto: "/santiago.jpeg" },
  { id: 9, nombre: "Nata", foto: "/nata.jpeg" },
];

export const ESTADO_INICIAL = {
  escena: 1, // 1: Cartel, 2: Boris (Transición), 3: Ficha Policial
  seleccionados: [], // Array de IDs
  actorEnPantalla: null, // ID del actor que se está editando/interrogando
  registros: {} // { 1: { nombre: 'Camilo', arma: '', crimen: '' } }
};
