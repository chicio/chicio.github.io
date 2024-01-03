---
title: "Advent of TypeScript 2023: Rock paper scissors (Day 17)"
description: "Rock paper scissors, one of the classical kata games you can find at a coding dojo. Can it be 
implemented using only TypeScript types?"
date: 2023-12-30
image: ../images/posts/advent-of-typescript-rock-paper-scissors.jpg
tags: [typescript, advent of typescript 2023]
comments: true
math: false
authors: [fabrizio_duroni]
---

*Rock paper scissors, one of the classical kata games you can find at a coding dojo. Can it be
implemented using only TypeScript types?*

---

This is the first of the four challenges I liked the most from "Advent Of TypeScript 2023" by [TypeHero](https://typehero.dev). 
Check out the other challenges I liked [here](/2023/12/29/advent-of-typescript-2023-favourite-challenges/ "advent of typescript 2023 challenges").

#### The problem

"Rock, paper scissors" is a classical game used at coding dojo. Let's check the rule explained in a "Christmas way" 
by the guy from TypeHero:

>It's Sunday and there's one week to go before the big day (Christmas Eve) when the elfs' work for the year will finally be complete. For the last 20 years the only game the elves have had to play together is StarCraft. They're looking for a fresh game to play.
>So, they get the idea to try a Rock, Paper, Scissors tournament.  
>   
> But the elves are sorta nerdy so they want to accomplish this using TypeScript types. The `WhoWins` should type to 
> correctly determine the winner in a Rock-Paper-Scissors game. The first argument is the opponent and the second 
> argument is you!    
>    
> What's Rock, Paper, Scissors?
> In case you haven't played it before, basically:
> it's a two-player game where each player picks one of three options: Rock (👊🏻), Paper (🖐🏾), and Scissors (✌🏽)
> game rules:
>* Rock crushes Scissors (Rock wins)
>* Scissors cuts Paper (Scissors wins)
>* Paper covers Rock (Paper wins)
>* otherwise, a draw

So our goal is to implement the `WhoWins` type which will take two arguments:
* the move of the opponent player
* our move
Given these parameters, the type should be return if we win, lose or there is a draw. Let's go!!!

#### Implementation

The exercise gave me only a couple of code hints to start from: the union type `RockPaperScissors` and the `WhoWins` 
without any parameter.

```typescript
type RockPaperScissors = '👊🏻' | '🖐🏾' | '✌🏽';

type WhoWins = unknown
```

Let's take a look also at the test cases provided by TypeHero to check if the implementation is correct.

```typescript
type test_0_actual = WhoWins<'👊🏻', '🖐🏾'>; //'win'
type test_1_actual = WhoWins<'👊🏻', '✌🏽'>; //'lose'
type test_2_actual = WhoWins<'👊🏻', '👊🏻'>; //'draw'
type test_3_actual = WhoWins<'🖐🏾', '👊🏻'>; //'lose'
type test_4_actual = WhoWins<'🖐🏾', '✌🏽'>; //'win'
type test_5_actual = WhoWins<'🖐🏾', '🖐🏾'>; //'draw'
type test_6_actual = WhoWins<'✌🏽', '👊🏻'>; //'win'
type test_7_actual = WhoWins<'✌🏽', '✌🏽'>; //'draw'
type test_8_actual = WhoWins<'✌🏽', '🖐🏾'>; //'lose'
```

From the test cases, it was clear that I needed to define a type for the states of the game. I chose to type them 
as an enum called `GameState`. 

```typescript
enum GameState {
	Draw = 'draw',
	Win = 'win',
	Lose = 'lose'
}
```

After the game state definition, I had to find a way to encode the game rule system using only TypeScript types. From 
the description of the problem above, it is quite clear that the rules to make a player win are basically 3:

* Rock crushes Scissors (Rock wins)
* Scissors cuts Paper (Scissors wins)
* Paper covers Rock (Paper wins)

In all the other cases, there is a draw, and it doesn't really matter which is the move of each player.

Given the consideration above, I started to think about creating a type that takes as parameters the current move of 
each player and the expected move for a specific rule (of the 3 above).
This type should check internally if the current move of the opponent and of myself matches the one of a specific rule.
If they match, it means that I won, otherwise I lost.
To check if two moves match, I used [conditional types](https://www.typescriptlang.org/docs/handbook/2/conditional-types.html "conditional types").
Let's see what I implemented.

```typescript
type Move<
  CurrentMovePlayerA extends RockPaperScissors, 
  ExpectedMovePlayerA extends RockPaperScissors, 
  CurrentMovePlayerB extends RockPaperScissors, 
  ExpectedMovePlayerB extends RockPaperScissors
> =
  CurrentMovePlayerA extends ExpectedMovePlayerA
    ? CurrentMovePlayerB extends ExpectedMovePlayerB
      ? GameState.Win
      : GameState.Lose
    : never
```

The first two rows of this `Move` type uses, as I mentioned before, conditional types to see if the current moves 
match the expected moves for a rule, and returns the correct game states.
If the move for one of the two players doesn't match the one of the rule I return `never`, a special type that 
represents the **type of values that never occur**.
This type has [two interesting features](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#the-never-type):

* it is a subtype of and assignable to every type.
* no type is a subtype of or assignable to never (except never itself).

In fact (in type theory terms) this is the [bottom type](https://en.wikipedia.org/wiki/Bottom_type) of the 
TypeScript language.
After creating the `Move` type I was able to encode the three rules we saw above, in a simple and self explained (by 
the code itself) way. 

```typescript
type RockCrushesScissors<
  MovePlayerA extends RockPaperScissors,
  MovePlayerB extends RockPaperScissors
> = Move<MovePlayerA, '✌🏽', MovePlayerB, '👊🏻'>

type PaperCoversRock<
  MovePlayerA extends RockPaperScissors,
  MovePlayerB extends RockPaperScissors
> = Move<MovePlayerA, '👊🏻', MovePlayerB, '🖐🏾'>

type ScissorsCutPaper<
  MovePlayerA extends RockPaperScissors,
  MovePlayerB extends RockPaperScissors
> = Move<MovePlayerA, '🖐🏾', MovePlayerB, '✌🏽'>
```

So, the next question was: how ddo I combine them? The general consideration around the game is that you cannot have 
multiple rules satisfied during a game run.
This can be coded in the TypeScript type system using a [union type](https://www.typescriptlang.org/docs/handbook/2/everyday-types.html#union-types) and relying on the `never` type, that has another interesting 
feature when it comes to union types.
It is well explained here in the [TypeScript documentation](https://www.typescriptlang.org/docs/handbook/release-notes/typescript-2-0.html#the-never-type):

>Because never is a subtype of every type, it is always omitted from union types and it is ignored in function return type inference as long as there are other types being returned.

This basically means that, given **how I coded the non-matched case for the `Move` type**, and **given how `never` 
works with union types**, I was able to create a union type that describe the whole rule system for which the player 
could win. This led me to the creation of the `SomeoneWon` type.
The result of this type will always be the application of one and only one of the three rules, because for the 
`never` property we just saw, the rules that doesn't match will be discarded and omitted from the `SomeoneWon` type.

```typescript
type SomeoneWon<MovePlayerA extends RockPaperScissors, MovePlayerB extends RockPaperScissors> = 
				| PaperCoversRock<MovePlayerA, MovePlayerB> 
				| ScissorsCutPaper<MovePlayerA, MovePlayerB> 
				| RockCrushesScissors<MovePlayerA, MovePlayerB>
```

Now the only missing rule is the one that describes the draw state.
For it, I didn't need to know which are the specific current moves of each player, I just needed to check that the 
moves were equal.

```typescript
type Draw<
  MovePlayerA extends RockPaperScissors,
  MovePlayerB extends RockPaperScissors
> = MovePlayerA extends MovePlayerB
  ? GameState.Draw
  : false
```

So I was ready to define the `WhoWins` enum, as a combination of the types above plus one last missing type, 
`GameStateToString`, needed to convert the enum to a string (I will be honest, I regret my choice of an enum to 
describe the game state :sweat_smile:).

```typescript
type GameStateToString<State extends GameState> = `${State}`

type WhoWins<MovePlayerA extends RockPaperScissors, MovePlayerB extends RockPaperScissors> =
  Draw<MovePlayerA, MovePlayerB> extends GameState.Draw
    ? GameStateToString<GameState.Draw>
    : GameStateToString<SomeoneWon<MovePlayerA, MovePlayerB>>;
```

You can find the full solution and the test cases we saw before to verify its correctness down below.

```typescript
type RockPaperScissors = '👊🏻' | '🖐🏾' | '✌🏽';

enum GameState {
  Draw = 'draw',
  Win = 'win',
  Lose = 'lose'
}

type GameStateToString<State extends GameState> = `${State}`

type Move<
  CurrentMovePlayerA extends RockPaperScissors,
  ExpectedMovePlayerA extends RockPaperScissors,
  CurrentMovePlayerB extends RockPaperScissors,
  ExpectedMovePlayerB extends RockPaperScissors
> =
  CurrentMovePlayerA extends ExpectedMovePlayerA
    ? CurrentMovePlayerB extends ExpectedMovePlayerB
      ? GameState.Win
      : GameState.Lose
    : never

type RockCrushesScissors<
  MovePlayerA extends RockPaperScissors,
  MovePlayerB extends RockPaperScissors
> = Move<MovePlayerA, '✌🏽', MovePlayerB, '👊🏻'>

type PaperCoversRock<
  MovePlayerA extends RockPaperScissors,
  MovePlayerB extends RockPaperScissors
> = Move<MovePlayerA, '👊🏻', MovePlayerB, '🖐🏾'>

type ScissorsCutPaper<
  MovePlayerA extends RockPaperScissors,
  MovePlayerB extends RockPaperScissors
> = Move<MovePlayerA, '🖐🏾', MovePlayerB, '✌🏽'>

type SomeoneWon<MovePlayerA extends RockPaperScissors, MovePlayerB extends RockPaperScissors> =
  | PaperCoversRock<MovePlayerA, MovePlayerB>
  | ScissorsCutPaper<MovePlayerA, MovePlayerB>
  | RockCrushesScissors<MovePlayerA, MovePlayerB>

type Draw<
  MovePlayerA extends RockPaperScissors,
  MovePlayerB extends RockPaperScissors
> = MovePlayerA extends MovePlayerB
  ? GameState.Draw
  : false

type WhoWins<MovePlayerA extends RockPaperScissors, MovePlayerB extends RockPaperScissors> =
  Draw<MovePlayerA, MovePlayerB> extends GameState.Draw
    ? GameStateToString<GameState.Draw>
    : GameStateToString<SomeoneWon<MovePlayerA, MovePlayerB>>;

// ---------- TEST CASES ------------

type test_0_actual = WhoWins<'👊🏻', '🖐🏾'>; //'win'
type test_1_actual = WhoWins<'👊🏻', '✌🏽'>; //'lose'
type test_2_actual = WhoWins<'👊🏻', '👊🏻'>; //'draw'
type test_3_actual = WhoWins<'🖐🏾', '👊🏻'>; //'lose'
type test_4_actual = WhoWins<'🖐🏾', '✌🏽'>; //'win'
type test_5_actual = WhoWins<'🖐🏾', '🖐🏾'>; //'draw'
type test_6_actual = WhoWins<'✌🏽', '👊🏻'>; //'win'
type test_7_actual = WhoWins<'✌🏽', '✌🏽'>; //'draw'
type test_8_actual = WhoWins<'✌🏽', '🖐🏾'>; //'lose'
```

#### Conclusion

As I mentioned at the beginning, this is the first of the four challenges I liked the most from "Advent Of TypeScript 
2023" by [TypeHero](https://typehero.dev). Check out the other challenges I liked [here](/2023/12/29/advent-of-typescript-2023-favourite-challenges/ "advent of typescript 2023 challenges").
