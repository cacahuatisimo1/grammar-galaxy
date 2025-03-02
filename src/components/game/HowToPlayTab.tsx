
const HowToPlayTab = () => {
  return (
    <div className="space-y-2.5">
      <div className="flex gap-2.5">
        <div className="rounded-full w-6 h-6 bg-muted flex items-center justify-center shrink-0">
          <span className="text-xs font-semibold">1</span>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-0.5">Selecciona tu nivel</h3>
          <p className="text-muted-foreground text-xs">
            Elige entre principiante, intermedio o avanzado.
          </p>
        </div>
      </div>
      
      <div className="flex gap-2.5">
        <div className="rounded-full w-6 h-6 bg-muted flex items-center justify-center shrink-0">
          <span className="text-xs font-semibold">2</span>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-0.5">Lee las instrucciones</h3>
          <p className="text-muted-foreground text-xs">
            Familiarízate con las reglas específicas del juego.
          </p>
        </div>
      </div>
      
      <div className="flex gap-2.5">
        <div className="rounded-full w-6 h-6 bg-muted flex items-center justify-center shrink-0">
          <span className="text-xs font-semibold">3</span>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-0.5">Completa los ejercicios</h3>
          <p className="text-muted-foreground text-xs">
            Responde a las preguntas dentro del tiempo establecido.
          </p>
        </div>
      </div>
      
      <div className="flex gap-2.5">
        <div className="rounded-full w-6 h-6 bg-muted flex items-center justify-center shrink-0">
          <span className="text-xs font-semibold">4</span>
        </div>
        <div>
          <h3 className="text-sm font-medium mb-0.5">Revisa tus resultados</h3>
          <p className="text-muted-foreground text-xs">
            Al finalizar, verás tu puntuación y consejos para mejorar.
          </p>
        </div>
      </div>
    </div>
  );
};

export default HowToPlayTab;
