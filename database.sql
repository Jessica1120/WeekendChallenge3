CREATE TABLE to_do (
	id serial PRIMARY KEY,
	task varchar (200),
	done boolean DEFAULT false);

INSERT INTO to_do (task) VALUES ('Create To Do App');