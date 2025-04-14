package klu.ex8.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import klu.ex8.model.Student;
import klu.ex8.model.StudentManager;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api")
public class StudentController {

    @Autowired
    private StudentManager studentManager;

    @PostMapping("/student")
    public String insertStudent(@RequestBody Student student) {
        return studentManager.insertData(student);
    }

    @PutMapping("/student")
    public String updateStudent(@RequestBody Student student) {
        return studentManager.updateData(student);
    }

    @DeleteMapping("/student/{id}")
    public String deleteStudent(@PathVariable("id") int id) {
        return studentManager.deleteData(id);
    }

    @GetMapping("/students")
    public List<Student> retrieveStudents() {
        return studentManager.retrieveData();
    }
}
