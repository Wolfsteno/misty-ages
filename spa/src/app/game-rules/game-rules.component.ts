import { Component } from '@angular/core';

interface Section {
  title: string;
  content: string[];
  isOpen: boolean;
}

@Component({
  selector: 'app-game-rules',
  templateUrl: './game-rules.component.html'
})
export class GameRulesComponent {
  sections: Section[] = [];
  c = 'blue'
  constructor() {
    this.initializeSections();
  }

  initializeSections() {
    this.sections = [
      {
        title: 'Introducción',
        content: ['Breve descripción del juego.', 'Objetivo general del juego.', 'Cómo se juega el juego en un entorno en línea.'],
        isOpen: false
      },
      {
        title: 'Componentes del juego',
        content: ['Descripción de las cartas utilizadas en el juego.', 'Explicación de cualquier otro componente necesario, como fichas, marcadores, etc.', 'Mención de cualquier requisito técnico específico para jugar en línea (por ejemplo, una plataforma o una aplicación).'],
        isOpen: false
      },
      {
        title: 'Reglas generales',
        content: ['Explicación detallada de las reglas básicas del juego.', 'Información sobre cómo se distribuyen las cartas y cómo se manejan durante el juego.', 'Descripción de las acciones y movimientos permitidos en cada turno.', 'Explicación de cualquier regla especial o excepciones a las reglas generales.'],
        isOpen: false
      },
      {
        title: 'Dinámica de partida',
        content: ['Descripción del flujo del juego, desde el inicio hasta el final.', 'Explicación de los diferentes tipos de turnos o fases en una partida.', 'Información sobre cómo se resuelven los conflictos o disputas entre los jugadores.', 'Detalles sobre cómo se avanza en el juego, por ejemplo, a través de rondas o niveles.'],
        isOpen: false
      },
      {
        title: 'Condiciones de victoria',
        content: ['Explicación clara de cómo se determina el ganador del juego.', 'Mención de cualquier objetivo o logro específico que deba alcanzarse para ganar.', 'Información sobre empates y cómo se resuelven.'],
        isOpen: false
      },
      {
        title: 'Estrategias y consejos',
        content: ['Sugerencias para mejorar la jugabilidad y estrategias para tener éxito.', 'Consejos para los jugadores principiantes.', 'Ejemplos de jugadas tácticas o estratégicas que los jugadores pueden considerar.'],
        isOpen: false
      },
      {
        title: 'Preguntas frecuentes (FAQ)',
        content: ['Una sección dedicada a responder preguntas comunes que los jugadores pueden tener.', 'Aclaración de cualquier ambigüedad o regla confusa.', 'Explicación de situaciones especiales o escenarios complicados.'],
        isOpen: false
      }
    ];
  }

  toggleSection(section: Section) {
    section.isOpen = !section.isOpen;
  }

  toggleAllSections(isOpen: boolean) {
    this.sections.forEach(section => {
      section.isOpen = isOpen;
    });
  }
}
