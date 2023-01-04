# cobalt

- Share videos among friends easily and quickly.
- Self-hostable
- Simple UI

## Development environment

**Steps to run**

1. clone the repo `git clone https://github.com/omnisci3nce/cobalt.git`
1. run `docker-compose up -d` in top level folder to start postgres
1. open one terminal each for server and client and navigate into their respective folders (`cd server` & `cd client`)
1. in `server` folder run `npm run migrate:up` to run all db migrations on the postgres database container
1. run `npm install` and `npm run dev` in both server and client folders