---
title: "A first approach to contract test"
description: "In this post I will talk about contract test: what they are and how you can use them."
date: 2017-07-25
image: ../images/posts/contract-test.jpg
tags: [test driven development, java]
comments: true
math: false
authors: [fabrizio_duroni]
---

*In this post I will talk about contract test: what they are and how you can use them.*

---

Sometimes you have to unit test multiple implementations of the same interface. Basically you have the same tests for
multiple concrete implementation of the same interface. In a case like this one, contract test could help you save a lot
of time. By using contract test you will be able to run the same set of tests for different concrete implementations.  
How does it work? The main point is to have a template base abstract "ContractTest" test class that incapsulate the
logic of the tests using abstract methods that use the base interface of the objects under test. These abstract methods
will be implemented in the subclasses of this "ContractTest" class and they will feed the test with a concrete
implementation of the interface used in the declaration of the abstract methods.  
Let's see an example to make everything more clear!!!  
The example is a standalone Java project that uses JUnit 4 and Mockito 2.8. Obviously, you can apply this concept to
other languages/platform (in fact, I learned and implemented contract test while I was developing a new feature inside
an Android App :heart_eyes:).  
Suppose for example that we have the following interface:

```java
public interface Command {
    void execute();
}
```

We have two objects that implement that interface: AccountCommand and SettingsCommand.

```java
class AccountCommand implements Command {
    private MenuActionsListener menuActionsListener;

    AccountCommand(MenuActionsListener menuActionsListener) {
        this.menuActionsListener = menuActionsListener;
    }

    public void execute() {
        menuActionsListener.onAccountSelected();
    }
}

public class SettingsCommand implements Command {
    private MenuActionsListener menuActionsListener;

    SettingsCommand(MenuActionsListener menuActionsListener) {
        this.menuActionsListener = menuActionsListener;
    }

    public void execute() {
        menuActionsListener.onSettingsSelected();
    }
}
```

As you can see the two implementations look very similar. So it's time to see how contract test can help us :metal:!!
We can write a `CommandContract` base test class that contains the logic of the test we want to write. In our specific
case we want to assure that when a command is executed, by calling the `execute()` method, the `menuActionsListener` is
called with the correct method on each concrete implementation of `Command`. So our `CommandContract` implementation is:

```java
abstract class CommandContract {
    private Command command;
    private MenuActionsListener menuActionsListener;

    @Test
    public void commandIsExecuted() throws Exception {
        givenAMenuActionListener();
        command = givenACommand(menuActionsListener);
        whenACommandIsExecuted();
        thenTheCorrectMenuActionIsInvoked(menuActionsListener);
    }

    private void givenAMenuActionListener() {
        menuActionsListener = mock(MenuActionsListener.class);
    }

    protected abstract Command givenACommand(MenuActionsListener menuActionsListener);

    private void whenACommandIsExecuted() {
        command.execute();
    }

    protected abstract void thenTheCorrectMenuActionIsInvoked(MenuActionsListener menuActionsListener);
}
```

As you can see in the `commandIsExecuted()` test we use all the abstract method to define the test of generic command
implementation. Now in the test subclasses we will implement the abstract method to feed the test with the various
implementation of our concrete commands.  
So we create an `AccountCommandTest` class, subclass of `CommandContract`, to test our `AccountCommand` class:

```java
public class AccountCommandTest extends CommandContract {

    protected Command givenACommand(MenuActionsListener menuActionsListener) {
        return new AccountCommand(menuActionsListener);
    }

    protected void thenTheCorrectMenuActionIsInvoked(MenuActionsListener menuActionsListener) {
        Mockito.verify(menuActionsListener).onAccountSelected();
    }
}
```

We create also a `SettingsCommandTest` class, subclass of `CommandContract`, to test our `AccountCommand` class:

```java
public class SettingsCommandTest extends CommandContract {

    protected Command givenACommand(MenuActionsListener menuActionsListener) {
        return new SettingsCommand(menuActionsListener);
    }

    protected void thenTheCorrectMenuActionIsInvoked(MenuActionsListener menuActionsListener) {
        Mockito.verify(menuActionsListener).onSettingsSelected();
    }
}
```

As you can see we tested all our concrete `Command` implementations without replicating the unit tests logic.
Wonderful :open_mouth::heart_eyes:!!!  
[Here](https://github.com/chicio/Contract-Tests "Contract test java example") you can find the complete example (a Maven
project developed using IntelliJ, JUnit4, Mockito).  
It's time for you to test contract test on your project :joy::laughing:!!!
