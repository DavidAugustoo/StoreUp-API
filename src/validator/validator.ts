let errorsList: Object[] = [];

export const isRequired = (value: string, message: string) => {
    if (!value || value.length <= 0)
    errorsList.push({ message: message });
}

export const hasMinLen = (value: string, min: number, message: string) => {
    if (!value || value.length < min)
    errorsList.push({ message: message });
}

export const isEmail = (value: string, message: string) => {
    var reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/);
    if (!reg.test(value))
    errorsList.push({ message: message });
}

export const errors = () => { 
    return errorsList; 
}

export const isValid = () => {
    return errorsList.length == 0;
}

export const clear = () => {
    errorsList = [];
}