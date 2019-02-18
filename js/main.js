import { Simulation } from './Simulation.js';
import { Object } from './tree-structure/Object.js';

document.addEventListener("DOMContentLoaded", function(event) {
  main();
});

function main()
{
  let divMarkSweep = document.getElementById('mark-sweep');

  let simulation = new Simulation(divMarkSweep);

  buildObjects(simulation);

  simulation.render();
  simulation.update();
}

function buildObjects(simulation)
{
  let a = new Object('a', simulation);

  a.addChildrenObject(new Object('b', simulation));
  a.addChildrenObject(new Object('c', simulation));

  simulation.addObjectNode(new Object('o', simulation));
  simulation.addObjectNode(a);
}
