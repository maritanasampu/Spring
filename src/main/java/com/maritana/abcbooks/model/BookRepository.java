package com.maritana.abcbooks.model;

import org.springframework.data.jpa.repository.JpaRepository;


public interface BookRepository extends JpaRepository<Book, Long> {
    Book findByTitle(String title);
}
