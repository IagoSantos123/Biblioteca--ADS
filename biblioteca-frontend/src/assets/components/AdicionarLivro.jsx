import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';

export default function AdicionarLivro({ onAdicionar, onCancelar }) {
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [erro, setErro] = useState('');

  const handleAdicionar = () => {
    if (!titulo.trim() || !autor.trim()) {
      setErro('Por favor, preencha todos os campos obrigatórios.');
      return;
    }
    setErro('');
    onAdicionar({ titulo: titulo.trim(), autor: autor.trim() });
    setTitulo('');
    setAutor('');
  };

  return (
    <div className="p-fluid">
      <div className="p-field">
        <label htmlFor="titulo">Título</label>
        <InputText id="titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
      </div>
      <div className="p-field">
        <label htmlFor="autor">Autor</label>
        <InputText id="autor" value={autor} onChange={(e) => setAutor(e.target.value)} />
      </div>

      {erro && <small className="p-error">{erro}</small>}

      <div className="p-mt-3 p-d-flex p-jc-end">
        <Button label="Cancelar" className="p-button-text p-mr-2" onClick={onCancelar} />
        <Button label="Adicionar" onClick={handleAdicionar} />
      </div>
    </div>
  );
}
