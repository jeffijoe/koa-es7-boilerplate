import glob from 'glob';
import path from 'path';

// Regex to extract the module name.
const nameExpr = /(.*?)\..*/i;

/**
 * Returns a promise for a list of {name, path} pairs,
 * where the name is the module name, and path is the actual
 * full path to the module.
 *
 * @param  {String} cwd               Current working directory, used
 * for resolving filepaths.
 * @param  {String} globPattern       The glob pattern.
 * @return {Promise<[{name, path}]>}  A promise for the module names and paths.
 */
export default function getModules(cwd, globPattern) {
  return new Promise((resolve, reject) => {
    glob(`${cwd}/${globPattern}`, (err, result) => {
      if (err) return reject(err);
      const mapped = result.map(p => ({
        name: nameExpr.exec(path.basename(p))[1],
        path: path.resolve(p)
      }));
      return resolve(mapped);
    });
  });
}