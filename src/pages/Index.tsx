import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useOrdemServico } from '@/hooks/useOrdemServico';
import { OSForm } from '@/components/OSForm';
import { OSList } from '@/components/OSList';
import { OrdemServico } from '@/types/os';
import { Plus, Wrench, FileText, Settings } from 'lucide-react';

const Index = () => {
  const { toast } = useToast();
  const {
    ordens,
    currentOS,
    setCurrentOS,
    createNewOS,
    saveOS,
    deleteOS,
    updateServiceItem,
  } = useOrdemServico();

  const [activeTab, setActiveTab] = useState('form');

  const handleNewOS = () => {
    const newOS = createNewOS();
    setCurrentOS(newOS);
    setActiveTab('form');
    toast({
      title: "Nova OS criada",
      description: `OS ${newOS.numeroOS} criada com sucesso!`,
    });
  };

  const handleSave = () => {
    if (!currentOS) return;
    
    if (!currentOS.cliente.trim()) {
      toast({
        title: "Erro ao salvar",
        description: "Por favor, informe o nome do cliente.",
        variant: "destructive",
      });
      return;
    }

    saveOS(currentOS);
    toast({
      title: "OS salva",
      description: `OS ${currentOS.numeroOS} salva com sucesso!`,
    });
  };

  const handleClear = () => {
    if (!currentOS) return;
    
    const clearedOS = createNewOS();
    clearedOS.numeroOS = currentOS.numeroOS;
    clearedOS.data = currentOS.data;
    setCurrentOS(clearedOS);
    
    toast({
      title: "Formulário limpo",
      description: "Dados removidos. Mantenha o número da OS e data.",
    });
  };

  const handlePrint = () => {
    if (!currentOS) return;
    
    // Implementação futura para impressão
    toast({
      title: "Impressão",
      description: "Função de impressão será implementada em breve.",
    });
  };

  const handlePDF = () => {
    if (!currentOS) return;
    
    // Implementação futura para PDF
    toast({
      title: "Gerar PDF",
      description: "Função de gerar PDF será implementada em breve.",
    });
  };

  const handleViewOS = (os: OrdemServico) => {
    setCurrentOS(os);
    setActiveTab('form');
  };

  const handleDeleteOS = (id: string) => {
    deleteOS(id);
    toast({
      title: "OS excluída",
      description: "Ordem de serviço excluída com sucesso.",
    });
  };

  const handleOSFieldChange = (field: keyof OrdemServico, value: any) => {
    if (!currentOS) return;
    
    const updatedOS = { ...currentOS, [field]: value };
    setCurrentOS(updatedOS);
  };

  const handleServiceChange = (index: number, field: string, value: any) => {
    if (!currentOS) return;
    
    updateServiceItem(currentOS.id, index, { [field]: value });
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto py-6">
        {/* Header */}
        <Card className="mb-6 bg-gradient-primary text-primary-foreground shadow-automotive">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Wrench className="w-8 h-8" />
                <div>
                  <CardTitle className="text-3xl font-bold">Sistema MaxxCar</CardTitle>
                  <p className="text-primary-foreground/80">Gestão de Ordens de Serviço Automotivo</p>
                </div>
              </div>
              <Button 
                onClick={handleNewOS}
                size="lg"
                variant="secondary"
                className="bg-white text-primary hover:bg-white/90 shadow-button-custom"
              >
                <Plus className="w-5 h-5 mr-2" />
                Nova OS
              </Button>
            </div>
          </CardHeader>
        </Card>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 bg-card shadow-card-custom">
            <TabsTrigger value="form" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Formulário OS
            </TabsTrigger>
            <TabsTrigger value="list" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Lista de OSs ({ordens.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="form" className="space-y-6">
            <OSForm
              os={currentOS}
              onChange={handleOSFieldChange}
              onServiceChange={handleServiceChange}
              onSave={handleSave}
              onClear={handleClear}
              onPrint={handlePrint}
              onPDF={handlePDF}
            />
          </TabsContent>

          <TabsContent value="list" className="space-y-6">
            <OSList
              ordens={ordens}
              onView={handleViewOS}
              onDelete={handleDeleteOS}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;