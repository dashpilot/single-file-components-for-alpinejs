# Single File Components for Alpine.js

Svelte-inspired single-file components compiler for Alpine.js

## About

I love the simplicity of Alpine.js, but on bigger projects it can become a challenge to keep your code organized and modular.

Inspired by the way Svelte compiles your single file components into browser-friendly javascript, I created a simple compiler for Alpinejs. You write your code in single-file-component-style, and the build script compiles it to browser-friendly javascript, html and css. It also features **live-reload**, so every time you save changes to a single file component, the build script compiles your code and runs it. Although this is a basic POC, in its current form it does help you to better organize your code.

## How to install?

1.  run `npx degit https://github.com/dashpilot/single-file-components-for-alpinejs`
2.  run `npm install` and then `npm run dev` to run the example components

## How to create a single-file component?

Create a new .html file in `src/components`, with the following structure:

    <template>
      <!-- This is where the html of your component goes -->
      <div class="example" x-init="init()" x-data="example()">
        <div x-text="title"></div>
      </div>
    </template>

    <script>
      // This is where your javascript goes
      function example() {
        return {
          title: "Hello world",
          init() {
            console.log('Example component loaded');
          }
        }
      }
    </script>

    <style>
      /* this is where your CSS goes */
      .example{
        border: 1px solid #DDD;
        padding: 10px;
      }
    </style>

The order of the template-, script- and css- tags is up to your own preference. When you run `npm run dev` or `npm run build` the compiler goes through all the components and automatically splits and minifies/uglifies the JS, CSS and HTML into dist/assets. It also copies index.html to the dist folder.

To load a component on the page, create a custom element in index.html that corresponds to the filename of your component. So if your component is called `card.html`, create a custom element `<card></card>` in index.html. You can also load multiple instances of the component on the page, without duplicating the javascript or CSS.

Take a look at `components/card.html` to see how well this concept actually fits Alpinejs: each component has its own data-'controller', while sharing data between components is easy via the global store (in index.html). And of course, all templating-directives are available to you (x-for, x-if, x-text, etc.)

## What it's not

This script is simply meant to help you write Alpine.js code in a more modular way, but isn't a module bundler or js framework. Let me know if there are any features/improvements you'd like to see.

## Todo

-   might switch out terser and cleancss for node-minify

## Press the :star: button

Don't forget to press the :star: button to let me know I should continue improving this project.
