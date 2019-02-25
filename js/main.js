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

  simulation.markTree;
}

function buildObjects(simulation)
{
  let a = new Object('a', simulation);
  let b = new Object('b', simulation);
  let c = new Object('c', simulation);

  a.addChildrenObject(b);
  a.addChildrenObject(c);


  b.addChildrenObject(new Object('d', simulation));
  let e = new Object('e', simulation);
  b.addChildrenObject(e);

  c.addChildrenObject(new Object('f', simulation));
  c.addChildrenObject(new Object('g', simulation));
  c.addChildrenObject(new Object('h', simulation));

  e.addChildrenObject(new Object('i', simulation));

  simulation.addObjectNode(new Object('o', simulation));

  simulation.addObjectNode(a);

  console.log(a);

  simulation.setRoot(a);
}
