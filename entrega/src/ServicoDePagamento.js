class ServicoDePagamento {
  constructor() {
    this.pagamentos = [];
  }

  pagar(codigoBarras, empresa, valor) {
    const pagamento = {
      codigoBarras: codigoBarras,
      empresa: empresa,
      valor: valor,
      categoria: valor > 100.00 ? 'cara' : 'padrão',
    };

    this.pagamentos.push(pagamento);
  }

  consultarUltimoPagamento() {
    if (this.pagamentos.length === 0) {
      return null;
    }

    return this.pagamentos[this.pagamentos.length - 1];
  }
}

module.exports = ServicoDePagamento;
