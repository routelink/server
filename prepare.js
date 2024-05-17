import * as husky from 'husky';

if (process.env.NODE_ENV !== 'production') {
  husky.install();
}
