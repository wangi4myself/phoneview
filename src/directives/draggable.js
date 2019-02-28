import _ from 'lodash';
let position={
    disX:0,
    disY:0
}

const handler=(event,el)=>{
    //记录 鼠标相对元素的位置
    position.disX=event.touches[0].clientX - el.offsetLeft;
    position.disY = event.touches[0].clientY - el.offsetTop;
}

const handlermove=(event,el)=>{
    if (event.touches.length > 0) {
        let left = event.touches[0].clientX - position.disX;    
        let top = event.touches[0].clientY - position.disY;
        if (left + el.offsetWidth > window.innerWidth) {
            left = window.innerWidth - el.offsetWidth;
        }
        if (top + el.offsetHeight > window.innerHeight) {
            top = window.innerHeight - el.offsetHeight;
        }
        if (left < 0) { left = 0; }
        if (top < 0) { top = 0; }
        el.style.left = left + 'px';
        el.style.top = top  + 'px';

    }
    
}

const directive = {
    bind (el, {value}, vnode) {
        el.ontouchstart=()=>{handler(event,el)}
        el.ontouchmove=()=>{handlermove(event,el)}
    },
    inserted (el, binding, vnode) {
        
    },
    componentUpdated (el, binding) {
        
    },
    unbind (el) {
        
    }
};

export default directive