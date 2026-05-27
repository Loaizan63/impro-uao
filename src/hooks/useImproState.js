'use client';
import { useState, useEffect, useRef } from 'react';
import { ESTADO_INICIAL } from '../constants/participantes';

export function useImproState(isController = false) {
  const [estado, setEstado] = useState(ESTADO_INICIAL);
  const canalRef = useRef(null);

  useEffect(() => {
    const bc = new BroadcastChannel('impro_uao_channel');
    canalRef.current = bc;

    bc.onmessage = (evento) => {
      setEstado(evento.data);
    };

    return () => {
      canalRef.current = null;
      bc.close();
    };
  }, []);

  const actualizarEstado = (nuevoEstado) => {
    const estadoActualizado = { ...estado, ...nuevoEstado };
    setEstado(estadoActualizado);
    if (isController && canalRef.current) {
      canalRef.current.postMessage(estadoActualizado);
    }
  };

  return [estado, actualizarEstado];
}
