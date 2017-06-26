Neighborhood Map
==

> Web application that shows interesting places in your neighborhood.

This app is built using knockout.js and uses the following services:
  1. [Google Maps](https://developers.google.com/maps/documentation/javascript/): the map and nearby places search.
  2. [Foursquare](https://foursquare.com/): tips for each place.

## Prerequisites
To execute this project you will need these:
- [git](https://git-scm.com/downloads)
- [node](https://www.python.org/downloads/)
- [yarn](https://yarnpkg.com/en/) *(it should work just with npm, but yarn is highly recommended)*

## Running

```shell
git clone https://github.com/tiagoengel/neighborhood-map
cd neighborhood-map/dist
python -m http.server
```
*NOTE*: If you don't have python3 installed locally you can run it with any
http server you like, just replace `python -m http.server` with whatever you want.

## Development

First of all, you need to install all the dependencies.

```yarn```

### Run tests
```yarn test```

*Chrome is necessary to run the tests.*

### Dev Server
```yarn start```