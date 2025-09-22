export interface ServiceItem {
  id: string;
  quantidade: number;
  descricao: string;
  valorUnitario: number;
  valorTotal: number;
}

export interface OrdemServico {
  id: string;
  numeroOS: string;
  data: string;
  cliente: string;
  endereco: string;
  telefone: string;
  placa: string;
  veiculo: string;
  cor: string;
  ano: string;
  motor: string;
  chassis: string;
  servicos: ServiceItem[];
  totalBruto: number;
  desconto: number;
  totalFinal: number;
  condicoesPagamento: string;
  observacoes: string;
  createdAt: string;
  updatedAt: string;
}

export interface OSData {
  ordens: OrdemServico[];
}