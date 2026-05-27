'use client';
import Image from 'next/image';
import { useImproState } from '@/hooks/useImproState';
import { PARTICIPANTES } from '@/constants/participantes';

export default function DisplayPage() {
  const [estado] = useImproState();

  return (
    <main className="w-screen h-screen bg-black text-white flex flex-col items-center justify-start px-6 pt-20 pb-6 md:px-8 md:pt-24 md:pb-8 overflow-hidden font-mono relative">
      
      {/* HEADER: TITULO E IMAGEN */}
      <div className="absolute top-6 left-6 right-6 md:top-8 md:left-8 md:right-8 flex justify-between items-center z-50 pointer-events-none">
        <h2 className="text-3xl md:text-5xl font-black uppercase tracking-[0.3em] opacity-80 pl-2 md:pl-4">
          Impro
        </h2>
        <Image 
          src="/uao.png" 
          alt="UAO" 
          className="w-20 md:w-28 opacity-70 pointer-events-auto hover:opacity-100 transition-opacity"
          width={112}
          height={112}
        />
      </div>
      
      {/* ESCENA 1: EL CARTEL */}
      {estado.escena === 1 && (
        <div className="text-center w-full max-w-[1760px] animate-fade-in px-2 md:px-4 mt-2 md:mt-4">
          <h1 className="text-4xl md:text-6xl xl:text-7xl font-black mb-8 md:mb-10 tracking-widest uppercase border-b-8 border-white pb-3 md:pb-5">
            Se Busca
          </h1>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 justify-items-center">
            {[...PARTICIPANTES.filter(actor => estado.seleccionados.includes(actor.id)), ...PARTICIPANTES.filter(actor => !estado.seleccionados.includes(actor.id))].map(actor => {
              const isSelected = estado.seleccionados.includes(actor.id);
              return (
                <div 
                  key={actor.id} 
                  className={`relative p-5 md:p-6 flex flex-col items-center border-4 w-full max-w-[18rem] h-[19rem] md:h-[21rem] justify-between transition-all duration-500
                    ${isSelected 
                      ? 'bg-white text-black border-white shadow-[0_0_40px_rgba(255,255,255,0.8)] scale-110 z-10' 
                      : 'bg-black text-white border-dashed border-neutral-600 opacity-60'}`}
                >
                  {isSelected ? (
                    <>
                      <div className="relative w-full h-44 md:h-52 overflow-hidden border-4 border-black">
                        <Image
                          src={actor.foto}
                          alt={actor.nombre}
                          fill
                          sizes="256px"
                          className="object-cover"
                        />
                      </div>
                      <h2 className="text-xl md:text-2xl font-black uppercase tracking-wider text-center leading-tight">{actor.nombre}</h2>
                      <div className="absolute top-2 left-2 right-2 flex justify-between px-2 opacity-30">
                        <span className="text-xl">★</span>
                        <span className="text-xl">★</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="relative w-full h-44 md:h-52 overflow-hidden border-4 border-neutral-700 bg-neutral-900">
                        <div className="absolute inset-0 flex items-center justify-center text-8xl text-neutral-700">?</div>
                      </div>
                      <h2 className="text-xl font-bold uppercase tracking-widest text-neutral-600">Recompensa</h2>
                      <p className="text-neutral-500 font-mono mt-2">$10,000</p>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ESCENA 2: TRANSICIÓN BORIS (LA CÁRCEL) */}
      {estado.escena === 2 && (
        <div className="relative w-full h-full min-h-[80vh] border-[16px] border-white bg-black flex items-center justify-center overflow-hidden">
          {/* Barras de la cárcel generadas con CSS */}
          <div className="absolute inset-0 flex justify-evenly pointer-events-none z-10">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="w-12 h-full bg-white shadow-2xl"></div>
            ))}
          </div>
          <div className="z-20 bg-black px-20 py-12 border-8 border-white">
            <h1 className="text-9xl font-black text-white tracking-[0.3em] uppercase">Boris</h1>
          </div>
        </div>
      )}

      {/* ESCENA 3: FICHA POLICIAL */}
      {estado.escena === 3 && (() => {
        const registroActual = estado.actorEnPantalla && estado.registros[estado.actorEnPantalla]
          ? estado.registros[estado.actorEnPantalla]
          : { nombre: 'DESCONOCIDO', arma: 'DESCONOCIDA', crimen: 'SIN REGISTROS' };

        return (
          <div className="w-full max-w-[1720px] max-h-[calc(100vh-7rem)] bg-black border-8 border-white p-5 md:p-8 relative overflow-hidden">
            <div className="absolute top-4 left-4 border-b-2 border-white w-20"></div>
            <div className="absolute top-4 right-4 border-b-2 border-white w-20"></div>
            
            <h1 className="text-4xl md:text-5xl xl:text-6xl font-black text-center text-white mb-6 md:mb-8 uppercase tracking-[0.2em] border-y-4 border-white py-3 md:py-4">
              Archivo Confidencial
            </h1>
            
            <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] gap-5 xl:gap-8 items-start">
              <div className="space-y-5 md:space-y-6">
                <div className="relative">
                  <p className="text-white text-lg md:text-xl font-bold uppercase mb-2 bg-black inline-block px-2 absolute -top-3 left-4">Nombre del Sujeto</p>
                  <div className="text-3xl md:text-4xl font-bold text-white p-4 md:p-6 border-4 border-white min-h-[84px] flex items-center">
                    {registroActual.nombre || 'DESCONOCIDO'}
                  </div>
                </div>
                <div className="relative">
                  <p className="text-white text-lg md:text-xl font-bold uppercase mb-2 bg-black inline-block px-2 absolute -top-3 left-4">Foto del Sujeto</p>
                  <div className="relative w-full aspect-[4/3] max-h-[16rem] border-4 border-white overflow-hidden bg-neutral-900 p-2">
                    {estado.actorEnPantalla ? (
                      <Image
                        src={PARTICIPANTES.find(actor => actor.id === estado.actorEnPantalla)?.foto || '/uao.png'}
                        alt={registroActual.nombre || 'Sujeto'}
                        fill
                        sizes="(max-width: 1280px) 100vw, 42vw"
                        className="object-contain"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center text-6xl text-neutral-600">
                        SIN FOTO
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="relative h-full">
                <p className="text-white text-lg md:text-xl font-bold uppercase mb-2 bg-black inline-block px-2 absolute -top-3 left-4 z-10">Detalles del Crimen</p>
                <div className="text-xl md:text-2xl text-white p-3 md:p-4 border-4 border-white min-h-[12rem] xl:min-h-[16rem] leading-snug pt-8 break-words overflow-hidden">
                  {registroActual.crimen || 'SIN REGISTROS'}
                </div>
                <div className="relative mt-5">
                  <p className="text-white text-lg md:text-xl font-bold uppercase mb-2 bg-black inline-block px-2 absolute -top-3 left-4">Arma Homicida</p>
                  <div className="text-2xl md:text-3xl font-bold text-white p-3 md:p-4 border-4 border-white min-h-[72px] flex items-center">
                    {registroActual.arma || 'DESCONOCIDA'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })()}
    </main>
  );
}
