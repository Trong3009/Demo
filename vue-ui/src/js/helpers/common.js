import emitter from 'tiny-emitter/instance'

const common = {
    /**
     * Hiện Toast Message
     * @author nqtrong (15-08-2023);
     */
    showToastMessage(type, content) {
        emitter.emit('showToastMessage', type, content);
    },
    /**
     * Hiện dialog
     */
    showDialog(type, title, desc) {
        emitter.emit('showDialog', type, title, desc)
    }
};

export default common;