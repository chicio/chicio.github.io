---
title: "Advent of TypeScript 2023: Tic tac toe (Day 21)"
description: "Tic tac toe, another classical kata games you can find at a coding dojo. A game that is simple to implement with 
functions, variables etc. becomes a real challenge when you try to implement it using only types."
date: 2024-01-04
image: ../images/posts/advent-of-typescript-tic-tac-toe.jpg
tags: [typescript, advent of typescript 2023]
comments: true
math: false
authors: [fabrizio_duroni]
---

*Tic tac toe, another classical kata game you can find at a coding dojo. A game that is easy to implement with 
functions, variables etc. becomes a real challenge when you try to implement it using only types.*

---

This is the second of the four challenges I liked the most from "Advent Of TypeScript 2023" by [TypeHero]
(https://typehero.dev). 
Check out the other challenges I liked [here](/2023/12/29/advent-of-typescript-2023-favourite-challenges/ "advent of typescript 2023 challenges").

#### The problem

"Tic tac toe" is a classical game used at coding dojo.
Let's check the rule briefly explained by the guy from TypeHero:

>Tic-Tac-Toe is a two-player game where players alternate marking ❌s and ⭕s in a 3x3 grid, aiming to get three in a row.
>
>fun fact: Did you know that tic tac toe is widely considered to be the first computer video game ever created?! 
> That's right! A S Douglas implemented it all the way back in 1952, the same year as the coronation of Queen 
> Elizabeth II.  
>Solving Tic Tac Toe: 
>Your goal for this challenge is to use TypeScript types to encode the game logic of Tic Tac Toe. Eventually, every 
> game will end with one of the players winning or a draw.

#### Implementation

The exercise gave me some data structure to use as the basis of my development.
They looked like the domain data structures of tic tac toe game.
It is interesting to see that the guy at type hero defined also some types for the position on board as string, not 
as coordinates.

```typescript

type TicTacToeChip = '❌' | '⭕';
type TicTacToeEndState = '❌ Won' | '⭕ Won' | 'Draw';
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = '  '
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = 'top' | 'middle' | 'bottom';
type TicTacToeXPositions = 'left' | 'center' | 'right';
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTactToeBoard;
  state: TicTacToeState;
};

type EmptyBoard = [
  ['  ', '  ', '  '],
  ['  ', '  ', '  '],
  ['  ', '  ', '  ']
];

type NewGame = {
  board: EmptyBoard;
  state: '❌';
};
```

Why did they define the position as strings? Because the input of the `TicTacToe` type I had to implement receive 
in input two parameters:
* the current game, `TicTacToeGame`, composed by a `board` and a `state`, that described the next move or the end of 
  the game (who won or draw)
* the next move to be applied (based on the `state` that describe also the next chip to be calculated)
Let's take a look also at the test cases provided by TypeHero to check if the implementation is correct, that show 
  the configuration I just described.

```typescript
type test_move1_actual = TicTacToe<NewGame, 'top-center'>;

type test_move2_actual = TicTacToe<test_move1_actual, 'top-left'>;
/*
type test_move2_expected = {
  board: [
    ['⭕', '❌', '  '], 
    ['  ', '  ', '  '], 
    ['  ', '  ', '  ']];
  state: '❌';
}
*/

type test_move3_actual = TicTacToe<test_move2_actual, 'middle-center'>;
/*
type test_move3_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '  ', '❌', '  ' ],
    [ '  ', '  ', '  ' ]
  ];
  state: '⭕';
};
*/

type test_move4_actual = TicTacToe<test_move3_actual, 'bottom-left'>;
/*
type test_move4_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '  ', '❌', '  ' ],
    [ '⭕', '  ', '  ' ]
  ];
  state: '❌';
};
*/

type test_x_win_actual = TicTacToe<test_move4_actual, 'bottom-center'>;
/*
type test_x_win_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '  ', '❌', '  ' ],
    [ '⭕', '❌', '  ' ]
  ];
  state: '❌ Won';
};
*/

type type_move5_actual = TicTacToe<test_move4_actual, 'bottom-right'>;
/*
type type_move5_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '  ', '❌', '  ' ],
    [ '⭕', '  ', '❌' ]
  ];
  state: '⭕';
};
*/

type test_invalid_actual = TicTacToe<test_move1_actual, 'top-center'>;
/*
type test_invalid_expected = {
  board: [
    [ '  ', '❌', '  ' ],
    [ '  ', '  ', '  ' ],
    [ '  ', '  ', '  ' ]
  ];
  state: '⭕';
};
*/

type test_before_draw = {
  board: [
    ['⭕', '❌', '⭕'],
    ['⭕', '❌', '❌'],
    ['❌', '⭕', '  ']];
  state: '⭕';
}
type test_draw_actual = TicTacToe<test_before_draw, 'bottom-right'>;
/*
type test_draw_expected = {
  board: [
    ['⭕', '❌', '⭕'], 
    ['⭕', '❌', '❌'], 
    ['❌', '⭕', '⭕']];
  state: 'Draw';
}
*/
```

The first thing I needed to complete the challege was a type to translate the next position, received as a string 
combination of `TicTacToeXPositions` and `TicTacToeYPositions`, in a position on the 3x3 board.
Remember I can use only types, so in this case I needed to implement a string equal check to extract the 
corresponding position on the board for a specific X and Y position (described as words).  
Well, as I showed already in the [previous article](/2023/12/30/advent-of-typescript-2023-rock-paper-scissors/), I 
leveraged also in this case the power of conditional type.
In this specific case I used also the `infer` keyword, that allowed me to access the parts of the move string and 
translate them using two support maps, `XFrom` and `YFrom`.  
As you can see from the code below, the TypeScript type system is so powerful that it is basically able to split a 
string that matches a specific pattern and gave me access to these parts.
In case the move is invalid (e.g., a `top-center` move), I return undefined: this let me check if the move is valid 
before doing everything else.

```typescript

type XFrom<TicTacToeXPosition extends TicTacToeXPositions> = {
    'left': 0,
    'center': 1,
    'right': 2
}[TicTacToeXPosition];

type YFrom<TicTacToeXPosition extends TicTacToeYPositions> = {
    'top': 0,
    'middle': 1,
    'bottom': 2
}[TicTacToeXPosition];

type PositionOnBoardFrom<Move extends TicTacToePositions> = 
    Move extends `${infer TicTacToeYPosition extends TicTacToeYPositions}-${infer TicTacToeXPosition extends TicTacToeXPositions}` 
        ? [YFrom<TicTacToeYPosition>, XFrom<TicTacToeXPosition>]
        : undefined;
```

As I mentioned just a few lines above, I needed to check if the new move is valid. For this goal I created a 
`IsValidMove` type: it will return `true` if the next position exists on the board, and it is not occupied by 
another chip.
In all the other cases, it will return false.

```typescript
type IsValidMove<CurrentTicTacToeGame extends TicTacToeGame, NextMovePosition extends [number, number] | undefined> =
  NextMovePosition extends [number, number]
    ? CurrentTicTacToeGame['board'][NextMovePosition[0]][NextMovePosition[1]] extends TicTacToeChip
      ? false
      : true
    : false
```

At this point, I was ready to define the types needed to update the board (in case the move is valid).
To do this, I created a `UpdateBoard` type.
It uses [mapped types](https://www.typescriptlang.org/docs/handbook/2/mapped-types.html) to loop through the board 
and add the chip only to the cell that should be updated.
To do this, I created a support `UpdateColumn`.
In this way:
* in `UpdateBoard` I loop through the rows until I found the one that correspond to the row contained in 
  `NextMovePosition[0]` 
* in `UpdateColumn` I update the cell corresponding to the column contained in `NextMovePosition[1]`

```typescript
type UpdateColumn<Row extends TicTacToeCell[], NextChip extends TicTacToeChip, ColumnPosition extends number> = [...{
  [Index in keyof Row]:
  Index extends `${ColumnPosition}`
    ? Row[Index] extends TicTacToeEmptyCell
      ? NextChip
      : Row[Index]
    : Row[Index]
}];

type UpdateBoard<CurrentBoard extends TicTactToeBoard, NextMovePosition extends [number, number], NextChip extends TicTacToeChip> =
  NextMovePosition extends [number, number]
    ? [...{
      [Index in keyof CurrentBoard]:
      Index extends `${NextMovePosition[0]}`
        ? UpdateColumn<CurrentBoard[Index], NextChip, NextMovePosition[1]>
        : CurrentBoard[Index]
    }]
    : CurrentBoard;
```

The "last piece of the puzzle" needed to have a fully functioning tic tac toe implementation is a type that update 
the state of the game.
It should be able to:
* determine if the game is in a final state, given the updated board. That means check if one of the players won.
* if not, determine if we are in a draw state or not and if needed, update the chip to the next one.
For the first part I created a `IsSomeoneWinning` type.
  Its responsibility is to check for each of the chips if it won the game.
  It does this by scanning rows, columns and diagonals to check if there is a sequence of three cells with the same 
  chip (the one we are checking for winning or not).
  In all the cases for which there is no win, this type returns `never`.
  So to check the result of this type, I just needed to check if it `extends never`, meaning that no player won.
  In all the other cases, it will return a string described which chip won the game.  

```typescript
type RowWinningFor<Chip extends TicTacToeChip, Row extends string[]> =  Row extends Chip[] ? `${Chip} Won` : never;

type ColumnWinningFor<Chip extends TicTacToeChip, ColumnIndex extends number, CurrentBoard extends TicTactToeBoard> = {
  [Index in keyof CurrentBoard]: CurrentBoard[Index][ColumnIndex]
} extends Chip[] ? `${Chip} Won` : never;

type LeftDiagonalWinning<Chip extends TicTacToeChip, CurrentBoard extends TicTactToeBoard> =
  CurrentBoard[0][0] extends Chip
    ?  CurrentBoard[1][1] extends Chip
      ?  CurrentBoard[2][2] extends Chip
        ? `${Chip} Won`
        : never
      : never
    : never

type RightDiagonalWinning<Chip extends TicTacToeChip, CurrentBoard extends TicTactToeBoard> =
  CurrentBoard[2][0] extends Chip
    ?  CurrentBoard[1][1] extends Chip
      ?  CurrentBoard[0][2] extends Chip
        ? `${Chip} Won`
        : never
      : never
    : never

type IsWinning<Chip extends TicTacToeChip, CurrentBoard extends TicTactToeBoard> =
  RowWinningFor<Chip, CurrentBoard[0]> |
  RowWinningFor<Chip, CurrentBoard[1]> |
  RowWinningFor<Chip, CurrentBoard[2]> |
  ColumnWinningFor<Chip, 0, CurrentBoard> |
  ColumnWinningFor<Chip, 1, CurrentBoard> |
  ColumnWinningFor<Chip, 2, CurrentBoard> |
  LeftDiagonalWinning<Chip, CurrentBoard> |
  RightDiagonalWinning<Chip, CurrentBoard>;

type IsSomeoneWinning<CurrentBoard extends TicTactToeBoard> = IsWinning<'❌',CurrentBoard> | IsWinning<'⭕',CurrentBoard>;
```
If none of the players won, I needed t check if there are still empty cells to continue the game. This is the reason 
why I created `AreThereEmptyCells`, that checks if the players still have any move available.   

```typescript
type AreThereEmptyCellsOnRow<Row extends TicTacToeCell[]> =
  Row extends [infer Current, ...infer Others extends TicTacToeCell[]]
    ? Current extends TicTacToeEmptyCell
      ? true
      : AreThereEmptyCellsOnRow<Others>
    : false

type AreThereEmptyCells<CurrentBoard extends TicTactToeBoard> =
  AreThereEmptyCellsOnRow<CurrentBoard[0]> &
  AreThereEmptyCellsOnRow<CurrentBoard[1]> &
  AreThereEmptyCellsOnRow<CurrentBoard[2]>;
```

So now I was able to create the `UpdateState` type as a composition of the previous types. What it does is:
* use `IsSomeoneWinning` to check if someone won. If it is so, its result is returned
* if none of the player won, it uses `AreThereEmptyCells` to check if there are still available moves:
** if there are, the next chip is returned from `NextChipFrom`
** if no moves are available, the game is in draw state and `Draw` is returned. 

```typescript
type NextChipFrom<CurrentState extends TicTacToeChip> =
  CurrentState extends '❌'
    ? '⭕'
    : '❌'

type UpdateState<CurrentBoard extends TicTactToeBoard, NextMovePosition extends [number, number], CurrentChip extends TicTacToeChip> =
  IsSomeoneWinning<UpdateBoard<CurrentBoard, NextMovePosition, CurrentChip>> extends never
    ? AreThereEmptyCells<UpdateBoard<CurrentBoard, NextMovePosition, CurrentChip>> extends true
      ? NextChipFrom<CurrentChip>
      : 'Draw'
    : IsSomeoneWinning<UpdateBoard<CurrentBoard, NextMovePosition, CurrentChip>>;
```

At this point the final `TicTacToe` game type can be created (again by composition of the previous types). It 
basically creates a new game state, with an updated `board` and `state`, using the types above. 

```typescript
type TicTacToe<CurrentTicTacToeGame extends TicTacToeGame, NextMove extends TicTacToePositions> =
  IsValidMove<CurrentTicTacToeGame, PositionOnBoardFrom<NextMove>> extends false
    ? CurrentTicTacToeGame
    : CurrentTicTacToeGame['state'] extends TicTacToeChip
      ? {
        board: UpdateBoard<CurrentTicTacToeGame['board'], PositionOnBoardFrom<NextMove>, CurrentTicTacToeGame['state']>
        state: UpdateState<CurrentTicTacToeGame['board'], PositionOnBoardFrom<NextMove>, CurrentTicTacToeGame['state']>
      }
      : CurrentTicTacToeGame;
```

Below, you can find the full solution and the test cases we saw before to verify its correctness.

```typescript
// domain 

type TicTacToeChip = '❌' | '⭕';
type TicTacToeEndState = '❌ Won' | '⭕ Won' | 'Draw';
type TicTacToeState = TicTacToeChip | TicTacToeEndState;
type TicTacToeEmptyCell = '  '
type TicTacToeCell = TicTacToeChip | TicTacToeEmptyCell;
type TicTacToeYPositions = 'top' | 'middle' | 'bottom';
type TicTacToeXPositions = 'left' | 'center' | 'right';
type TicTacToePositions = `${TicTacToeYPositions}-${TicTacToeXPositions}`;
type TicTactToeBoard = TicTacToeCell[][];
type TicTacToeGame = {
  board: TicTactToeBoard;
  state: TicTacToeState;
};

type EmptyBoard = [
  ['  ', '  ', '  '],
  ['  ', '  ', '  '],
  ['  ', '  ', '  ']
];

type NewGame = {
  board: EmptyBoard;
  state: '❌';
};

// Board

type XFrom<TicTacToeXPosition extends TicTacToeXPositions> = {
  'left': 0,
  'center': 1,
  'right': 2
}[TicTacToeXPosition];

type YFrom<TicTacToeXPosition extends TicTacToeYPositions> = {
  'top': 0,
  'middle': 1,
  'bottom': 2
}[TicTacToeXPosition];

type PositionOnBoardFrom<Move extends TicTacToePositions> =
  Move extends `${infer TicTacToeYPosition extends TicTacToeYPositions}-${infer TicTacToeXPosition extends TicTacToeXPositions}`
    ? [YFrom<TicTacToeYPosition>, XFrom<TicTacToeXPosition>]
    : undefined;

type UpdateColumn<Row extends TicTacToeCell[], NextChip extends TicTacToeChip, ColumnPosition extends number> = [...{
  [Index in keyof Row]:
  Index extends `${ColumnPosition}`
    ? Row[Index] extends TicTacToeEmptyCell
      ? NextChip
      : Row[Index]
    : Row[Index]
}];

type UpdateBoard<CurrentBoard extends TicTactToeBoard, NextMovePosition extends [number, number], NextChip extends TicTacToeChip> =
  NextMovePosition extends [number, number]
    ? [...{
      [Index in keyof CurrentBoard]:
      Index extends `${NextMovePosition[0]}`
        ? UpdateColumn<CurrentBoard[Index], NextChip, NextMovePosition[1]>
        : CurrentBoard[Index]
    }]
    : CurrentBoard;

// State 

type NextChipFrom<CurrentState extends TicTacToeChip> =
  CurrentState extends '❌'
    ? '⭕'
    : '❌'

type RowWinningFor<Chip extends TicTacToeChip, Row extends string[]> =  Row extends Chip[] ? `${Chip} Won` : never;

type ColumnWinningFor<Chip extends TicTacToeChip, ColumnIndex extends number, CurrentBoard extends TicTactToeBoard> = {
  [Index in keyof CurrentBoard]: CurrentBoard[Index][ColumnIndex]
} extends Chip[] ? `${Chip} Won` : never;

type LeftDiagonalWinning<Chip extends TicTacToeChip, CurrentBoard extends TicTactToeBoard> =
  CurrentBoard[0][0] extends Chip
    ?  CurrentBoard[1][1] extends Chip
      ?  CurrentBoard[2][2] extends Chip
        ? `${Chip} Won`
        : never
      : never
    : never

type RightDiagonalWinning<Chip extends TicTacToeChip, CurrentBoard extends TicTactToeBoard> =
  CurrentBoard[2][0] extends Chip
    ?  CurrentBoard[1][1] extends Chip
      ?  CurrentBoard[0][2] extends Chip
        ? `${Chip} Won`
        : never
      : never
    : never

type IsWinning<Chip extends TicTacToeChip, CurrentBoard extends TicTactToeBoard> =
  RowWinningFor<Chip, CurrentBoard[0]> |
  RowWinningFor<Chip, CurrentBoard[1]> |
  RowWinningFor<Chip, CurrentBoard[2]> |
  ColumnWinningFor<Chip, 0, CurrentBoard> |
  ColumnWinningFor<Chip, 1, CurrentBoard> |
  ColumnWinningFor<Chip, 2, CurrentBoard> |
  LeftDiagonalWinning<Chip, CurrentBoard> |
  RightDiagonalWinning<Chip, CurrentBoard>;

type IsSomeoneWinning<CurrentBoard extends TicTactToeBoard> = IsWinning<'❌',CurrentBoard> | IsWinning<'⭕',CurrentBoard>;

type AreThereEmptyCellsOnRow<Row extends TicTacToeCell[]> =
  Row extends [infer Current, ...infer Others extends TicTacToeCell[]]
    ? Current extends TicTacToeEmptyCell
      ? true
      : AreThereEmptyCellsOnRow<Others>
    : false

type AreThereEmptyCells<CurrentBoard extends TicTactToeBoard> =
  AreThereEmptyCellsOnRow<CurrentBoard[0]> &
  AreThereEmptyCellsOnRow<CurrentBoard[1]> &
  AreThereEmptyCellsOnRow<CurrentBoard[2]>;

type UpdateState<CurrentBoard extends TicTactToeBoard, NextMovePosition extends [number, number], CurrentChip extends TicTacToeChip> =
  IsSomeoneWinning<UpdateBoard<CurrentBoard, NextMovePosition, CurrentChip>> extends never
    ? AreThereEmptyCells<UpdateBoard<CurrentBoard, NextMovePosition, CurrentChip>> extends true
      ? NextChipFrom<CurrentChip>
      : 'Draw'
    : IsSomeoneWinning<UpdateBoard<CurrentBoard, NextMovePosition, CurrentChip>>;

// Global checks

type IsValidMove<CurrentTicTacToeGame extends TicTacToeGame, NextMovePosition extends [number, number] | undefined> =
  NextMovePosition extends [number, number]
    ? CurrentTicTacToeGame['board'][NextMovePosition[0]][NextMovePosition[1]] extends TicTacToeChip
      ? false
      : true
    : false

// Main

type TicTacToe<CurrentTicTacToeGame extends TicTacToeGame, NextMove extends TicTacToePositions> =
  IsValidMove<CurrentTicTacToeGame, PositionOnBoardFrom<NextMove>> extends false
    ? CurrentTicTacToeGame
    : CurrentTicTacToeGame['state'] extends TicTacToeChip
      ? {
        board: UpdateBoard<CurrentTicTacToeGame['board'], PositionOnBoardFrom<NextMove>, CurrentTicTacToeGame['state']>
        state: UpdateState<CurrentTicTacToeGame['board'], PositionOnBoardFrom<NextMove>, CurrentTicTacToeGame['state']>
      }
      : CurrentTicTacToeGame;


// ---- TEST CASES -----

type test_move1_actual = TicTacToe<NewGame, 'top-center'>;

type test_move2_actual = TicTacToe<test_move1_actual, 'top-left'>;
/*
type test_move2_expected = {
  board: [
    ['⭕', '❌', '  '], 
    ['  ', '  ', '  '], 
    ['  ', '  ', '  ']];
  state: '❌';
}
*/

type test_move3_actual = TicTacToe<test_move2_actual, 'middle-center'>;
/*
type test_move3_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '  ', '❌', '  ' ],
    [ '  ', '  ', '  ' ]
  ];
  state: '⭕';
};
*/

type test_move4_actual = TicTacToe<test_move3_actual, 'bottom-left'>;
/*
type test_move4_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '  ', '❌', '  ' ],
    [ '⭕', '  ', '  ' ]
  ];
  state: '❌';
};
*/

type test_x_win_actual = TicTacToe<test_move4_actual, 'bottom-center'>;
/*
type test_x_win_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '  ', '❌', '  ' ],
    [ '⭕', '❌', '  ' ]
  ];
  state: '❌ Won';
};
*/

type type_move5_actual = TicTacToe<test_move4_actual, 'bottom-right'>;
/*
type type_move5_expected = {
  board: [
    [ '⭕', '❌', '  ' ],
    [ '  ', '❌', '  ' ],
    [ '⭕', '  ', '❌' ]
  ];
  state: '⭕';
};
*/

type test_invalid_actual = TicTacToe<test_move1_actual, 'top-center'>;
/*
type test_invalid_expected = {
  board: [
    [ '  ', '❌', '  ' ],
    [ '  ', '  ', '  ' ],
    [ '  ', '  ', '  ' ]
  ];
  state: '⭕';
};
*/


type test_before_draw = {
  board: [
    ['⭕', '❌', '⭕'],
    ['⭕', '❌', '❌'],
    ['❌', '⭕', '  ']];
  state: '⭕';
}
type test_draw_actual = TicTacToe<test_before_draw, 'bottom-right'>;
/*
type test_draw_expected = {
  board: [
    ['⭕', '❌', '⭕'], 
    ['⭕', '❌', '❌'], 
    ['❌', '⭕', '⭕']];
  state: 'Draw';
}
*/
```

#### Conclusion

As I mentioned at the beginning, this is the second of the four challenges I liked the most from "Advent Of TypeScript 
2023" by [TypeHero](https://typehero.dev). Check out the other challenges I liked [here](/2023/12/29/advent-of-typescript-2023-favourite-challenges/ "advent of typescript 2023 challenges").
