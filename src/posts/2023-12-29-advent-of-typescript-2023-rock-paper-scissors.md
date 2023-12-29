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
But the elves are sorta nerdy so they want to accomplish this using TypeScript types. The WhoWins should type to correctly determine the winner in a Rock-Paper-Scissors game. The first argument is the opponent and the second argument is you!
What's Rock, Paper, Scissors?
In case you haven't played it before, basically:
it's a two player game where each player picks one of three options: Rock (👊🏻), Paper (🖐🏾), and Scissors (✌🏽)
game rules:
>* Rock crushes Scissors (Rock wins)
>* Scissors cuts Paper (Scissors wins)
>* Paper covers Rock (Paper wins)
>* otherwise, a draw


#### Implementation

