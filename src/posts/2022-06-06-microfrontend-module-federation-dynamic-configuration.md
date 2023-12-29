---
title: "Create a microfrontend app using module federation and dynamic configuration"
description: "We are used to the term microservice in the backend world. Is there a way to achieve the same architectural indipendence in the frontend world? Let's see how it is possible to create a microfrontend app by leveraging Webpack 5 module federation with a widget-based custom remote configuration."
date: 2022-06-06
image: ../images/posts/webpack-module-federation.jpg
tags: [react, web development, architectural pattern, typescript]
comments: true 
math: false 
authors: [fabrizio_duroni, alex_stabile]
---

*We are used to the term microservice in the backend world. Is there a way to achieve the same architectural indipendence in the frontend world? Let's see how it is possible to create a microfrontend app by leveraging Webpack 5 module federation with a widget-based custom remote configuration.*

---

As you may already know from [my previous post](/2022/03/02/custom-jackson-module-deserlializer-serializer-object-mapper-java-spi/), in the last weeks I started to work in a new team on a new project at [lm group](https://lmgroup.lastminute.com "lastminute"). The goals we have is to renew the foundations of the company software overall architecture by introducing in the development workflow new technologies. While on the backend we defined a clear path to reach our goal from the beginning (DDD + Axon), on the frontend we still had some doubt. In fact the application we are developing, a new booking cancellation flow, will be integrated in our myarea, an app where the user that manage his/her bookings. We decided to develop this new app with React + Styled Components + Our internal design system, that in [lm group](https://lmgroup.lastminute.com "lastminute") is the standard frontend stack (and is in some way already "enough" modern). But there was one problem: coupling between apps.  
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

So module federation is a way to let an application dynamically load external parts/widgets/components without 
relying on the classical npm dependencies management. It lets you build microfrontend application, but without 
sacrifice performances with the shared libraries' mechanism. This seems very cool :rocket:.  
In the next section I will show you how me and my colleague Alex Stabile create a new cancellation widget that is integrated in the my area app (the app that lets our users see his/her bookings). Let's start!! :rocket:  
One note: the application described above is a simplification of the real stack we have in our codebase. We created this easier example in order to let you focus on the topic of the post.

#### Implementation

As we said before the applications we are going to work with are 2:

* the first one called `cancel-order`, that is basically a widget that displays a flow where the user can cancel an order
* another one, called `my-area`, that is an app where the user can manage his/her orders

The final result we want to achive is integrate the `cancel-order` widget so that when the user click on the cancel button of an order card, the cancellation flow will start. In the video below you can see the final result of the implementation described below.

`youtube: https://www.youtube.com/watch?v=iv6wQrp_K4s`

Let's first see how the two app are composed. Both of them use:

* React
* [css in js](https://en.wikipedia.org/wiki/CSS-in-JS "css in js") framework [emotion](https://emotion.sh/docs/introduction "emotion")
* [Material UI](https://mui.com "material ui") as components library

The container app, `my-area`, uses [React Router](https://reactrouter.com "react router") to manage the navigation in the app. Obviously given that we are going to use module federation, both apps are bundled using [Webpack](https://webpack.js.org).  
The `cancel-order` app exposes one widget called `CancelOrderWidget`, that is in charge of displaying and controlling the cancellation flow. Below you can find its (very simple) implementation.

```typescript
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

export default CancelOrderWidget;
```

The `my-area` app has a main component called `App` where we have all the routes defined. One of these routes contain the `OrdersPage` that displays a list of `OrderCard`s. Each one of them has a button that let the user navigate to the cancel order route where we display the `CancelOrderPage`, that will contain our `CancelOrderWidget` loaded with module federation. Below you can find the code for this components.

```typescript
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

So how do we intergate the two widgets with Module Federation? Let's find out!! We can start from the `cancel-order` Webpack configuration. The first thing we need to do is import the `ModuleFederationPlugin`. Than we can instantiate it with the correct configuration. In this case we will configurate it with the following parameters:

* `cancelOrderWidget` as `name` of remote module federated. We need to be sure that **every federated module has a unique name with respect to the other**.
* `remoteEntry.js` as `filename`. This option is used to give a name to the **remote entry file**. In thi file you will find the mapping between between the components exposed and their chunk url.
* `exposes` parameter will contain a list of all the widgets exposed by this federated module. In our case we are exposing a single component `CancelOrderWidget`, specifing as value the path to it (in our project) and `./CancelOrderWidget` as key.
* a list of dependecies in the `shared` parameter. This one is used to specify a list of all the libraries that this application will share with other applications in support of files listed in the exposes section. In our case we are telling to the module federation plugin to shared all the dependecies (notice the `...deps`). For `react` and `react-dom` we are sharing the dependecies with a specific override: we are basically telling to the module federation plugin it should not load more than one copy of them. This is a consequence of the fact that these libraries have internal state and multiple instances/versions cannot live in the browser at the same time. We are also specifing which version should be used or try to use a fallback with the `requiredVersion`. Module federation has an internal fallback strategy where it will decide which version of the library should be used bases on it module federate configuration (this is probably a topic for an entire new post :smirk:).

Below you can find the complete configuration of the `cancel-order` widget.

```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:3001/",
  },

  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 3001,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "cancelOrderWidget",
      filename: "remoteEntry.js",
      exposes: {
        "./CancelOrderWidget": "./src/components/CancelOrderWidget"
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
```

Let's see the configuration for the `my-area` app. Also in this case we need to import the `ModuleFederationPlugin` and configure it in the proper way:

* `myarea` as `name` of the federeated module
* `remotes` parameter will contain the names of the other federated module applications that this application will consume code from. In our case we will define just one remote, with key `cancelOrder`. This key is the one we will use to reference in the code of the `myarea` app the remote module. As value we will set the name of the remote federate module (the value of the `name` parameter in the `ModuleFederationPlugin` configuration in the `cancel-order` app) followed by the url of the remote entry file of our `cancel-order` app.
* again, the `shared` parameter with the same approach we used to defined the shared dependecies for the `cancel-order` app.

Below you can find the entire Webpack configuration for the `my-area` app.

```javascript
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const ExternalTemplateRemotesPlugin = require("external-remotes-plugin");

const deps = require("./package.json").dependencies;
module.exports = {
  output: {
    publicPath: "http://localhost:3000/"
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "myarea",
      remotes: {
        cancelOrder: 'cancelOrderWidget@[widgets.cancellationOrderWidgetUrl]/remoteEntry.js'
      },
      shared: {
        ...deps,
        react: {
          singleton: true,
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true,
          requiredVersion: deps["react-dom"],
        },
      },
    }),
    new ExternalTemplateRemotesPlugin(),
    new HtmlWebPackPlugin({
      template: "./src/index.html",
    }),
  ],
};
```

Now, if you look closely to the configuration above you noticed something strange:

* the url of the remote entry file is defined as the code below, so webpack expects to find it in some way defined 
  in the placeholder/variable contained in the squared brackets.

```typescript
  'cancelOrderWidget@[widgets.cancellationOrderWidgetUrl]/remoteEntry.js'
```
* we are calling an additional plugin from the module federation world called `ExternalTemplateRemotesPlugin`.

This combination in the configuration will let us define the url of the remote entry file dinamically at runtime when the application starts :heart_eyes:. This is a consequence of the fact that what we defined as 

```typescript
'[widgets.cancellationOrderWidgetUrl]/remoteEntry.js'
``` 

will be replaced by the `ExternalTemplateRemotesPlugin` as `widgets.cancellationOrderWidgetUrl + "/remoteEntry.js"`, so a concatenation of a variable, `widgets.cancellationOrderWidgetUrl` that as you can see is defined on the `window` object, plus the fixed part of the url `"/remoteEntry.js"` ([here](https://github.com/module-federation/external-remotes-plugin/blob/main/index.js "ExternalTemplateRemotesPlugin") you can find the source code for the `ExternalTemplateRemotesPlugin` that contains the concatenation described here).  
This is absolutely astonishing!! :rocket: This basically means we can have multiple federated module remote entry file urls configurations based on different needs, for example different urls for enviroment (eg. local, qa, production). This also means that we can dinamically update these url and let the `my-area` app configure itself at runtime with a list of urls that represents the latest versions of our federated remote modules :heart_eyes:.  
How can we implement it? We can implement a configuration repository that loads a configuration with the list of urls for our federated module. This configuration will be downloaded from the GET api endpoint `'/api/widgets'`. In our case the response will contain just one url for our `cancel-order` federated module. This is the response we will get

```json
{
  "cancellationOrderWidgetUrl": "http://localhost:3001"
}
```

If you remember the configuration for the module federation of the `my-area` app, `cancellationOrderWidgetUrl` corresponds to the last part of the variable `widgets.cancellationOrderWidgetUrl`. o we just need to take this objectstuff received from the configuration and add it to the `window` object.  
After this, we can start our `my-area` app in the right way. Below you can find the implementation of the `loadConfiguration` configuration repository, and how we are using it in the `index.ts`, our app entry point, in order to load the configuration and start the app.

```typescript

// ...Configuration.ts

export const loadConfiguration = async () => {
    try {
        const widgetsResponse = await fetch('/api/widgets');
        window.widgets = await widgetsResponse.json();
    } catch (e) {
        console.error('Error retrieving modules configuration', e);
    }
}

// ...index.ts


import {server} from "./server";
import {loadConfiguration} from "./logic/Configuration";

server()

loadConfiguration().then( () => {
    import("./App");
})
```

At this point we have everything we need in place in order to load our remote federated module. To do this we will load the `CancelOrderWidget` as a standard dynamic component using `React.lazy` and `Suspense`. The import path for the widget is `cancelOrder/CancelOrderWidget`, that correspond to the `key` defined in the `remotes` section of the `my-area` webpack configuration plus the name of the widget as defined in the `exposes` section fo the `cancel-order` webpack configuration. As a consequence of the fact that the widget is not available in our `node_modules`, neither its types, we must define them manually.  
After the last bits of code below, we will finally able to start our, and we will have the same result show in the video at the beginning of this explanation.

```typescript

// ...CancelOrderWidget.d.ts

declare module 'cancelOrder/CancelOrderWidget' {
    const CancelOrderWidget: React.FC<{ orderId: string; }>;

    export = CancelOrderWidget;
}


// ...CancelOrderPage.tsx

import React, {FC, Suspense} from "react";
import {useParams} from "react-router-dom";

const CancelOrderWidget = React.lazy(() => import("cancelOrder/CancelOrderWidget"));

type UrlParams = {
  orderId: string;
}

export const CancelOrderPage: FC = () => {
  const { orderId } = useParams<UrlParams>();

  return (
    <Suspense fallback={<div/>}>
      <CancelOrderWidget orderId={orderId ?? ""}/>
    </Suspense>
  );
}

```

#### Conclusion

In this [Github repository](https://github.com/chicio/module-federation-react-example "module federation react example") you can find the implementation fo the example described above. Module federation is relatively young feature of Webpack, but seems that can help a lot of developers to reach the goal of implementing a clean micro frontend architecture :heart:. What do you think? Let me know in the comment section :rocket:.
