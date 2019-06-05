// import _ from 'lodash';
// import $ from 'jquery';
import avatar from './avatar.jpg';
import style from './layout.less';
// 异步懒加载
async function getComponent() {
  const { default: _ } = await import(
    /* webpackChunkName: "lodash" */
    /* webpackPrefetch: true */
    'lodash');
  const element = document.createElement('div');
  element.innerHTML = _.join(['Lazy', 'Loading'], '-');
  return element;
}
document.addEventListener('click', () => {
  getComponent().then(element => {
    document.body.appendChild(element)
  })
})
let img = new Image();
img.src = avatar;
img.classList.add(style.abc);

document.body.append(img);
// 同步加载的时候用
// console.log(_.join(['a', 'b', 'c'], '--'))
