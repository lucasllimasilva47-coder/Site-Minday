import React, { useState } from 'react';
import { PencilLine, Settings } from 'lucide-react-native';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Mascot from '../components/Mascot';

export default function ProfileScreen() {
  const [name, setName] = useState("Usuário");
  const [bio, setBio] = useState("Estudante focado no MinDay!");

  return (
    <section className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Mascot size={80} />
        <div>
          <div className="text-3xl font-black">{name}</div>
          <div className="text-white/70">Perfil</div>
        </div>
      </div>
      
      <Card className="bg-white/5 text-white">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <PencilLine className="h-5 w-5"/> Editar Perfil
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <label className="block text-sm text-white/80">Nome</label>
          <Input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            className="bg-white/10 text-white placeholder:text-white/50"
          />
          
          <label className="mt-3 block text-sm text-white/80">Sobre</label>
          <Input 
            value={bio} 
            onChange={(e) => setBio(e.target.value)} 
            className="bg-white/10 text-white placeholder:text-white/50"
          />
          
          <div className="pt-2 text-white/70">
            Dica: personalize seu apelido para o mascote chamar você!
          </div>
        </CardContent>
      </Card>
      
      <div className="flex gap-2">
        <Button className="bg-emerald-500 hover:bg-emerald-600">
          <Settings className="mr-2 h-4 w-4"/> Configurações
        </Button>
        <Button className="bg-rose-500 hover:bg-rose-600">Sair</Button>
      </div>
    </section>
  );
}