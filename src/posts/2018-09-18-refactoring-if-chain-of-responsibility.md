---
title: "Refactoring: a real case of a nested if structure transformed into a chain of responsibility"
description: "In this post my colleague Francesco Bonfadelli will show you how to transform a nested if structure into a
chain of responsibility."
date: 2018-09-18
image: ../images/posts/ifremoval.jpg
tags: [clean code]
comments: true
math: false
authors: [francesco_bonfadelli]
---

*In this post my colleague [Francesco Bonfadelli](https://www.linkedin.com/in/fbonfadelli/ "Francesco Bonfadelli") will
show you how to transform a nested if structure into a chain of responsibility.*

---

In this post I am going to describe a step by step process used to transform a nested if structure into a chain of
responsibility. The purpose of this operation is to make the code easier to read, thus to change without introducing
errors. We will also get for free a structure that will be able to apply a more generic set of rules than the one
defined at the beginning.  
The code of this post is based on a piece of code used to satisfy a real business need, we just removed the business
related details. The language used is java.

#### The process in short

* Flatten the if structure into a flat sequence of `if` clauses
* Extract each condition and the related action into a single class
* Create a common interface for all the extracted conditions
* Put all the conditions into a list
* Loop over the list and return the first action for which the condition is satisfied

#### The need

It seemed a normal day of work when one of our managers called a meeting to inform us of a very urgent feature that
should be put in production within 2 days. So, as it usually happens in this case, between the deriving chaos and the
tons of alignment meetings that continuously interrupted us, we produced a code that basically "worked", but it was a
bit chaotic. Luckily we were able at least to write the tests. So, once we put in production the feature, we decided to
immediately refactor the piece of code.

#### The process

We are going to see a step by step refactor of a specific class that transforms the if-nested structure into a chain of
responsibility. We are not going to change the tests because they work as an acceptance test for our use case. In an
ideal world, with a lot of time available, we would also write the tests of all the classes we are going to extract and
simplify the current test. But, you know, we are not in an ideal world 😅.  
The idea behind this refactor is to proceed with small steps, possibly using the IDE functionality (I used IDEA which is
very good at it), and run the tests after every operation. Also, after each step there is a commit, not only to allow
everyone to follow the evolution of the code through the commits, but also to allow us to simply
use ```git checkout .``` in case of errors, in order to come back to the previous working version. All of this, allows
us to keep the code strictly under control and avoid to introduce bugs during the refactoring. I will use the diff
syntax to show the differences between some pieces of code. Please keep in mind that I will use it in order to
highlight *only the main differences* between one commit and the other and it won't be the exact diff you can get with
git.

#### The initial code

Here you can find the code we were not very proud of. In particular, I report the nested if structure, which is the part
we are going to
refactor. ([Source code](https://github.com/bonfa/IfRemovingARealUseCase/blob/a6681dd088d06244878e0527e87b4c6b5bbfd50d/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))

```java
public class HandBaggageInformationFactory {

    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);
        if (flight.isOneWay()) {
            if (isMyCompany(flight)) {
                LocalDateTime flightOutboundDate = flight.getFirstLeg().getFirstHop().getDeparture().getDate();
                if (flightOutboundDate.isAfter(LocalDateTime.of(2018, 11, 1, 0, 0, 0))) {
                    return newMyCompanyHandBaggageInformation(translationRepository, renderLanguage);
                } else {
                    return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
                }
            } else {
                return noMyCompanyInformationInfo();
            }
        } else { //round trip
            if (isMyCompany(flight)) {
                LocalDateTime outboundDepartureDate = order.getOutboundDepartureDate();
                LocalDate returnDepartureDate = order.getReturnDepartureDate();
                if (outboundDepartureDate.isAfter(LocalDateTime.of(2018, 11, 1, 0, 0, 0))
                        || returnDepartureDate.isAfter(LocalDate.of(2018, 10, 31))) {
                    return newMyCompanyHandBaggageInformation(translationRepository, renderLanguage);
                } else {
                    return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
                }
            } else {
                return noMyCompanyInformationInfo();
            }
        }
    }
}
```

#### The execution

##### 1. Flatten the if structure

The idea here is to transform the nested if structure into a flat sequence of `if` clauses in order to isolate and
explicit each single condition.  
To do so with very small steps, we are going to remove the `else` part of each `if` clause, by transforming such part
into an `if` clause whose condition is the negation of the original one. In the following piece of code, you can notice
how the outer if-else has become a couple of `if` clauses, one for the original condition `flight.isOneWay()` and the
other one with the opposite condition `!flight.isOneWay()`
. ([Source code](https://github.com/bonfa/IfRemovingARealUseCase/blob/a49340d05153074158cc59c130de6875276a92ab/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))

```diff
public class HandBaggageInformationFactory {

    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);
        if (flight.isOneWay()) {
            if (isMyCompany(flight)) {
                LocalDateTime flightOutboundDate = flight.getFirstLeg().getFirstHop().getDeparture().getDate();
                if (flightOutboundDate.isAfter(LocalDateTime.of(2018, 11, 1, 0, 0, 0))) {
                    return newMyCompanyHandBaggageInformation(translationRepository, renderLanguage);
                } else {
                    return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
                }
            } else {
                return noMyCompanyInformationInfo();
            }
        }
-       else {
+       if (!flight.isOneWay()) {  //round trip
            if (isMyCompany(flight)) {
                LocalDateTime outboundDepartureDate = order.getOutboundDepartureDate();
                LocalDate returnDepartureDate = order.getReturnDepartureDate();
                if (outboundDepartureDate.isAfter(LocalDateTime.of(2018, 11, 1, 0, 0, 0))
                        || returnDepartureDate.isAfter(LocalDate.of(2018, 10, 31))) {
                    return newMyCompanyHandBaggageInformation(translationRepository, renderLanguage);
                } else {
                    return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
                }
            } else {
                return noMyCompanyInformationInfo();
            }
        }

        return noMyCompanyInformationInfo();
    }
}
```

Once done this, we are going to proceed with the inner `if-else` conditions, which is `isMyCompany(flight)`.
([Source code](https://github.com/bonfa/IfRemovingARealUseCase/blob/193aab6e25e83ba9c453b87961fb1582b0a63828/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))

```diff
public class HandBaggageInformationFactory {
    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);
        if (flight.isOneWay()) {
            if (isMyCompany(flight)) {
                LocalDateTime flightOutboundDate = flight.getFirstLeg().getFirstHop().getDeparture().getDate();
                if (flightOutboundDate.isAfter(LocalDateTime.of(2018, 11, 1, 0, 0, 0))) {
                    return newMyCompanyHandBaggageInformation(translationRepository, renderLanguage);
                } else {
                    return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
                }
            }
-           else {
+           if (!isMyCompany(flight)) {
                return noMyCompanyInformationInfo();
            }
        }

        if (!flight.isOneWay()) {  //round trip
            if (isMyCompany(flight)) {
                LocalDateTime outboundDepartureDate = order.getOutboundDepartureDate();
                LocalDate returnDepartureDate = order.getReturnDepartureDate();
                if (outboundDepartureDate.isAfter(LocalDateTime.of(2018, 11, 1, 0, 0, 0))
                        || returnDepartureDate.isAfter(LocalDate.of(2018, 10, 31))) {
                    return newMyCompanyHandBaggageInformation(translationRepository, renderLanguage);
                } else {
                    return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
                }
            }

            if (!isMyCompany(flight)) {
                return noMyCompanyInformationInfo();
            }
        }

        return noMyCompanyInformationInfo();
    }
}
```

We proceed in this way until we have removed all the `else` conditions from the code. Here, you are not forced to start
from the most external clause, but you can choose whatever position you prefer to start with. The important thing is
that once finished you won't have any `else` clause inside your
code. ([Source code](https://github.com/bonfa/IfRemovingARealUseCase/blob/d496798575f2ee7487f1f2a04d0ce124dbb921c2/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))

```java
public class HandBaggageInformationFactory {
    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);
        if (flight.isOneWay()) {
            if (isMyCompany(flight)) {
                LocalDateTime flightOutboundDate = flight.getFirstLeg().getFirstHop().getDeparture().getDate();
                if (flightOutboundDate.isAfter(LocalDateTime.of(2018, 11, 1, 0, 0, 0))) {
                    return newMyCompanyHandBaggageInformation(translationRepository, renderLanguage);
                }

                if (!flightOutboundDate.isAfter(LocalDateTime.of(2018, 11, 1, 0, 0, 0))) {
                    return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
                }
            }

            if (!isMyCompany(flight)) {
                return noMyCompanyInformationInfo();
            }
        }

        if (!flight.isOneWay()) {  //round trip
            if (isMyCompany(flight)) {
                LocalDateTime outboundDepartureDate = order.getOutboundDepartureDate();
                LocalDate returnDepartureDate = order.getReturnDepartureDate();
                if (outboundDepartureDate.isAfter(LocalDateTime.of(2018, 11, 1, 0, 0, 0))
                        || returnDepartureDate.isAfter(LocalDate.of(2018, 10, 31))) {
                    return newMyCompanyHandBaggageInformation(translationRepository, renderLanguage);
                }

                if (!(outboundDepartureDate.isAfter(LocalDateTime.of(2018, 11, 1, 0, 0, 0))
                        || returnDepartureDate.isAfter(LocalDate.of(2018, 10, 31)))) {
                    return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
                }
            }

            if (!isMyCompany(flight)) {
                return noMyCompanyInformationInfo();
            }
        }

        return noMyCompanyInformationInfo();
    }
}
```

Once removed all the `else`, we are going to duplicate some conditions in order to have only one `if` clause inside
another `if`. At a first glance, it could seem complicated to understand but it is actually pretty simple 🚀. We start
by duplicating `isMyCompany(flight)` in the two external `if`
clauses. ([Source code](https://github.com/bonfa/IfRemovingARealUseCase/blob/623019ec167ea7a0e6e5c0b0057d2bf8a83da9f1/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))

```diff
public class HandBaggageInformationFactory {
    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);
        if (flight.isOneWay()) {
            LocalDateTime flightOutboundDate = flight.getFirstLeg().getFirstHop().getDeparture().getDate();
            if (isMyCompany(flight)) {
                if (flightOutboundDate.isAfter(LocalDateTime.of(2018, 11, 1, 0, 0, 0))) {
                    return newMyCompanyHandBaggageInformation(translationRepository, renderLanguage);
                }

-               if (!flightOutboundDate.isAfter(LocalDateTime.of(2018, 11, 1, 0, 0, 0))) {
-                   return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
-               }
            }

+           if (isMyCompany(flight)) {
+               if (!flightOutboundDate.isAfter(LocalDateTime.of(2018, 11, 1, 0, 0, 0))) {
+                   return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
+               }
+           }

            if (!isMyCompany(flight)) {
                return noMyCompanyInformationInfo();
            }
        }

        if (!flight.isOneWay()) {  //round trip
            LocalDateTime outboundDepartureDate = order.getOutboundDepartureDate();
            LocalDate returnDepartureDate = order.getReturnDepartureDate();
            if (isMyCompany(flight)) {
                if (outboundDepartureDate.isAfter(LocalDateTime.of(2018, 11, 1, 0, 0, 0))
                        || returnDepartureDate.isAfter(LocalDate.of(2018, 10, 31))) {
                    return newMyCompanyHandBaggageInformation(translationRepository, renderLanguage);
                }

-               if (!(outboundDepartureDate.isAfter(LocalDateTime.of(2018, 11, 1, 0, 0, 0))
-                       || returnDepartureDate.isAfter(LocalDate.of(2018, 10, 31)))) {
-                   return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
-               }

            }

+           if (isMyCompany(flight)) {
+               if (!(outboundDepartureDate.isAfter(LocalDateTime.of(2018, 11, 1, 0, 0, 0))
+                       || returnDepartureDate.isAfter(LocalDate.of(2018, 10, 31)))) {
+                   return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
+               }
+           }

            if (!isMyCompany(flight)) {
                return noMyCompanyInformationInfo();
            }
        }

        return noMyCompanyInformationInfo();
    }
}
```  

After having done this process for all the conditions, we will finally get the flat if
structure. ([Source code](https://github.com/bonfa/IfRemovingARealUseCase/blob/82d8c21bf684feeaf6d342a7b6f36409bd30acb6/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))

```java
public class HandBaggageInformationFactory {
    private static final LocalDateTime FIRST_OF_NOVEMBER = LocalDateTime.of(2018, 11, 1, 0, 0, 0);
    private static final LocalDate THIRTY_FIRST_OF_OCTOBER = LocalDate.of(2018, 10, 31);

    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);
        LocalDateTime flightOutboundDate = flight.getFirstLeg().getFirstHop().getDeparture().getDate();
        LocalDateTime outboundDepartureDate = order.getOutboundDepartureDate();
        LocalDate returnDepartureDate = order.getReturnDepartureDate();

        if (flight.isOneWay()
                && isMyCompany(flight)
                && flightOutboundDate.isAfter(FIRST_OF_NOVEMBER)) {
            return newMyCompanyHandBaggageInformation(translationRepository, renderLanguage);
        }

        if (flight.isOneWay() && isMyCompany(flight) && !flightOutboundDate.isAfter(FIRST_OF_NOVEMBER)) {
            return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
        }

        if (flight.isOneWay() && !isMyCompany(flight)) {
                return noMyCompanyInformationInfo();
        }

        if (!flight.isOneWay() && isMyCompany(flight) && (outboundDepartureDate.isAfter(FIRST_OF_NOVEMBER)
                        || returnDepartureDate.isAfter(THIRTY_FIRST_OF_OCTOBER))) {
                    return newMyCompanyHandBaggageInformation(translationRepository, renderLanguage);
        }

        if (!flight.isOneWay() && isMyCompany(flight) && (!(outboundDepartureDate.isAfter(FIRST_OF_NOVEMBER)
                        || returnDepartureDate.isAfter(THIRTY_FIRST_OF_OCTOBER)))) {
                    return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
        }

        if (!flight.isOneWay() && !isMyCompany(flight)) {
                return noMyCompanyInformationInfo();
        }

        return noMyCompanyInformationInfo();
    }
}
```

##### Intermediate step: extracting factories

Before keeping on with the extraction of the chain of responsibility from the if structure, we are going to make some
intermediate steps. In order to reduce the responsibilities of the `HandBaggageInformationFactory`, here, we are going
to extract three factories, each one responsible for creating a specific `HandBaggageInformation`. Without diving into
the code used to create the object, we just extract the `NewMyCompanyHandBaggageInformationFactory` out of the
method `newMyCompanyHandBaggageInformation`
. ([Step 1](https://github.com/bonfa/IfRemovingARealUseCase/blob/5419c7d777f7562f89c65d55a83181b787a7c9eb/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java)
, [Step 2](https://github.com/bonfa/IfRemovingARealUseCase/blob/3b6651b149932befca35c40a02c4bbd79cfab8d9/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java)
and [Step 3](https://github.com/bonfa/IfRemovingARealUseCase/blob/ed33c4490bccfc828391516c12561b83d0428000/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))
If you are using IDEA, an easy way is to do it is to use its `Extract method object` feature. I won't explain how to do
it here, because it is out of the scope of this topic, but I have just realized I have found the next topic of my blog (
this is great! isn't it? :smirk:).

```diff
public class HandBaggageInformationFactory {
    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);
        LocalDateTime flightOutboundDate = flight.getFirstLeg().getFirstHop().getDeparture().getDate();
        LocalDateTime outboundDepartureDate = order.getOutboundDepartureDate();
        LocalDate returnDepartureDate = order.getReturnDepartureDate();

+        NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory =
+                new NewMyCompanyHandBaggageInformationFactory(translationRepository);

        if (flight.isOneWay()
                && isMyCompany(flight)
                && flightOutboundDate.isAfter(FIRST_OF_NOVEMBER)) {
-             return newMyCompanyHandBaggageInformation(translationRepository, renderLanguage);
+            return newMyCompanyHandBaggageInformationFactory.execute(renderLanguage);
        }

        if (flight.isOneWay() && isMyCompany(flight) && !flightOutboundDate.isAfter(FIRST_OF_NOVEMBER)) {
            return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
        }

        if (flight.isOneWay() && !isMyCompany(flight)) {
                return noMyCompanyInformationInfo();
        }

        if (!flight.isOneWay() && isMyCompany(flight) && (outboundDepartureDate.isAfter(FIRST_OF_NOVEMBER)
                        || returnDepartureDate.isAfter(THIRTY_FIRST_OF_OCTOBER))) {
-           return newMyCompanyHandBaggageInformation(translationRepository, renderLanguage);
+           return newMyCompanyHandBaggageInformationFactory.execute(renderLanguage);
        }

        if (!flight.isOneWay() && isMyCompany(flight) && (!(outboundDepartureDate.isAfter(FIRST_OF_NOVEMBER)
                        || returnDepartureDate.isAfter(THIRTY_FIRST_OF_OCTOBER)))) {
                    return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
        }

        if (!flight.isOneWay() && !isMyCompany(flight)) {
                return noMyCompanyInformationInfo();
        }

        return noMyCompanyInformationInfo();
    }
}
```

Once done this, we repeat the operation for the other two methods that create the objects, obtaining
the `NotMyCompanyHandBaggageInformationFactory` and the `OldMyCompanyHandBaggageInformationFactory`.
([Source code](https://github.com/bonfa/IfRemovingARealUseCase/blob/71a7962d72ffa2581beef76c494f2389f0526059/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))

```diff
public class HandBaggageInformationFactory {
    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);
        LocalDateTime flightOutboundDate = flight.getFirstLeg().getFirstHop().getDeparture().getDate();
        LocalDateTime outboundDepartureDate = order.getOutboundDepartureDate();
        LocalDate returnDepartureDate = order.getReturnDepartureDate();

        NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory =
                new NewMyCompanyHandBaggageInformationFactory(translationRepository);
+       OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory =
+               new OldMyCompanyHandBaggageInformationFactory(translationRepository);
+       NotMyCompanyHandBaggageInformationFactory notMyCompanyHandBaggageInformationFactory =
+               new NotMyCompanyHandBaggageInformationFactory();

        if (flight.isOneWay()
                && isMyCompany(flight)
                && flightOutboundDate.isAfter(FIRST_OF_NOVEMBER)) {
              return newMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }

        if (flight.isOneWay() && isMyCompany(flight) && !flightOutboundDate.isAfter(FIRST_OF_NOVEMBER)) {
-            return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
+            return oldMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }

        if (flight.isOneWay() && !isMyCompany(flight)) {
-            return noMyCompanyInformationInfo();
+            return notMyCompanyHandBaggageInformationFactory.make();
        }

        if (!flight.isOneWay() && isMyCompany(flight) && (outboundDepartureDate.isAfter(FIRST_OF_NOVEMBER)
                        || returnDepartureDate.isAfter(THIRTY_FIRST_OF_OCTOBER))) {
             return newMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }

        if (!flight.isOneWay() && isMyCompany(flight) && (!(outboundDepartureDate.isAfter(FIRST_OF_NOVEMBER)
                        || returnDepartureDate.isAfter(THIRTY_FIRST_OF_OCTOBER)))) {
-            return oldMyCompanyHandBaggageInformationInfo(translationRepository, renderLanguage);
+            return oldMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }

        if (!flight.isOneWay() && !isMyCompany(flight)) {
-            return noMyCompanyInformationInfo();
+            return notMyCompanyHandBaggageInformationFactory.make();
        }

-       return noMyCompanyInformationInfo();
+       return notMyCompanyHandBaggageInformationFactory.make();
    }
}
```

##### 2. Creating the components of the chain

By using again the `Extract method object` feature of Idea, you can easily extract the first condition into a class. In
this way we get `new MyCompanyOneWayAfterTheFirstOfNovember()` method `canHandle(flight, flightOutboundDate)` in the first `if`
condition. ([Source code](https://github.com/bonfa/IfRemovingARealUseCase/blob/6767ecfcbc8b1f90f38f525c2d2d7522d25fafb4/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))

```diff
public class HandBaggageInformationFactory {
    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);
        LocalDateTime flightOutboundDate = flight.getFirstLeg().getFirstHop().getDeparture().getDate();
        LocalDateTime outboundDepartureDate = order.getOutboundDepartureDate();
        LocalDate returnDepartureDate = order.getReturnDepartureDate();

        NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory =
                new NewMyCompanyHandBaggageInformationFactory(translationRepository);
        OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory =
                new OldMyCompanyHandBaggageInformationFactory(translationRepository);
        NotMyCompanyHandBaggageInformationFactory notMyCompanyHandBaggageInformationFactory =
                new NotMyCompanyHandBaggageInformationFactory();

-       if (flight.isOneWay()
-               && isMyCompany(flight)
-               && flightOutboundDate.isAfter(FIRST_OF_NOVEMBER)) {
-             return newMyCompanyHandBaggageInformationFactory.from(renderLanguage);
-       }

+       if (new MyCompanyOneWayAfterTheFirstOfNovember().canHandle(flight, flightOutboundDate)) {
+           return newMyCompanyHandBaggageInformationFactory.from(renderLanguage);
+       }

        if (flight.isOneWay() && isMyCompany(flight) && !flightOutboundDate.isAfter(FIRST_OF_NOVEMBER)) {
            return oldMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }

        if (flight.isOneWay() && !isMyCompany(flight)) {
            return notMyCompanyHandBaggageInformationFactory.make();
        }

        if (!flight.isOneWay() && isMyCompany(flight) && (outboundDepartureDate.isAfter(FIRST_OF_NOVEMBER)
                        || returnDepartureDate.isAfter(THIRTY_FIRST_OF_OCTOBER))) {
            return newMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }

        if (!flight.isOneWay() && isMyCompany(flight) && (!(outboundDepartureDate.isAfter(FIRST_OF_NOVEMBER)
                        || returnDepartureDate.isAfter(THIRTY_FIRST_OF_OCTOBER)))) {
            return oldMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }

        if (!flight.isOneWay() && !isMyCompany(flight)) {
            return notMyCompanyHandBaggageInformationFactory.make();
        }

        return notMyCompanyHandBaggageInformationFactory.make();
    }

+   private class MyCompanyOneWayAfterTheFirstOfNovember {
+       public boolean canHandle(Flight flight, LocalDateTime flightOutboundDate) {
+           return flight.isOneWay()
+                   && isMyCompany(flight)
+                   && flightOutboundDate.isAfter(FIRST_OF_NOVEMBER);
+       }
+   }
}
```

And, after that, we can move `newMyCompanyHandBaggageInformationFactory` method `from(renderLanguage)`
inside `MyCompanyOneWayAfterTheFirstOfNovember`.

```diff
public class HandBaggageInformationFactory {
    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);
        LocalDateTime flightOutboundDate = flight.getFirstLeg().getFirstHop().getDeparture().getDate();
        LocalDateTime outboundDepartureDate = order.getOutboundDepartureDate();
        LocalDate returnDepartureDate = order.getReturnDepartureDate();

        NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory =
                new NewMyCompanyHandBaggageInformationFactory(translationRepository);
        OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory =
                new OldMyCompanyHandBaggageInformationFactory(translationRepository);
        NotMyCompanyHandBaggageInformationFactory notMyCompanyHandBaggageInformationFactory =
                new NotMyCompanyHandBaggageInformationFactory();

-       if (new MyCompanyOneWayAfterTheFirstOfNovember().canHandle(flight, flightOutboundDate)) {
-           return newMyCompanyHandBaggageInformationFactory.from(renderLanguage);
-       }
+        MyCompanyOneWayAfterTheFirstOfNovember myCompanyOneWayAfterTheFirstOfNovember =
+                        new MyCompanyOneWayAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
+                if (myCompanyOneWayAfterTheFirstOfNovember.canHandle(flight, flightOutboundDate)) {
+                    return myCompanyOneWayAfterTheFirstOfNovember.getFrom(renderLanguage);
+                }

        if (flight.isOneWay() && isMyCompany(flight) && !flightOutboundDate.isAfter(FIRST_OF_NOVEMBER)) {
            return oldMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }

        if (flight.isOneWay() && !isMyCompany(flight)) {
            return notMyCompanyHandBaggageInformationFactory.make();
        }

        if (!flight.isOneWay() && isMyCompany(flight) && (outboundDepartureDate.isAfter(FIRST_OF_NOVEMBER)
                        || returnDepartureDate.isAfter(THIRTY_FIRST_OF_OCTOBER))) {
            return newMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }

        if (!flight.isOneWay() && isMyCompany(flight) && (!(outboundDepartureDate.isAfter(FIRST_OF_NOVEMBER)
                        || returnDepartureDate.isAfter(THIRTY_FIRST_OF_OCTOBER)))) {
            return oldMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }

        if (!flight.isOneWay() && !isMyCompany(flight)) {
            return notMyCompanyHandBaggageInformationFactory.make();
        }

        return notMyCompanyHandBaggageInformationFactory.make();
    }

    private class MyCompanyOneWayAfterTheFirstOfNovember {

        private final NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory;

        private MyCompanyOneWayAfterTheFirstOfNovember(NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory) {
            this.newMyCompanyHandBaggageInformationFactory = newMyCompanyHandBaggageInformationFactory;
        }

        public boolean canHandle(Flight flight, LocalDateTime flightOutboundDate) {
            return flight.isOneWay()
                        && isMyCompany(flight)
                        && flightOutboundDate.isAfter(FIRST_OF_NOVEMBER);
        }

+       public HandBaggageInformation getFrom(String renderLanguage) {
+               return this.newMyCompanyHandBaggageInformationFactory.from(renderLanguage);
+       }
    }
}
```

Then, we repeat the operation for all the conditions except for the ones that use our default
value, `notMyCompanyHandBaggageInformationFactory` method `make()`. First of all, we remove the condition that once true uses the default behaviour (`!flight.isOneWay() && !isMyCompany(flight)`), because it is redundant. Then, for each remaining
condition we create a class containing the evaluation of the condition and the related action.  
I skip this step by step diff because it is a repetition of the previous one, but in the repo there are all the commits
that show the process. The resulting code, after having extracted all the conditions, is the
following. ([Source code](https://github.com/bonfa/IfRemovingARealUseCase/blob/529ca3d37906d6c94ae3bb28ecf810e3f9e75e3b/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))

```java
public class HandBaggageInformationFactory {
    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);
        LocalDateTime flightOutboundDate = flight.getFirstLeg().getFirstHop().getDeparture().getDate();
        LocalDateTime outboundDepartureDate = order.getOutboundDepartureDate();
        LocalDate returnDepartureDate = order.getReturnDepartureDate();

        NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory =
                new NewMyCompanyHandBaggageInformationFactory(translationRepository);
        OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory =
                new OldMyCompanyHandBaggageInformationFactory(translationRepository);
        NotMyCompanyHandBaggageInformationFactory notMyCompanyHandBaggageInformationFactory =
                new NotMyCompanyHandBaggageInformationFactory();

        MyCompanyOneWayAfterTheFirstOfNovember myCompanyOneWayAfterTheFirstOfNovember =
                new MyCompanyOneWayAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
        if (myCompanyOneWayAfterTheFirstOfNovember.canHandle(flight, flightOutboundDate)) {
            return myCompanyOneWayAfterTheFirstOfNovember.getFrom(renderLanguage);
        }

        MyCompanyOneWayBeforeTheFirstOfNovember myCompanyOneWayBeforeTheFirstOfNovember =
                new MyCompanyOneWayBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);
        if (myCompanyOneWayBeforeTheFirstOfNovember.canHandle(flight, flightOutboundDate)) {
            return myCompanyOneWayBeforeTheFirstOfNovember.getFrom(renderLanguage);
        }

        MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember =
                new MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
        if (myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember.canHandle(flight, outboundDepartureDate, returnDepartureDate)) {
            return myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember
                    .getFrom(renderLanguage);
        }

        MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember = new
                MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);
        if (myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember.canHandle(flight, outboundDepartureDate, returnDepartureDate)) {
            return myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember.getFrom(renderLanguage);
        }

        return notMyCompanyHandBaggageInformationFactory.make();
    }

    private class MyCompanyOneWayAfterTheFirstOfNovember {

        private final NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory;

        private MyCompanyOneWayAfterTheFirstOfNovember(NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory) {
            this.newMyCompanyHandBaggageInformationFactory = newMyCompanyHandBaggageInformationFactory;
        }

        public boolean canHandle(Flight flight, LocalDateTime flightOutboundDate) {
            return flight.isOneWay()
                    && isMyCompany(flight)
                    && flightOutboundDate.isAfter(FIRST_OF_NOVEMBER);
        }

        public HandBaggageInformation getFrom(String renderLanguage) {
            return this.newMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }
    }

    private class MyCompanyOneWayBeforeTheFirstOfNovember {
        private final OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory;

        private MyCompanyOneWayBeforeTheFirstOfNovember(OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory) {
            this.oldMyCompanyHandBaggageInformationFactory = oldMyCompanyHandBaggageInformationFactory;
        }

        public boolean canHandle(Flight flight, LocalDateTime flightOutboundDate) {
            return flight.isOneWay() && isMyCompany(flight) && !flightOutboundDate.isAfter(FIRST_OF_NOVEMBER);
        }

        private HandBaggageInformation getFrom(String renderLanguage) {
            return this.oldMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }
    }

    private class MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember {
        private final NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory;

        public MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember(NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory) {
            this.newMyCompanyHandBaggageInformationFactory = newMyCompanyHandBaggageInformationFactory;
        }

        public boolean canHandle(Flight flight, LocalDateTime outboundDepartureDate, LocalDate returnDepartureDate) {
            return !flight.isOneWay() && isMyCompany(flight) && (outboundDepartureDate.isAfter(FIRST_OF_NOVEMBER)
                    || returnDepartureDate.isAfter(THIRTY_FIRST_OF_OCTOBER));
        }

        public HandBaggageInformation getFrom(String renderLanguage) {
            return this.newMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }
    }

    private class MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember {
        private final OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory;

        private MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember(OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory) {
            this.oldMyCompanyHandBaggageInformationFactory = oldMyCompanyHandBaggageInformationFactory;
        }

        private boolean canHandle(Flight flight, LocalDateTime outboundDepartureDate, LocalDate returnDepartureDate) {
            return !flight.isOneWay() && isMyCompany(flight) && (!(outboundDepartureDate.isAfter(FIRST_OF_NOVEMBER)
                    || returnDepartureDate.isAfter(THIRTY_FIRST_OF_OCTOBER)));
        }

        public HandBaggageInformation getFrom(String renderLanguage) {
            return oldMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }
    }
}
```

##### 3. Create a common signature to extract the chain item

The purpose here is to obtain a common signature for all the conditions we have just extracted. As this part is more
domain oriented, I am not diving into the details. Just notice the three main modifications:

* the `Order` has the same information as the `Flight` for our case, so we remove the `Order` class in favor of
  the `Flight` class.
* Keep only one date, which is our threshold date, by playing a bit with `isAfter()` and `isBefore()`.
* Move some operations from the `HandBaggageInformationFactory` class to the `Flight` one, which is more domain
  oriented. ([Source code](https://github.com/bonfa/IfRemovingARealUseCase/blob/7936f7daf9d01d4139b0fcda9980078978009d7a/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))

So, after these operations the code looks like

```java
public class HandBaggageInformationFactory {
    private static final LocalDateTime FIRST_OF_NOVEMBER = LocalDateTime.of(2018, 11, 1, 0, 0, 0);

    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);

        NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory =
                new NewMyCompanyHandBaggageInformationFactory(translationRepository);
        OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory =
                new OldMyCompanyHandBaggageInformationFactory(translationRepository);
        NotMyCompanyHandBaggageInformationFactory notMyCompanyHandBaggageInformationFactory =
                new NotMyCompanyHandBaggageInformationFactory();

        MyCompanyOneWayAfterTheFirstOfNovember myCompanyOneWayAfterTheFirstOfNovember =
                new MyCompanyOneWayAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
        if (myCompanyOneWayAfterTheFirstOfNovember.canHandle(flight)) {
            return myCompanyOneWayAfterTheFirstOfNovember.getFrom(renderLanguage);
        }

        MyCompanyOneWayBeforeTheFirstOfNovember myCompanyOneWayBeforeTheFirstOfNovember =
                new MyCompanyOneWayBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);
        if (myCompanyOneWayBeforeTheFirstOfNovember.canHandle(flight)) {
            return myCompanyOneWayBeforeTheFirstOfNovember.getFrom(renderLanguage);
        }

        MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember =
                new MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
        if (myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember.canHandle(flight)) {
            return myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember
                    .getFrom(renderLanguage);
        }

        MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember = new
                MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);
        if (myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember.canHandle(flight)) {
            return myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember.getFrom(renderLanguage);
        }

        return notMyCompanyHandBaggageInformationFactory.make();
    }


    private class MyCompanyOneWayAfterTheFirstOfNovember {

        private final NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory;

        private MyCompanyOneWayAfterTheFirstOfNovember(NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory) {
            this.newMyCompanyHandBaggageInformationFactory = newMyCompanyHandBaggageInformationFactory;
        }

        public boolean canHandle(Flight flight) {
            return flight.isOneWay()
                    && flight.isMyCompany()
                    && flight.getOutboundDepartureDate().isAfter(FIRST_OF_NOVEMBER);
        }

        public HandBaggageInformation getFrom(String renderLanguage) {
            return this.newMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }
    }

    private class MyCompanyOneWayBeforeTheFirstOfNovember {
        private final OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory;

        private MyCompanyOneWayBeforeTheFirstOfNovember(OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory) {
            this.oldMyCompanyHandBaggageInformationFactory = oldMyCompanyHandBaggageInformationFactory;
        }

        public boolean canHandle(Flight flight) {
            return flight.isOneWay()
                    && flight.isMyCompany()
                    && !flight.getOutboundDepartureDate().isAfter(FIRST_OF_NOVEMBER);
        }

        private HandBaggageInformation getFrom(String renderLanguage) {
            return this.oldMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }
    }

    private class MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember {
        private final NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory;

        public MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember(NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory) {
            this.newMyCompanyHandBaggageInformationFactory = newMyCompanyHandBaggageInformationFactory;
        }

        public boolean canHandle(Flight flight) {
            return !flight.isOneWay()
                    && flight.isMyCompany()
                    && (flight.getOutboundDepartureDate().isAfter(FIRST_OF_NOVEMBER)
                        || flight.getReturnDepartureDate().isAfter(FIRST_OF_NOVEMBER)
                    );
        }

        public HandBaggageInformation getFrom(String renderLanguage) {
            return this.newMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }
    }

    private class MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember {
        private final OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory;

        private MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember(OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory) {
            this.oldMyCompanyHandBaggageInformationFactory = oldMyCompanyHandBaggageInformationFactory;
        }

        private boolean canHandle(Flight flight) {
            return !flight.isOneWay()
                    && flight.isMyCompany()
                    && (!(flight.getOutboundDepartureDate().isAfter(FIRST_OF_NOVEMBER)
                        || flight.getReturnDepartureDate().isAfter(FIRST_OF_NOVEMBER))
                    );
        }

        public HandBaggageInformation getFrom(String renderLanguage) {
            return oldMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }
    }
}
```  

##### 4. Extracting the interface of the chain item

By watching closely all the extracted conditions after the simplifications made, you can notice that now all the items
has a common method signature. And if you think that is time of an interface, you are totally right 🏆. So, we can
easily extract an interface from one conditions chosen randomly, for example `MyCompanyOneWayAfterTheFirstOfNovember`. 
([Source code](https://github.com/bonfa/IfRemovingARealUseCase/blob/3e1cac2443d4bd5b0929917b2fc95808a21bc9ca/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))

If you use Idea, its `Extract interface` feature can be helpful.

```diff
+   public interface HandBaggageInformationPolicy {
+       boolean canHandle(Flight flight);
+       HandBaggageInformation getFrom(String renderLanguage);
+   }


public class HandBaggageInformationFactory {
    private static final LocalDateTime FIRST_OF_NOVEMBER = LocalDateTime.of(2018, 11, 1, 0, 0, 0);

    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);

        NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory =
                new NewMyCompanyHandBaggageInformationFactory(translationRepository);
        OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory =
                new OldMyCompanyHandBaggageInformationFactory(translationRepository);
        NotMyCompanyHandBaggageInformationFactory notMyCompanyHandBaggageInformationFactory =
                new NotMyCompanyHandBaggageInformationFactory();

        MyCompanyOneWayAfterTheFirstOfNovember myCompanyOneWayAfterTheFirstOfNovember =
                new MyCompanyOneWayAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
        if (myCompanyOneWayAfterTheFirstOfNovember.canHandle(flight)) {
            return myCompanyOneWayAfterTheFirstOfNovember.getFrom(renderLanguage);
        }

        MyCompanyOneWayBeforeTheFirstOfNovember myCompanyOneWayBeforeTheFirstOfNovember =
                new MyCompanyOneWayBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);
        if (myCompanyOneWayBeforeTheFirstOfNovember.canHandle(flight)) {
            return myCompanyOneWayBeforeTheFirstOfNovember.getFrom(renderLanguage);
        }

        MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember =
                new MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
        if (myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember.canHandle(flight)) {
            return myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember
                    .getFrom(renderLanguage);
        }

        MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember = new
                MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);
        if (myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember.canHandle(flight)) {
            return myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember.getFrom(renderLanguage);
        }

        return notMyCompanyHandBaggageInformationFactory.make();
    }

-   private class MyCompanyOneWayAfterTheFirstOfNovember {
+   private class MyCompanyOneWayAfterTheFirstOfNovember implements HandBaggageInformationPolicy {

        private final NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory;

        private MyCompanyOneWayAfterTheFirstOfNovember(NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory) {
            this.newMyCompanyHandBaggageInformationFactory = newMyCompanyHandBaggageInformationFactory;
        }

+       @Override
        public boolean canHandle(Flight flight) {
            return flight.isOneWay()
                    && flight.isMyCompany()
                    && flight.getOutboundDepartureDate().isAfter(FIRST_OF_NOVEMBER);
        }

+       @Override
        public HandBaggageInformation getFrom(String renderLanguage) {
            return this.newMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }
    }

    private class MyCompanyOneWayBeforeTheFirstOfNovember {
        private final OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory;

        private MyCompanyOneWayBeforeTheFirstOfNovember(OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory) {
            this.oldMyCompanyHandBaggageInformationFactory = oldMyCompanyHandBaggageInformationFactory;
        }

        public boolean canHandle(Flight flight) {
            return flight.isOneWay()
                    && flight.isMyCompany()
                    && !flight.getOutboundDepartureDate().isAfter(FIRST_OF_NOVEMBER);
        }

        private HandBaggageInformation getFrom(String renderLanguage) {
            return this.oldMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }
    }

    private class MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember {
        private final NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory;

        public MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember(NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory) {
            this.newMyCompanyHandBaggageInformationFactory = newMyCompanyHandBaggageInformationFactory;
        }

        public boolean canHandle(Flight flight) {
            return !flight.isOneWay()
                    && flight.isMyCompany()
                    && (flight.getOutboundDepartureDate().isAfter(FIRST_OF_NOVEMBER)
                        || flight.getReturnDepartureDate().isAfter(FIRST_OF_NOVEMBER)
                    );
        }

        public HandBaggageInformation getFrom(String renderLanguage) {
            return this.newMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }
    }

    private class MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember {
        private final OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory;

        private MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember(OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory) {
            this.oldMyCompanyHandBaggageInformationFactory = oldMyCompanyHandBaggageInformationFactory;
        }

        private boolean canHandle(Flight flight) {
            return !flight.isOneWay()
                    && flight.isMyCompany()
                    && (!(flight.getOutboundDepartureDate().isAfter(FIRST_OF_NOVEMBER)
                        || flight.getReturnDepartureDate().isAfter(FIRST_OF_NOVEMBER))
                    );
        }

        public HandBaggageInformation getFrom(String renderLanguage) {
            return oldMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }
    }
}
```

And then, we are going to make all the conditions implement the interface `HandBaggageInformationPolicy`.
([Source code](https://github.com/bonfa/IfRemovingARealUseCase/blob/9cf7b408ff15217894b3e101b47886f8ce993a97/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))

Unfortunately Idea won't help us in this.

```diff
public class HandBaggageInformationFactory {
    private static final LocalDateTime FIRST_OF_NOVEMBER = LocalDateTime.of(2018, 11, 1, 0, 0, 0);

    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        //same as before
    }


    private class MyCompanyOneWayAfterTheFirstOfNovember implements HandBaggageInformationPolicy {

        private final NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory;

        private MyCompanyOneWayAfterTheFirstOfNovember(NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory) {
            this.newMyCompanyHandBaggageInformationFactory = newMyCompanyHandBaggageInformationFactory;
        }

        @Override
        public boolean canHandle(Flight flight) {
            return flight.isOneWay()
                    && flight.isMyCompany()
                    && flight.getOutboundDepartureDate().isAfter(FIRST_OF_NOVEMBER);
        }

        @Override
        public HandBaggageInformation getFrom(String renderLanguage) {
            return this.newMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }
    }

-    private class MyCompanyOneWayBeforeTheFirstOfNovember {
+    private class MyCompanyOneWayBeforeTheFirstOfNovember implements HandBaggageInformationPolicy {
        private final OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory;

        private MyCompanyOneWayBeforeTheFirstOfNovember(OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory) {
            this.oldMyCompanyHandBaggageInformationFactory = oldMyCompanyHandBaggageInformationFactory;
        }

+       @Override
        public boolean canHandle(Flight flight) {
            return flight.isOneWay()
                    && flight.isMyCompany()
                    && !flight.getOutboundDepartureDate().isAfter(FIRST_OF_NOVEMBER);
        }

+       @Override
        public HandBaggageInformation getFrom(String renderLanguage) {
            return this.oldMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }
    }

-    private class MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember {
+    private class MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember implements HandBaggageInformationPolicy {
        private final NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory;

        public MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember(NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory) {
            this.newMyCompanyHandBaggageInformationFactory = newMyCompanyHandBaggageInformationFactory;
        }

+       @Override
        public boolean canHandle(Flight flight) {
            return !flight.isOneWay()
                    && flight.isMyCompany()
                    && (flight.getOutboundDepartureDate().isAfter(FIRST_OF_NOVEMBER)
                        || flight.getReturnDepartureDate().isAfter(FIRST_OF_NOVEMBER)
                    );
        }

+       @Override
        public HandBaggageInformation getFrom(String renderLanguage) {
            return this.newMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }
    }

-    private class MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember {
+    private class MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember implements HandBaggageInformationPolicy {
        private final OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory;

        private MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember(OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory) {
            this.oldMyCompanyHandBaggageInformationFactory = oldMyCompanyHandBaggageInformationFactory;
        }

+        @Override
        public boolean canHandle(Flight flight) {
            return !flight.isOneWay()
                    && flight.isMyCompany()
                    && (!(flight.getOutboundDepartureDate().isAfter(FIRST_OF_NOVEMBER)
                        || flight.getReturnDepartureDate().isAfter(FIRST_OF_NOVEMBER))
                    );
        }

+        @Override
        public HandBaggageInformation getFrom(String renderLanguage) {
            return oldMyCompanyHandBaggageInformationFactory.from(renderLanguage);
        }
    }
}
```

Then it's time to extract each policy into its own file and move all the policies into a package, that, for the sake of
giving meaningful names, we call `policy`. To do this, we need to duplicate our threshold constant into more than one
policy implementation. This could be arguable as it is a duplication. Of course, there are alternatives to this, like
making the constant public, but then we have the problem to decide where to put it.  
So, given the nature of our real case problem, in which the date will pass soon, and its very urgent time to market, we
decide to apply the ostrich algorithm (i.e. we are ignore this discussion) and prefer duplication over other solutions
🙈🙉🙊.

Also we move the creation of all the policies before the evaluation, for a reason you will understand in the next step.
([Source code](https://github.com/bonfa/IfRemovingARealUseCase/blob/66da72572de64865537c8baf8f24499ee6b841b7/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))

```diff
public class HandBaggageInformationFactory {
    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);

        NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory =
                new NewMyCompanyHandBaggageInformationFactory(translationRepository);
        OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory =
                new OldMyCompanyHandBaggageInformationFactory(translationRepository);
        NotMyCompanyHandBaggageInformationFactory notMyCompanyHandBaggageInformationFactory =
                new NotMyCompanyHandBaggageInformationFactory();

        MyCompanyOneWayAfterTheFirstOfNovember myCompanyOneWayAfterTheFirstOfNovember =
                new MyCompanyOneWayAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
+       MyCompanyOneWayBeforeTheFirstOfNovember myCompanyOneWayBeforeTheFirstOfNovember =
+               new MyCompanyOneWayBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);
+       MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember =
+               new MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
+       MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember = new
+               MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);

        if (myCompanyOneWayAfterTheFirstOfNovember.canHandle(flight)) {
            return myCompanyOneWayAfterTheFirstOfNovember.getFrom(renderLanguage);
        }

-       MyCompanyOneWayBeforeTheFirstOfNovember myCompanyOneWayBeforeTheFirstOfNovember =
-               new MyCompanyOneWayBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);
        if (myCompanyOneWayBeforeTheFirstOfNovember.canHandle(flight)) {
            return myCompanyOneWayBeforeTheFirstOfNovember.getFrom(renderLanguage);
        }

-       MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember =
-               new MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
        if (myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember.canHandle(flight)) {
            return myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember
                    .getFrom(renderLanguage);
        }

-       MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember = new
-               MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);
        if (myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember.canHandle(flight)) {
            return myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember.getFrom(renderLanguage);
        }

        return notMyCompanyHandBaggageInformationFactory.make();
    }
}
```

##### 5. Inject the chain at construction time

Now that we have all the policies created at the same point of our code, we can put all of them inside a list, loop over
the list and just apply the first policy satisfying the condition. In this way, we remove the chain of `if` in favor of
a chain of
responsibility. ([Source code](https://github.com/bonfa/IfRemovingARealUseCase/blob/4320112c0b1080ad59d89af2ea530c10f47ba57c/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))

```diff
public class HandBaggageInformationFactory {
    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);

        NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory =
                new NewMyCompanyHandBaggageInformationFactory(translationRepository);
        OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory =
                new OldMyCompanyHandBaggageInformationFactory(translationRepository);
        NotMyCompanyHandBaggageInformationFactory notMyCompanyHandBaggageInformationFactory =
                new NotMyCompanyHandBaggageInformationFactory();

        HandBaggageInformationPolicy myCompanyOneWayAfterTheFirstOfNovember =
                new MyCompanyOneWayAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
        HandBaggageInformationPolicy myCompanyOneWayBeforeTheFirstOfNovember =
                new MyCompanyOneWayBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);
        HandBaggageInformationPolicy myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember =
                new MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
        HandBaggageInformationPolicy myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember = new
                MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);

+       List<HandBaggageInformationPolicy> policies = Arrays.asList(
+               myCompanyOneWayAfterTheFirstOfNovember,
+               myCompanyOneWayBeforeTheFirstOfNovember,
+               myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember,
+               myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember
+       );
+
+       for (HandBaggageInformationPolicy policy : policies) {
+           if (policy.canHandle(flight)) {
+               return policy.getFrom(renderLanguage);
+           }
+       }

-       if (myCompanyOneWayAfterTheFirstOfNovember.canHandle(flight)) {
-           return myCompanyOneWayAfterTheFirstOfNovember.getFrom(renderLanguage);
-       }
-
-       if (myCompanyOneWayBeforeTheFirstOfNovember.canHandle(flight)) {
-           return myCompanyOneWayBeforeTheFirstOfNovember.getFrom(renderLanguage);
-       }
-
-       if (myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember.canHandle(flight)) {
-           return myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember
-                           .getFrom(renderLanguage);
-       }
-       if (myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember.canHandle(flight)) {
-           return myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember.getFrom(renderLanguage);
-       }

        return notMyCompanyHandBaggageInformationFactory.make();
    }
}
```

If you prefer, you can use a stream instead of a classical loop.

```diff
public class HandBaggageInformationFactory {
    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);

        NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory =
                new NewMyCompanyHandBaggageInformationFactory(translationRepository);
        OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory =
                new OldMyCompanyHandBaggageInformationFactory(translationRepository);
        NotMyCompanyHandBaggageInformationFactory notMyCompanyHandBaggageInformationFactory =
                new NotMyCompanyHandBaggageInformationFactory();

        HandBaggageInformationPolicy myCompanyOneWayAfterTheFirstOfNovember =
                new MyCompanyOneWayAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
        HandBaggageInformationPolicy myCompanyOneWayBeforeTheFirstOfNovember =
                new MyCompanyOneWayBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);
        HandBaggageInformationPolicy myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember =
                new MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
        HandBaggageInformationPolicy myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember = new
                MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);

        List<HandBaggageInformationPolicy> policies = Arrays.asList(
                myCompanyOneWayAfterTheFirstOfNovember,
                myCompanyOneWayBeforeTheFirstOfNovember,
                myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember,
                myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember
        );

+       return policies.stream()
+               .filter(policy -> policy.canHandle(flight))
+               .findFirst()
+               .map(policy -> policy.getFrom(renderLanguage))
+               .orElse(notMyCompanyHandBaggageInformationFactory.make());

-       for (HandBaggageInformationPolicy policy : policies) {
-           if (policy.canHandle(flight)) {
-               return policy.getFrom(renderLanguage);
-           }
-       }
-
-       return notMyCompanyHandBaggageInformationFactory.make();
    }
}
```

Now we are going to move the responsibility of creating the policies in a new class, named `HandBaggagePoliciesFactory`.
The purpose here, is to have each class which performs a single operation. Does it sound familiar 🤔? No? Yes? Well,
this is the *Single Responsibility Principle* 🤩. Again, if you use Idea, you can use its `Extract method object`
feature. I know, it's getting kind of repetitive 😅 but this is one of the refactoring commands we use most frequently
when we refactor code, so using it makes you save a lot of
time.([Source code](https://github.com/bonfa/IfRemovingARealUseCase/blob/0255c3442abd34a07832a367ca0ee04bfc624659/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))

```diff
public class HandBaggageInformationFactory {
    public HandBaggageInformation from(Order order, TranslationRepository translationRepository, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);

-       NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory =
-               new NewMyCompanyHandBaggageInformationFactory(translationRepository);
-       OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory =
-               new OldMyCompanyHandBaggageInformationFactory(translationRepository);
        NotMyCompanyHandBaggageInformationFactory notMyCompanyHandBaggageInformationFactory =
               new NotMyCompanyHandBaggageInformationFactory();

-       HandBaggageInformationPolicy myCompanyOneWayAfterTheFirstOfNovember =
-               new MyCompanyOneWayAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
-       HandBaggageInformationPolicy myCompanyOneWayBeforeTheFirstOfNovember =
-               new MyCompanyOneWayBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);
-       HandBaggageInformationPolicy myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember =
-               new MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
-       HandBaggageInformationPolicy myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember = new
-               MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);
-
-       List<HandBaggageInformationPolicy> policies = Arrays.asList(
-               myCompanyOneWayAfterTheFirstOfNovember,
-               myCompanyOneWayBeforeTheFirstOfNovember,
-               myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember,
-               myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember
-       );

+       List<HandBaggageInformationPolicy> policies = new HandBaggagePoliciesFactory().make(translationRepository);

        return policies.stream()
                .filter(policy -> policy.canHandle(flight))
                .findFirst()
                .map(policy -> policy.getFrom(renderLanguage))
                .orElse(notMyCompanyHandBaggageInformationFactory.make());
    }

+   private static class HandBaggagePoliciesFactory {
+       public List<HandBaggageInformationPolicy> make(TranslationRepository translationRepository) {
+           NewMyCompanyHandBaggageInformationFactory newMyCompanyHandBaggageInformationFactory =
+                   new NewMyCompanyHandBaggageInformationFactory(translationRepository);
+           OldMyCompanyHandBaggageInformationFactory oldMyCompanyHandBaggageInformationFactory =
+                   new OldMyCompanyHandBaggageInformationFactory(translationRepository);
+
+           HandBaggageInformationPolicy myCompanyOneWayAfterTheFirstOfNovember =
+                   new MyCompanyOneWayAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
+           HandBaggageInformationPolicy myCompanyOneWayBeforeTheFirstOfNovember =
+                   new MyCompanyOneWayBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);
+           HandBaggageInformationPolicy myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember =
+                   new MyCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember(newMyCompanyHandBaggageInformationFactory);
+           HandBaggageInformationPolicy myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember = new
+                   MyCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember(oldMyCompanyHandBaggageInformationFactory);
+
+           return Arrays.asList(
+                   myCompanyOneWayAfterTheFirstOfNovember,
+                   myCompanyOneWayBeforeTheFirstOfNovember,
+                   myCompanyRoundTripAtLeastOneDepartureAfterTheFirstOfNovember,
+                   myCompanyRoundTripAllDeparturesBeforeTheFirstOfNovember
+           );
+       }
+   }
}
```

And after extracting the class `HandBaggagePoliciesFactory` in its own file, we are going to inject the policies as
parameter at construction time of `HandBaggageInformationFactory`. In case of Idea, you can make the IDE work for you.
You can just make the `policies` variable of `from` method become a field, with the command `Extract field`, decide to
define it in the constructor and, then, simply use the `Extract parameter` feature in order to update all the
constructors of your object.

```diff
public class HandBaggageInformationFactory {

+   private final List<HandBaggageInformationPolicy> handBaggageInformationPolicies;

+   public HandBaggageInformationFactory(List<HandBaggageInformationPolicy> handBaggageInformationPolicies) {
+       this.handBaggageInformationPolicies = handBaggageInformationPolicies;
+   }

    public HandBaggageInformation from(Order order, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);

        NotMyCompanyHandBaggageInformationFactory notMyCompanyHandBaggageInformationFactory =
                new NotMyCompanyHandBaggageInformationFactory();

-       List<HandBaggageInformationPolicy> policies = new HandBaggagePoliciesFactory().make(translationRepository);

        return handBaggageInformationPolicies.stream()
                .filter(policy -> policy.canHandle(flight))
                .findFirst()
                .map(policy -> policy.getFrom(renderLanguage))
                .orElse(notMyCompanyHandBaggageInformationFactory.make());
    }

}
```

In our example, only the `HandBaggageInformationFactoryTest` has been updated. Notice, though, that we don't need to
perform changes on the tests at all. They still
pass. ([Source code](https://github.com/bonfa/IfRemovingARealUseCase/blob/99d743baa3d65c8041cb09af6dde757408914272/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))

```diff
public class HandBaggageInformationFactoryTest {

    private HandBaggageInformationFactory handBaggageInformationFactory;

    @Before
    public void setUp() {
        TranslationRepository translationRepository = Mockito.mock(TranslationRepository.class);
-        handBaggageInformationFactory = new HandBaggageInformationFactory();
+        handBaggageInformationFactory =
+                new HandBaggageInformationFactory(HandBaggagePoliciesFactory.make(translationRepository));
+        }

    //The rest is the same
}
```

In order to maintain the same level of abstraction, we are going to inject also
the `NotMyCompanyHandBaggageInformationFactory` into the `HandBaggageInformationFactory`.

```diff
public class HandBaggageInformationFactory {

    private final List<HandBaggageInformationPolicy> handBaggageInformationPolicies;
+   private final NotMyCompanyHandBaggageInformationFactory fallbackHandBaggageFactory;

-   public HandBaggageInformationFactory(List<HandBaggageInformationPolicy> handBaggageInformationPolicies) {
+   public HandBaggageInformationFactory(List<HandBaggageInformationPolicy> handBaggageInformationPolicies,
+                                        NotMyCompanyHandBaggageInformationFactory fallbackHandBaggageFactory) {
        this.handBaggageInformationPolicies = handBaggageInformationPolicies;
+       this.fallbackHandBaggageFactory = fallbackHandBaggageFactory;
+   }

    public HandBaggageInformation from(Order order, String renderLanguage, Integer flightId) {
        Flight flight = order.findFlight(flightId);

-       NotMyCompanyHandBaggageInformationFactory notMyCompanyHandBaggageInformationFactory =
-                       new NotMyCompanyHandBaggageInformationFactory();

        return handBaggageInformationPolicies.stream()
                .filter(policy -> policy.canHandle(flight))
                .findFirst()
                .map(policy -> policy.getFrom(renderLanguage))
                .orElse(fallbackHandBaggageFactory.make());
    }
}
```

And, then, again, the `HandBaggageInformationFactoryTest` gets
updated. ([Source code](https://github.com/bonfa/IfRemovingARealUseCase/blob/eac1ba3e1dc8f5cce3ba6c545349cd6d4730671e/src/main/java/it/fbonfadelli/hand_baggage/HandBaggageInformationFactory.java))

```diff
public class HandBaggageInformationFactoryTest {

 private HandBaggageInformationFactory handBaggageInformationFactory;

     @Before
     public void setUp() {
         TranslationRepository translationRepository = Mockito.mock(TranslationRepository.class);
         handBaggageInformationFactory =
            new HandBaggageInformationFactory(
                HandBaggagePoliciesFactory.make(translationRepository),
+                    new NotMyCompanyHandBaggageInformationFactory()
            );

     //The rest is the same
    }
}
```

And, that's it. You could keep on working on this piece of code to improve it more and more. But for post, we reached
our goal, so no more refactoring 👏.

##### Conclusion

In this article we saw how to transform, step by step, a nested if structure into a chain of responsibility. The purpose
of it is to make the code more readable and though easier to extend without introducing bugs. The main steps are flatten
the if structure into a sequence of plain if clauses, extract each if clause and its correspondent effect into a
separate class, extract an interface which is common to all the extracted classes, create an array containing all the
classes, loop over it by using the first item of the list that is able to handle the case you are dealing with, inject
the list of classes in order to make the class work with any combination of rules that you want. Additionally, we saw
some features of Idea IDE that allow us to perform most of the refactoring operations automatically, with only a few
shortcuts.
