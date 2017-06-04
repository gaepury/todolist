package kr.or.connect.todo.persistence;

import static org.hamcrest.CoreMatchers.*;
import static org.junit.Assert.*;

import java.util.Date;
import java.util.List;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.transaction.annotation.Transactional;

import kr.or.connect.todo.domain.Todo;

@RunWith(SpringRunner.class)
@SpringBootTest
@Transactional
public class TodoDaoTest { //쿼리를 날리기 위한 객체.
	@Autowired
	private TodoDao dao;

	@Test
	public void shouldCount() {
		int count = dao.countTodos();
		System.out.println(count);
	}
	@Test
	public void shouldInsertAndSelect() {
		// given
		Todo Todo = new Todo("spring 공부", 0, new Date());

		// when
		Integer id = dao.insert(Todo);

		// then
		Todo selected = dao.selectById(id);
		System.out.println(selected);
		assertThat(selected.getTodo(), is("spring 공부"));
	}
	@Test
	public void shouldDelete() {
		// given
		Todo Todo = new Todo("node 공부", 0, new Date());
		Integer id = dao.insert(Todo);

		// when
		int affected = dao.deleteById(id);

		// Then
		assertThat(affected, is(1));
	}
	@Test
	public void shouldUpdate() {
		// Given
		Todo Todo = new Todo("jquery 공부", 0, new Date());
		Integer id = dao.insert(Todo);

		// When
		Todo.setId(id);
		Todo.setCompleted(1);
		int affected = dao.update(Todo);

		// Then
		assertThat(affected, is(1));
		Todo updated = dao.selectById(id);
		assertThat(updated.getTodo(), is("jquery 공부"));
	}
	@Test
	public void shouldSelectAll() {
		List<Todo> allTodos = dao.selectAll();
		assertThat(allTodos, is(notNullValue()));
	}
}
