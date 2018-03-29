## Jeopardy App

### demo 
[jeopardy game demo](https://veecc.github.io/jeopardyApp/).

### Game rules
```markdown
- Two teams
- Decide which team goes first before entering team name
- Enter team names with the decided order
- Pick questions from game board, once question is revealed, the team has 45 seconds to answer
- If answer is correct, the team earns points
- If answer is wrong or time's up, no penalty, yet aonther team can choose to steal the question of pass
- If another team chooses to steal the question, the team has 15 seconds to answer the question
- If answer is wrong or time's up, points will be taken (this is the only scenerio that points will be taken)
- Please note, there's no "GO BACK" option when stealing
- Team score can't be negative
- No implementation for now to deal with a tie game. 
```

### Screenshots
![Home page](/assets/screenshots/home.PNG)
![gameboard](/assets/screenshots/gameboard.PNG)
![game](/assets/screenshots/game.PNG)

### Credits
1. Background Image 1 - Photo by Samuel Scrimshaw on Unsplash
2. Background Image 2 - Photo by rawpixel.com on Unsplash
3. 6 sample quesitions are from https://www.christianity.com/trivia/jeopardy/

### How to create your own game
```markdown
1. Find data folder, there are several sample category files.
2. Replace category, label, question, answers and even points with your own content.
3. Long category names and long answers are not recommend. You'll be able to fit in more character if your screen size is larger. 
4. Each category is in one file, please don't change the file name, otherwise you'll have to change the code
5. Find settings.json file in the same folder, please keep all the double quotes when changing values. 
6. For games, please fill in the digit index of your own category files. For example, if you have files "category1.json, category5.json, ..., category9.json" then fill in the array with [1, 5, ... , 9], maximum is 6 categories.
7. For title, it is shown at the first page of this game. 
8. team1 and team2 are default team names, can be changed in the game.
9. regularTime, unit is second, is the time the team picks the question has to answer the question.
10. stealingTime, unit is second, is the time the team steals a question has to anwer the question.
```
### For myself :p
- [GitHub Flavored Markdown](https://guides.github.com/features/mastering-markdown/).