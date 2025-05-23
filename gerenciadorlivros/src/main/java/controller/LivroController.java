package com.biblioteca.gerenciadorlivros.controller;

import com.biblioteca.gerenciadorlivros.model.Livro;
import com.biblioteca.gerenciadorlivros.service.BibliotecaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/livros")
@CrossOrigin(origins = "http://localhost:5173") // libera o frontend React no Vite
public class LivroController {

    @Autowired
    private BibliotecaService service;

    @GetMapping
    public List<Livro> listarLivros() {
        return service.listarTodos();
    }

    @PostMapping
    public ResponseEntity<?> adicionarLivro(@RequestBody Livro livro) {
        if (livro.getTitulo() == null || livro.getTitulo().isBlank() || livro.getAutor() == null || livro.getAutor().isBlank()) {
            return ResponseEntity.badRequest().body(new MensagemResponse("Por favor, preencha todos os campos obrigatórios."));
        }

        String resposta = service.adicionarLivro(livro.getTitulo(), livro.getAutor());

        if (resposta.contains("sucesso")) {
            return ResponseEntity.ok(new MensagemResponse(resposta));
        } else {
            return ResponseEntity.badRequest().body(new MensagemResponse(resposta));
        }
    }

    @DeleteMapping("/{titulo}")
    public ResponseEntity<?> excluirLivro(@PathVariable String titulo) {
        String resposta = service.excluirLivroPorTitulo(titulo);
        if (resposta.contains("sucesso")) {
            return ResponseEntity.ok(new MensagemResponse(resposta));
        } else {
            return ResponseEntity.badRequest().body(new MensagemResponse(resposta));
        }
    }

    // Classe simples para resposta JSON com mensagem
    private static class MensagemResponse {
        private String message;

        public MensagemResponse(String message) { this.message = message; }
        public String getMessage() { return message; }
        public void setMessage(String message) { this.message = message; }
    }
}
