import { prod } from './prod';
import { dev } from './dev';
let config: any;
if (process.env.NODE_ENV == 'production') {
  config = prod.prodConfig;
} else {
  config = dev.devConfig;
}
export const newConfig = config;
