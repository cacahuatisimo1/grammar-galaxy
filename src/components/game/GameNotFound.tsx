
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const GameNotFound = () => {
  const navigate = useNavigate();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-16 pb-8 container max-w-6xl mx-auto px-4 md:px-6">
        <div className="text-center py-20">
          <h1 className="text-3xl font-bold mb-4">Juego no encontrado</h1>
          <p className="text-muted-foreground mb-8">Lo sentimos, el juego que buscas no existe.</p>
          <Button onClick={() => navigate('/')}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver al inicio
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default GameNotFound;
