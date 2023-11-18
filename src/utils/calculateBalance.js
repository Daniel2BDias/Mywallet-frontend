export function calculateBalance (entries) {
    let aux = 0;
    entries?.forEach((e) => {
      e.transaction.type === "subtract"
        ? (aux -= Number(e.transaction.value))
        : (aux += Number(e.transaction.value))
  });
  
    const amount = aux.toFixed(2).replace(".", ",");
    const prop = aux;

    return { amount, prop };
};