# React Popper Hook

> React Hook to add tooltip to any element

[![NPM](https://img.shields.io/npm/v/react-use-popper.svg)](https://www.npmjs.com/package/react-use-popper) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

React Popper is a low level react hook (along with a provider) to add all kinds of absolutely positioned poppers which are added to the target element via `React.createPortal`.

It identifies the target element (the one to which popper gets appended to), via the `event.currentTarget` (in case, it's not provided in the `options` to the `usePopper`) and calculates the positioning of the popper internally using a few inline styles, hence, does not have any dependency on any other styling library.

UsePopper Hook exposes `togglePopper`, `showPopper` and `hidePopper` callbacks to the consume/client which can be called in response to different `MouseEvent`s. The Hook manages the `open/close` state of the popper internally, and therefore, `togglePopper` is the recommend way to use, and should be enough for most of the use cases. But if the consumer really wants to manage the `open/close` manually, then he may use a combination of `showPopper` and `hidePopper` callbacks.

[Demo](https://waleedali070.github.io/react-use-popper/)

## Install

```bash
npm install --save react-use-popper
```

## Setup

Wrap your root component with `PopperProvider`

```tsx
// app.jsx

import { PopperProvider } from 'react-use-popper'

const App = () => {
  return (
    <PopperProvider>
      <RootComponent />
    </PopperProvider>
  )
}
```

## Basic Usage

```tsx
import React, { Component } from 'react'
import { usePopper } from 'react-use-popper'

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

## Multiple Poppers

If you want to have multiple poppers open at same time, it's recommended to use multiple hooks, e.g:

```tsx
import React, { Component } from 'react'
import { usePopper } from 'react-use-popper'

const ChidlComponent = () => {
  const popper1 = usePopper('Popper 1')
  const popper2 = usePopper('Popper 2')

  const handleClick = (e: React.MouseEvent) => {
    popper1.togglePopper(e)
  }
  const handleAnotherClick = (e: React.MouseEvent) => {
    popper2.togglePopper(e)
  }

  return (
    <>
      <button onClick={handleClick}>Button</button>
      <button onClick={handleAnotherClick}>Another Button</button>
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
  defaultContent?: ((popper: Popper) => React.ReactNode) | React.ReactNode
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
  id?: string
  /**
   * A DOM node in which to render the popper
   * gets extracted by the `event`, in case not provided
   */
  appendTo?: Element
  /**
   * A callback that is fired when the popper closes
   */
  onClose?: () => void
}
```

#### `PrivatePopper`

```typescript
interface PrivatePopper {
  /**
   * Popper Content Element
   */
  element: React.ReactNode
  /**
   * Popper ID, need to pass this id while closing
   */
  id: string
  /**
   * Popper Container Element to which Popper is appended to
   */
  appendTo: Element
}
```

## License

MIT © [WaleedAli070](https://github.com/WaleedAli070)
