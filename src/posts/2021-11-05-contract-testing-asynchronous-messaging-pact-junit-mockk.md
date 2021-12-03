---
title: "Contract testing asynchronous messaging with Pact and MockK"
description: "In the last weeks I worked with my colleague Felice Giovinazzo on a new feature for the refund 
process. Let’s see how we used pact to test a message-based interaction between two microservices with Pact"
date: 2021-11-05
image: ../images/posts/pact-mockk-message.jpg
tags: [test driven development, contract test, pact, backend]
comments: true
math: false
authors: [fabrizio_duroni, felice_giovinazzo, stefano_varesi]
---

*In the last weeks I worked with my colleague Felice Giovinazzo on a new feature for the refund
process. Let’s see how we used pact to test a message-based interaction between two microservices with Pact*

---

In the last weeks I worked with my colleague [Felice Giovinazzo](https://www.linkedin.com/in/felice-giovinazzo-17277b55/) 
on a new feature for the refund process (as may already know from some of
[my previous posts](/2020/12/23/rest-template-webclient-spring-boot/ "kotlin spring boot") in the last 2 years I 
worked mainly on backend applications). In this new feature we have a messaging-based communication between
microservices. The messaging system used is [RabbitMQ](https://www.rabbitmq.com "rabbitmq"). In 
[lastminute.com group](https://www.lastminute.com) we are already using [Pact](https://docs.pact.io "pact doc") to 
implement contract testing for the classic RESTful interaction between microservices. What is contract testing? 
Let’s have a look at the definition from the Pact website.

> Contract tests assert that inter-application messages conform to a shared understanding that is documented in a 
> contract. Without contract testing, the only way to ensure that applications will work correctly together is by 
> using expensive and brittle integration tests.  
> Do you [set your house on fire to test your smoke alarm?](https://dius.com.au/2014/05/19/simplifying-micro-service-testing-with-pacts/) 
> No, you test the contract it holds with your ears by using the testing button. Pact provides that testing button 
> for your code, allowing you to safely confirm that your applications will work together without having to deploy 
> the world first.

So contract testing is a way to ensure that two application communicate correctly by adhering to a contract that
describe the API or the message exchanged between them. Cool, isn’t it? 😏

![contract testing pact](../images/posts/pact-contract-testing.jpg "Pact contract testing")

In this post I will show you how me and Felice tested a messaging interaction between two microservices using Pact with 
the help of [Stefano Varesi](https://www.linkedin.com/in/stefanovaresi/), a senior software engineer that works in 
the lastminute.com team that introduced Pact in the company. How does it work? Pact is a [consumer driven contract testing](https://martinfowler.com/articles/consumerDrivenContracts.html
"consumer driven contract testing"): it is responsibility of the consumer to generate the contract that will be used by
the provider to verify its correctness. As you can see from the image above, there are three key actors in pact test:

* the consumer of an API
* the provider of an API
* a pact broker, an application used to share contracts and verification results between consumers and providers.

The workflow to write a consumer driven contract test is the following one:

* write the contract test on the consumer
* publish the contract obtained by executing the contract test on the consumer side
* write the provider test using the contract published before as a proof of correctness of your API

The same flow is applied in case of a message/event driven architecture: start with the test of the message consumer,
publish the contract and then write the message producer test. Now that everything is clear we can start to write our
first Pact test for message exchange between two microservices. Let’s go!!! 🚀

#### Setup

Our example application is composed by two microservices:

* `RefundService`, a spring boot web application that manages everything related to the refund of an order of a
  customer. In our example this application will be the *producer* of a *refund ready message*.
* `AccountService`, a spring boot web application that manages everything related to the customer account. In our
  example this application will be the *consumer* of a *refund ready message* that came from the `RefundService`
  application.

Let's see the dependencies need by these applications. Both of them will depend on these libraries/languages:

* spring boot, kotlin, [arrow](https://arrow-kt.io "arrow kotlin") (kotlin functional programming library)
  production code
* spring boot starter test, [kotest](https://kotest.io) and [mockk](https://mockk.io) for the testing part

For writing our Pact test:

* `RefundService` will have the dependency needed in order to write the pact provider
  test `au.com. dius.pact.provider.junit5`
* `AccountService` will have the dependency needed in order to write the pact consumer
  test `au.com.dius.pact. consumer.junit5`

In the `AccountService` application, so on the consumer side, we need also to set up the maven
plugin `au.com.dius. pact.provider.maven` that will let us publish our contracts on the pact broker. Below you can find
the maven pom.xml of the applications.

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.6</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>it.chicio.pact.provider</groupId>
    <artifactId>RefundService</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>RefundService</name>
    <description>Message provider example</description>
    <properties>
        <java.version>11</java.version>
        <kotlin.version>1.5.31</kotlin.version>
        <arrow.version>1.0.0</arrow.version>
        <pact.version>4.2.14</pact.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-reflect</artifactId>
        </dependency>
        <dependency>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-stdlib-jdk8</artifactId>
        </dependency>
        <dependency>
            <groupId>com.fasterxml.jackson.module</groupId>
            <artifactId>jackson-module-kotlin</artifactId>
            <version>2.13.0</version>
        </dependency>
        <!-- arrow -->
        <dependency>
            <groupId>io.arrow-kt</groupId>
            <artifactId>arrow-core</artifactId>
            <version>${arrow.version}</version>
        </dependency>
        <!-- base test dependencies -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>io.kotest</groupId>
            <artifactId>kotest-runner-junit5-jvm</artifactId>
            <version>4.6.3</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>io.mockk</groupId>
            <artifactId>mockk</artifactId>
            <version>1.12.0</version>
            <scope>test</scope>
        </dependency>
        <!-- pact provider dependency -->
        <dependency>
            <groupId>au.com.dius.pact.provider</groupId>
            <artifactId>junit5</artifactId>
            <version>4.2.14</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <sourceDirectory>${project.basedir}/src/main/kotlin</sourceDirectory>
        <testSourceDirectory>${project.basedir}/src/test/kotlin</testSourceDirectory>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>org.jetbrains.kotlin</groupId>
                <artifactId>kotlin-maven-plugin</artifactId>
                <configuration>
                    <args>
                        <arg>-Xjsr305=strict</arg>
                    </args>
                    <compilerPlugins>
                        <plugin>spring</plugin>
                    </compilerPlugins>
                </configuration>
                <dependencies>
                    <dependency>
                        <groupId>org.jetbrains.kotlin</groupId>
                        <artifactId>kotlin-maven-allopen</artifactId>
                        <version>${kotlin.version}</version>
                    </dependency>
                </dependencies>
            </plugin>
        </plugins>
    </build>

</project>
```

```xml
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.6</version>
        <relativePath/>
    </parent>
    <groupId>it.chicio.pact.consumer</groupId>
    <artifactId>AccountService</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>AccountService</name>
    <description>Message consumer example</description>
    <properties>
        <java.version>11</java.version>
        <kotlin.version>1.5.31</kotlin.version>
        <arrow.version>1.0.0</arrow.version>
        <pact.version>4.2.14</pact.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter</artifactId>
        </dependency>
        <dependency>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-reflect</artifactId>
        </dependency>
        <dependency>
            <groupId>org.jetbrains.kotlin</groupId>
            <artifactId>kotlin-stdlib-jdk8</artifactId>
        </dependency>
        <!-- arrow -->
        <dependency>
            <groupId>io.arrow-kt</groupId>
            <artifactId>arrow-core</artifactId>
            <version>${arrow.version}</version>
        </dependency>
        <!-- base test dependencies -->
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>io.kotest</groupId>
            <artifactId>kotest-runner-junit5-jvm</artifactId>
            <version>4.6.3</version>
            <scope>test</scope>
        </dependency>
        <dependency>
            <groupId>io.mockk</groupId>
            <artifactId>mockk</artifactId>
            <version>1.12.0</version>
            <scope>test</scope>
        </dependency>
        <!-- pact consumer dependency -->
        <dependency>
            <groupId>au.com.dius.pact.consumer</groupId>
            <artifactId>junit5</artifactId>
            <version>${pact.version}</version>
            <scope>test</scope>
        </dependency>
    </dependencies>

    <build>
        <sourceDirectory>${project.basedir}/src/main/kotlin</sourceDirectory>
        <testSourceDirectory>${project.basedir}/src/test/kotlin</testSourceDirectory>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
            <plugin>
                <groupId>org.jetbrains.kotlin</groupId>
                <artifactId>kotlin-maven-plugin</artifactId>
                <configuration>
                    <args>
                        <arg>-Xjsr305=strict</arg>
                    </args>
                    <compilerPlugins>
                        <plugin>spring</plugin>
                    </compilerPlugins>
                </configuration>
                <dependencies>
                    <dependency>
                        <groupId>org.jetbrains.kotlin</groupId>
                        <artifactId>kotlin-maven-allopen</artifactId>
                        <version>${kotlin.version}</version>
                    </dependency>
                </dependencies>
            </plugin>
            <!-- pact publish plugin -->
            <plugin>
                <groupId>au.com.dius.pact.provider</groupId>
                <artifactId>maven</artifactId>
                <version>${pact.version}</version>
                <configuration>
                    <pactBrokerUrl>http://localhost</pactBrokerUrl>
                </configuration>
            </plugin>
        </plugins>
    </build>

</project>
```

Now we need to set up our pact broker. For our example we can create a local instance using the docker compose file
contained in the [pact broker official repo](https://github.com/pact-foundation/pact-broker-docker#running-with-docker-compose). Obviously for a real 
production case you need to host your broker somewhere in your environment. The services initialized in the docker 
compose file include:

* the pact broker PostgreSQL database instance
* the pact broker web app
* a nginx instance used as reverse proxy (in fact if you want to use/keep it in the docker compose file you have to 
  download from the pact broker repository also the self-signed certificate used for TLS). 

Below you can find the entire docker compose file. 

```dockerfile
version: "3"

services:
  postgres:
    image: postgres
    healthcheck:
      test: psql postgres --command "select 1" -U postgres
    volumes:
      - postgres-volume:/var/lib/postgresql/data
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: password
      POSTGRES_DB: postgres

  pact-broker:
    image: pactfoundation/pact-broker:2.89.0.0
    ports:
      - "9292:9292"
    depends_on:
      - postgres
    environment:
      PACT_BROKER_PORT: '9292'
      PACT_BROKER_DATABASE_URL: "postgres://postgres:password@postgres/postgres"
      PACT_BROKER_LOG_LEVEL: INFO
      PACT_BROKER_SQL_LOG_LEVEL: DEBUG
      # PACT_BROKER_DATABASE_CONNECT_MAX_RETRIES is only needed for docker-compose
      # because the database takes longer to start up than the puma process
      # Should not be needed in production.
      PACT_BROKER_DATABASE_CONNECT_MAX_RETRIES: "5"
      # The list of allowed base URLs (not setting this makes the app vulnerable to cache poisoning)
      # This allows the app to be addressed from the host from within another docker container correctly
      PACT_BROKER_BASE_URL: 'https://localhost http://localhost http://localhost:9292 http://pact-broker:9292'

  # Nginx is not necessary, but demonstrates how
  # one might use a reverse proxy in front of the broker,
  # and includes the use of a self-signed TLS certificate
  nginx:
    image: nginx:alpine
    depends_on:
      - pact-broker
    volumes:
      - ./ssl/nginx.conf:/etc/nginx/conf.d/default.conf:ro
      - ./ssl:/etc/nginx/ssl
    ports:
      - "443:443"
      - "80:80"
volumes:
  postgres-volume: 
```

We can build all the containers defined in it with the docker compose commands below.

```shell
docker-compose build
docker-compose up
```

After running the commands above we will have a pact broker local instance. We can access it in the browser 
(as localhost) and below you can see the homepage with an example contract listed. We are now ready to write our test.

![pact broker](../images/posts/pact-broker-homepage.jpg "Pact broker homepage")

#### Implementation

As we said in the introduction, we are using the consumer driven contract test approch. This means that for our 
example we will start from `AccountService`, the message consumer. In this microservice we have a 
`RefundReadyMessageConsumer`, that consume the message received from `RefundService`. Inside this class we have two 
collaborator:

* `RefundReadyMessagePayloadExtractor`, a collaborator that extract the payload from the message received
* `SendCommunicationForRefundReadyUseCase`, a use case that uses the payload information to send a communication to 
  the user

The payload of the message, represented by the `RefundReadyMessage` data class is very simple. It contains the id 
that identify the refund due to the user and the relative amount (represented as a combination of value and currency).

```kotlin
data class Money(
    val value: BigDecimal,
    val currency: String
)

data class RefundReadyMessage(
    val refundId: Long,
    val amount: Money
)

interface RefundReadyMessagePayloadExtractor {
    fun extract(message: String): Either<CantExtractMessage, RefundReadyMessage>
}

object RefundCommunicationSent

interface SendCommunicationForRefundReadyUseCase {
    fun execute(refundReadyMessage: RefundReadyMessage): Either<CantCommunicateRefund, RefundCommunicationSent>
}

sealed class RefundReadyMessageConsumerError {
    object CantExtractMessage: RefundReadyMessageConsumerError()
    object CantCommunicateRefund: RefundReadyMessageConsumerError()
}

class RefundReadyMessageConsumer(
    private val refundReadyMessagePayloadExtractor: RefundReadyMessagePayloadExtractor,
    private val sendCommunicationForRefundReadyUseCase: SendCommunicationForRefundReadyUseCase
) {
    fun consume(message: String): Either<RefundReadyMessageConsumerError, RefundCommunicationSent> =
        refundReadyMessagePayloadExtractor
            .extract(message)
            .flatMap { refundReadyMessage ->
                sendCommunicationForRefundReadyUseCase.execute(refundReadyMessage)
            }
}
```

As you can see our example consumer application is very simple. Let's start to write the consumer Pact test for our 
`RefundReadyMessageConsumer`. We create a new test class `RefundReadyMessageConsumerPactTest`. First we need to add 
some annotations:

* `@ExtendWith(PactConsumerTestExt::class, MockKExtension::class)` to add the Pact and 
  MockK [JUnit 5 extensions](https://junit.org/junit5/docs/current/user-guide/#extensions), in order to be able to 
  use the Pact and MockK capabilities in our test. 
* `@PactTestFor(providerName = "refund-service", providerType = ProviderType.ASYNCH)`, to tell the Pact extension 
  how to set up the Pact test. In our case we are defining a provider named `refund-service` of type `ProviderType.
  ASYNCH`.

Then we need to mock the collaborator of our consumer `refundReadyMessagePayloadExtractor` and 
`sendCommunicationForRefundReadyUseCase`. We can do it by using the `@MockK` annotation. Now we are ready to write 
our pact. We can do it by adding a new method `refundReadyMessagePact` annotated with the `@Pact(consumer = "account-service", provider = 
"refund-service")` annotation. In this method we will define a pact where we expect to receive a message, 
represented in our test as an instance of `MessagePact`, that contains the data we listed above 
(refund id, and amount). The two actors of our pact are `refund-service` and `account-service`. The first one will 
send us a message `"a refund ready to be sent to the user"`, stated by the `given` method of the 
`MessagePactBuilder` class, and we expect to receive `"the refund data to be communicated"`, stated by the 
`expectsToReceive` method (again of the`MessagePactBuilder` class). The payload of the message is represented as 
instance of `PactDslJsonBody`.  
Now we can write our test to receive that we are consuming the message in the right way. To do this we need to 
create a new test method annotaed with the standard `@Test` JUnit 5 annotation. We need also to add the `@PactTestFor
(pactMethod = "refundReadyMessagePact")`, that instruct the Pact extension to inject the `MessagePact` generated 
from the pact created by the `refundReadyMessagePact` method we talked about before. So the signature of the test 
will have `messages: List<Message>` parameter with the list of message we defined in our pact (in our case it is 
just one message). We can now instruct the mocks and write our assertions on the result of the `consume` method of our 
`RefundReadyMessageConsumer`. At this point we should have a green test like the one below, and it should be already 
green :white_check_mark: :smirk:.

```kotlin
@ExperimentalUnsignedTypes
@ExtendWith(PactConsumerTestExt::class, MockKExtension::class)
@PactTestFor(providerName = "refund-service", providerType = ProviderType.ASYNCH)
class RefundReadyMessageConsumerPactTest {
    @MockK
    private lateinit var refundReadyMessagePayloadExtractor: RefundReadyMessagePayloadExtractor
    @MockK
    private lateinit var sendCommunicationForRefundReadyUseCase: SendCommunicationForRefundReadyUseCase

    @Pact(consumer = "account-service", provider = "refund-service")
    fun refundReadyMessagePact(builder: MessagePactBuilder): MessagePact {
        return builder
            .given("a refund ready to be sent to the user")
            .hasPactWith("refund-service")
            .expectsToReceive("the refund data to be communicated")
            .withContent(
                PactDslJsonBody()
                    .numberType("refundId", 123)
                    .`object`(
                        "amount",
                        PactDslJsonBody()
                            .numberType("value", 100)
                            .stringType("currency", "EUR")
                    )
            )
            .toPact()
    }

    @Test
    @PactTestFor(pactMethod = "refundReadyMessagePact")
    fun `consume refund ready message`(messages: List<Message>) {
        every {
            refundReadyMessagePayloadExtractor.extract("{\"amount\":{\"currency\":\"EUR\",\"value\":100},\"refundId\":123}")
        } returns refundReadyMessage.right()
        every {
            sendCommunicationForRefundReadyUseCase.execute(refundReadyMessage)
        } returns RefundCommunicationSent.right()

        RefundReadyMessageConsumer(refundReadyMessagePayloadExtractor, sendCommunicationForRefundReadyUseCase)
            .consume(messages[0].contentsAsString()) shouldBe RefundCommunicationSent.right()

        verify(exactly = 1) {
            refundReadyMessagePayloadExtractor.extract("{\"amount\":{\"currency\":\"EUR\",\"value\":100},\"refundId\":123}")
            sendCommunicationForRefundReadyUseCase.execute(refundReadyMessage)
        }
    }

    private companion object {
        private val refundReadyMessage = RefundReadyMessage(123, Money(BigDecimal("100"), "EUR"))
    }
}
```

Now that our test is ready and green, how can we publish the contract to the Pact Broker? If we have a look at the 
`target` folder of our application after running the test, we will find a new `pacts` folder that contains a json 
named `account-service-refund-service.json`: this is our contract!!! :rocket: If you remember the introduction set up,
we installed a plugin in order to publish the contract to the broker. So the only thing we have to do is launch the 
following command and the contract will be published on the pact broker.

```shell
mvn pact:publish
```

![pact publish example](../images/posts/pact-publish-example.jpg "Pact publish example")

If we reload the pact broker homepage now we should see a new contract, the one we just published, with all the data 
needed by the provider to verify its payload. Below you can see a screenshot of the pact broker that show our new 
contract.

![pact broker contract message example](../images/posts/pact-broker-homepage.jpg "Our Pact broker contract message 
page")

Now we can write our provider test. Let's see first the `RefundService` codebase. As our consumer, it is very simple.
We have a `RefundReadyMessageProducer` that produce a Refund Ready message as a string. It uses `RefundRepository` 
as collaborator to get the information about the refund of a user, represented as a `Refund` data class (again with 
id and amount of the refund).

```kotlin
data class Money(
    val value: BigDecimal,
    val currency: String
)

data class Refund(
    val refundId: Long,
    val amount: Money
)

interface RefundRepository {
    fun get(refundId: Long): Either<RefundReadyMessageProducerError.RefundRepositoryError, Refund>
}

sealed class RefundReadyMessageProducerError {
    object RefundRepositoryError : RefundReadyMessageProducerError()
}

class RefundReadyMessageProducer(
    private val refundRepository: RefundRepository,
) {
    fun produceFor(refundId: Long): Either<RefundReadyMessageProducerError, String> =
        refundRepository
            .get(refundId)
            .flatMap {
                jacksonObjectMapper().writeValueAsString(it).right()
            }
}
```

Let's write our `RefundReadyMessageProducerTest`. As for the consumer, we need the `@ExtendWith
(MockKExtension::class)` to be able to use MockK as mocking framework. Then we have some Pact annotations and methods. 
These are needed in order to use the JUnit 5 Invocation Context Provider that will generate a test for each 
interaction found for the pact files for the provider. The annotations are:

* `@Provider("refund-service")`, to defined which provider we are
* `@Consumer("account-service")`, to define who is our consumer
* `@PactBroker(host = "localhost", port = "80")`, to define the location of the pact broker

Then we have the `testTemplate` and `before` methods that completes our setup. As you can see the target of our 
`PactVerificationContext` is of type `MessageTestTarget`. One important thing: in the constructor of 
`MessageTestTarget` we are passing the `packagesToScan = listOf(this::class.java.packageName)` parameter in order to 
let Pact search for pact methods (see below `@PactVerifyProvide`) only in the package of the class under test.

```kotlin
//...

@TestTemplate
@ExtendWith(PactVerificationInvocationContextProvider::class)
fun testTemplate(pact: Pact, interaction: Interaction, context: PactVerificationContext) {
    context.verifyInteraction()
}

@BeforeEach
fun before(context: PactVerificationContext) {
    context.target = MessageTestTarget(packagesToScan = listOf(this::class.java.packageName))
}

//...
```

At this point we can write our test. If you remember from the consumer test we defined a `given` section of our pact 
with the phrase `"a refund ready to be sent to the user"` and a `expectsToReceive` with the phrase `"the refund data to be communicated"`. These phrases 
are used as identifier by the `@State("a refund ready to be sent to the user")` and `@PactVerifyProvider("the refund 
data to be communicated")` annotation to understand which pact we are verifying. We can now just write our test by 
mocking our repository and let our producer return the message produced: Pact will do all the verification between 
the message we are generating in the test and the one contained in the contract. 

```kotlin
@ExtendWith(MockKExtension::class)
@Provider("refund-service")
@Consumer("account-service")
@PactBroker(host = "localhost", port = "80")
class RefundReadyMessageProducerTest {
    @MockK
    private lateinit var refundRepository: RefundRepository

    @TestTemplate
    @ExtendWith(PactVerificationInvocationContextProvider::class)
    fun testTemplate(pact: Pact, interaction: Interaction, context: PactVerificationContext) {
        context.verifyInteraction()
    }

    @BeforeEach
    fun before(context: PactVerificationContext) {
        context.target = MessageTestTarget(packagesToScan = listOf(this::class.java.packageName))
    }

    @State("a refund ready to be sent to the user")
    @PactVerifyProvider("the refund data to be communicated")
    fun `produce refund ready message`(): String {
        every {
            refundRepository.get(123)
        } returns Refund(
            123,
            Money(
                BigDecimal(100),
                "EUR"
            )
        ).right()

        return RefundReadyMessageProducer(refundRepository)
            .produceFor(123)
            .fold(
                { "invalid message" },
                { it }
            )
    }
}
```

At this point we should have a green test also on the provider, and our contract between our producer and consumer 
is verified!!! :rocket:

#### Conclusion

You can find the example described in this post in this 
[Github repository](https://github.com/chicio/Contract-Testing-Asynchronous-Messaging-Pact). As we saw from the 
example above Pact is a powerful testing tool. It lets you write consumer driven contract test that are faster than 
all the E2E/integration testing tools you can use in your application. But most important Pact gives you the ability 
to refactor the design of an API/message in a safe and controlled way :passport_control: :heart_eyes:. 
