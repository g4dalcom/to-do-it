package com.project.todoserver.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.project.todoserver.domain.Todo;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDateTime;

public class TodoDto {

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Request {
        private String content;
        private int checked;

        @Builder
        public Request(final String content, final int checked) {
            this.content = content;
            this.checked = checked;
        }

        // DB에 저장하기 위한 DTO -> Entity 변환 메소드
        public Todo toEntity() {
            return Todo.builder()
                    .content(content)
                    .checked(checked)
                    .build();
        }
    }

    @Getter
    @NoArgsConstructor(access = AccessLevel.PROTECTED)
    public static class Response {
        private Long id;
        private String content;
        private int checked;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime createdAt;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime modifiedAt;

        @Builder
        public Response(final Long id, final String content, final int checked, final LocalDateTime createdAt, final LocalDateTime modifiedAt) {
            this.id = id;
            this.content = content;
            this.checked = checked;
            this.createdAt = createdAt;
            this.modifiedAt = modifiedAt;
        }

        // DB 조회를 위한 Entity -> DTO 변환 메소드
        public static TodoDto.Response of(Todo todo) {
            return Response.builder()
                    .id(todo.getId())
                    .content(todo.getContent())
                    .checked(todo.getChecked())
                    .createdAt(todo.getCreatedAt())
                    .modifiedAt(todo.getModifiedAt())
                    .build();
        }
    }

}
