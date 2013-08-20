# grunt-eco-iife

Compiles [Embedded CoffeeScript templates](https://github.com/sstephenson/eco) (`.eco`) into JavaScript IIFEs (Immediately Invoked Function Expressions).

## Getting Started

This plugin requires Grunt `~0.4`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-eco-iife --save-dev
```

Once the plugin has been installed, it may be enabled inside your `Gruntfile.js` with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-eco-iife');
```

*This plugin was designed to work with Grunt 0.4.x. If you're still using grunt v0.3.x it's strongly recommended that [you upgrade](http://gruntjs.com/upgrading-from-0.3-to-0.4), but in case you can't please use [v0.3.1](https://github.com/gruntjs/grunt-contrib-stylus/tree/grunt-0.3-stable).*

## Examples

Two most common ways of compiling all [globbed paths](http://gruntjs.com/configuring-tasks#globbing-patterns) into single file:

```js
eco: {
  app: {
    files: {
      'path/to/templates.js': ['src/templates/**/*.eco']
    }
  }
}
```


```js
eco: {
  app: {
    src: ['src/templates/**/*.eco'],
    dest: 'path/to/templates.js'
  }
}
```
If you need to compile `.eco` templates into individual files in some sort of destination folder, you can [dynamiccally build path object](http://gruntjs.com/configuring-tasks#building-the-files-object-dynamically):

```js
eco: {
  app: {
    files: [{
      expand: true,
      src: ['src/templates/**/*.eco'],
      dest: 'path/to/templates',
      ext: '.js'
    }]
  }
}
```

If you ommit `dest` key, templates will be compiled right next to your `.eco` files.

To configure `eco` task simply define `options` object:



## Acknowledgment

This grunt plugin is basically a copy of  [grunt-eco](https://github.com/gr2m/grunt-eco). I didn't any JST features. I only compiled templates in the form of Javascript or Coffeescript. That is why it is so close to the original.
