import {useSelector} from "react-redux"

import {budRu} from "./widgets/bud-ru"
import {budEn} from "./widgets/bud-en"
import {wesco} from "./widgets/wesco"
import {wescoBrazil} from "./widgets/wesco-brazil"
import {wescoItaly} from "./widgets/wesco-italy"
import {wescoColombia} from "./widgets/wesco-colombia"
import {wescoMexico} from "./widgets/wesco-mexico";
import {polskaLiga} from "./widgets/polska-liga"
import {esfa} from "./widgets/esfa";
import {nigeria} from "./widgets/nigeria";
import {voka} from "./widgets/voka";

const WidgetPartners = () => {
    const userData = useSelector(props => props.userData)

    if (!userData)
        return false

    switch (userData.event) {
        case 'bud_ru':
            if (userData.age >= 18) {
                return userData.country === 'GB' ? budEn() : budRu()
            } else {
                return false
            }
        case 'bud_uk':
            if (userData.age >= 18) {
                return userData.country === 'GB' ? budEn() : budRu()
            } else {
                return false
            }
        case 'wesco':
            return wesco()
        case 'wesco_brasil':
            return wescoBrazil()
        case 'wesco_italy':
            return wescoItaly()
        case 'wesco_colombia':
            return wescoColombia()
        case 'wesco_mexico':
            return wescoMexico()
        case 'polskaliga':
            return polskaLiga()
        case 'esfa':
            return esfa()
        case 'nigeria':
            return nigeria()
        case 'voka':
            return voka()
        default:
            return false
    }
}

export default WidgetPartners