# Five in a row


[Play now](https://skyying.github.io/five_in_a_row/index.html)


One day, i was watching a live stream of several front-end developers spent 10 mins each turn to build a game like this. After server rounds, it seems that they have built something. I then think it would be fun to try a bit myself. so I built this within a few hours as a challenge. And it did have fun😃😊.

## A few things worthy noted.
1. How to check if some is winning effectively
   - the trick is only check within certain range from the position a player place a ban.
2. What is the data-structure for this Gomoku
   - I use a 2d matrix, make coordinate check easier.
3. I use `ref.current` to keep track of this 2d matrix. make state management more easier by only need to update the matrix a user place a ban.


![image](./demo.png)
