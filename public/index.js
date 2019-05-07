import './index.scss';
import './index.less';
import './iconfont.css';
import './index.css';

const str = 'HOT!~';
console.log(str);

if (module.hot) {
  module.hot.accept();
}
