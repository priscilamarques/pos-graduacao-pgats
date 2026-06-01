const assert = require('assert');
const ServicoDePagamento = require('../src/ServicoDePagamento');

describe('ServicoDePagamento', () => {

  it('deve retornar o último pagamento conforme exemplo do enunciado', () => {
    const servicoDePagamento = new ServicoDePagamento();
    servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);

    assert.deepStrictEqual(servicoDePagamento.consultarUltimoPagamento(), {
      codigoBarras: '0987-7656-3475',
      empresa: 'Samar',
      valor: 156.87,
      categoria: 'cara',
    });
  });

  describe('pagar()', () => {
    it('deve armazenar pagamento com todas as propriedades', () => {
      const servicoDePagamento = new ServicoDePagamento();
      servicoDePagamento.pagar('1234-5678-9012', 'EmpresaA', 50.00);
      const ultimo = servicoDePagamento.consultarUltimoPagamento();

      assert.strictEqual(ultimo.codigoBarras, '1234-5678-9012');
      assert.strictEqual(ultimo.empresa, 'EmpresaA');
      assert.strictEqual(ultimo.valor, 50.00);
    });

    it('deve definir categoria "cara" quando valor for maior que 100.00', () => {
      const servicoDePagamento = new ServicoDePagamento();
      servicoDePagamento.pagar('1111-2222-3333', 'EmpresaB', 100.01);

      assert.strictEqual(servicoDePagamento.consultarUltimoPagamento().categoria, 'cara');
    });

    it('deve definir categoria "padrão" quando valor for igual a 100.00', () => {
      const servicoDePagamento = new ServicoDePagamento();
      servicoDePagamento.pagar('1111-2222-3333', 'EmpresaC', 100.00);

      assert.strictEqual(servicoDePagamento.consultarUltimoPagamento().categoria, 'padrão');
    });

    it('deve definir categoria "padrão" quando valor for menor que 100.00', () => {
      const servicoDePagamento = new ServicoDePagamento();
      servicoDePagamento.pagar('4444-5555-6666', 'EmpresaD', 99.99);

      assert.strictEqual(servicoDePagamento.consultarUltimoPagamento().categoria, 'padrão');
    });

    it('deve armazenar múltiplos pagamentos na lista', () => {
      const servicoDePagamento = new ServicoDePagamento();
      servicoDePagamento.pagar('0001-0001-0001', 'EmpresaX', 50.00);
      servicoDePagamento.pagar('0002-0002-0002', 'EmpresaY', 200.00);
      servicoDePagamento.pagar('0003-0003-0003', 'EmpresaZ', 75.00);

      assert.strictEqual(servicoDePagamento.pagamentos.length, 3);
    });
  });

  describe('consultarUltimoPagamento()', () => {
    it('deve retornar null quando a lista de pagamentos estiver vazia', () => {
      const servicoDePagamento = new ServicoDePagamento();

      assert.strictEqual(servicoDePagamento.consultarUltimoPagamento(), null);
    });

    it('deve retornar somente o último pagamento da lista', () => {
      const servicoDePagamento = new ServicoDePagamento();
      servicoDePagamento.pagar('0001-0001-0001', 'EmpresaX', 50.00);
      servicoDePagamento.pagar('0987-7656-3475', 'Samar', 156.87);

      const ultimo = servicoDePagamento.consultarUltimoPagamento();

      assert.strictEqual(ultimo.codigoBarras, '0987-7656-3475');
      assert.strictEqual(ultimo.empresa, 'Samar');
      assert.strictEqual(ultimo.valor, 156.87);
      assert.strictEqual(ultimo.categoria, 'cara');
    });
  });

});
