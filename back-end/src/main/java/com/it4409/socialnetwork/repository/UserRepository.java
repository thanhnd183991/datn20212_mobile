package com.it4409.socialnetwork.repository;

import com.it4409.socialnetwork.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    boolean existsByUsernameAndPassword(String username, String password);
    boolean existsByUsername(String username);
    User findByUsername(String username);
    User findUserById(Integer id);

    @Query("SELECT u FROM User u WHERE u.username like %?1% or u.name like %?2%")
    List<User> findUser(String param1, String param2);

}
