// Definindo a classe que representa o caixa da lanchonete
class CaixaDaLanchonete {

    // Método construtor, onde inicializamos o cardápio com os itens
    constructor() {
        this.cardapio = [
            { codigo: 'cafe', descricao: 'Café', valor: 3.00 },
            { codigo: 'chantily', descricao: 'Chantily (extra do Café)', valor: 1.50 },
            { codigo: 'suco', descricao: 'Suco Natural', valor: 6.20 },
            { codigo: 'sanduiche', descricao: 'Sanduíche', valor: 6.50 },
            { codigo: 'queijo', descricao: 'Queijo (extra do Sanduíche)', valor: 2.00 },
            { codigo: 'salgado', descricao: 'Salgado', valor: 7.25 },
            { codigo: 'combo1', descricao: '1 Suco e 1 Sanduíche', valor: 9.50 },
            { codigo: 'combo2', descricao: '1 Café e 1 Sanduíche', valor: 7.50 },
        ];
    }

    // Método para calcular o valor da compra com base nas informações fornecidas
    calcularValorDaCompra(formaDePagamento, itens) {
        // Lista das formas de pagamento válidas
        const formasDePagamentoValidas = ['debito', 'credito', 'dinheiro'];
        
        // Verificação se a forma de pagamento fornecida é válida
        if (!formasDePagamentoValidas.includes(formaDePagamento)) {
            return 'Forma de pagamento inválida!';
        }

        // Verificação se há itens no carrinho de compra
        if (itens.length === 0) {
            return 'Não há itens no carrinho de compra!';
        }

        // Inicialização do valor total da compra
        let valorTotal = 0;

        // Interação sobre cada item no carrinho de compra
        for (const itemInfo of itens) {
            // Separação do código do item e a quantidade do pedido
            const [itemCodigo, quantidade] = itemInfo.split(',');

            // Busca do item correspondente no cardápio
            const item = this.cardapio.find(item => item.codigo === itemCodigo);
            if (!item) {
                return 'Item inválido!';
            }

            // Verificação de quantidade inválida
            if (quantidade <= 0) {
                return 'Quantidade inválida!';
            }

            // Cálculo do valor total do item, exceto itens extras
            if (itemCodigo !== 'chantily' && itemCodigo !== 'queijo') {
                valorTotal += item.valor * quantidade;
            }
        }

        // Aplicação de desconto ou acréscimo baseado na forma de pagamento
        if (formaDePagamento === 'dinheiro') {
            valorTotal *= 0.95; // Aplica desconto de 5% para pagamento em dinheiro
        } else if (formaDePagamento === 'credito') {
            valorTotal *= 1.03; // Aplica acréscimo de 3% para pagamento a crédito
        }

        // Formatação e retorno do valor total da compra
        return `R$ ${valorTotal.toFixed(2).replace('.', ',')}`;
    }
}

// Exportação da classe para ser usada em outros arquivos
module.exports = CaixaDaLanchonete;