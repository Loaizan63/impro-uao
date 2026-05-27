'use client';
import Image from 'next/image';
import { useImproState } from '@/hooks/useImproState';
import { PARTICIPANTES } from '@/constants/participantes';

export default function ControllerPage() {
  const [estado, setEstado] = useImproState(true);

  const toggleActor = (id) => {
    const isSelected = estado.seleccionados.includes(id);
    let nuevosSeleccionados;
    let nuevosRegistros = { ...estado.registros };
    let nuevoActorEnPantalla = estado.actorEnPantalla;

    if (isSelected) {
      nuevosSeleccionados = estado.seleccionados.filter(aId => aId !== id);
      if (nuevoActorEnPantalla === id) {
        nuevoActorEnPantalla = nuevosSeleccionados.length > 0 ? nuevosSeleccionados[0] : null;
      }
    } else {
      nuevosSeleccionados = [...estado.seleccionados, id];
      const actor = PARTICIPANTES.find(p => p.id === id);
      if (!nuevosRegistros[id]) {
        nuevosRegistros[id] = { nombre: actor.nombre, arma: '', crimen: '' };
      }
      if (!nuevoActorEnPantalla) {
        nuevoActorEnPantalla = id;
      }
    }

    setEstado({ 
      seleccionados: nuevosSeleccionados,
      registros: nuevosRegistros,
      actorEnPantalla: nuevoActorEnPantalla
    });
  };

  const handleRegistro = (campo, valor) => {
    if (!estado.actorEnPantalla) return;
    setEstado({
      registros: {
        ...estado.registros,
        [estado.actorEnPantalla]: {
          ...estado.registros[estado.actorEnPantalla],
          [campo]: valor
        }
      }
    });
  };

  const registroActual = estado.actorEnPantalla && estado.registros[estado.actorEnPantalla] 
    ? estado.registros[estado.actorEnPantalla] 
    : { nombre: '', arma: '', crimen: '' };

  const actorActivo = estado.actorEnPantalla
    ? PARTICIPANTES.find(actor => actor.id === estado.actorEnPantalla)
    : null;

  return (
    <main className="min-h-screen bg-neutral-100 p-8 text-black font-mono">
      <div className="max-w-4xl mx-auto space-y-8">
        
        <header className="bg-black text-white p-6 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] flex justify-between items-center">
          <h1 className="text-3xl font-black uppercase tracking-wider">Panel de Control</h1>
          <div className="space-x-4">
            {[1, 2, 3].map(num => (
              <button 
                key={num}
                onClick={() => setEstado({ escena: num })}
                className={`px-6 py-2 font-bold transition-all border-2 ${
                  estado.escena === num 
                    ? 'bg-white text-black border-white' 
                    : 'bg-black text-white border-white hover:bg-neutral-800'
                }`}
              >
                Escena {num}
              </button>
            ))}
          </div>
        </header>

        {estado.escena !== 3 && (
          <section className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)]">
              <h2 className="text-2xl font-black uppercase mb-6 border-b-2 border-black pb-2">1. Seleccionar Sospechosos (Escena 1)</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {(() => {
                  // Mostrar a Manuela primero en el panel de control para encontrarla rápido
                  const ordered = [
                    ...PARTICIPANTES.filter(p => p.nombre.toLowerCase() === 'manuela'),
                    ...PARTICIPANTES.filter(p => p.nombre.toLowerCase() !== 'manuela')
                  ];
                  return ordered.map(actor => (
                    <button
                      key={actor.id}
                      onClick={() => toggleActor(actor.id)}
                      className={`p-4 font-black text-xl uppercase border-4 transition-all text-left ${
                        estado.seleccionados.includes(actor.id)
                          ? 'bg-black text-white border-black'
                          : 'bg-white text-black border-black hover:bg-neutral-200'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative w-16 h-16 shrink-0 overflow-hidden border-2 border-current bg-neutral-200">
                          <Image
                            src={actor.foto}
                            alt={actor.nombre}
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                        </div>
                        <span className="leading-tight">{actor.nombre}</span>
                      </div>
                    </button>
                  ));
                })()}
              </div>
            </section>
        )}

        <section className="bg-white p-6 border-4 border-black shadow-[8px_8px_0_0_rgba(0,0,0,1)] transition-opacity">
          <h2 className="text-2xl font-black uppercase mb-6 border-b-2 border-black pb-2">2. Interrogatorio (Escena 3)</h2>
          
          {estado.seleccionados.length === 0 ? (
            <div className="text-center p-8 bg-neutral-100 border-4 border-dashed border-neutral-300">
              <p className="text-xl font-bold text-neutral-500 uppercase">Selecciona al menos un sospechoso arriba</p>
            </div>
          ) : (
            <div className="space-y-6">
              
              {/* TABS DE SOSPECHOSOS */}
              <div>
                <label className="block text-lg font-black uppercase mb-2">Sospechoso en Pantalla</label>
                <div className="flex gap-2 flex-wrap mb-6">
                  {PARTICIPANTES.filter(p => estado.seleccionados.includes(p.id)).map(actor => (
                    <button
                      key={actor.id}
                      onClick={() => setEstado({ actorEnPantalla: actor.id })}
                      className={`px-6 py-2 border-4 border-black text-lg font-black uppercase transition-all ${
                        estado.actorEnPantalla === actor.id
                          ? 'bg-black text-white scale-105 shadow-[4px_4px_0_0_rgba(0,0,0,0.3)]'
                          : 'bg-white text-black hover:bg-neutral-200'
                      }`}
                    >
                      {actor.nombre}
                    </button>
                  ))}
                </div>
              </div>

              {actorActivo && (
                <div className="bg-black text-white border-4 border-black overflow-hidden">
                  <div className="relative aspect-[4/3] w-full bg-neutral-900">
                    <Image
                      src={actorActivo.foto}
                      alt={actorActivo.nombre}
                      fill
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4 border-t-4 border-white">
                    <p className="text-sm uppercase tracking-[0.3em] opacity-70">Participante activo</p>
                    <h3 className="text-3xl font-black uppercase">{actorActivo.nombre}</h3>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-2 gap-6 bg-neutral-100 p-6 border-4 border-black">
                <div>
                  <label className="block text-lg font-black uppercase mb-2">Nombre Modificado</label>
                  <input 
                    type="text" 
                    value={registroActual.nombre}
                    onChange={(e) => handleRegistro('nombre', e.target.value)}
                    className="w-full p-4 border-4 border-black focus:bg-white outline-none text-xl font-bold bg-white"
                    placeholder="Ej: Felipe..."
                  />
                </div>
                <div>
                  <label className="block text-lg font-black uppercase mb-2">Arma</label>
                  <input 
                    type="text" 
                    value={registroActual.arma}
                    onChange={(e) => handleRegistro('arma', e.target.value)}
                    className="w-full p-4 border-4 border-black focus:bg-white outline-none text-xl font-bold bg-white"
                    placeholder="Ej: Pollo de goma..."
                  />
                </div>
              </div>
              <div className="bg-neutral-100 p-6 border-4 border-black">
                <label className="block text-lg font-black uppercase mb-2">Crimen</label>
                <textarea 
                  value={registroActual.crimen}
                  onChange={(e) => handleRegistro('crimen', e.target.value)}
                  className="w-full p-4 border-4 border-black focus:bg-white outline-none text-xl font-bold bg-white"
                  placeholder="Ej: Robarse las empanadas..."
                  rows="3"
                />
              </div>
            </div>
          )}
        </section>

      </div>
    </main>
  );
}
