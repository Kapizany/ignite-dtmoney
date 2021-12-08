import Modal from 'react-modal';
import incomeImg from '../../assets/income.svg';
import outcomeImg from '../../assets/outcome.svg';
import { Container, RadialBox, TransactionTypeContainer } from './styles';
import closeImg from '../../assets/close.svg';
import { FormEvent, useState } from 'react';
import { useTransactions } from '../../hooks/useTransactions';

interface NewTransactionModalProps{
    isOpen: boolean;
    onRequestClose: () => void;
}

export function NewTransactionModal({isOpen, onRequestClose}:NewTransactionModalProps){
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [category, setCategory] = useState('');
    const [type, setType] = useState<'deposit'|'withdraw'>('deposit');
    const {createTransaction} = useTransactions();
    

    async function handleCreateNewTransaction(event:FormEvent){
        event.preventDefault();
        await createTransaction({
            title,
            amount,
            category,
            type,
        });

        setAmount(0);
        setCategory('');
        setTitle('');
        setType('deposit');
        onRequestClose();
    };

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
        >
        <button 
            type="button" 
            onClick={onRequestClose} 
            className="react-modal-close"
        >
            <img src={closeImg} alt="Fechar Modal" />
        </button>

        <Container onSubmit={handleCreateNewTransaction}>
            <h2>Cadastrar Transação</h2>
            <input 
                placeholder="Título"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
            />
            <input
                type="number" 
                placeholder="Valor"
                value={amount}
                onChange={(event) => setAmount(Number(event.target.value))}
            />

            <TransactionTypeContainer>
                <RadialBox 
                    type="button" 
                    isActive={type === 'deposit'} 
                    activeColor="green"
                    onClick={() => {setType('deposit')}}
                >
                    <img src={incomeImg} alt="Entrada" />
                    <span>Entrada</span>
                </RadialBox>
                <RadialBox 
                    type="button" 
                    isActive={type === 'withdraw'} 
                    activeColor="red"
                    onClick={() => {setType('withdraw')}}
                >
                    <img src={outcomeImg} alt="Saída" />
                    <span>Saída</span>
                </RadialBox>
            </TransactionTypeContainer>

            <input 
                placeholder="Categoria"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
            />
            <button type="submit">
                Cadastrar
            </button>
        </Container>
    </Modal>
    );
}