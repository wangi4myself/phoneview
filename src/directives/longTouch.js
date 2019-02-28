let pressTimer = null
const handler=(e,el)=>{
    if (pressTimer === null) {
        pressTimer = setTimeout(() => {
            el.documentHandler(e)
        }, 1000)
    }
}

const handlerEnd=(e,el)=>{
    if (pressTimer !== null) {
        clearTimeout(pressTimer)
        pressTimer = null
    }
}

const directive = {
    bind (el, {value}, vnode) {
        el.addEventListener('touchstart', (e)=>{handler(e, el)}, false)
        el.addEventListener('touchend', (e)=>{handlerEnd(e, el)}, false)
        el.bindingFn = value
        el.documentHandler = function(e) {
            el.bindingFn(el)
        }   
    },
    inserted (el, binding, vnode) {
        
    },
    componentUpdated (el, {value}, vnode) {
        el.addEventListener('touchstart', (e)=>{handler(e, el)}, false)
        el.addEventListener('touchend', (e)=>{handlerEnd(e, el)}, false)
        el.bindingFn = value
        el.documentHandler = function(e) {
            el.bindingFn(el)
        }
    },
    unbind (el) {
        
    }
};

export default directive