package com.biblioteca.gerenciadorlivros;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class GerenciadorLivrosApplication {

    public static void main(String[] args) {
        SpringApplication.run(GerenciadorLivrosApplication.class, args);
        // menu.exibir(); -> remover essa linha, não usamos mais interface console
    }
}
