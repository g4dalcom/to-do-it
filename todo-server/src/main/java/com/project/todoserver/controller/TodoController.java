package com.project.todoserver.controller;

import com.project.todoserver.dto.TodoDto;
import com.project.todoserver.service.TodoService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@Slf4j
@RequiredArgsConstructor
public class TodoController {

    private final TodoService todoService;

    @CrossOrigin(originPatterns = "*")
    @PostMapping("/api/todos")
    public ResponseEntity<Void> createTodo(@RequestBody TodoDto.Request request) {
        Long todo_id = todoService.createTodo(request);
        log.info("todo_id = {}", todo_id);

        return ResponseEntity.created(URI.create("/" + todo_id)).build();
    }

    @CrossOrigin(originPatterns = "*")
    @GetMapping("/api/todos")
    public ResponseEntity<List<TodoDto.Response>> findAllTodos() {
        log.info("todos count = {}", todoService.findAllTodos().size());
        return ResponseEntity.ok().body(todoService.findAllTodos());
    }

    @CrossOrigin(originPatterns = "*")
    @PutMapping("/api/todos/{todo_id}")
    public ResponseEntity<TodoDto.Response> updateTodo(@PathVariable Long todo_id,
                                                       @RequestBody TodoDto.Request request) {
        log.info("todo_id = {}", todo_id);
        return ResponseEntity.ok().body(todoService.updateTodo(todo_id, request));
    }

    @CrossOrigin(originPatterns = "*")
    @DeleteMapping("/api/todos/{todo_id}")
    public ResponseEntity<Void> deleteTodo(@PathVariable Long todo_id) {
        log.info("todo_id = {}", todo_id);
        todoService.deleteTodo(todo_id);

        return ResponseEntity.noContent().build();
    }
}
