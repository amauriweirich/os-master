import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { OrdemServico, ServiceItem } from '@/types/os';
import { Calculator, Car, User, Phone, MapPin, Calendar } from 'lucide-react';

interface OSFormProps {
  os: OrdemServico | null;
  onChange: (field: keyof OrdemServico, value: any) => void;
  onServiceChange: (index: number, field: keyof ServiceItem, value: any) => void;
  onSave: () => void;
  onClear: () => void;
  onPrint: () => void;
  onPDF: () => void;
}

export const OSForm = ({ 
  os, 
  onChange, 
  onServiceChange, 
  onSave, 
  onClear,
  onPrint,
  onPDF 
}: OSFormProps) => {
  if (!os) return null;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const handleServiceItemChange = (index: number, field: keyof ServiceItem, value: string) => {
    let processedValue: any = value;
    
    if (field === 'quantidade' || field === 'valorUnitario') {
      processedValue = parseFloat(value) || 0;
    }
    
    onServiceChange(index, field, processedValue);
  };

  const handleDescontoChange = (value: string) => {
    const desconto = parseFloat(value) || 0;
    onChange('desconto', desconto);
    
    // Recalcular totais
    const totalBruto = os.servicos.reduce((sum, item) => sum + item.valorTotal, 0);
    const descontoValor = (totalBruto * desconto) / 100;
    const totalFinal = totalBruto - descontoValor;
    
    onChange('totalBruto', totalBruto);
    onChange('totalFinal', totalFinal);
  };

  return (
    <div className="space-y-6">
      {/* Header com botões de ação */}
      <Card className="bg-gradient-card shadow-card-custom">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              Sistema MaxxCar - Ordem de Serviço
            </CardTitle>
            <div className="flex gap-3">
              <Button onClick={onSave} className="bg-gradient-primary shadow-button-custom hover:scale-105 transition-transform">
                Salvar OS
              </Button>
              <Button variant="outline" onClick={onClear}>
                Limpar
              </Button>
              <Button variant="outline" onClick={onPrint}>
                Imprimir
              </Button>
              <Button 
                onClick={onPDF}
                className="bg-gradient-accent shadow-button-custom hover:scale-105 transition-transform"
              >
                Salvar PDF
              </Button>
            </div>
          </div>
        </CardHeader>
      </Card>

      {/* Informações da empresa */}
      <Card className="bg-gradient-card shadow-card-custom">
        <CardContent className="pt-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-primary">MAXXCAR</h1>
            <p className="text-muted-foreground">Endereço e WhatsApp da sua empresa ou negócio</p>
            <p className="text-muted-foreground">CNPJ da sua empresa ou negócio</p>
          </div>
        </CardContent>
      </Card>

      {/* Informações da OS e Cliente */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-gradient-card shadow-card-custom">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary" />
              Dados da OS
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="numeroOS">OS Nº</Label>
                <Input
                  id="numeroOS"
                  value={os.numeroOS}
                  onChange={(e) => onChange('numeroOS', e.target.value)}
                  className="font-bold text-primary"
                />
              </div>
              <div>
                <Label htmlFor="data">Data</Label>
                <Input
                  id="data"
                  type="date"
                  value={os.data}
                  onChange={(e) => onChange('data', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-card shadow-card-custom">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="w-5 h-5 text-primary" />
              Dados do Cliente
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="cliente">Cliente</Label>
              <Input
                id="cliente"
                value={os.cliente}
                onChange={(e) => onChange('cliente', e.target.value)}
                placeholder="Nome completo do cliente"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="endereco">Endereço</Label>
                <Input
                  id="endereco"
                  value={os.endereco}
                  onChange={(e) => onChange('endereco', e.target.value)}
                  placeholder="Endereço completo"
                />
              </div>
              <div>
                <Label htmlFor="telefone">Telefone</Label>
                <Input
                  id="telefone"
                  value={os.telefone}
                  onChange={(e) => onChange('telefone', e.target.value)}
                  placeholder="(11) 99999-9999"
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Informações do Veículo */}
      <Card className="bg-gradient-card shadow-card-custom">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Car className="w-5 h-5 text-primary" />
            Dados do Veículo
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div>
              <Label htmlFor="placa">Placa</Label>
              <Input
                id="placa"
                value={os.placa}
                onChange={(e) => onChange('placa', e.target.value)}
                placeholder="ABC-1234"
              />
            </div>
            <div>
              <Label htmlFor="veiculo">Veículo</Label>
              <Input
                id="veiculo"
                value={os.veiculo}
                onChange={(e) => onChange('veiculo', e.target.value)}
                placeholder="Marca/Modelo"
              />
            </div>
            <div>
              <Label htmlFor="cor">Cor</Label>
              <Input
                id="cor"
                value={os.cor}
                onChange={(e) => onChange('cor', e.target.value)}
                placeholder="Cor do veículo"
              />
            </div>
            <div>
              <Label htmlFor="ano">Ano</Label>
              <Input
                id="ano"
                value={os.ano}
                onChange={(e) => onChange('ano', e.target.value)}
                placeholder="2023"
              />
            </div>
            <div>
              <Label htmlFor="motor">Motor</Label>
              <Input
                id="motor"
                value={os.motor}
                onChange={(e) => onChange('motor', e.target.value)}
                placeholder="1.0 Flex"
              />
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="chassis">Chassis</Label>
            <Input
              id="chassis"
              value={os.chassis}
              onChange={(e) => onChange('chassis', e.target.value)}
              placeholder="Número do chassis"
            />
          </div>
        </CardContent>
      </Card>

      {/* Serviços e Produtos */}
      <Card className="bg-gradient-card shadow-card-custom">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-primary" />
            Produtos e Serviços
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left p-2 font-semibold">Item</th>
                  <th className="text-left p-2 font-semibold w-20">Qtd.</th>
                  <th className="text-left p-2 font-semibold">Descrição</th>
                  <th className="text-left p-2 font-semibold w-32">Valor Unit.</th>
                  <th className="text-left p-2 font-semibold w-32">Valor Total</th>
                </tr>
              </thead>
              <tbody>
                {os.servicos.map((item, index) => (
                  <tr key={item.id} className="border-b border-border/50">
                    <td className="p-2 font-medium">{index + 1}</td>
                    <td className="p-2">
                      <Input
                        type="number"
                        value={item.quantidade || ''}
                        onChange={(e) => handleServiceItemChange(index, 'quantidade', e.target.value)}
                        className="w-full"
                        min="0"
                        step="1"
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        value={item.descricao}
                        onChange={(e) => handleServiceItemChange(index, 'descricao', e.target.value)}
                        placeholder="Descrição do serviço/produto"
                        className="w-full"
                      />
                    </td>
                    <td className="p-2">
                      <Input
                        type="number"
                        value={item.valorUnitario || ''}
                        onChange={(e) => handleServiceItemChange(index, 'valorUnitario', e.target.value)}
                        className="w-full"
                        min="0"
                        step="0.01"
                        placeholder="0,00"
                      />
                    </td>
                    <td className="p-2 font-semibold text-primary">
                      {formatCurrency(item.valorTotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Totais */}
          <div className="mt-6 space-y-4">
            <div className="flex justify-end">
              <div className="w-80 space-y-3">
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span className="font-semibold">Total Bruto:</span>
                  <span className="font-bold text-primary text-lg">
                    {formatCurrency(os.totalBruto)}
                  </span>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-muted rounded">
                  <span className="font-semibold">Desconto (%):</span>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      value={os.desconto || ''}
                      onChange={(e) => handleDescontoChange(e.target.value)}
                      className="w-20"
                      min="0"
                      max="100"
                      step="0.01"
                    />
                    <span>%</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center p-3 bg-gradient-primary text-primary-foreground rounded font-bold text-lg">
                  <span>Total Final:</span>
                  <span>{formatCurrency(os.totalFinal)}</span>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Condições de Pagamento */}
      <Card className="bg-gradient-card shadow-card-custom">
        <CardHeader>
          <CardTitle>Condições de Pagamento</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            value={os.condicoesPagamento}
            onChange={(e) => onChange('condicoesPagamento', e.target.value)}
            placeholder="Informe as formas e condições de pagamento..."
            className="min-h-[100px]"
          />
        </CardContent>
      </Card>
    </div>
  );
};