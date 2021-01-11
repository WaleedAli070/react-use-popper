# react-use-popper

> React Hook to add tooltip to any element

[![NPM](https://img.shields.io/npm/v/react-use-popper.svg)](https://www.npmjs.com/package/react-use-popper) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

[Demo](https://waleedali070.github.io/react-use-popper/)
## Install

```bash
npm install --save react-use-popper
```

## Setup
Wrap your root component with `PopperProvider`

```tsx
// app.jsx

import { PopperProvider } from "react-use-popper";

const App = () => {
  return (
    <PopperProvider>
      <RootComponent />
    </PopperProvider>
  );
};
```

## Basic Usage

```tsx
import React, { Component } from 'react'
import { usePopper } from "react-portal-hook";

const ChidlComponent = () => {
  const { togglePopper } = usePopper('Popper 1')

  const handleClick = (e: React.MouseEvent) => {
    togglePopper(e)
  }

  return (
    <>
      <button onClick={handleClick}>Button</button>
    </>
  )
}
```

## API Documentation

## `usePopper` Hook

### arguements

##### `defaultContent`

> `((popper: Popper) => React.ReactNode) | React.ReactNode` | _optional_ | `default value: "Default Content"`

The react element you want to render in the popper

##### `defaultOptions`

###### `id`

> `string` | _optional_

An ID to avoid duplicate poppers.
generated randomly by default, if no id is provided

###### `appendTo`

> `Element` | _optional_

A DOM node in which to render the popper
gets extracted from the `event.currentTarget`, in case not provided.

###### `onClose`

> `() => void` | _optional_

A callback that's fired when the popper gets closed.

### returns

#### `togglePopper`

Easiest and Recommended to use, manages popper's open/close state internally.

##### args

> `event: React.MouseEvent` | _required_

> `content : ((popper: Popper) => React.ReactNode) | React.ReactNode` | _optional_ | defaults to `usePopper`'s `defaultContent`

> `options: PopperOptions` | _optional_ | defaults to `usePopper`'s `defaultContent`

#### `showPopper`

Useful in case you want to manage popper's state manually, takes similar args as `togglePopper`
returns, Popper object containing `id` which will be needed to pass to `hidePopper`

##### args

> `event: React.MouseEvent` | _required_

> `content : ((popper: Popper) => React.ReactNode) | React.ReactNode` | _optional_ | defaults to `usePopper`'s `defaultContent`

> `options: PopperOptions` | _optional_ | defaults to `usePopper`'s `defaultContent`

##### returns

> `popper: PrivatePopper`

#### `hidePopper`

Closes Popper by ID.

#### args

> `popperId: string` | _required_

### Interfaces

#### Popper Args

```typescript
interface PopperArgs {
  /**
   * The react element you want to render in the popper
   */
  defaultContent?: ((popper: Popper) => React.ReactNode) | React.ReactNode;
  defaultOptions?: PopperOptions
}
```

#### Popper Options

```typescript
interface PopperOptions {
    /**
    * An ID to avoid duplicate poppers
    * generates randomly by default, if no id is provided
    */
    id?: string;
    /**
    * A DOM node in which to render the popper
    * gets extracted by the `event`, in case not provided
    */
    appendTo?: Element;
    /**
    * A callback that is fired when the popper closes
    */
    onClose?: () => void;
}
```

#### `PrivatePopper`

```typescript
interface PrivatePopper {
  /**
  * Popper Content Element 
  */
  element: React.ReactNode;
  /**
  * Popper ID, need to pass this id while closing  
  */
  id: string;
  /**
  * Popper Container Element to which Popper is appended to
  */
  appendTo: Element;
}
```

## License

MIT © [WaleedAli070](https://github.com/WaleedAli070)
