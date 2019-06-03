import avatar from './avatar.jpg';
import './index.css';
import './layout.less';

let img = new Image();
img.src = avatar;
img.classList.add('avatar');

document.body.append(img);
