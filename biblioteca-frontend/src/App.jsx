import React, { useState, useEffect, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';

import AdicionarLivro from './assets/components/AdicionarLivro';
import ListaLivros from './assets/components/ListaLivros';
import livroService from './services/livroService';
{/* Cabeçalho personalizado */}
import AdsLogo from './assets/adslogo.png';


import './App.css'; 

export default function App() {
  const [livros, setLivros] = useState([]);
  const [dialogVisible, setDialogVisible] = useState(false);
  const [dialogAdicionarVisible, setDialogAdicionarVisible] = useState(false);

  const [buscaTitulo, setBuscaTitulo] = useState('');
  const [livroBuscado, setLivroBuscado] = useState(null);
  const [dialogBuscaVisible, setDialogBuscaVisible] = useState(false);

  const toast = useRef(null);

  useEffect(() => {
    carregarLivros();
  }, []);

  const carregarLivros = async () => {
    const data = await livroService.listarLivros();
    setLivros(data);
  };

  const adicionarLivro = async (livro) => {
    const resposta = await livroService.adicionarLivro(livro);
    if (resposta.sucesso) {
      toast.current.show({ severity: 'success', summary: 'Sucesso', detail: resposta.mensagem, life: 3000 });
      carregarLivros();
      setDialogAdicionarVisible(false);
    } else {
      toast.current.show({ severity: 'error', summary: 'Erro', detail: resposta.mensagem, life: 3000 });
    }
  };

  const excluirLivro = async (titulo) => {
    const resposta = await livroService.excluirLivro(titulo);
    if (resposta.sucesso) {
      toast.current.show({ severity: 'success', summary: 'Sucesso', detail: resposta.mensagem, life: 3000 });
      carregarLivros();
    } else {
      toast.current.show({ severity: 'error', summary: 'Erro', detail: resposta.mensagem, life: 3000 });
    }
  };

  const pesquisarLivro = () => {
    if (!buscaTitulo.trim()) {
      toast.current.show({ severity: 'warn', summary: 'Atenção', detail: 'Digite um título para buscar', life: 3000 });
      return;
    }
    const livro = livros.find(l => l.titulo.toLowerCase() === buscaTitulo.trim().toLowerCase());
    if (livro) {
      setLivroBuscado(livro);
    } else {
      setLivroBuscado(null);
      toast.current.show({ severity: 'warn', summary: 'Não encontrado', detail: 'Livro não encontrado.', life: 3000 });
    }
    setDialogBuscaVisible(true);
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo-left">
          <img src={AdsLogo} alt="Logo Universidade" className="logo" />
        </div>

        <div className="header-text">
          <h1>Sistema de Gerenciamento de Biblioteca</h1>
          <p><strong>Curso:</strong> Análise e Desenvolvimento de Sistemas</p>
          <p><strong>Alunos:</strong> Iago E. Santos Lucena, Gustavo de Paula e Daniel</p>
          <p><strong>Disciplina:</strong> Linguagem Orientada a Objetos</p>
        </div>


      </header>


      <main className="app-main">
        <Toast ref={toast} />

        <div className="top-controls">
        <Button
            label="Adicionar Livro"
            icon="pi pi-plus"
            onClick={() => setDialogAdicionarVisible(true)}
            className="p-button-rounded p-button-info"
          />

          <div className="p-inputgroup search-container">
            <input
              type="text"
              placeholder="Pesquisar livro por título"
              className="p-inputtext p-component"
              value={buscaTitulo}
              onChange={(e) => setBuscaTitulo(e.target.value)}
            />
            <Button icon="pi pi-search" onClick={pesquisarLivro} className="p-button-info" />
          </div>
        </div>


      <ListaLivros livros={livros} onExcluir={excluirLivro} />

        {/* Dialog para adicionar livro */}
        <Dialog
          header="Adicionar Novo Livro"
          visible={dialogAdicionarVisible}
          style={{ width: '450px' }}
          modal
          onHide={() => setDialogAdicionarVisible(false)}
        >
          <AdicionarLivro
            onAdicionar={adicionarLivro}
            onCancelar={() => setDialogAdicionarVisible(false)}
          />
        </Dialog>

        {/* Dialog para resultado da busca */}
        <Dialog
          header="Resultado da Pesquisa"
          visible={dialogBuscaVisible}
          style={{ width: '350px' }}
          modal
          onHide={() => setDialogBuscaVisible(false)}
        >
          {livroBuscado ? (
            <div>
              <p><strong>Título:</strong> {livroBuscado.titulo}</p>
              <p><strong>Autor:</strong> {livroBuscado.autor}</p>
            </div>
          ) : (
            <p>Livro não encontrado.</p>
          )}
        </Dialog>
      </main>

      <footer className="app-footer">
        <p>© 2025 ADS - Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}
