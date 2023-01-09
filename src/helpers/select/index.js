export const getValueFromSelect = arr => (arr.length && arr[0].value) || '';
export const getLabelFromSelect = arr => (arr.length && arr[0].label) || '';
export const setValueToSelect = value => (value && [{label: value, value: value}]) || [];
export const createSelectObject = (value, label) => ({label: label || value, value: value});
export const getArrayFromSelect = arr => (arr.map(item => item.value));
export const setArrayToSelect = (arr, model) => {
    if (model) {
        return arr.map(item => {
            const currentItem = model.find(modelItem => modelItem.value === item)

            if (!currentItem) {
                return {label: item.label, value: item.value}
            }

            return {label: currentItem.label, value: currentItem.value}
        })
    }

    return arr.map(item => ({label: item, value: item}))
}