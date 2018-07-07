# Pokemon Quest Pokedex (web app)

This project uses minimal build tools, to make forking it as simple as possible. For now, I have opted not to minify the code for that reason as well.

The files in `dest/` are plain html, css and js, and can be edited as such.

## Splitting the dest folder into a gh-pages branch

```
# create a local gh-pages branch containing the splitted output folder
git subtree split --prefix dest -b gh-pages

# force the push of the gh-pages branch to the remote gh-pages branch at origin
git push -f origin gh-pages:gh-pages

# delete the local copy of gh-pages
git branch -D gh-pages
```

## Creating the Spritesheet

Unfortunately, the spritesheet (`faces-min.png`) requires several build tools. Node.js, gulp, and a GraphicsMagick installation to auto-resize the images.

```
npm install --global gulp-cli
npm install gulp
npm install gulpfile.js
```

To generate the spritesheet, type `gulp faces`.