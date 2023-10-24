<h3 align="center" >GPSDistanceBearing</h3>
## About the project

This project uses an input file that contains GPS tracks. The application is able to find the distance and initial
bearing between two points. These results are stored in an output file in metric or imperial units.

## Built With
[![TypeScript][TypeScript.js]][TypeScript-url]
[![Node.js][NodeLogo.js]][Node-url]

### Installation
1. Clone the repository.
```shell
https://github.com/klavoraMate/GPSDistanceBearing
```
2. Install NPM packages.
```shell
npm install
```

## Usage
1. Place any input file that you want to process into the /application/resources directory
2. Run the application and specify the name of the input and output file, along with your preferred units for the output file.
```shell
#Result in metric units
node ./dir/app.js input.json output.json metric
#Result in imperial units
node ./dir/app.js input.json output.json imperial 
```



[TypeScript.js]: https://img.shields.io/badge/typescript-20232A?style=for-the-badge&logo=typescript&logoColor=#0079cc
[TypeScript-url]: https://www.typescriptlang.org/
[NodeLogo.js]: https://img.shields.io/badge/node.js-20232A?style=for-the-badge&logoColor=#026e00
[Node-url]: https://nodejs.org/en
