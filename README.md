## Usage

### Install Dependencies

```

# using yarn or npm
$ yarn (or `npm install`)

# using pnpm
$ pnpm install --shamefully-hoist
```

### Use it

```
# development mode
$ npm run dev (or `yarn dev` or `pnpm run dev`)
```
### Production Build

Run `npm run build`, and nextron outputs packaged bundles under the `dist` folder.
By default, builds on current platform, to build for different platforms:
```
`npm run build:macos-latest`
`npm run build:macos-universal`
`npm run build:windows-latest`
`npm run build:windows-latest-x86`
`npm run build:ubuntu-latest`
```
