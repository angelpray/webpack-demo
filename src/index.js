import avatar from './avatar.jpg';
import style from './layout.less';

let img = new Image();
img.src = avatar;
img.classList.add(style.avatar);

document.body.append(img);
console.log('test')
