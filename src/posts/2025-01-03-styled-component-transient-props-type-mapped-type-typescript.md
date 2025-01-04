---
title: "Styled Components: create a type to define transient props based on the props interface of another component"
description: "Standard transient props and shouldForwardProp are styled components API let you filter out props that 
should not be passed to the underlying React node or DOM element. In this post we will see how we can create a type 
to automatically define props from the interface of props of a parent component."
date: 2025-01-03
image: ../images/posts/transient-props.png
tags: [react, typescript, web development]
comments: true
math: false
authors: [fabrizio_duroni]
---

*Transient props and shouldForwardProp are styled components API let you filter out props that
should not be passed to the underlying React node or DOM element. In this post we will see how we can create a type
to automatically define transient props from the interface (of props) of a parent component.*

---

Styled component propagate by default all the props passed to a component to the underlying React node or DOM 
element. 
The framework offers a couple of ways to avoid this behavior. 
The first one is [Transient props](https://styled-components.com/docs/api#transient-props). By using `$` as a 
prefix of a prop name it will not be propagated.
The second one is the `shouldForwardProp`.
This is a fine-grained way to prevent the prop forward with a specific filter that acts on the name of the 
props. You can add it using  the `withConfig` api or the `shouldForwardProp` prop as in the example below.

```tsx
interface BigCardProps {
  big: boolean;
}

const PostCardContainer = styled.div<BigCardProps>`
  /// ...other css rules...
  
  /// usage of the "big" prop
  ${(props) => !props.$big && css` width: 48%; `}}
  
  /// ...other csss rules...
`;
PostCardContainer.shouldForwardProp = (prop: string) => prop !== "big";
```

Anyway, both these methods require a manual development specific on the prop names. In particular, it is very 
tedious when you have a parent component and its children are styled components that should receive the same props. 
However, you want to avoid forwarding them to the DOM (because their main purpose is styling/logic condition).  
See, for example, the code below, where there is a parent component that calls a hook and uses a styled component as 
children to create an overlay effect.
The `StyledOverlay` component receive all the props of the container component, and we want to:

* avoid the forward for `zIndex` and `delay` because they are not DOM attributes.
  This is why they are contained again in the `StyledOverlayProps` interface with the `$` transient prop prefix.
* forward the `onClick` prop to the underling DOM element (and so we don't add the property to the `StyledOverlayProps` but we still pass it to the component).

```tsx
interface StyledOverlayProps {
  $zIndex: number;
  $delay: string;
}

const StyledOverlay = styled.div<StyledOverlayProps>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${(props) => props.$zIndex};
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  animation: ${opacity} 0.25s linear ${(props) => `${props.$delay}`};
  animation-fill-mode: forwards;
  backdrop-filter: blur(4px);
`;

export interface OverlayProps {
  zIndex: number;
  delay: string;
  onClick: () => void;
}

export const Overlay: FC<OverlayProps> = ({ zIndex, onClick, delay }) => {
  useLockBodyScroll();

  return (
    <StyledOverlay
      $zIndex={zIndex}
      $delay={delay}
      onClick={onClick}
    />
  );
};
```

In the last couple of years, I felt in love with the TypeScript type system.
It is so powerful and flexible that it allows you to write DSL with validation that other languages would dream of.
A lot of colleagues still argue that this kind of knowledge on the specific part of TypeScript is useless, but I strongly 
disagree.
Why? Because in this post, I will show you a practical application of the knowledge I acquired to solve the 
problem above.
In particular, we want to avoid coding two different interfaces,
but just creating a new one starting from the `OverlayProps`
that adds the `$` sign to the ones that should be transient props, and skips the other ones that are DOM attributes.

#### Implementation

Based on the description above, we want to define a `TransientProps` type that is able to:

* add the `$` prefix to props that are not DOM attributes, and are defined by ourselves
* skip the DOM props in some way, because they should still be forwarded

To start the implementation, we need first to check some types exposed by React.  
For our use case it will be useful the [`ComponentProps` type](https://react-typescript-cheatsheet.netlify.app/docs/react-types/ComponentProps). 
This utility type lets us extract the props of a React component received as generic parameter.  
The other interesting type is `React.JSX.IntrinsicElements`.
This is a type that declares which JSX elements are allowed/defined and their props.
In the case of React DOM, these are the HTML tags.  
So we can start to define some custom types.
First a type to convert anything to a string, that we will call `Stringify`.
Next a type that describe a possible `DOMElement`,
that in our case will be `React.JSX.IntrinsicElements` or `false`,
if we don't want to pass/we don't have the need to get the props of the underlying DOM node.

```typescript
type Stringify<PropName> = PropName extends string ? PropName : never;
type DomElement = keyof React.JSX.IntrinsicElements | false;
```

So given a `DomElement`, we could have two cases:

* we want to remap all the properties received because none of them is related to the underlying DOM node
* we want to remap all the properties received expect the one related to the underlying node

We can create a type that we will call `OmitDomProps`,
that we will use to select the properties to be remapped into transient props based on the condition above.
In particular, if we don't have a `DomElement` defined (so it `extends false`),
we will just return the `CustomProps` received.
If we have a `DomElement` (so it is inside the `React.JSX.IntrinsicElements` interface),
we will omit its prop from the original `CustomProps` interface

```typescript
type OmitDomProps<CustomProps, Component extends DomElement> = Component extends false
        ? keyof CustomProps
        : keyof Omit<CustomProps, keyof ComponentProps<Component>>;
```

Now we are ready to create the `TransientProps` type.
This type receives two generic parameters:

* the `CustomProps` interface for which we want to remap the properties as transient ones.
* the `IntrinsicElements` if needed to get the type of the underlying DOM element. If not passed it will have a default `false` value and all the props will become transient. 

This type will use TypeScript mapped types to remap the properties of `CustomProps` received.
The utility types created before are used to conditionally filter out DOM properties if needed.
We can add our utility type to the `styled-components` module.
In this way, thanks to [module augmentation](https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation), 
we will have the `TransientProps` type exposed as it is a type from the framework itself.

```typescript
// ...Other imports...
import React, { ComponentProps } from "react";

declare module "styled-components" {
  // ...Other needed types for defining styled components themes...
  
  type Stringify<PropName> = PropName extends string ? PropName : never;
  type DomElement = keyof React.JSX.IntrinsicElements | false;
  type OmitDomProps<CustomProps, Component extends DomElement> = Component extends false
          ? keyof CustomProps
          : keyof Omit<CustomProps, keyof ComponentProps<Component>>;

  export type TransientProps<CustomProps, Component extends DomElement = false> = {
    [Key in OmitDomProps<CustomProps, Component> as `$${Stringify<Key>}`]: CustomProps[Key];
  };
}
```

Below you can see `Overlay` component we saw above refactored with this new type.
As you can see, no additional interface is needed to define the props of the component.
In this case we are passing the `div` element to filter out the `onClick` prop (but as we mentioned before you can also 
skip the second generic parameter so that all the props will become transient).

```tsx
export interface OverlayProps {
  zIndex: number;
  delay: string;
  onClick: () => void;
}

const StyledOverlay = styled.div<TransientProps<OverlayProps, "div">>`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: ${(props) => props.$zIndex};
  background: rgba(0, 0, 0, 0.6);
  opacity: 0;
  animation: ${opacity} 0.25s linear ${(props) => `${props.$delay}`};
  animation-fill-mode: forwards;
  backdrop-filter: blur(4px);
`;

export const Overlay: FC<OverlayProps> = ({ zIndex, onClick, delay }) => {
  useLockBodyScroll();

  return <StyledOverlay $zIndex={zIndex} onClick={onClick} $delay={delay} />;
};
```

#### Conclusion

I love the TypeScript type system.
Its flexibility and rich feature set are so vast and intricate that you could spend years
exploring all its quirks and perks.
Remember: with great power comes great responsibility. The same goes for the TypeScript type system. 
So, make sure to read the documentation carefully before going off on a tangent :heart:.
