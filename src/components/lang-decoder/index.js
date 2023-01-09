import {useSelector} from "react-redux";

const LangDecoder = ({data, target}) => {
    const interfaceLang = useSelector(state => state.interfaceLang)

    if (!data) {
        return ''
    }

    if (!data.i18n) {
        return data[target] || ''
    }

    try {
        const dataObject = JSON.parse(data.i18n)

        if (dataObject) {
            const targetObject = dataObject[target];

            if (targetObject) {
                let targetData = targetObject[interfaceLang]

                if (!targetData) {
                    Object.values(targetObject).forEach(value => {
                        if (value) {

                            targetData = value
                        }
                    })
                }

                return targetData || ''
            }
        }
    } catch (err) {
        return data.i18n
    }
}

export default LangDecoder