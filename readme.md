
after cloning the project 



then 
1-go the project folder and run npm install 
2-create .env and create in it your credentails (you have a .env example)
3-after that go to your postegresql
run those queries 
CREATE DATABASE game_management;

CREATE TABLE games (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) NOT NULL CHECK (status IN ('active', 'terminated'))
);
4-npm start
5-in vs code use live server extension to dipslay the client side 
6-when the client side is displayed change the screen to responsive design 
7-you are free to test it

N.B:The terminate and delete Buttons works only on responsive mode