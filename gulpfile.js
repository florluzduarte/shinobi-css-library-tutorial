const { src, dest, watch, series } = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const purgecss = require("gulp-purgecss");

// Esta función está utilizando dos de las funciones que importamos antes:
// la funcion src y la funcion dest. Lo que hace es agarrar un archivo fuente
// de tipo scss, pasarlo por el compilador de sass que también instalamos antes
// y por último, devolver el resultado de esa operación dentro de la Carpeta CSS
// que se genera automáticamente en root

function buildStyles() {
  return src("shinobi/**/*.scss")
    .pipe(sass())
    .pipe(purgecss({ content: ["*.html"] }))
    .pipe(dest("css"));
}

// Con esta función lo que hacemos es usar otra función de gulp que se llama
// watch y que presta atención a una actividad que queremos monitorear. En
// este caso queremos seguir lo que pasa en nuestro archivo scss y además queremos
// triggerear la función buildStyles cada vez que hagamos un cambio. Por eso
// escribimos esta función.

function watchTask() {
  watch(["shinobi/**/*.scss", "*.html"], buildStyles);
}

// Esta última instrucción nos permite exportar las funciones anteriores pero antes,
// usa la función series de gulp para ejecutarlas en un orden determinado, cada vez
// que invoquemos el comando gulp en la terminal.

exports.default = series(buildStyles, watchTask);
