package com.project.todoserver.service;

import com.project.todoserver.domain.Todo;
import com.project.todoserver.dto.TodoDto;
import com.project.todoserver.repository.TodoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TodoService {

    private final TodoRepository todoRepository;

    @Transactional
    public List<TodoDto.Response> findAllTodos() {
        List<Todo> todos = todoRepository.findAll();

        List<TodoDto.Response> responseDtoList = todos.stream().map(e -> TodoDto.Response.builder()
                .id(e.getId())
                .content(e.getContent())
                .checked(e.getChecked())
                .createdAt(e.getCreatedAt())
                .modifiedAt(e.getModifiedAt())
                .build()).collect(Collectors.toList());

        return responseDtoList;
    }

    @Transactional
    public Long createTodo(TodoDto.Request request) {
        Todo todo = Todo.builder()
                .content(request.getContent())
                .checked(request.getChecked())
                .build();
        todoRepository.save(todo);

        return todo.getId();
    }

    @Transactional
    public TodoDto.Response updateTodo(Long todo_id, TodoDto.Request request) {
        Todo todo = todoRepository.findById(todo_id).orElseThrow(() -> new IllegalArgumentException("존재하지 않음"));

        todo.update(request);
        todoRepository.save(todo);

        return TodoDto.Response.of(todo);
    }

    @Transactional
    public void deleteTodo(Long todo_id) {
        Todo todo = todoRepository.findById(todo_id).orElseThrow(() -> new IllegalArgumentException("존재하지 않음"));
        todoRepository.delete(todo);
    }
}
