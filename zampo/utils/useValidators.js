import zxcvbn from 'zxcvbn'

export default function useValidators() {
    const $t = useNuxtApp().$i18n.t

    const _getType = (value) => {
        if (Array.isArray(value))
            return 'array'
        if (value === null)
            return 'null'
        return typeof value
    }

    const _normalize = (value) => {
        const type = _getType(value)
        if (type === 'array')
            return value
        if (type === 'string')
            return value.trim()
        if (type === 'null' || type === 'undefined')
            return ''
        return value
    }

    /**
     * Check if the value is not empty
     * @param {String|Array} value 
     * @returns 
     */
    function required(errorMessage) {
        const error = errorMessage || $t('validator_field_required')
        return (value) => {
            if (value === 0) return true
            const normalized = _normalize(value)
            if (_getType(normalized) === 'array')
                return normalized.length > 0 || error
            return !!normalized || error
        }
    }

    /**
     * Returns a validator function that fails if the length of value is less than min.
     * It works for strings and arrays.
     * @param {Number} min 
     * @param {String} errorMessage 
     * @returns 
     */
    function min(min, errorMessage) {
        let error = errorMessage
        return (value) => {
            const normalized = _normalize(value)
            const type = _getType(normalized)
            if (error === undefined) {
                error = $t('validator_min_string')
                if (type === 'array')
                    error = $t('validator_min_array')
            }

            if (normalized.length < min)
                return `${error} ${min}`

            return true
        }
    }

    /**
     * Returns a validator function that fails if value is less than min.
     * @param {Number} min 
     * @param {String} errorMessage 
     * @returns 
     */
    function minNumber(min, errorMessage) {
        return (value) => {
            const normalized = Number(_normalize(value))
            if (normalized < min) {
                const error = errorMessage || $t('validator_min_number')
                return `${error} ${min}`
            }
            return true
        }
    }

    /**
     * Returns a validator function that fails if the length of value is greater than max.
     * It works for strings and arrays.
     * @param {Number} max 
     * @param {String} errorMessage 
     * @returns 
     */
    function max(max, errorMessage) {
        let error = errorMessage
        return (value) => {
            const normalized = _normalize(value)
            const type = _getType(normalized)
            if (error === undefined) {
                error = $t('validator_max_string')
                if (type === 'array')
                    error = $t('validator_max_array')
            }

            if (normalized.length > max)
                return `${error} ${max}`

            return true
        }
    }

    /**
     * Returns a validator function that fails if value is less than min.
     * @param {Number} max 
     * @param {String} errorMessage 
     * @returns 
     */
    function maxNumber(max, errorMessage) {
        return (value) => {
            const normalized = Number(_normalize(value))
            if (normalized > max) {
                const error = errorMessage || $t('validator_max_number')
                return `${error} ${max}`
            }
            return true
        }
    }

    /**
     * Returns a validator function that fails if value is not a valid email.
     * @param {String} errorMessage 
     * @returns 
     */
    function email(errorMessage) {
        const error = errorMessage || $t('validator_invalid_email')
        return (value) => {
            if(value === null || value === undefined || value === '') return true
            const normalized = _normalize(value)
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/
            if (!normalized.match(emailRegex))
                return error
            return true
        }
    }


    /**
     * Check if value matches the regex min times
     * @param {String} value 
     * @param {String} regex 
     * @param {Number} min 
     * @param {String} errorMessage 
     * @returns 
     */
    function _checkForMatches(value, regex, min, errorMessage) {
        const normalized = _normalize(value)
        const matches = normalized.match(regex)
        if (!matches || matches.length < min) {
            const error = errorMessage
            return `${error} ${min}`
        }
        return true
    }

    /**
     * Returns a validator function that fails if value does not contain min special characters.
     * @param {Number} min 
     * @param {String} errorMessage 
     * @returns 
     */
    function specialChars(min, errorMessage) {
        return (value) => {
            const specialCharactersRegex = /[!@#$%^&*()_+\-=\[\]{};':"\\|,<>\/?]/g
            const error = errorMessage || $t('validator_special_characters')
            return _checkForMatches(value, specialCharactersRegex, min, error)
        }
    }

    /**
     * Returns a validator function that fails if value does not contain min upper case characters.
     * @param {Number} min 
     * @param {String} errorMessage 
     * @returns 
     */
    function upperCaseChars(min, errorMessage) {
        return (value) => {
            const specialCharactersRegex = /[A-Z]/g
            const error = errorMessage || $t('validator_upper_case_characters')
            return _checkForMatches(value, specialCharactersRegex, min, error)
        }
    }

     /**
     * Returns a validator function that fails if value does not contain min lower case characters.
     * @param {Number} min 
     * @param {String} errorMessage 
     * @returns 
     */
    function lowerCaseChars(min, errorMessage) {
        return (value) => {
            const specialCharactersRegex = /[a-z]/g
            const error = errorMessage || $t('validator_lower_case_characters')
            return _checkForMatches(value, specialCharactersRegex, min, error)
        }
    }

     /**
     * Returns a validator function that fails if value does not contain min number characters.
     * @param {Number} min 
     * @param {String} errorMessage 
     * @returns 
     */
    function numberChars(min, errorMessage) {
        return (value) => {
            const specialCharactersRegex = /[0-9]/g
            const error = errorMessage || $t('validator_number_characters')
            return _checkForMatches(value, specialCharactersRegex, min, error)
        }
    }

     /**
     * Returns a validator function that fails if the password is too weak based on zxcvbn library.
     * @param {Number} min 
     * @param {String} errorMessage 
     * @returns 
     */
    function passwordWeakness(errorMessage) {
        return (value) => {
            const normalized = _normalize(value)
            const result = zxcvbn(normalized)
            if (result.score < 3) {
                const error = errorMessage || $t('validator_password_weakness')
                return `${error}`
            }
            return true
        }
    }

    /**
     * Standard password rules
     */
    const passwordRules = [
        passwordWeakness(),
        min(8),
        specialChars(1),
        upperCaseChars(1),
        lowerCaseChars(1),
        numberChars(1),
    ]

    return {
        required,
        min,
        minNumber,
        max,
        maxNumber,
        email,
        specialChars,
        lowerCaseChars,
        upperCaseChars,
        numberChars,

        passwordRules,

    }
}