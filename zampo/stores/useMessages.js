import { lerp } from '@/helpers'

export default defineStore('messages-store', {

    state: () => ({
        messages: [],
        _lastId: 0,
    }),

    getters: {
        _settings() {
            return {
                duration: 3,
            }
        }
    },

    actions: {

        /**
         * Adds a new message to the message list and if a duration is specified, it will be removed after the specified duration.
         * The duration can be specified in the options parameter or in the app.config.ts. The duration in the options parameter has priority.
         * @param {String} title 
         * @param {String} text 
         * @param {String} type the message type: success, error, warning, info
         * @param {MessageOptions} options: additional options
         * @param {Number} options.duration the duration of the message in ms. If negative (<= -1), the message will not be removed automatically
         * @param {any} options.data additional data to be stored in the message
         */
        message(title, text, type, options) {
            const duration = options?.duration ?? this._settings.duration
            const progress = duration < 0 ? -1 : 1
            const message = {
                text,
                title,
                type,
                id: this._lastId++,
                progress,
                data: options?.data,
            }
            this.messages.push(message)
            if (duration > 0)
                lerp(
                    {
                        start: 1,
                        end: 0,
                        duration,
                        onUpdate: (value) => this.messages.find(m => m.id === message.id).progress = value,
                        onFinish: () => { this.remove(message.id) }
                    })
        },

        /**
         * Removes a message from the message list by id
         * @param {Number} id message id
         */
        remove(id) {
            this.messages = this.messages.filter(m => m.id !== id)
        },

        /**
         * Adds a new error message to the message list and if a duration is specified, it will be removed after the specified duration.
         * The duration can be specified in the options parameter or in the app.config.ts. The duration in the options parameter has priority.
         * @param {String} title 
         * @param {String} text 
         * @param {MessageOptions} options: additional options
         * @param {Number} options.duration the duration of the message in ms. If negative (<= -1), the message will not be removed automatically
         * @param {any} options.data additional data to be stored in the message
         */
        error(title, text, options) {
            this.message(title, text, 'error', options)
        },

        /**
         * Adds a new warning message to the message list and if a duration is specified, it will be removed after the specified duration.
         * The duration can be specified in the options parameter or in the app.config.ts. The duration in the options parameter has priority.
         * @param {String} title 
         * @param {String} text 
         * @param {MessageOptions} options: additional options
         * @param {Number} options.duration the duration of the message in ms. If negative (<= -1), the message will not be removed automatically
         * @param {any} options.data additional data to be stored in the message
         */
        warning(title, text, options) {
            this.message(title, text, 'warning', options)
        },

        /**
         * Adds a new success message to the message list and if a duration is specified, it will be removed after the specified duration.
         * The duration can be specified in the options parameter or in the app.config.ts. The duration in the options parameter has priority.
         * @param {String} title 
         * @param {String} text 
         * @param {MessageOptions} options: additional options
         * @param {Number} options.duration the duration of the message in ms. If negative (<= -1), the message will not be removed automatically
         * @param {any} options.data additional data to be stored in the message
         */
        success(title, text, options) {
            this.message(title, text, 'success', options)
        },

        /**
         * Adds a new info message to the message list and if a duration is specified, it will be removed after the specified duration.
         * The duration can be specified in the options parameter or in the app.config.ts. The duration in the options parameter has priority.
         * @param {String} title 
         * @param {String} text 
         * @param {MessageOptions} options: additional options
         * @param {Number} options.duration the duration of the message in ms. If negative (<= -1), the message will not be removed automatically
         * @param {any} options.data additional data to be stored in the message
         */
        info(title, text, options) {
            this.message(title, text, 'info', options)
        },

    },
})