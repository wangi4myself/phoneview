import Radio from './components/radio';
import Input from './components/input';
import Form from './components/form';
import Scroller from './components/scroller';
import Steps from './components/steps';


const components = {
    Input,
    Radio:Radio,
    RadioGroup: Radio.Group,
    Form:Form,
    FormItem:Form.Item,
    Scroller,
    Steps,
    Step: Steps.Step,
}

const install = function(Vue) {
    components.forEach(Component => {
        Vue.use(Component);
    });
};

// auto install
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue);
}


export {
    Input,
    Radio,
    Form,
    Scroller,
    Steps,
};