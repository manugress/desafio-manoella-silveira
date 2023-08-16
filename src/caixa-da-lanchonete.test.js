// Importa a classe CaixaDaLanchonete
import { CaixaDaLanchonete } from "./caixa-da-lanchonete.js";

// Descrição de um conjunto de testes para a classe CaixaDaLanchonete
describe('CaixaDaLanchonete', () => {

    // É definido uma função chamada "validaTeste" para facilitar a validação dos testes
    const validaTeste = (formaDePagamento, resultadoEsperado, itens) => {
        // Cria uma instância da classe CaixaDaLanchonete
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra(formaDePagamento, itens);

        /* Usa o "expect" do Jest para comparar o resultado calculado com o resultado esperado 
        O método "replace" é usado para substituir um caractere especial por espaço em branco */
        expect(resultado.replace("\xa0", " ")).toEqual(resultadoEsperado);
    };

    // Testes com carrinho vazio e diferentes formas de pagamento
    test.each([
        ['com carrinho vazio', 'dinheiro', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'credito', 'Não há itens no carrinho de compra!', []],
        ['com carrinho vazio', 'debito', 'Não há itens no carrinho de compra!', []],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    // Testes de compra simples com diferentes formas de pagamento e resultados esperados
    test.each([
        ['dinheiro', 'R$ 2,85', ['cafe,1']],
        ['credito', 'R$ 3,09', ['cafe,1']],
        ['debito', 'R$ 3,00', ['cafe,1']],
    ])('compra simples em %p deve resultar em %p', validaTeste);

    // Testes de compra de 3 itens com diferentes formas de pagamento e resultados esperados
    test.each([
        ['credito', 'R$ 11,85', ['cafe,1', 'sanduiche,1', 'queijo,1']],
        ['debito', 'R$ 11,50', ['cafe,1', 'sanduiche,1', 'queijo,1']],
    ])('compra de 3 itens em %p deve resultar em %p', validaTeste);

    // Testes de compra de múltiplas quantidades com diferentes formas de pagamento e resultados esperados
    test.each([
        ['dinheiro', 'R$ 33,73', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['credito', 'R$ 36,56', ['cafe,4', 'sanduiche,3', 'queijo,2']],
        ['debito', 'R$ 35,50', ['cafe,4', 'sanduiche,3', 'queijo,2']],
    ])('compra de múltiplas quantidades em %p deve resultar em %p', validaTeste);

    // Testes de compra com cenários inválidos, como quantidade zero, código inexistente, etc.
    test.each([
        ['com quantidade zero', 'dinheiro', 'Quantidade inválida!', ['cafe,0']],
        ['com um valor', 'credito', 'Item inválido!', ['1']],
        ['com código inexistente', 'debito', 'Item inválido!', ['pizza, 1']],
        ['com forma de pagamento inválida', 'especie', 'Forma de pagamento inválida!', ['cafe, 1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    // Testes de compra de itens extras sem o item principal correspondente
    test.each([
        ['chantily', 'dinheiro', 'Item extra não pode ser pedido sem o principal', ['chantily,1']],
        ['queijo', 'credito', 'Item extra não pode ser pedido sem o principal', ['queijo,1']],
        ['chantily com outro item', 'credito', 'Item extra não pode ser pedido sem o principal', ['chantily,1', 'sanduiche,1']],
        ['queijo com outro item', 'debito', 'Item extra não pode ser pedido sem o principal', ['cafe,1', 'queijo,1']],
    ])('compra %p em %p deve resultar em %p', (_, formaDePagamento, resultadoEsperado, itens) =>
        validaTeste(formaDePagamento, resultadoEsperado, itens));

    // Testes de compra de combos com diferentes formas de pagamento e resultados esperados
    test.each([
        ['combo1', 'dinheiro', 'R$ 8,48', ['combo1,1']],
        ['combo2', 'credito', 'R$ 7,73', ['combo2,1']],
        ['combo1', 'debito', 'R$ 9,18', ['combo1,2']],
        ['combo2', 'dinheiro', 'R$ 15,00', ['combo2,3']],
    ])('compra de combo %p em %p deve resultar em %p', validaTeste);

    // Teste de compra de combo com item extra
    test('compra de combo1 com chantily em dinheiro deve resultar em mensagem de erro', () => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra('dinheiro', ['combo1,1', 'chantily,1']);
        expect(resultado).toEqual('Item extra não pode ser pedido sem o principal');
    });

    // Teste de compra de combo com item extra e item principal
    test('compra de combo1 com café e chantily em dinheiro deve resultar no valor do combo', () => {
        const resultado = new CaixaDaLanchonete()
            .calcularValorDaCompra('dinheiro', ['combo1,1', 'cafe,1', 'chantily,1']);
        expect(resultado).toEqual('R$ 11,00');
    });    
});