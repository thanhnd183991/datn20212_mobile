package com.it4409.socialnetwork.entities;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import com.it4409.socialnetwork.dto.UserDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Entity
@Data
@Table(name = "comment")
@AllArgsConstructor
@NoArgsConstructor
public class Comment {
    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "post_id")
    private Post post;

    @ManyToOne
    @JoinColumn(name = "user_id")
    private User user;

    @Column(name = "content")
    private String content;

    @Column(name = "posting_date", insertable = false)
    private Date postingDate;

    public static class ListSerializer extends JsonSerializer<List<Comment>> {
        @Override
        public void serialize(List<Comment> comments, JsonGenerator jsonGenerator, SerializerProvider serializerProvider) throws IOException {
            List<ShortenJson> result = new ArrayList<>();
            comments.forEach(comment -> result.add(ShortenJson.builder()
                    .id(comment.getId())
                    .content(comment.getContent())
                    .user(new UserDTO(comment.getUser()))
                    .postingDate(comment.getPostingDate())
                    .build()));
            jsonGenerator.writeObject(result);
        }
    }

    @Data
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class ShortenJson {
        private Integer id;
        private UserDTO user;
        private String content;
        private Date postingDate;
    }
}
