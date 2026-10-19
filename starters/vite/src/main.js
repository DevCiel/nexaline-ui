import 'nexaline-ui/css';
import { init } from 'nexaline-ui';

const lifecycle = init(document);
if (import.meta.hot) import.meta.hot.dispose(() => lifecycle.destroy());
