module.exports = {
  "projects": {
    "github": {
      "schema": "https://api.github.com/graphql",
      "extensions": {
        
        "endpoints": {
          "default": {
            "url": "https://api.github.com/graphql",
            "headers": { "Authorization": `Bearer ${process.env.GITHUB_TOKEN}` }
          }
        }
      }
    }
  }
}

console.log(process.env.GITHUB_TOKEN);