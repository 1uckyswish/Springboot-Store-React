package com.noel.shoppi.repository;

import com.noel.shoppi.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

}

