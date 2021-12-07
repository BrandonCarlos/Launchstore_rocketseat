module.exports = {
    date(timestamp) {
        const date = new Date(timestamp)
        const year = date.getUTCFullYear()
        const month = `0${date.getUTCMonth() + 1}`.slice(-2)
        const day = `0${date.getUTCDate()}`.slice(-2)

        return {
            iso: `${year}-${month}-${day}`,
            birthDay: `${day}/${month}`,
            format: `${day}/${month}/${year}`
        }
    },
    blood(blood) {
        const bloodType = {
            A1: 'A+',
            A0: 'A-',
            B1: 'B+',
            B0: 'B-',
            AB1: 'AB+',
            AB0: 'AB-',
            O1: 'O+',
            O0: 'O-'
        }

        return bloodType[blood]
    },
    formatPrice(price) {
        return new Intl.NumberFormat('pt-BR',
      {
        style: 'currency',
        currency: 'BRL'
      }).format(price / 100);//18023 / 100 -> 180.23
    }
}