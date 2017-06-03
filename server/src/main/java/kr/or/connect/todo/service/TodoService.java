package kr.or.connect.todo.service;

import java.util.Collection;

import org.springframework.stereotype.Service;

import kr.or.connect.todo.domain.Todo;
import kr.or.connect.todo.persistence.TodoDao;

@Service
public class TodoService {
	private TodoDao dao;

	public TodoService(TodoDao dao) {
		this.dao = dao;
	}

	public Todo findById(Integer id) {
		return dao.selectById(id);
	}

	public Collection<Todo> findAll() {
		return dao.selectAll();
	}

	public Todo create(Todo Todo) {
		Integer id = dao.insert(Todo);
		Todo.setId(id);
		return Todo;
	}

	public boolean update(Todo Todo) {
		int affected = dao.update(Todo);
		return affected == 1;
	}

	public boolean delete(Integer id) {
		int affected = dao.deleteById(id);
		return affected == 1;
	}
//	private ConcurrentMap<Integer, Todo> repo = new ConcurrentHashMap<>();
//	private AtomicInteger maxId = new AtomicInteger(0);
//	
////	public Todo findById(Integer id) {
////		return new Todo(1, "Java 이렇게 공부하자", "김자바", 300);
////	}
////
////	public Collection<Todo> findAll() {
////		return Arrays.asList(
////			new Todo(1, "네이버 네비 좋아요", "김광근", 300),
////			new Todo(2, "HTTP 완벽 이해하기", "김명호", 300)
////		);
////	}
//	public Todo findById(Integer id) {
//		return repo.get(id);
//	}
//
//	public Collection<Todo> findAll() {
//		return repo.values();
//	}
//
//	public Todo create(Todo Todo) {
//		Integer id = maxId.addAndGet(1);
//		Todo.setId(id);
//		repo.put(id, Todo);
//		return Todo;
//	}
//	public boolean update(Todo Todo) {
//		Todo old = repo.put(Todo.getId(), Todo);
//		return old != null;
//	}
//	public boolean delete(Integer id) {
//		Todo old = repo.remove(id);
//		return old != null;
//	}
}
