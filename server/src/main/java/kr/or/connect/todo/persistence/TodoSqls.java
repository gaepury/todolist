package kr.or.connect.todo.persistence;

public class TodoSqls {
	static final String COUNT_TODO = "SELECT COUNT(*) FROM todo where completed = 0";
	static final String SELECT_BY_ID = "SELECT id, todo, completed, date FROM todo where id = :id";
	static final String SELECT_ALL = "SELECT id, todo, completed, date FROM todo ORDER BY id DESC"; //최신 할일 순으로 하기위해 내림차순으로 정렬
	static final String SELECT_ACTIVE = "SELECT id, todo, completed, date FROM todo where completed=0 ORDER BY id DESC"; //최신 할일 순으로 하기위해 내림차순으로 정렬
	static final String SELECT_COMPLETED = "SELECT id, todo, completed, date FROM todo where completed=1 ORDER BY id DESC"; //최신 할일 순으로 하기위해 내림차순으로 정렬
	static final String DELETE_BY_ID = "DELETE FROM todo WHERE id= :id";
	static final String DELETE_BY_COMPLETED = "DELETE FROM todo where completed = 1";
	static final String UPDATE = "UPDATE todo SET\n" + "todo = :todo," + "completed = :completed," + "date = :date\n" + "WHERE id = :id";

}
