package klu.ex8.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import klu.ex8.model.Student;

public interface StudentRepo extends JpaRepository<Student,Integer>{
    
}
