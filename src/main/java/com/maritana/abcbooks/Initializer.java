package com.maritana.abcbooks;

import java.time.Instant;
import java.util.Collections;
import java.util.stream.Stream;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.maritana.abcbooks.model.*;

@Component
class Initializer implements CommandLineRunner {

    private final BookRepository repository;

    public Initializer(BookRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) {
        repository.save(new Book("Effective Java", "Joshua Bloch", "978-0134685991"));
        repository.save(new Book("Java 9 for programmers", "Harvey Deitel", "978-0134777566"));
        repository.save(new Book("Core Java SE 9", "Cay S. Horstmann", "978-0134654726"));
        repository.save(new Book("Clean code", "Robert Cecil Martin", "978-0134853774"));

        Book dcomment = repository.findByTitle("Effective Java");
        Comment e = Comment.builder().comment("Really good book!")
                .date(Instant.parse("2012-12-12T18:00:00.000Z"))
                .build();
        dcomment.setComments(Collections.singleton(e));
        repository.save(dcomment);

        repository.findAll().forEach(System.out::println);
    }
}

//        public class Initializer {
//}
