import 'dayjs/locale/ru'
import 'dayjs/locale/en'
import 'dayjs/locale/uk'
import 'dayjs/locale/hy-am'
import 'dayjs/locale/km'
import 'dayjs/locale/uz'
import 'dayjs/locale/az'
import 'dayjs/locale/ka'
import 'dayjs/locale/tr'
import 'dayjs/locale/pt'
import 'dayjs/locale/be'
import 'dayjs/locale/cs'
import 'dayjs/locale/de'
import 'dayjs/locale/pl'
import 'dayjs/locale/sr'
import 'dayjs/locale/ro'
import 'dayjs/locale/fr'
import 'dayjs/locale/kk'
import 'dayjs/locale/ky'
import 'dayjs/locale/tg'
import 'dayjs/locale/et'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import isBetween from 'dayjs/plugin/isBetween'
import isoWeek from 'dayjs/plugin/isoWeek'
import minMax from 'dayjs/plugin/minMax'
import objectSupport from 'dayjs/plugin/objectSupport'
import pluralGetSet from 'dayjs/plugin/pluralGetSet'
import timezone from 'dayjs/plugin/timezone'
import toObject from 'dayjs/plugin/toObject'
import updateLocale from 'dayjs/plugin/updateLocale'
import utc from 'dayjs/plugin/utc'
import weekday from 'dayjs/plugin/weekday'

dayjs.extend(timezone)
dayjs.extend(utc)
dayjs.extend(customParseFormat)
dayjs.extend(isoWeek)
dayjs.extend(isBetween)
dayjs.extend(dayOfYear)
dayjs.extend(minMax)
dayjs.extend(objectSupport)
dayjs.extend(toObject)
dayjs.extend(weekday)
dayjs.extend(pluralGetSet)
dayjs.extend(updateLocale)

export const useDayjs = (tz?: string, locale?: string) => {
    if (tz) {
        dayjs.tz.setDefault(tz)
    }

    if (locale) {
        dayjs.locale(locale)
    }

    /**
     * @description Change order of weekdays for `en` locale to make it same with others
     * @see https://github.com/iamkun/dayjs/issues/215#issuecomment-1139442389
     */
    dayjs.updateLocale('en', { weekStart: 1 })

    return { dayjs }
}
