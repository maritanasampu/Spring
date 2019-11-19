package com.maritana.abcbooks.model;

import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Data
@NoArgsConstructor
@RequiredArgsConstructor
@Entity
@Table(name = "books")

public class Book {

    @Id
    @GeneratedValue
    private Long id;
    @NonNull
    private String title;
    private String author;
    private String isbn13;

    @OneToMany(fetch = FetchType.EAGER, cascade = CascadeType.ALL)
    private Set<Comment> comments;

    public Book(String title, String author, String isbn13) {
        this.title = title;
        this.author = author;
        this.isbn13 = isbn13;
    }

}
