import { CompareValuesWithDetailedDifferences } from 'object-deep-compare';
import {LANGUAGES} from "../src/app/translate-loader";

/**
 * Runs a comparison of the language files looking for differences in properties. Will compare each language
 * file individually to a "base" language (specified by country-code ex. fr-FR) provided via CLI arguments.
 * Usage:
 *
 * npm run audit
 * npm run audit de-DE
 */

const baseLangKey = process.argv[2] || 'en-US';

for (const key in LANGUAGES) {
  if (key && key !== baseLangKey) {
    const diff = CompareValuesWithDetailedDifferences(
      LANGUAGES[baseLangKey],
      LANGUAGES[key],
    );

    console.log('Language ' + key + ' is missing the following properties:');
    for (const diffKey in diff) {
      if (diff[diffKey].type === 'removed') {
        console.log('\t' + diff[diffKey].path);
      }
    }
    console.log(
      'Base Language ' +
        baseLangKey +
        ' is missing the following properties from ' +
        key +
        ':',
    );
    for (const diffKey in diff) {
      if (diff[diffKey].type === 'added') {
        console.log('\t' + diff[diffKey].path);
      }
    }
    console.log();
  }
}

export {};
