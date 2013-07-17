# Angular Google Static Maps Directive [![Build Status](https://travis-ci.org/passy/angular-google-staticmaps.png)](https://travis-ci.org/passy/angular-google-staticmaps)

[Homepage](http://passy.github.io/angular-google-staticmaps)

An [AngularJS](http://angularjs.org/) directive to work quickly insert [Static
Maps](https://developers.google.com/maps/documentation/staticmaps/).

## Usage

1. `bower install --save angular-google-staticmaps`
2. Include dependencies in your HTML.
3. Load the `wu.staticGmap` module for your Angular app.
4. Use the `static-gmap` directive.

## Example

See the [homepage](http://passy.github.io/angular-google-staticmaps) for a live example.

```html
<static-gmap size="137x137" markers="markers" sensor="false" zoom="14"></static-gmap>
```

The `markers` attribute is an expression evaluating to either one or multiple
markers. Markers have the following format:

```javascript
$scope.markers = [{
    color: 'blue',
    label: 'S',
    coords: [lat, lon]
}];
```

## Attributes

Any attribute is directly passed to the generated URL the image is loaded from,
except for `markers`, which gets formatted according to the specification.

### `size` (required)

The size attribute is required and must be specified as `wxh` whereby `w`
denotes the width and pixels and `h` the height.

### `sensor` (required)

The sensor attribute must explicitly be set to either `true` or `false`.

## Contributing

Pull requests welcome. Only change files in `src` and don't bump any versions.
Please respect the code style in place.

## License

MIT
