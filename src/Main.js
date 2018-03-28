import Observer from './Observer'
import Emitter from './Emitter'

export default {

    install(Vue, connection, options) {

        if (!connection) throw new Error("[Vue-Mqtt] cannot locate connection");

        let observer = new Observer(connection, options);

        Vue.prototype.$mqtt = observer.Mqtt;

        Vue.mixin({
            created() {
                let mqtt = this.$options['mqtt'];
                if (mqtt) {
                    Object.keys(mqtt).forEach((key) => {
                        Emitter.addListener(key, mqtt[key], this);
                    });
                }
            },
            beforeDestroy() {
                let mqtt = this.$options['mqtt'];
                if (mqtt) {
                    Object.keys(mqtt).forEach((key) => {
                        Emitter.removeListener(key, mqtt[key], this);
                    });
                }
            }
        })

    }

}
