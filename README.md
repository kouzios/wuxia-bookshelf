# Wuxia Bookshelf

> Originally I intended to have these update automatically; however, I couldn't find any open APIs to get the information from
> and Cross-Origin requests to sites like wuxiaworld isn't checking out. So It's just a glorified notepad.

## Build Setup

``` bash
# install dependencies
npm install
cd ./api
npm install
cd ..

# Update database credentials
# Go to api/sample_database_config.js, copy the file, 
# rename it to database_config.js, and fill out the necessary data.

# Serves client and server
npm run start

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
