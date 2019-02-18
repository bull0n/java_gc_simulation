import { Simulation } from './Simulation.js';
import { Object } from './tree-structure/Object.js';

document.addEventListener("DOMContentLoaded", function(event) {
  main();
});

function main()
{
  let divMarkSweep = document.getElementById('mark-sweep');

  let simulation = new Simulation(divMarkSweep);
  let a = new Object('a');

  a.addChildrenObject(new Object('b'));
  a.addChildrenObject(new Object('c'));

  simulation.addRoot(new Object('o'));
  simulation.addRoot(a);
  simulation.render();
  simulation.update();

}
