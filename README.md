install nodejs:
- `brew install node`

or update nodejs:
- `brew upgrade node`

intall packages:
- `npm install`

start dev:
- `npm start`

build:
- `npm run build`

---
### Deploy

```
make git-pull
npm update
make docker-enter
npm run build
```