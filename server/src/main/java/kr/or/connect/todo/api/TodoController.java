package kr.or.connect.todo.api;

import java.util.Collection;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.service.TodoService;

@RestController
@RequestMapping("/api/todos")
public class TodoController {
	private final TodoService service;
	private final Logger log = LoggerFactory.getLogger(TodoController.class);

	@Autowired
	public TodoController(TodoService service) {
		this.service = service;
	}

	// 할일 갯수
	@GetMapping("/count")
	Integer countList() {
		return service.countTodo();
	}

	// 모든 할일
	@GetMapping
	Collection<Todo> readList() {
		return service.findAll();
	}

	// 진행중인 할일
	@GetMapping("/active")
	Collection<Todo> readListActive() {
		return service.findActive();
	}

	// 완료된 일
	@GetMapping("/completed")
	Collection<Todo> readListCompleted() {
		return service.findCompleted();
	}

	@GetMapping("/{id}")
	Todo read(@PathVariable Integer id) {
		return service.findById(id);
	}

	// 할일 등록
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	Todo create(@RequestBody Todo todo) {

		return service.create(todo);
	}

	@PutMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void update(@PathVariable Integer id, @RequestBody Todo todo) {
		todo.setId(id);
		service.update(todo);
	}

	// 버튼 클릭시 할일 삭제
	@DeleteMapping("/{id}")
	@ResponseStatus(HttpStatus.NO_CONTENT)
	void delete(@PathVariable Integer id) {
		service.delete(id);
	}

	// 완료된 일 삭제
	@DeleteMapping
	Integer deleteByCompleted() {
		return service.deleteByCompleted();
	}

}
