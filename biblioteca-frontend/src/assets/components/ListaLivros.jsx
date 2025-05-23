import React from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';

export default function ListaLivros({ livros, onExcluir }) {
  const confirmarExclusao = (livro) => {
    if (window.confirm(`Deseja realmente excluir o livro "${livro.titulo}"?`)) {
      onExcluir(livro.titulo);
    }
  };

  return (
    <>
      {livros.length === 0 ? (
        <p>Nenhum livro cadastrado.</p>
      ) : (
        <DataTable value={livros} paginator rows={5} responsiveLayout="scroll" stripedRows>
          <Column field="titulo" header="Título" />
          <Column field="autor" header="Autor" />
          <Column
            header="Ações"
            body={(rowData) => (
              <Button icon="pi pi-trash" className="p-button-danger" onClick={() => confirmarExclusao(rowData)} />
            )}
            style={{ width: '8rem' }}
          />
        </DataTable>
      )}
    </>
  );
}
