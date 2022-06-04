---
title: "Create a microfrontend app using module federation and dynamic configuration"
description: "We are used to the term microservice in the backend world. Is there a way to achieve the same architectural indipendence in the frontend world? Let's see how it is possible to create a microfrontend app by leveraging Webpack 5 module federation with a widget-based custom remote configuration."
date: 2022-05-31
image: ../images/posts/XXXXX.jpg
tags: [react, web development, architectural pattern]
comments: true 
math: false 
authors: [fabrizio_duroni, alex_stabile, ?luca_mor?]
---

*We are used to the term microservice in the backend world. Is there a way to achieve the same architectural indipendence in the frontend world? Let's see how it is possible to create a microfrontend app by leveraging Webpack 5 module federation with a widget-based custom remote configuration.*

---

As you may already know from [my previous post], in the last weeks I started to work in a new team on a new project at [lm group](https://lmgroup.lastminute.com "lastminute"). The goals we have is to renew the foundations of the company software overall architecture by introducing in the development workflow new technologies. While on the backend we defined a clear path to reach our goal from the beginning (DDD + Axon), on the frontend we still had some doubt. In fact the application we are developing, a new booking cancellation flow, will be integrated in our myarea, an app where the user that manage his/her bookings. We decided to develop this new app with React + Styled Components + Our internal design system, that in lastminute.com is the standard frontend stack (and is in some way already "enough" modern). But there was one problem: coupling between apps.  
The myarea app at the moment already loads some widgets (usually associated to specific features) as npm packages. This packages are developed by different teams/external companies. This basically means:

* that if a team want to deploy a new version of their widget, they have to update the package json of the myarea app, tag and release it.
* there is a coupling between the dependecies of the widgets and of the myarea. This means that you have to keep in sync every dependecy version (eg. do massive React upgrade in every app/widget).

This was unacceptable. We wanted to be independent with our new "cancellation widget", in terms of deployment and dependencies. This why we started to investigate how we can implement a microfrontend architecture for our myarea. What is the microfrontend architecture pattern? Let's see what [micro-frontends.org](https://micro-frontends.org "microfrontend in action website") tells us:

> The term Micro Frontends first came up in ThoughtWorks Technology Radar at the end of 2016. It extends the concepts of micro services to the frontend world. ... The idea behind Micro Frontends is to think about a website or web app as a composition of features which are owned by independent teams. Each team has a distinct area of business or mission it cares about and specialises in. A team is cross functional and develops its features end-to-end, from database to user interface.

The definition is telling us what we already know from the microservice world in the backend: we want to create a frontend application where each team can independently develop and deploy their feature-specific frontend widget/app. Independetly means:

* the apps can have different technology stacks (eg. one app can use React and another one can use Vue as UI framework)
* the apps run in "isolations", they don't need to/they don't have to force the teams to share dependecies between apps
* the apps can be deployed as standalone: so no need to have one app that declare for example the other one as npm dependecy.

There are various way to achive the microfrontend architecture, that usually require a lot of custom work/development and/or the usage of specific frameworks (eg. [single-spa](https://github.com/single-spa/single-spa "single-spa") etc.). With the release of Webpack 5 there is a new game-changer player in the microfrontend world: Module Federation.
What is Module Federation? It is a JavaScript architecture invented by Zack Jackson and Marais Rossouw that is now integrated into Webpack 5 core APIs. Let's read the explanation from Zack about Module Federation:

>A scalable solution to sharing code between independent applications has never been convenient, and near impossible at scale. The closest we had was externals or DLLPlugin, forcing centralized dependency on a external file. It was a hassle to share code, the separate applications were not truly standalone and usually, a limited number of dependencies are shared. Moreover, sharing actual feature code or components between separately bundled applications is unfeasible, unproductive, and unprofitable. ... Module federation allows a JavaScript application to dynamically load code from another application — in the process, sharing dependencies, if an application consuming a federated module does not have a dependency needed by the federated code — Webpack will download the missing dependency from that federated build origin.
Code is shared if it can be, but fallbacks exist in each case. Federated code can always load its dependencies but will attempt to use the consumers’ dependencies before downloading more payload. Less code duplication, dependency sharing just like a monolithic Webpack build.

So module federation is a way to let an application dynamically load external parts/widgtes/components without relying on the classical npm dependecies management. It lets you build microfrontend application, but without sacrifice performances with the shared libraries mechanim. This seems very cool :rocket:.  
In the next section I will show you how me and my colleague Alex Stabile create a new cancellation widget that is integrated in the my area app (the app that lets our users see his/her bookings). Let's start!! :rocket:  
One note: the application described above is a simplification of the real stack we have in our codebase. We created this easier example in order to let you focus on the topic of the post.

#### Implementation

As we said before the applications we are going to work with are 2:

* the first one called `cancel-order`, that is basically a widget that displays a flow where the user can cancel an order
* another one, called `my-area`, that is an app where the user can manage his/her orders

The final result we want to achive is integrate the `cancel-order` widget so that when the user click on the cancel button of an order card, the cancellation flow will start. In the video below you can see the final result we want to achieve.

`youtube: XXXXX`

Let's first see how the two app are composed. Both of them use:

* React
* [css in js](https://en.wikipedia.org/wiki/CSS-in-JS "css in js") framework [emotion](https://emotion.sh/docs/introduction "emotion")
* [Material UI](https://mui.com "material ui") as components library

The container app, `my-area`, uses [React Router](https://reactrouter.com "react router") to manage the navigation in the app. Obviously given that we are going to you module federation, both apps are bundled using [Webpack](https://webpack.js.org).  
The `cancel-order` app exposes one widget called `CancelOrderWidget`, that is in charge of displaying and controlling the cancellation flow. Below you can find its (very simple) implementation.

```react
import {ChangeEvent, FC, useState} from "react";
import {
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormLabel,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";

interface Props {
    orderId: string;
}

const CancelOrderWidget: FC<Props> = ({ orderId }) => {
    const [disable, setDisable] = useState<boolean>(true);

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDisable(event.target.value === "no");
    };

    return <Container sx={{my: 3}}>
        <Typography variant="h3" color="text.primary">
            {`Do you really want to cancel order ${orderId}?`}
        </Typography>
        <FormControl sx={{my: 3}}>
            <RadioGroup defaultValue={"no"} onChange={handleChange}>
                <FormControlLabel value="yes" control={<Radio/>} label="Yes"/>
                <FormControlLabel value="no" control={<Radio/>} label="No"/>
            </RadioGroup>
            <Button sx={{my : 2}} disabled={disable} size="small" variant={'contained'} onClick={() => alert("Order cancelled")} color={'error'}>Proceed</Button>
        </FormControl>
    </Container>;
}
```

The `my-area` app has a main component called `App` where we have all the routes defined. One of this routes contained the `OrdersPage` that displays a list of `OrderCard`s. Each one of them has a button that let the user navigate to the cancel router where we display the `CancelOrderPage`, that will contain our `CancelOrderWidget` loaded with module federation. Below you can find the code for this components.

```react
....

// ...App.tsx

const App: FC = () => (
    <>
        <GlobalStyles styles={{body: {margin: 0, padding: 0}}}/>
        <Header/>
        <Container sx={{my: 3}}>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<OrdersPage orderRepository={new InMemoryOrderRepository()}/>} />
                    <Route path={"/:orderId/cancel"} element={<CancelOrderPage />}/>
                </Routes>
            </BrowserRouter>
        </Container>
    </>
);

// ...OrdersPage.tsx

interface Props {
    orderRepository: OrderRepository;
}

export const OrdersPage: FC<Props> = ({ orderRepository }) =>
    <>
        {orderRepository.get().map(order => <OrderCard order={order} key={order.id}/>)}
    </>


// ...OrderCard.tsx


interface Props {
    order: Order
}

export const OrderCard: FC<Props> = ({ order }) =>
    <Card sx={{ my : 2 }}>
        <CardMedia
            component="img"
            height="300"
            image="https://picsum.photos/1200/300"
            alt="green iguana"
        />
        <CardContent>
            <Typography variant="h5" color="text.primary">
                {order.departure} to {order.destination} - {order.date}
            </Typography>
        </CardContent>
        <CardActions>
            <Button component={Link} to={`/${order.id}/cancel`} size="small" variant={'contained'} color={'error'}>Cancel</Button>
        </CardActions>
    </Card>

```


#### Conclusion


....TODO

