// ex: R$ 180,23 -> 18023 -> 180.23
//coloquei 1 -> 0.01 -> coloquei 10 -> 0.10 -> coloquei 100 -> 1.00

const Mask = {
  apply(input, func) {//input = e.target.value -> olha abaixo
    setTimeout(() => {
      input.value = Mask[func](input.value);//Mask.formatBRL(value) || e.target.value = Mask.formatBRL(e.target.value);
    }, 1);

  },
  formatBRL(value) {
    value = value.replace(/\D/g, "")

    console.log(`Opa vou formatar o ${value} agora mesmo`);
    return new Intl.NumberFormat('pt-BR',
      {
        style: 'currency',
        currency: 'BRL'
      }).format(value / 100);//18023 / 100 -> 180.23
  },
}