# react-use-popper

> React Hook to add tooltip to any element

[![NPM](https://img.shields.io/npm/v/react-use-popper.svg)](https://www.npmjs.com/package/react-use-popper) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

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
  const { open } = usePopper()

  const handleClick = (e: React.MouseEvent) => {
    open('Testing', { id: 'popper-id', appendTo: anchorEl })
  }

  return (
    <>
      <button onClick={handleClick}>Button</button>
    </>
  )
}
```

## License

MIT © [WaleedAli070](https://github.com/WaleedAli070)
