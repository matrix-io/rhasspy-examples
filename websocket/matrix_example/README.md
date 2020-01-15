# Web Socket Events

This folder contains code to help you get started on how to catch intents for the Rhasspy voice assistant on your MATRIX device. The example skill will allow you to chang the color of the MATRIX LEDs.

# Dependencies

- [MATRIX HAL](https://matrix-io.github.io/matrix-documentation/matrix-hal/getting-started/installation-package/)
- [MATRIX Lite](https://matrix-io.github.io/matrix-documentation/matrix-lite/getting-started/)

# Rhasspy Sentences

To keep it simple, we'll assume that your `sentence.ini` looks like this.

```
[Led]
set [the] device [to] (red | green | blue | purple | black){color}
```
