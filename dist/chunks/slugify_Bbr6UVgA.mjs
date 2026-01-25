import { slug } from 'github-slugger';

const slugifyStr = (str) => slug(str);
const slugifyAll = (arr) => arr.map((str) => slugifyStr(str));

export { slugifyAll as a, slugifyStr as s };
