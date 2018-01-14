class OrmCustomValidator {
    static validateForType(value, type){
        return typeof value === type;
    }
}

module.exports = OrmCustomValidator;