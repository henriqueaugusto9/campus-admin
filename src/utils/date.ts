

class DateUtils {


    static isValidDate = (date: string) => {
        const parts = date.split("/");
        try {
            const dt = new Date(parseInt(parts[2], 10),
                parseInt(parts[1], 10) - 1,
                parseInt(parts[0], 10));
            return !!dt.valueOf()
        } catch {
            return false
        }
    }

    static safariDateToDefaultFormat = (date: string) => {
        let splittedSafariDate = date.split('-')

        let parsedDate = splittedSafariDate[0] + '/' + splittedSafariDate[2] + '/' + splittedSafariDate[1]

        return parsedDate

    }

}

export default DateUtils 