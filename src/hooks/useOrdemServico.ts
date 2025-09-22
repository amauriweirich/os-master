import { useState, useEffect } from 'react';
import { OrdemServico, ServiceItem } from '@/types/os';

const STORAGE_KEY = 'maxxcar-ordens-servico';

export const useOrdemServico = () => {
  const [ordens, setOrdens] = useState<OrdemServico[]>([]);
  const [currentOS, setCurrentOS] = useState<OrdemServico | null>(null);

  // Carregar dados do localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      setOrdens(JSON.parse(savedData));
    }
  }, []);

  // Salvar no localStorage quando houver mudanças
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(ordens));
  }, [ordens]);

  const createNewOS = (): OrdemServico => {
    const numeroOS = `OS${String(ordens.length + 1).padStart(4, '0')}`;
    const today = new Date().toLocaleDateString('pt-BR');
    
    return {
      id: crypto.randomUUID(),
      numeroOS,
      data: today,
      cliente: '',
      endereco: '',
      telefone: '',
      placa: '',
      veiculo: '',
      cor: '',
      ano: '',
      motor: '',
      chassis: '',
      servicos: Array.from({ length: 23 }, (_, i) => ({
        id: crypto.randomUUID(),
        quantidade: 0,
        descricao: '',
        valorUnitario: 0,
        valorTotal: 0,
      })),
      totalBruto: 0,
      desconto: 0,
      totalFinal: 0,
      condicoesPagamento: 'Informe aqui as formas e condições de pagamento para seus clientes, bem como a validade do orçamento e outras informações que julgar pertinentes.',
      observacoes: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  };

  const saveOS = (os: OrdemServico) => {
    const updatedOS = {
      ...os,
      updatedAt: new Date().toISOString(),
    };

    const existingIndex = ordens.findIndex(ordem => ordem.id === os.id);
    
    if (existingIndex >= 0) {
      const updatedOrdens = [...ordens];
      updatedOrdens[existingIndex] = updatedOS;
      setOrdens(updatedOrdens);
    } else {
      setOrdens([...ordens, updatedOS]);
    }
    
    setCurrentOS(updatedOS);
  };

  const deleteOS = (id: string) => {
    setOrdens(ordens.filter(ordem => ordem.id !== id));
    if (currentOS?.id === id) {
      setCurrentOS(null);
    }
  };

  const loadOS = (id: string) => {
    const os = ordens.find(ordem => ordem.id === id);
    if (os) {
      setCurrentOS(os);
    }
  };

  const calculateTotals = (servicos: ServiceItem[], desconto: number) => {
    const totalBruto = servicos.reduce((sum, item) => sum + item.valorTotal, 0);
    const descontoValor = (totalBruto * desconto) / 100;
    const totalFinal = totalBruto - descontoValor;
    
    return { totalBruto, totalFinal };
  };

  const updateServiceItem = (osId: string, itemIndex: number, updates: Partial<ServiceItem>) => {
    if (!currentOS || currentOS.id !== osId) return;

    const updatedServicos = [...currentOS.servicos];
    const item = updatedServicos[itemIndex];
    
    updatedServicos[itemIndex] = {
      ...item,
      ...updates,
      valorTotal: (updates.quantidade ?? item.quantidade) * (updates.valorUnitario ?? item.valorUnitario),
    };

    const { totalBruto, totalFinal } = calculateTotals(updatedServicos, currentOS.desconto);
    
    const updatedOS = {
      ...currentOS,
      servicos: updatedServicos,
      totalBruto,
      totalFinal,
    };
    
    setCurrentOS(updatedOS);
  };

  return {
    ordens,
    currentOS,
    setCurrentOS,
    createNewOS,
    saveOS,
    deleteOS,
    loadOS,
    updateServiceItem,
    calculateTotals,
  };
};