---
title: "Golden master testing aka Characterization test: a powerful tool to win your fight against legacy code"
description: "In this post I will talk about golden master test aka characterization test: what it is and how to use
it."
date: 2018-03-20
image: ../images/posts/golden-master.jpg
tags: [test driven development, agile, clean code]
comments: true
math: false
authors: [fabrizio_duroni, emanuele_ianni]
---

*In this post I will talk about golden master test aka characterization test: what it is and how to use it.*

---

In the last few months the focus during my daily job was not only on mobile. I had the chance to work on some front-end
and back-end application of [lastminute.com group](https://lmgroup.lastminute.com/ "lastminute.com group"). In
particular, I worked with my team to renew the customer area of all the main brands sites:
volagratis.com, [lastminute.com](https://www.it.lastminute.com/ "lastminute")
and [rumbo.es](https://www.rumbo.es/ "rumbo"). During the last week I did pair programming
with [Emanuele Ianni](https://www.linkedin.com/in/emanueleianni/ "Emanuele Ianni"). Emanuele is a senior full-stack
software engineer and a true nerd :alien:/computer science lover :heart:. We needed to implement a new feature for a
family of microservices (based on Java 1.8 and Spring Boot) that make up the back-end of the customer area, both for web
and mobile apps of [lastminute.com group](https://lmgroup.lastminute.com/ "lastminute.com group"). Unfortunately, we
found some legacy code without tests, exactly where we planned to add the feature. At this moment Emanuele showed me the
Golden master testing technique. So what is golden master testing? As always (and maybe you can expect it because you
are a huge fan of my blog and you read all my previous posts :laughing:) Wikipedia gives us all the answer we need:

> In computer programming, a **characterization test (also known as Golden Master Testing)** is a means to describe (characterize) the actual behavior of an existing piece of software, and therefore protect existing behavior of legacy code against unintended changes via automated testing. This term was coined by **Michael Feathers**...... When  creating a characterization test, one must observe what outputs occur for a given set of inputs. Given an observation that the legacy code gives a certain output based on given inputs, then a test can be written that asserts that the output of the legacy code matches the observed result for the given inputs.

So Golden master testing, mostly know as characterization test, is a technique by which we can be able to put large and
complex legacy code under test: we generated some output given some input for a piece of code, and we write tests in
which we assert that the output from the source code must be the same we received before. In this way we can start to
refactor a piece of code and be sure that our modifications didn't change the behaviour of the source code. Whoa!! No
more risky approaches to do refactoring without tests!!! :relieved: :clap:  
Now it's time for an example. In this article I will show you a simple example where I apply this technique to put under
test a piece of legacy code. You can find the entire source code
in [this github repository](https://github.com/chicio/Golden-Master-Testing-Characterization-Test "Golden Master Testing Characterization Test repo")
.  
Suppose for example that you found this class, `TravelsAdapter`, in the code you're working on.

```java
public class TravelsAdapter {
    public List<Travel> adapt(JsonNode jsonNode) throws InvalidTravelException {
        List<Travel> travels = new ArrayList<>();
        JsonNode payloadNode = jsonNode.with("data");
        if (payloadNode.findValue("orderId") == null ||
                StringUtils.isBlank(payloadNode.findValue("orderId").textValue())) {
            throw new InvalidTravelException("Invalid order id");
        }
        long orderId = payloadNode.findValue("orderId").asLong();
        JsonNode flights = payloadNode.withArray("flights");
        if (flights.size() == 0) {
            throw new InvalidTravelException("Invalid json (no flights)");
        }
        flights.iterator().forEachRemaining(flight -> {
            ObjectNode nodeFlight = (ObjectNode) flight;
            if (nodeFlight.get("flightId") == null || StringUtils.isBlank(nodeFlight.get("flightId").textValue())) {
                try {
                    throw new InvalidTravelException("Invalid flightNumber value");
                } catch (InvalidTravelException e) {
                    e.printStackTrace();
                }
            }
            String flightNumber = nodeFlight.get("flightId").textValue();
            String arrivalAirport = nodeFlight.get("to").textValue();
            String departureAirport = nodeFlight.get("from").textValue();
            String airline = nodeFlight.get("airline").textValue();
            travels.add(new Travel(
                            orderId,
                            flight.toString(),
                            flightNumber,
                            airline,
                            departureAirport,
                            arrivalAirport));
        });
        return travels;
    }
}
```  

It's really a mess. So we start to think "I want to see the tests of this class to understand what it does", but we
search for them in the project and...there aren't any tests for this class!!! :fearful:. The logic contained in this
class seems a little bit twisted, and also it would take a lot of time to write a complete suite of test case because we
need to understand from the beginning every single path contained in this class. This is a case where golden master
testing could help us.  
The first thing we can do is to observe the method returns a list of `Travel` objects. To write our golden master tests
we need to find a way to do a comparison between the `Travel` objects returned from the `adapt` method and the one we
expect. To do this we can add for example a `toString` method the `Travel` class and test the returned value from it. So
the `Travel` class will be the following one.

```java
public class Travel {
    private final long orderId;
    private final String flights;
    private final String flightId;
    private final String airline;
    private final String departureAirport;
    private final String arrivalAirport;

    Travel(long orderId,
           String flights,
           String flightId,
           String airline,
           String departureAirport,
           String arrivalAirport) {
        this.orderId = orderId;
        this.flights = flights;
        this.flightId = flightId;
        this.airline = airline;
        this.departureAirport = departureAirport;
        this.arrivalAirport = arrivalAirport;
    }

    @Override
    public String toString() {
        return "Travel{" +
                    "orderId=" + orderId + ", " +
                    "flights='" + flights + '\'' + ", " +
                    "flightId='" + flightId + '\'' + ", " +
                    "airline='" + airline + '\'' + ", " +
                    "departureAirport='" + departureAirport + '\'' + ", " +
                    "arrivalAirport='" + arrivalAirport + '\'' +
                '}';
    }
}
```

Now we can write some tests and use the output as the expectation. In this way we will be sure that if we start to do
some refactoring operation on this class our modification didn't broken any behaviour of the class. So we can do our
refactoring with an high level of confidence that everything is working as it was working before our modification :
relieved:. To get the output for the test, you can write your test and made them fails, and in the meanwhile log the
result so that we can copy it and use it in the next run iteration of our test. The following test is the one we
generated for the class we saw before.

```java
public class TravelsAdapterTest {

    @Test
    public void goldenMaster() throws IOException, InvalidTravelException {
        TravelsAdapter travelsAdapter = new TravelsAdapter();

        List<Travel> travels = travelsAdapter.adapt(generateRequest());

        StringBuilder builder = new StringBuilder();
        travels.forEach(bp -> {
            builder.append(bp.toString());
            builder.append("\n");
        });
        assertThat(
                builder.toString(),
                is("Travel{" +
                            "orderId=0, " +
                            "flights='{" +
                                "\"from\":\"MXP\"," +
                                "\"to\":\"FCO\"," +
                                "\"flightId\":\"1111\"," +
                                "\"direction\":\"OUTBOUND\"," +
                                "\"airline\":\"U2\"," +
                                "\"departure\":\"2018-04-20T12:00:00\"," +
                                "\"boardingCard\":{" +
                                    "\"id\":\"485\"," +
                                    "\"firstName\":\"Fabrizio\"," +
                                    "\"lastName\":\" Duroni\"," +
                                    "\"seat\":\"V23\"," +
                                    "\"urls\":[" +
                                        "\"http://aboardingcard/resource1\"," +
                                        "\"http://aboardingcard/resource2\"," +
                                        "\"http://aboardingcard/resource3\"" +
                                "]}}', " +
                                "flightId='1111', " +
                                "airline='U2', " +
                                "departureAirport='MXP', " +
                                "arrivalAirport='FCO'" +
                          "}\n" +
                        "Travel{" +
                            "orderId=0, " +
                            "flights='{" +
                                "\"from\":\"FCO\"," +
                                "\"to\":\"MXP\"," +
                                "\"flightId\":\"1112\"," +
                                "\"direction\":\"RETURN\"," +
                                "\"airline\":\"AA\"," +
                                "\"departure\":\"2018-05-01T10:00:00\"," +
                                "\"boardingCard\":{" +
                                    "\"id\":\"486\"," +
                                    "\"firstName\":\"Chiara\"," +
                                    "\"lastName\":\"Polito\"," +
                                    "\"seat\":\"A15\"," +
                                    "\"urls\":[" +
                                        "\"http://aboardingcard/resource1\"," +
                                        "\"http://aboardingcard/resource2\"," +
                                        "\"http://aboardingcard/resource3\"" +
                                    "]}}', " +
                                    "flightId='1112', " +
                                    "airline='AA', " +
                                    "departureAirport='FCO', " +
                                    "arrivalAirport='MXP'" +
                        "}\n"
                )
        );
    }

    private JsonNode generateRequest() throws IOException {
        return new ObjectMapper().readTree(
                "{\n" +
                "  \"data\": {\n" +
                "    \"orderId\": \"73hb6yh3be6ebe63bdy6\",\n" +
                "    \"flights\": [\n" +
                "      {\n" +
                "        \"from\": \"MXP\",\n" +
                "        \"to\": \"FCO\",\n" +
                "        \"flightId\": \"1111\",\n" +
                "        \"direction\": \"OUTBOUND\",\n" +
                "        \"airline\": \"U2\",\n" +
                "        \"departure\": \"2018-04-20T12:00:00\",\n" +
                "        \"boardingCard\": {\n" +
                "            \"id\": \"485\",\n" +
                "            \"firstName\": \"Fabrizio\",\n" +
                "            \"lastName\": \" Duroni\",\n" +
                "            \"seat\": \"V23\",\n" +
                "            \"urls\": [\n" +
                "              \"http://aboardingcard/resource1\",\n" +
                "              \"http://aboardingcard/resource2\",\n" +
                "              \"http://aboardingcard/resource3\"\n" +
                "            ]\n" +
                "        }\n" +
                "      },\n" +
                "      {\n" +
                "        \"from\": \"FCO\",\n" +
                "        \"to\": \"MXP\",\n" +
                "        \"flightId\": \"1112\",\n" +
                "        \"direction\": \"RETURN\",\n" +
                "        \"airline\": \"AA\",\n" +
                "        \"departure\": \"2018-05-01T10:00:00\",\n" +
                "        \"boardingCard\": {\n" +
                "            \"id\": \"486\",\n" +
                "            \"firstName\": \"Chiara\",\n" +
                "            \"lastName\": \"Polito\",\n" +
                "            \"seat\": \"A15\",\n" +
                "            \"urls\": [\n" +
                "              \"http://aboardingcard/resource1\",\n" +
                "              \"http://aboardingcard/resource2\",\n" +
                "              \"http://aboardingcard/resource3\"\n" +
                "            ]\n" +
                "        }\n" +
                "      }\n" +
                "    ]\n" +
                "  }\n" +
                "}"
        );
    }
}
```

In this example we generated just one test case, but usually a lot more of them. Basically we can apply a technique
named **"property testing"**: a lot of random input are generated so that there will be an high probability to execute
all the possible branch in our source code (and in this way have a higher test coverage). So we put our `TravelsAdapter`
under test and we can now start to work on this class without any kind of risk :relieved:. Now it's time to test this
technique in your legacy code :grin:.
