import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import * as d3 from 'd3';

export enum MinionType {
  angel,
  beast,
  demon,
  dragon,
  dwarf,
  elf,
  fairy,
  goblin,
  human,
  merfolk,
  orc,
  undead,
  vampire,
  werewolf,
  witch,
  elemental,
  knight
}

export const MinionTypes = {
  [MinionType.angel]: {
    stronger: [MinionType.demon],
    weaker: [MinionType.undead]
  },
  [MinionType.beast]: {
    stronger: [MinionType.human],
    weaker: [MinionType.dragon]
  },
  [MinionType.demon]: {
    stronger: [MinionType.undead],
    weaker: [MinionType.human]
  },
  [MinionType.dragon]: {
    stronger: [MinionType.beast],
    weaker: [MinionType.undead]
  },
  [MinionType.dwarf]: {
    stronger: [MinionType.elf],
    weaker: [MinionType.orc]
  },
  [MinionType.elf]: {
    stronger: [MinionType.orc],
    weaker: [MinionType.dwarf]
  },
  [MinionType.fairy]: {
    stronger: [MinionType.dragon],
    weaker: [MinionType.beast]
  },
  [MinionType.goblin]: {
    stronger: [MinionType.elf],
    weaker: [MinionType.dwarf]
  },
  [MinionType.human]: {
    stronger: [MinionType.dragon],
    weaker: [MinionType.demon]
  },
  [MinionType.merfolk]: {
    stronger: [MinionType.orc],
    weaker: [MinionType.demon]
  },
  [MinionType.orc]: {
    stronger: [MinionType.dwarf],
    weaker: [MinionType.elf]
  },
  [MinionType.undead]: {
    stronger: [MinionType.demon],
    weaker: [MinionType.beast]
  },
  [MinionType.vampire]: {
    stronger: [MinionType.human],
    weaker: [MinionType.angel]
  },
  [MinionType.werewolf]: {
    stronger: [MinionType.beast],
    weaker: [MinionType.fairy]
  },
  [MinionType.witch]: {
    stronger: [MinionType.demon],
    weaker: [MinionType.undead]
  },
  [MinionType.elemental]: {
    stronger: [MinionType.undead],
    weaker: [MinionType.human]
  },
  [MinionType.knight]: {
    stronger: [MinionType.dragon],
    weaker: [MinionType.orc]
  }
};

@Component({
  selector: 'chart-circle',
  template: `
    <div #circleDiv class="circle">
      <div *ngFor="let minion of minions" class="item">{{minion}}</div>
    </div>
  `,
  styles: [`
    .circle {
      position: relative;
      width: 1200px;
      height: 1200px;
      border: 1px solid #000;
      border-radius: 50%;
      margin: auto;
    }

    .item {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 4em;
      height: 4em;
      margin: -2em;
    }
  `]
})
export class ChartCircleComponent implements AfterViewInit {
  @ViewChild('circleDiv') circleDiv!: ElementRef;

  minions: MinionType[] = Object.values(MinionType).slice(17, 25) as MinionType[];
  ngAfterViewInit() {
    this.arrangeMinions();
  }

  arrangeMinions() {
    const items = d3.select(this.circleDiv.nativeElement).selectAll('.item').nodes() as HTMLElement[];
    const numItems = this.minions.length;
    console.log(this.minions.length)
    const start = 280;
    const step = 360 / numItems;
    const radius = 500;
    const positions: { [key: string]: { x: number; y: number } } = {};
  
    items.forEach((item: HTMLElement, i) => {
      const rotate = start + i * step;
      d3.select(item).style('transform', `rotate(${rotate}deg) translate(${radius}px) rotate(-${rotate}deg)`);
  
      const radians = (rotate * Math.PI) / 180;
      const x = radius * Math.cos(radians) + radius;
      const y = radius * Math.sin(radians) + radius;
      positions[this.minions[i]] = { x, y };
    });
  
    this.drawArrows(positions);
  }
 

  drawArrows(positions: { [key: string]: { x: number; y: number } }) {
    const svg = d3.select(this.circleDiv.nativeElement).append('svg').attr('width', 1200).attr('height', 1200);
  
    const markerSize = 8; // Adjust the size of the arrowhead marker
    const arrowWidth = 2; // Adjust the width of the arrows
  
    // Adding arrowhead marker for stronger relationships
    svg.append('marker')
      .attr('id', 'arrowhead-stronger')
      .attr('markerWidth', markerSize + arrowWidth) // Increase the marker width
      .attr('markerHeight', markerSize)
      .attr('refX', (markerSize + arrowWidth) / 2) // Adjust the reference X position
      .attr('refY', markerSize / 2)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', `M0,0 L0,${markerSize} L${markerSize + arrowWidth},${markerSize / 2} Z`) // Increase the arrow width
      .attr('fill', 'red');
  
    // Adding arrowhead marker for weaker relationships
    svg.append('marker')
      .attr('id', 'arrowhead-weaker')
      .attr('markerWidth', markerSize + arrowWidth) // Increase the marker width
      .attr('markerHeight', markerSize)
      .attr('refX', (markerSize + arrowWidth) / 2) // Adjust the reference X position
      .attr('refY', markerSize / 2)
      .attr('orient', 'auto')
      .append('path')
      .attr('d', `M0,${markerSize} L${markerSize + arrowWidth},${markerSize} L${(markerSize + arrowWidth) / 2},0 Z`) // Increase the arrow width
      .attr('fill', 'blue');
  
    Object.entries(MinionTypes).forEach(([minionKey, minionData]) => {
      const minion = minionKey as unknown as MinionType;
      const pos = positions[minion];
      if (!pos) return;
  
      minionData.stronger.forEach(stronger => {
        const target = positions[stronger];
        if (!target) return;
  
        svg.append('line')
          .attr('x1', pos.x)
          .attr('y1', pos.y)
          .attr('x2', target.x)
          .attr('y2', target.y)
          .attr('stroke', 'red')
          .attr('stroke-width', arrowWidth) // Set the stroke width
          .attr('marker-end', 'url(#arrowhead-stronger)');
      });
  
      minionData.weaker.forEach(weaker => {
        const target = positions[weaker];
        if (!target) return;
  
        svg.append('line')
          .attr('x1', pos.x)
          .attr('y1', pos.y)
          .attr('x2', target.x)
          .attr('y2', target.y)
          .attr('stroke', 'blue')
          .attr('stroke-width', arrowWidth) // Set the stroke width
          .attr('marker-end', 'url(#arrowhead-weaker)');
      });
    });
  }
  
  
}
