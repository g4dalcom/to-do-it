package com.project.todoserver.domain;

import com.project.todoserver.dto.TodoDto;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Todo extends BaseEntity {

    @Id
    @Column(name = "todo_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String content;

    @Column
    private int checked = 0;


    @Builder
    public Todo(final Long id, final String content, final int checked) {
        this.id = id;
        this.content = content;
        this.checked = checked;
    }

    public void update(TodoDto.Request request) {
        this.content = request.getContent();
        this.checked = request.getChecked();
    }
}
