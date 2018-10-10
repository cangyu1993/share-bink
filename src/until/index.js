export default {
    formatDate(unix){
        let date = new Date(unix)

        function addZero(x) {
            return x >= 10 ? ('' + x) : ('0' + x)
        }

        let year = date.getFullYear()
        let month = addZero(date.getMonth()+1)
        let day = addZero(date.getDate())
        let hour = addZero(date.getHours())
        let mins = addZero(date.getMinutes())
        let seconds = addZero(date.getSeconds())

        let timeStr = `${year}-${month}-${day} ${hour}-${mins}-${seconds}`

        return timeStr
    }
}