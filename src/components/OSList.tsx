import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { OrdemServico } from '@/types/os';
import { Eye, Trash2, FileText, Calendar, User, Car } from 'lucide-react';

interface OSListProps {
  ordens: OrdemServico[];
  onView: (os: OrdemServico) => void;
  onDelete: (id: string) => void;
}

export const OSList = ({ ordens, onView, onDelete }: OSListProps) => {
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  if (ordens.length === 0) {
    return (
      <Card className="bg-gradient-card shadow-card-custom">
        <CardContent className="flex flex-col items-center justify-center py-12">
          <FileText className="w-16 h-16 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold text-muted-foreground mb-2">
            Nenhuma ordem de serviço encontrada
          </h3>
          <p className="text-muted-foreground text-center">
            Crie sua primeira ordem de serviço clicando no botão "Nova OS"
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <Card className="bg-gradient-card shadow-card-custom">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-primary" />
            Ordens de Serviço ({ordens.length})
          </CardTitle>
        </CardHeader>
      </Card>

      <div className="grid gap-4">
        {ordens.map((os) => (
          <Card key={os.id} className="bg-gradient-card shadow-card-custom hover:shadow-automotive transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-4">
                    <Badge variant="outline" className="text-primary border-primary font-bold">
                      {os.numeroOS}
                    </Badge>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      {formatDate(os.data)}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-semibold">{os.cliente || 'Cliente não informado'}</p>
                        <p className="text-sm text-muted-foreground">{os.telefone}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Car className="w-4 h-4 text-primary" />
                      <div>
                        <p className="font-semibold">{os.veiculo || 'Veículo não informado'}</p>
                        <p className="text-sm text-muted-foreground">
                          {os.placa} {os.cor && `• ${os.cor}`} {os.ano && `• ${os.ano}`}
                        </p>
                      </div>
                    </div>

                    <div className="text-right md:text-left">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-xl font-bold text-primary">
                        {formatCurrency(os.totalFinal)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span>Atualizado em: {formatDate(os.updatedAt)}</span>
                  </div>
                </div>

                <div className="flex gap-2 ml-4">
                  <Button
                    onClick={() => onView(os)}
                    size="sm"
                    className="bg-gradient-primary shadow-button-custom hover:scale-105 transition-transform"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Ver
                  </Button>
                  <Button
                    onClick={() => onDelete(os.id)}
                    variant="destructive"
                    size="sm"
                    className="hover:scale-105 transition-transform"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};