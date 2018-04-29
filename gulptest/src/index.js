// index.js
function main(args) {
    for (let arg in args) {
      if (arg == "hello")
        console.log("world!");
        console.log("from index.js!");
      }
  }
  console.log("Hello, from index.js!");