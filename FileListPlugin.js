class FileListPlugin {
  apply(compiler) {
    // emit is asynchronous hook, tapping into it using tapAsync, you can use tapPromise/tap(synchronous) as well
    compiler.hooks.emit.tapAsync('FileListPlugin', (compilation, callback) => {
      // Create a header string for the generated file:
      let filelist = '{\n'

      // Loop through all compiled assets,
      // adding a new line item for each filename.
      let i = 0
      for (let filename in compilation.assets) {
        let chunk = compilation.chunks[i]

        if (chunk && chunk.name) {
          filelist += `\t"${chunk.name}":"${filename}"` + ',\n'
        }

        i++
      }

      filelist = filelist.replace(/,\s*$/, '\n')
      filelist += '}'

      // Insert this list into the webpack build as a new file asset:
      compilation.assets['_filelist.json'] = {
        source: function() {
          return filelist
        },
        size: function() {
          return filelist.length
        },
      }

      callback()
    })
  }
}

module.exports = FileListPlugin
