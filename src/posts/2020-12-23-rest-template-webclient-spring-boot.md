---
title: "Spring Boot + Kotlin Rest client cheatsheet: RestTemplate and Webclient"
description: "During the last months I worked a lot with Spring Boot backend applications. In this post I explain how
you can consume a REST api from a Spring Boot application using RestTemplate and (the new) WebClient."
date: 2020-12-23
image: ../images/posts/spring-boot-rest.jpg
tags: [java, kotlin, spring, spring boot, backend, web development]
comments: true
math: false
authors: [fabrizio_duroni]
---

*During the last months I worked a lot with Spring Boot backend applications. In this post I explain how you can consume
a REST api from a Spring Boot application using RestTemplate and (the new) WebClient.*

---

In the last few months I started to work as a backend developer during my daily job (and (for now) I
do [mobile/web frontend development only in my spare time](https://github.com/chicio/ID3TagEditor "ID3TagEditor")). The
backend applications I'm working on use Spring Boot as application framework. Let's start from a definition of what are
Spring and Spring Boot:

> The Spring Framework is an application framework and inversion of control container for the Java platform. The framework's core features can be used by any Java application, but there are extensions for building web applications on top of the Java EE (Enterprise Edition) platform. Although the framework does not impose any specific programming model, it has become popular in the Java community as an addition to the Enterprise JavaBeans (EJB) model. The Spring Framework is open source.

> Spring Boot is Spring's convention-over-configuration solution for creating stand-alone, production-grade Spring-based Applications that you can "just run".[22] It is preconfigured with the Spring team's "opinionated view" of the best configuration and use of the Spring platform and third-party libraries so you can get started with minimum fuss. Most Spring Boot applications need very little Spring configuration.

So as you can understand from the definition above these frameworks speed up the development by giving some production
ready tools/configurations/setup out of the box. As you read from the descriptions above these are frameworks from the
Java world. In fact all the code I wrote is in one of these two languages: Java and Kotlin. In particular, all the new
stuff I developed in the last month has been written in Kotlin. For those who don't know, Kotlin is

> ...is a cross-platform, statically typed, general-purpose programming language with type inference made by JetBrains. Kotlin is designed to interoperate fully with Java, and the JVM version of Kotlin's standard library depends on the Java Class Library,[3] but type inference allows its syntax to be more concise...

If you ever developed something in Swift, with Kotlin you will feel at home :heart_eyes: (we will talk about this topic
in another post :smirk:).  
As a consequence of the fact that we live in the ["Microservices era"](https://microservices.io "microservices"), one of
the most common operation that I do in my code is consume a REST api of one microservice from another one. How can you
do that in a Spring Boot application? There are two main component that we can use: RestTemplate and WebClient. Let's
see how they works by developing a small Spring Boot application that call an external service and will return the
result of this call through an endpoint.

#### The application

The application I create is very simple. It (obviously) use Spring Boot as application framework, Gradle as build system
and Kotlin as main language (I'm using also Kotlin DSL instead of Groovy for the gradle file depedencies definition).
The application contains a single controller called `SpringBootRestClientsCheatsheetsApi` that exposes two simple api:

* `"/clients/rest-template/command/{restTemplateCommand}"`
* `"/clients/webclient/command/{webClientCommand}"`

These two api internally invoke various endpoint of an external "Tattoo archive" fake API: the first one
using `RestTemplateService`, a class that use `RestTemplate` as REST client, the second one using `WebClientService`, a
class that uses `WebClient` as REST client. Let's see some code starting from the gradle file. In it you can see all the
Spring Boot dependencies. In particular I'm using the new `spring-boot-starter-webflux` that contains both client,
because as we will see later `WebClient` as been recently added to the framework (starting from the new Spring 5.0
Reactive).

```kotlin
import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "2.4.1"
	id("io.spring.dependency-management") version "1.0.10.RELEASE"
	kotlin("jvm") version "1.4.21"
	kotlin("plugin.spring") version "1.4.21"
}

group = "it.chicio"
version = "0.0.1-SNAPSHOT"
java.sourceCompatibility = JavaVersion.VERSION_11

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-webflux")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	implementation("org.jetbrains.kotlin:kotlin-stdlib-jdk8")
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("org.springframework.boot:spring-boot-starter-actuator")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.11.+")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs = listOf("-Xjsr305=strict")
		jvmTarget = "11"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}
```

Now let's see the `SpringBootRestClientsCheatsheetsApi` controller. It is a standard `RestController`. As you can see
the two services classes are passed as dependecies at construction time using Spring Dependency Injection. The methods
parse the request command received and based on its value they call one of the external fake endpoints using one of the
service classes.

```kotlin
@RestController
@RequestMapping("clients")
class SpringBootRestClientsCheatsheetsApi(
        private val restTemplateService: RestTemplateService,
        private val webClientService: WebClientService
) {
    @GetMapping("/rest-template/command/{restTemplateCommand}")
    fun commandRestTemplate(
        @PathVariable restTemplateCommand: RestTemplateCommand
    ): ResponseEntity<String> = ResponseEntity.ok(when (restTemplateCommand) {
        RestTemplateCommand.GetForEntity -> restTemplateService.getForEntity()
        RestTemplateCommand.GetForObject -> restTemplateService.getForObject()
        RestTemplateCommand.PostForEntity -> restTemplateService.postForEntity()
        RestTemplateCommand.PostForObject -> restTemplateService.postForObject()
        RestTemplateCommand.Put -> restTemplateService.put()
        RestTemplateCommand.Delete -> restTemplateService.delete()
        RestTemplateCommand.Exchange -> restTemplateService.exchange()
    }.toString())

    @GetMapping("/webclient/command/{webClientCommand}")
    fun command(
        @PathVariable webClientCommand: WebClientCommand
    ): ResponseEntity<String> = ResponseEntity.ok(when (webClientCommand) {
        WebClientCommand.GetSynchronous -> webClientService.getSynchronous()
        WebClientCommand.GetAsynchronous -> webClientService.getAsynchronous().block()
        WebClientCommand.PostSynchronous -> webClientService.postSynchronous()
        WebClientCommand.PostAsynchronous -> webClientService.postAsynchronous().block()
        WebClientCommand.PutSynchronous -> webClientService.putSynchronous()
        WebClientCommand.DeleteSynchronous -> webClientService.deleteSynchronous()
        WebClientCommand.Exchange -> webClientService.exchange().block()
    }.toString())
}
```

The two service classes are created in a standard Spring Configuration with their respective REST clients. These
services use a `TattooServiceConfiguration` class to get the base url for the external fake api.

```kotlin
@Configuration
class SpringBootRestClientsCheatsheetsConfiguration {
    @Bean
    fun restTemplate(): RestTemplate = ...

    @Bean
    fun restTemplateService(
            restTemplate: RestTemplate,
            tattooServiceConfiguration: TattooServiceConfiguration
    ): RestTemplateService = RestTemplateService(tattooServiceConfiguration, restTemplate)

    @Bean
    fun webClient(): WebClient = ...

    @Bean
    fun webClientService(
            webClient: WebClient,
            tattooServiceConfiguration: TattooServiceConfiguration
    ): WebClientService = WebClientService(tattooServiceConfiguration, webClient)
}
```

```kotlin
@Configuration
@ConfigurationProperties(prefix = "tattooservice")
class TattooServiceConfiguration {
    var url: String = ""
}
```

The external fake Tattoo archive API is composed of four endpoints:

* one GET tattoo API
* one POST tattoo API
* one PUT tattoo API
* one DELETE tattoo API

I omitted the PATCH verb because I don't use it very often. To interact with these API I created some classes that are
needed as request or response object in these calls. Below you can find them. One important thing to note: as a
consequence of the fact that all these are `data` classes I had to add `jackson-module-kotlin` as dependency in order to
make Jackson (a suite of data-processing and serialization tools used internally by Spring) work with Kotlin `data`
classes. See `implementation("com.fasterxml.jackson.module:jackson-module-kotlin:2.11.+")` dependecy in the gradle file
above.

```kotlin
@JsonIgnoreProperties(ignoreUnknown = true)
data class Tattoo(
    var id: Long,
    var title: String,
    var dimensions: Dimensions,
    var style: TattooStyles
)

enum class TattooStyles {
    NewSchool,
    OldSchool,
    Tribal,
    Japanese
}

data class Dimensions (
    val height: Long,
    val width: Long
)

data class TattooPostResult (
    val result: String
)
```

The external fake API are served using the standalone version of [WireMock](http://wiremock.org "wiremock"), a Java mock
server.

#### RestTemplate

`RestTemplate` is the standard way to consume APIs in a synchronous way. Even if it has been deprecated starting from
Spring 5.0 in favour of `WebClient`, it is still widely used. The standard way to create a `RestTemplate` instance is by
using the `RestTemplateBuilder` class. During the creation it is possible to customize some parameters, like for example
the connection timeout.

```kotlin
@Bean
fun restTemplate(): RestTemplate = RestTemplateBuilder()
        .setConnectTimeout(Duration.ofSeconds(10))
        .build()
```

Now we are ready to call the external APIs. Let's start from the GET one. We can use one of these methods:

* `getForEntity`, a method that will return a `ResponseEntity` that contains as body the content of the API response but
  also other useful information (e.g. Headers, HTTP status code)
* `getForObject`, a method thaty will return directly the content of the API response without any other information

Both these methods will return the content deserialized into the Kotlin `Tattoo` class we saw above. If the server
return a 4xx or 5xx status code RestTemplate will throw a `RestClientResponseException` that we can catch to do some
fallback operations. We can construct the url to be called using the `UriComponentsBuilder`. These class will be used
for all the code snippet below.

```kotlin
fun getForEntity(): ResponseEntity<Tattoo> = try {
    restTemplate.getForEntity(
            UriComponentsBuilder
                    .fromHttpUrl(tattooServiceConfiguration.url)
                    .path("/tattoo/123")
                    .build()
                    .toUri(),
            Tattoo::class.java
    )
} catch (e: RestClientResponseException) {
    ResponseEntity.status(e.rawStatusCode).build()
}
fun getForObject(): Tattoo? = try {
    restTemplate.getForObject(
            UriComponentsBuilder
                    .fromHttpUrl(tattooServiceConfiguration.url)
                    .path("/tattoo/123")
                    .build()
                    .toUri(),
            Tattoo::class.java
    )
} catch (e: RestClientResponseException) {
    null
}
```

The POST external api can be called with two similar methods:

* `postForEntity`, again, a method that will return a `ResponseEntity`
* `postForObject`, as above, a method that will return directly the content of the API response

In this case we have to pass a body in the request of the call. These can be done by passing an instance of the class
that represents the body content. Jackson will do all the hard work :heart_eyes:.

```kotlin
fun postForEntity(): ResponseEntity<TattooPostResult> = try {
    restTemplate.postForEntity(
            UriComponentsBuilder
                    .fromHttpUrl(tattooServiceConfiguration.url)
                    .path("/tattoo/123")
                    .build()
                    .toUri(),
            Tattoo(123, "A new beautiful tattoo", Dimensions(100, 40), TattooStyles.NewSchool),
            TattooPostResult::class.java
    )
} catch (e: RestClientResponseException) {
    ResponseEntity.status(e.rawStatusCode).build()
}
fun postForObject(): TattooPostResult? = try {
    restTemplate.postForObject(
            UriComponentsBuilder
                    .fromHttpUrl(tattooServiceConfiguration.url)
                    .path("/tattoo/123")
                    .build()
                    .toUri(),
            Tattoo(123, "A new beautiful tattoo", Dimensions(100, 40), TattooStyles.NewSchool),
            TattooPostResult::class.java
    )
} catch (e: RestClientResponseException) {
    null
}
```

Next is the PUT api. These can be called by using the `put` method. In this case there's no return body (because put
doesn't accept it as standard) so there's only one implementation method for these HTTP verb.

```kotlin
    fun put(): String = try {
        val tattoo = Tattoo(123, "A new beautiful tattoo", Dimensions(100, 40), TattooStyles.NewSchool)
        restTemplate.put(
                UriComponentsBuilder
                        .fromHttpUrl(tattooServiceConfiguration.url)
                        .path("/tattoo/123")
                        .build()
                        .toUri(),
                tattoo,
        )
        "Tattoo resource created $tattoo"
    } catch (e: RestClientResponseException) {
        val error = "Put client error ${e.rawStatusCode}"
        logger.error(error)
        error
    }
```

Then we have the DELETE api. Again, also here we have just one implementation.

```kotlin
fun delete(): String = try {
    restTemplate.delete(
            UriComponentsBuilder
                    .fromHttpUrl(tattooServiceConfiguration.url)
                    .path("/tattoo/123")
                    .build()
                    .toUri()
    )
    "Tattoo resource deleted"
} catch (e: RestClientResponseException) {
    val error = "Put client error ${e.rawStatusCode}"
    logger.error(error)
    error
}
```

Last but not least we have an additional `exchange` method. This `RestTemplate` method let you can API with different
HTTP verbs by specifing it in the parameter list. There are various override of this method that take into account all
the parameters required by the different HTTP verbs (e.g. POST body request). In the example below I try to call again
the POST API.

```kotlin
fun exchange(): ResponseEntity<TattooPostResult> = try {
    restTemplate.exchange(
            UriComponentsBuilder
                    .fromHttpUrl(tattooServiceConfiguration.url)
                    .path("/tattoo/123")
                    .build()
                    .toUri(),
            HttpMethod.POST,
            HttpEntity<Tattoo>(Tattoo(123, "A new beautiful tattoo", Dimensions(100, 40), TattooStyles.NewSchool)),
            TattooPostResult::class.java
    )
} catch (e: RestClientResponseException) {
    ResponseEntity.status(e.rawStatusCode).build()
}
```

#### WebClient

`WebClient` is the new REST client starting from Spring 5.0 Reactive. In the long term it will substitute `RestTemplate`
. The key feature of these new client is that it can do asynchronous non blocking calls that published reactive `Mono`
or `Flux` streams. The caller can subscribe to these streams and react to them. Anyway you can still also do synchronous
blocking calls. Let's start from the creation by using the `WebClient.builder()`. Also in these case I customized the
connection timeout.

```kotlin
@Bean
fun webClient(): WebClient = WebClient.builder()
        .clientConnector(ReactorClientHttpConnector(HttpClient.from(TcpClient
                .create()
                .option(ChannelOption.CONNECT_TIMEOUT_MILLIS, 10000)
                .doOnConnected { connection: Connection ->
                    connection.addHandlerLast(ReadTimeoutHandler(10000, TimeUnit.MILLISECONDS))
                    connection.addHandlerLast(WriteTimeoutHandler(10000, TimeUnit.MILLISECONDS))
                })))
        .build()  
```

Now I was ready to call again the APIs we saw before. To call them there's just one `retrieve` method. To call the
different HTTP verbs I just had to customized the request with the correct method:

* `get()`, for GET
* `post()`, for POST
* `delete()`, for DELETE
* `put()`, for PUT

If the API returns an error we receive an event on the `onStatus` response callback and we can do some fallback
operations. As we said in the introduction `WebClient` can do synchronous and asynchrouns calls. How?

* If we want to do a synchronous call, we can instruct the `WebClient` to convert to a `ResponseEntity` the result of
  the API call with the `toEntity` method and then call the `block()` method to immediately subscribe and block
  indefinitely the call (so until timeout or until we receive a response)
* If we want to do a asynchronous call, we can instruct the `WebClient` to convert to `Mono` the result of the API call
  with the `bodyToMono` method.

Below you can find the synchronous and asynchrounous versions of the API calls.

```kotlin
fun getSynchronous(): ResponseEntity<Tattoo>? = webClient
        .get()
        .uri(UriComponentsBuilder
                .fromHttpUrl(tattooServiceConfiguration.url)
                .path("/tattoo/123")
                .build()
                .toUri())
        .retrieve()
        .onStatus(HttpStatus::is4xxClientError) { Mono.error(RuntimeException("4XX Error ${it.statusCode()}")) }
        .onStatus(HttpStatus::is5xxServerError) { Mono.error(RuntimeException("5XX Error ${it.statusCode()}")) }
        .toEntity(Tattoo::class.java)
        .block()

fun getAsynchronous(): Mono<Tattoo> = webClient
        .get()
        .uri(UriComponentsBuilder
                .fromHttpUrl(tattooServiceConfiguration.url)
                .path("/tattoo/123")
                .build()
                .toUri())
        .retrieve()
        .onStatus(HttpStatus::is4xxClientError) { Mono.error(RuntimeException("4XX Error ${it.statusCode()}")) }
        .onStatus(HttpStatus::is5xxServerError) { Mono.error(RuntimeException("5XX Error ${it.statusCode()}")) }
        .bodyToMono(Tattoo::class.java)

fun postSynchronous(): ResponseEntity<TattooPostResult>? = webClient
        .post()
        .uri(UriComponentsBuilder
                .fromHttpUrl(tattooServiceConfiguration.url)
                .path("/tattoo/123")
                .build()
                .toUri())
        .body(BodyInserters.fromValue(Tattoo(123, "A new beautiful tattoo", Dimensions(100, 40), TattooStyles.NewSchool)))
        .retrieve()
        .onStatus(HttpStatus::is4xxClientError) { Mono.error(RuntimeException("4XX Error ${it.statusCode()}")) }
        .onStatus(HttpStatus::is5xxServerError) { Mono.error(RuntimeException("5XX Error ${it.statusCode()}")) }
        .toEntity(TattooPostResult::class.java)
        .block()

fun postAsynchronous(): Mono<TattooPostResult> = webClient
        .post()
        .uri(UriComponentsBuilder
                .fromHttpUrl(tattooServiceConfiguration.url)
                .path("/tattoo/123")
                .build()
                .toUri())
        .body(BodyInserters.fromValue(Tattoo(123, "A new beautiful tattoo", Dimensions(100, 40), TattooStyles.NewSchool)))
        .retrieve()
        .onStatus(HttpStatus::is4xxClientError) { Mono.error(RuntimeException("4XX Error ${it.statusCode()}")) }
        .onStatus(HttpStatus::is5xxServerError) { Mono.error(RuntimeException("5XX Error ${it.statusCode()}")) }
        .bodyToMono(TattooPostResult::class.java)

fun putSynchronous(): String {
    val tattoo = Tattoo(123, "A new beautiful tattoo", Dimensions(100, 40), TattooStyles.NewSchool)
    webClient
            .put()
            .uri(UriComponentsBuilder
                    .fromHttpUrl(tattooServiceConfiguration.url)
                    .path("/tattoo/123")
                    .build()
                    .toUri())
            .body(BodyInserters.fromValue(tattoo))
            .retrieve()
            .onStatus(HttpStatus::is4xxClientError) { Mono.error(RuntimeException("4XX Error ${it.statusCode()}")) }
            .onStatus(HttpStatus::is5xxServerError) { Mono.error(RuntimeException("5XX Error ${it.statusCode()}")) }
            .bodyToMono(Void::class.java)
            .block()
    return "Tattoo resource created $tattoo"
}

fun deleteSynchronous(): String {
    webClient
            .delete()
            .uri(UriComponentsBuilder
                    .fromHttpUrl(tattooServiceConfiguration.url)
                    .path("/tattoo/123")
                    .build()
                    .toUri())
            .retrieve()
            .onStatus(HttpStatus::is4xxClientError) { Mono.error(RuntimeException("4XX Error ${it.statusCode()}")) }
            .onStatus(HttpStatus::is5xxServerError) { Mono.error(RuntimeException("5XX Error ${it.statusCode()}")) }
            .bodyToMono(Void::class.java)
            .block()
    return "Tattoo resource deleted"
}
```

#### Conclusion

You can find the complete source code of the application described above in
this [github repository](https://github.com/chicio/SpringBoot-RestClients-Cheatsheets "spring boot resttemplate webclient cheatsheet")
.  
The last months were really challenging. The COVID-19 pandemic has caused great disruption and I got involved to help
the company where I work, [lastminute.com group](https://lmgroup.lastminute.com/ "lastminute.com group") to get out of
from this mess. It was hard and it will still be really hard for a long time. In this mess I returned (again one more
time in my career) to do some backend development and I started to learn Spring Boot. Let's see what the future holds
for me. :muscle::purple_heart:
