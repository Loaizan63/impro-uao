export const PARTICIPANTES = [
  { id: 1, nombre: "Camilo", foto: "👤" }, // Aquí luego pones rutas tipo '/images/camilo.png'
  { id: 2, nombre: "Laura", foto: "👤" },
  { id: 3, nombre: "Andrés", foto: "👤" },
  { id: 4, nombre: "Valentina", foto: "👤" },
];

export const ESTADO_INICIAL = {
  escena: 1, // 1: Cartel, 2: Boris (Transición), 3: Ficha Policial
  seleccionados: [], // Array de IDs
  datosImpro: { nombre: '', crimen: '', arma: '' }
};
